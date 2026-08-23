import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './GetStarted.css';
import './Connect.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Connect() {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!contact.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!contact.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!contact.email.trim()) nextErrors.email = 'Email is required.';
    else if (!EMAIL_RE.test(contact.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="screener">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
        <header className="screener-header connect-header">
          <Link to="/" className="logo-link">
            <img src="/assets/samora-logo.svg" alt="Samora AI" />
          </Link>
        </header>
        <main id="main" className="screener-main">
          <div className="screener-content">
            <h1 className="screener-h1">Thanks for connecting.</h1>
            <p className="screener-sub">
              This is currently a preview form, so your information was not sent.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="screener">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="screener-header connect-header">
        <Link to="/" className="logo-link">
          <img src="/assets/samora-logo.svg" alt="Samora AI" />
        </Link>
      </header>

      <main id="main" className="screener-main">
        <form id="connect-form" className="screener-content" onSubmit={handleSubmit}>
          <h1 className="screener-h1">Let&apos;s connect.</h1>
          <p className="screener-sub">
            Share how we can reach you. There is no obligation, and you set the pace.
          </p>

          <div className="contact-step">
            <div className="contact-name-grid">
              <div className="contact-field">
                <label htmlFor="connect-first-name">First name</label>
                <input
                  id="connect-first-name"
                  autoComplete="given-name"
                  placeholder="First name"
                  value={contact.firstName}
                  onChange={(event) =>
                    setContact((current) => ({ ...current, firstName: event.target.value }))
                  }
                  aria-invalid={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <span className="field-error" role="alert">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="connect-last-name">Last name</label>
                <input
                  id="connect-last-name"
                  autoComplete="family-name"
                  placeholder="Last name"
                  value={contact.lastName}
                  onChange={(event) =>
                    setContact((current) => ({ ...current, lastName: event.target.value }))
                  }
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <span className="field-error" role="alert">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="connect-email">Email address</label>
              <input
                id="connect-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={contact.email}
                onChange={(event) =>
                  setContact((current) => ({ ...current, email: event.target.value }))
                }
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <span className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="contact-field">
              <label htmlFor="connect-phone">Phone number</label>
              <div className="phone-field">
                <span className="phone-prefix">+1</span>
                <input
                  id="connect-phone"
                  type="tel"
                  autoComplete="tel-national"
                  placeholder="555 123 4567"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </div>
              <span className="contact-helper">
                We never sell your information. Phone calls are optional; you can choose text or
                email instead.
              </span>
            </div>

            <label className="sms-consent">
              <input
                type="checkbox"
                className="sms-consent-box"
                checked={smsConsent}
                onChange={(event) => setSmsConsent(event.target.checked)}
              />
              <span className="sms-consent-text">
                I agree to receive text messages from SamoraCare about my benefits claim at the
                number above. Message and data rates may apply. Up to 4 messages per month. Reply{' '}
                <strong>STOP</strong> to opt out or <strong>HELP</strong> for help. Consent is not a
                condition of any purchase. See our{' '}
                <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>
        </form>
      </main>

      <footer className="screener-footer connect-footer">
        <button type="submit" form="connect-form" className="next-btn">
          Submit
        </button>
      </footer>
    </div>
  );
}
