/**
 * Thin wrappers over the Meta Pixel and Google tag loaded in index.html.
 *
 * Every call is guarded: the tags are third-party scripts that ad blockers,
 * privacy browsers, and offline dev environments routinely stop from loading,
 * and a missing global must never take a page down with it.
 *
 * Nothing here ever passes an event parameter. The screener collects health
 * conditions and contact details, and none of that may reach an advertising
 * network — the events say only that something happened, never who or what.
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
 * Submit pressed on the last step, with validation passed. This is the standard
 * event ad platforms expect on the button, so it is what campaigns optimise
 * against. It counts intent: a submission that fails on the way to the server
 * still counts here.
 */
export function trackLead() {
  fbq('track', 'Lead');
  gtag('event', 'generate_lead');
}

/**
 * The lead actually reached us and was stored. Deliberately a different name
 * from Lead: firing both under one name would count every completed submission
 * twice. Compare the two to see how many submissions are being lost in transit.
 */
export function trackLeadConfirmed() {
  fbq('trackCustom', 'LeadConfirmed');
  gtag('event', 'generate_lead_confirmed');
}

/** A click through to the Cal.com booking page. */
export function trackSchedule() {
  fbq('track', 'Schedule');
  gtag('event', 'schedule');
}
