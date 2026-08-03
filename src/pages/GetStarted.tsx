import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './GetStarted.css';

type Step =
  | {
      key: string;
      title: string;
      sub: string;
      type: 'choice';
      options: string[];
      hasHelp?: boolean;
    }
  | {
      key: string;
      title: string;
      sub: string;
      type: 'text';
      placeholder: string;
      rows: number;
      max: number;
      min: number;
    }
  | { key: string; title: string; sub: string; type: 'interstitial' }
  | { key: string; title: string; sub: string; type: 'note'; note: string }
  | { key: string; title: string; sub: string; type: 'contact' };

const STEPS: Step[] = [
  {
    key: 'applied',
    title: 'Have you applied for Social Security Disability before?',
    sub: 'Wherever you are in the process, whether first try, denied, or mid-appeal, there is a path from here.',
    type: 'choice',
    hasHelp: true,
    options: [
      'No, this is my first time',
      'Yes, and I was denied',
      "Yes, I'm appealing right now",
      "I'm not sure",
    ],
  },
  {
    key: 'conditions',
    title: 'What health conditions are you dealing with?',
    sub: 'Write it in your own words. Plain language is fine. You do not need the diagnosis code, and nothing you say here gets judged. Far more conditions qualify than people think, including mental health and chronic pain.',
    type: 'text',
    placeholder: 'e.g. back injury, depression, vision loss, chronic fatigue…',
    rows: 4,
    max: 500,
    min: 10,
  },
  {
    key: 'doctors',
    title: 'Are you currently seeing doctors for this?',
    sub: 'Honest answer, please. This is not a test. It just tells us how much of your story is already on paper.',
    type: 'choice',
    options: [
      'Yes, regularly',
      'Sometimes, when I can',
      'Not right now, care has not been easy to get',
      'No',
    ],
  },
  {
    key: 'denials',
    title:
      'Two out of three first applications get denied, usually over paperwork, not health.',
    sub: 'That is not an accident, and it has never been your fault. The system was built to wear people down. We were built by people who have been worn down by it, and got up anyway.',
    type: 'interstitial',
  },
  {
    key: 'lastWork',
    title: 'When were you last able to work?',
    sub: 'However long it has been, that is information, not a verdict.',
    type: 'choice',
    options: [
      "I'm still working, but struggling",
      'Within the last 6 months',
      '6 months to a year ago',
      'More than a year ago',
      "I've never been able to work",
    ],
  },
  {
    key: 'job',
    title: 'What kind of work did you do?',
    sub: "Your job's demands, physical and mental, are a big part of your claim. What you could no longer do matters as much as what is wrong.",
    type: 'text',
    placeholder: 'e.g. warehouse worker, teacher, home health aide…',
    rows: 1,
    max: 100,
    min: 3,
  },
  {
    key: 'paidIn',
    title: 'You paid into this with every paycheck. It is not charity. It is yours.',
    sub: 'You may even be owed back benefits from when your health problems began. Claiming them is not asking for a favor. It is collecting a debt.',
    type: 'note',
    note: 'You may be owed benefits dating back to when your health problems started.',
  },
  {
    key: 'contact',
    title: 'Last step: how should we reach you?',
    sub: 'A real person follows up, and many of us on this team live with disabilities too. Free, no obligation, and you set the pace.',
    type: 'contact',
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GetStarted() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [helpOpen, setHelpOpen] = useState(false);
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (step.type === 'choice' && !answers[step.key]) {
      next.choice = 'Please select an option to continue.';
    }
    if (step.type === 'text') {
      const val = texts[step.key] || '';
      if (val.trim().length < step.min) {
        next.text = `Please enter at least ${step.min} characters.`;
      }
    }
    if (step.type === 'contact') {
      if (!contact.firstName.trim()) next.firstName = 'First name is required.';
      if (!contact.lastName.trim()) next.lastName = 'Last name is required.';
      if (!contact.email.trim()) next.email = 'Email is required.';
      else if (!EMAIL_RE.test(contact.email.trim())) next.email = 'Enter a valid email address.';
    }
    return next;
  }

  function goNext() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (isLast) {
      setSubmitted(true);
      return;
    }
    setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
    setHelpOpen(false);
    window.scrollTo(0, 0);
  }

  function goBack() {
    if (stepIndex === 0) return;
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
    setHelpOpen(false);
    window.scrollTo(0, 0);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    goNext();
  }

  if (submitted) {
    return (
      <div className="screener">
        <header className="screener-header">
          <Link to="/" className="logo-link">
            <img src="/assets/samora-logo.svg" alt="Samora AI" />
          </Link>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
        </header>
        <main className="screener-main">
          <div className="screener-content">
            <h1 className="screener-h1">An advocate will reach out today.</h1>
            <p className="screener-sub">
              Thank you, {contact.firstName || 'there'}. We have your answers and someone from our
              team will follow up the way you prefer, call, text, or email, usually the same day.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="screener">
      <header className="screener-header">
        <Link to="/" className="logo-link">
          <img src="/assets/samora-logo.svg" alt="Samora AI" />
        </Link>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Step {stepIndex + 1} of {STEPS.length}
        </span>
      </header>

      <main className="screener-main">
        <form className="screener-content" onSubmit={handleFormSubmit}>
          <h1 className="screener-h1">{step.title}</h1>
          <p className="screener-sub">{step.sub}</p>

          {step.type === 'choice' && (
            <>
              <fieldset className="option-fieldset">
                <legend className="option-legend">{step.title}</legend>
                {step.options.map((label) => {
                  const selected = answers[step.key] === label;
                  return (
                    <label
                      key={label}
                      className={`option-row${selected ? ' option-row--selected' : ''}`}
                    >
                      <input
                        type="radio"
                        className="option-radio"
                        name={step.key}
                        value={label}
                        checked={selected}
                        onChange={() =>
                          setAnswers((a) => ({ ...a, [step.key]: label }))
                        }
                      />
                      <span className="option-label">{label}</span>
                    </label>
                  );
                })}
              </fieldset>
              {errors.choice && (
                <p className="field-error" role="alert">
                  {errors.choice}
                </p>
              )}
            </>
          )}

          {step.type === 'text' && (
            <div className="text-step">
              <label className="option-legend" htmlFor={`text-${step.key}`}>
                {step.title}
              </label>
              <textarea
                id={`text-${step.key}`}
                placeholder={step.placeholder}
                rows={step.rows}
                maxLength={step.max}
                value={texts[step.key] || ''}
                onChange={(e) =>
                  setTexts((t) => ({ ...t, [step.key]: e.target.value }))
                }
                aria-invalid={Boolean(errors.text)}
              />
              <span className="text-counter">
                {(texts[step.key] || '').length} / {step.max} (min {step.min})
              </span>
              {errors.text && (
                <p className="field-error" role="alert">
                  {errors.text}
                </p>
              )}
            </div>
          )}

          {step.type === 'note' && (
            <div className="note-card">
              <span className="note-dot" aria-hidden="true" />
              <span className="note-text">{step.note}</span>
            </div>
          )}

          {step.type === 'contact' && (
            <div className="contact-step">
              <div className="contact-name-grid">
                <div className="contact-field">
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    placeholder="First name"
                    value={contact.firstName}
                    onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  {errors.firstName && (
                    <span className="field-error" role="alert">
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className="contact-field">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    placeholder="Last name"
                    value={contact.lastName}
                    onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
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
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <span className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="contact-field">
                <label htmlFor="phone">Phone number</label>
                <div className="phone-grid">
                  <div className="phone-prefix">
                    <span>+1</span>
                    <span className="caret" aria-hidden="true">▾</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="555 123 4567"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  />
                </div>
                <span className="contact-helper">
                  We never sell your information. And if phone calls are hard for you, they are
                  not required. Tell us you would rather text or email, and that is what we will
                  do.
                </span>
              </div>
            </div>
          )}

          {step.type === 'choice' && step.hasHelp && (
            <div className="help-disclosure">
              <button
                type="button"
                className="help-toggle"
                aria-expanded={helpOpen}
                onClick={() => setHelpOpen((v) => !v)}
              >
                Not sure? <span className="caret">{helpOpen ? '▲' : '▼'}</span>
              </button>
              {helpOpen && (
                <p className="help-body">
                  SSDI, SSI, or "government disability" all count. VA disability and private
                  insurance do not. If you are still unsure, pick "I'm not sure" and we will
                  figure it out together.
                </p>
              )}
            </div>
          )}
        </form>
      </main>

      <footer className="screener-footer">
        <button type="button" className="back-btn" onClick={goBack} disabled={stepIndex === 0}>
          ‹ Back
        </button>
        <button type="button" className="next-btn" onClick={goNext}>
          {isLast ? 'Submit' : 'Next'}
        </button>
      </footer>
    </div>
  );
}
