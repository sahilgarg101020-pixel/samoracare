/**
 * Receives a completed screener and forwards it to the Google Apps Script
 * endpoint that feeds the leads Sheet and the n8n workflow.
 *
 * The browser used to POST that endpoint directly with `mode: 'no-cors'`,
 * which made every response opaque — a lead dropped by a failing Apps Script
 * looked exactly like a lead that landed. Proxying server-side gives us a real
 * status code, one retry, and a failure the user can actually see and act on.
 */

interface Env {
  LEAD_ENDPOINT: string;
  LEADS: KVNamespace;
}

/**
 * Apps Script needs a second or more just to acknowledge a request, and longer
 * again to write the row. Waiting on it before answering the browser put that
 * delay in front of someone who had already finished the form, so the lead is
 * recorded in KV first and forwarded after the response goes out.
 */
const UPSTREAM_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;

/**
 * Two shapes reach this endpoint. The screener sends the original one; the
 * register page sends the second. `type` is the discriminator the Sheet and the
 * n8n workflow route on, so a register lead can get its own email template
 * without the screener's contract changing at all.
 */
type SheetPayload = ScreenerPayload | RegisterPayload;

/** Field names the existing Sheet columns and n8n workflow expect. */
interface ScreenerPayload {
  type: 'get_started';
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  first_time_applying: string;
  conditions: string;
  seeing_doctors: string;
  last_able_to_work: string;
  job_title: string;
  /**
   * 'yes' or 'no'. Kept for every submission, not just the opt-ins — carriers
   * and the TCPA care about being able to show what someone actually chose.
   */
  sms_consent: string;
}

/** The register form at /register. */
interface RegisterPayload {
  type: 'register';
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  inquiring_for: string;
  state: string;
  date_of_birth: string;
  receiving_benefits: string;
  owes_overpayment: string;
  health_conditions: string;
  sms_consent: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Matches the old form's sentinel so the Sheet stays consistent. */
const NEVER_WORKED_JOB = 'N/A - never worked';

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function buildRegister(body: Record<string, unknown>): RegisterPayload | null {
  const fullName = str(body.fullName, 200);
  const email = str(body.email, 200);
  // Same rule as the screener: the client can be bypassed, and a lead we cannot
  // follow up on is worse than no lead.
  if (!fullName || !EMAIL_RE.test(email)) return null;

  return {
    type: 'register',
    fullName,
    email,
    phone: str(body.phone, 40),
    countryCode: str(body.countryCode, 8) || '+1',
    inquiring_for: str(body.inquiringFor, 40),
    state: str(body.state, 60),
    date_of_birth: str(body.dob, 12),
    receiving_benefits: str(body.receivingBenefits, 4),
    owes_overpayment: str(body.owesOverpayment, 4),
    health_conditions: str(body.healthConditions, 4),
    sms_consent: body.smsConsent === 'yes' ? 'yes' : 'no',
  };
}

function build(body: Record<string, unknown>): SheetPayload | null {
  if (body.form === 'register') return buildRegister(body);
  return buildScreener(body);
}

function buildScreener(body: Record<string, unknown>): ScreenerPayload | null {
  const firstName = str(body.firstName, 100);
  const lastName = str(body.lastName, 100);
  const email = str(body.email, 200);
  const lastAbleToWork = str(body.lastWork, 40);
  const job = str(body.job, 100);

  // Mirrors the client-side rules. The client can be bypassed; the Sheet
  // should never receive a lead we cannot follow up on.
  if (!firstName || !lastName || !EMAIL_RE.test(email)) return null;

  return {
    type: 'get_started',
    fullName: `${firstName} ${lastName}`,
    email,
    phone: str(body.phone, 40),
    countryCode: str(body.countryCode, 8) || '+1',
    first_time_applying: str(body.applied, 40),
    conditions: str(body.conditions, 500),
    seeing_doctors: str(body.doctors, 40),
    last_able_to_work: lastAbleToWork,
    job_title: job || (lastAbleToWork === 'never' ? NEVER_WORKED_JOB : ''),
    sms_consent: body.smsConsent === 'yes' ? 'yes' : 'no',
  };
}

async function forward(endpoint: string, payload: SheetPayload): Promise<boolean> {
  // Apps Script reads the raw body via e.postData.contents and parses it
  // itself, so the content type stays text/plain as it was originally.
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
    // Without this a hung upstream holds the request open indefinitely.
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  return res.ok;
}

/**
 * Runs after the response has been sent. Marks the stored lead as delivered so
 * anything still flagged pending in KV is a lead that needs chasing by hand.
 */
async function deliver(env: Env, key: string, payload: SheetPayload): Promise<void> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      if (await forward(env.LEAD_ENDPOINT, payload)) {
        try {
          await env.LEADS.put(key, JSON.stringify({ ...payload, delivered: true }));
        } catch (err) {
          // The row landed in the Sheet, which is what matters. Losing the
          // flag only costs accuracy in the pending-leads audit.
          console.error(`lead: delivered but could not update ${key}`, err);
        }
        return;
      }
      // Never log the payload itself — it is health and contact information.
      console.error(`lead: upstream rejected ${key} (attempt ${attempt}/${MAX_ATTEMPTS})`);
    } catch (err) {
      console.error(`lead: upstream failed for ${key} (attempt ${attempt}/${MAX_ATTEMPTS})`, err);
    }
  }
  console.error(`lead: giving up on ${key}; it stays pending in KV for recovery`);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!env.LEAD_ENDPOINT) {
    console.error('lead: LEAD_ENDPOINT is not configured');
    return Response.json({ ok: false, error: 'not_configured' }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }

  const payload = build(body);
  if (!payload) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Timestamp first so the key sorts chronologically when listing pending leads.
  const key = `lead:${new Date().toISOString()}:${crypto.randomUUID()}`;

  try {
    await env.LEADS.put(key, JSON.stringify({ ...payload, delivered: false }));
  } catch (err) {
    // KV is the thing that makes an early confirmation honest. Without it,
    // fall back to forwarding inline rather than claiming a lead was captured.
    console.error('lead: KV write failed, forwarding inline instead', err);
    const ok = await forward(env.LEAD_ENDPOINT, payload).catch(() => false);
    return ok
      ? Response.json({ ok: true })
      : Response.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  waitUntil(deliver(env, key, payload));
  return Response.json({ ok: true });
};
