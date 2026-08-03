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
}

/** Field names the existing Sheet columns and n8n workflow expect. */
interface SheetPayload {
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
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Matches the old form's sentinel so the Sheet stays consistent. */
const NEVER_WORKED_JOB = 'N/A - never worked';

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function build(body: Record<string, unknown>): SheetPayload | null {
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
  };
}

async function forward(endpoint: string, payload: SheetPayload): Promise<boolean> {
  // Apps Script reads the raw body via e.postData.contents and parses it
  // itself, so the content type stays text/plain as it was originally.
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const endpoint = env.LEAD_ENDPOINT;
  if (!endpoint) {
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

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      if (await forward(endpoint, payload)) {
        return Response.json({ ok: true });
      }
      // Never log the payload itself — it is health and contact information.
      console.error(`lead: upstream rejected submission (attempt ${attempt})`);
    } catch (err) {
      console.error(`lead: upstream request failed (attempt ${attempt})`, err);
    }
  }

  return Response.json({ ok: false, error: 'upstream' }, { status: 502 });
};
