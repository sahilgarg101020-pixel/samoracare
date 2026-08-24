/**
 * Thin wrappers over the Meta Pixel and Google tag loaded in index.html.
 *
 * Every call is guarded: the tags are third-party scripts that ad blockers,
 * privacy browsers, and offline dev environments routinely stop from loading,
 * and a missing global must never take a page down with it.
 *
 * Event parameters here only ever describe the interface: which question was on
 * screen, which button was pressed, which field failed validation. The screener
 * collects health conditions and contact details, and none of that may reach an
 * advertising network — the events say that something happened, never who did it
 * or what they told us.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  try {
    window.fbq?.(...args);
  } catch {
    // Analytics must never break the page.
  }
}

function gtag(...args: unknown[]) {
  try {
    window.gtag?.(...args);
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * The base snippet fires PageView once, on load. This is a single-page app, so
 * every route after the first would otherwise go uncounted. Google's own
 * enhanced measurement follows history changes, so only Meta needs this.
 */
export function trackPageView() {
  fbq('track', 'PageView');
}

/**
 * Which form a lead came from. Both forms fire the same standard event, because
 * that is the one ad platforms optimise against — this is what keeps them
 * separable in a report afterwards.
 */
export type FormName = 'get_started' | 'register';

/**
 * Submit pressed on the last step, with validation passed. This is the standard
 * event ad platforms expect on the button, so it is what campaigns optimise
 * against. It counts intent: a submission that fails on the way to the server
 * still counts here.
 */
export function trackLead(formName: FormName) {
  fbq('track', 'Lead');
  gtag('event', 'generate_lead', { form_name: formName });
}

/**
 * The lead actually reached us and was stored. Deliberately a different name
 * from Lead: firing both under one name would count every completed submission
 * twice. Compare the two to see how many submissions are being lost in transit.
 */
export function trackLeadConfirmed(formName: FormName) {
  fbq('trackCustom', 'LeadConfirmed');
  gtag('event', 'generate_lead_confirmed', { form_name: formName });
}

/**
 * A click through to the Cal.com booking page. Fired from the Talk to someone
 * page rather than the landing CTA, which now only opens that page — counting
 * it there would have reported intent to book from a click that just navigated.
 */
export function trackSchedule() {
  fbq('track', 'Schedule');
  gtag('event', 'schedule');
}

/**
 * One event per screener step, so the funnel shows where people leave.
 *
 * Google only — deliberately. The pixel is for ad optimisation and flooding it
 * with nine custom events per session would make the signal worse, not better.
 *
 * `step_key` is the question's identifier, never the answer. Answers include
 * health conditions and must not reach an analytics provider.
 */
export function trackScreenerStep(stepNumber: number, stepKey: string, totalSteps: number) {
  gtag('event', 'screener_step', {
    step_number: stepNumber,
    step_key: stepKey,
    step_total: totalSteps,
  });
}

/** Validation blocked a step. Shows which question people get stuck on. */
export function trackScreenerError(stepNumber: number, stepKey: string, field: string) {
  gtag('event', 'screener_error', {
    step_number: stepNumber,
    step_key: stepKey,
    error_field: field,
  });
}

/** Back pressed. A step with a lot of these is a step that reads badly. */
export function trackScreenerBack(stepNumber: number, stepKey: string) {
  gtag('event', 'screener_back', { step_number: stepNumber, step_key: stepKey });
}

/** A tap on the phone number. Contact is Meta's standard event for this. */
export function trackCall() {
  fbq('track', 'Contact');
  gtag('event', 'contact');
}

/**
 * Which call to action someone pressed, and where on the page it was.
 *
 * Every landing CTA points at one of two destinations, so the destination alone
 * cannot say whether the hero or the closing block is doing the work.
 * `cta_location` is what separates them.
 *
 * Google only. The pixel optimises against leads, and a click on a link that
 * merely navigates somewhere else is not one.
 */
export function trackCta(label: string, location: string) {
  gtag('event', 'cta_click', { cta_label: label, cta_location: location });
}

/**
 * The form was reached, fired on mount.
 *
 * Not the same thing as a page_view: GA4 only reports one of those for a route
 * change if enhanced measurement's history-events option is on, and this is a
 * prerendered single-page app, so anyone arriving by an in-app link can be
 * missed. Funnels anchored on this event do not depend on that setting. The
 * screener gets the same guarantee from its `intro` step event.
 */
export function trackFormView(formName: FormName) {
  gtag('event', 'form_view', { form_name: formName });
}

/**
 * First interaction with a form. The register page is one long page rather than
 * a sequence of steps, so it has no per-step event to fall back on: without
 * this, someone who fills three fields and leaves looks exactly like someone
 * who never touched it.
 */
export function trackFormStart(formName: FormName) {
  gtag('event', 'form_start', { form_name: formName });
}

/** Validation blocked a submit. Shows which field people get stuck on. */
export function trackFormError(formName: FormName, field: string) {
  gtag('event', 'form_error', { form_name: formName, error_field: field });
}
