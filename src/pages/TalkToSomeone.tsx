import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackSchedule, trackCall } from '../lib/analytics';
import './TalkToSomeone.css';

const BOOKING_URL = 'https://cal.com/kartiksawhney/quick-chat-benefits';
/** Digits only for the tel: href; the display form is written out separately. */
const PHONE_TEL = '+12537665260';
const PHONE_DISPLAY = '(253) 766-5260';

export default function TalkToSomeone() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Talk to someone — SamoraCare';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="talk">
      <header className="talk-header">
        <Link to="/" className="talk-logo">
          <img src="/assets/samora-logo.svg" alt="Samora Care" />
        </Link>
        <Link to="/" className="talk-back">
          ‹ Back to site
        </Link>
      </header>

      <main className="talk-main">
        <div className="talk-inner">
          <div className="talk-greeting">
            <img
              className="talk-avatar"
              src="/assets/maya-portrait.jpg"
              alt="Maya, benefits advocate"
            />
            <div className="talk-bubble">
              <span className="talk-bubble-name">Maya · benefits advocate</span>
              <p className="talk-bubble-text">
                Whichever you pick, you reach a real person. Nothing is decided on this call and
                there is no obligation.
              </p>
            </div>
          </div>

          <h1 className="talk-h1">How would you rather do this?</h1>
          <p className="talk-sub">
            Book a time that suits you, or call us now and speak to whoever is free.
          </p>

          <div className="talk-options">
            <a
              className="talk-option talk-option--primary"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackSchedule}
            >
              <span className="talk-option-label">Book a call</span>
              <span className="talk-option-detail">
                Pick a 15-minute slot. We will send a calendar invite and call you then.
              </span>
              <span className="talk-option-cta">
                Choose a time <span aria-hidden="true">→</span>
              </span>
            </a>

            <a className="talk-option" href={`tel:${PHONE_TEL}`} onClick={trackCall}>
              <span className="talk-option-label">Call us</span>
              <span className="talk-option-detail">
                No appointment needed. If everyone is busy, leave a message and we call back the
                same day.
              </span>
              <span className="talk-option-cta talk-phone">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <p className="talk-footnote">
            If phone calls are hard for you, they are not required. Complete the{' '}
            <Link to="/get-started">2-minute check</Link> instead and tell us you would rather text
            or email, and that is what we will do.
          </p>
        </div>
      </main>
    </div>
  );
}
