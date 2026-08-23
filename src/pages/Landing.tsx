import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const FAQS = [
  {
    q: 'What is SSDI?',
    a: 'Social Security Disability Insurance pays monthly benefits to people who have worked and paid into Social Security but can no longer work because of a qualifying disability. If you qualify, it can also open the door to Medicare and other support.',
  },
  {
    q: 'How much does this cost?',
    a: 'The eligibility check and consultation are completely free. If we take on your case, we work on contingency, and we are only paid a share of the back benefits you win.',
  },
  {
    q: 'What happens after I complete the screening?',
    a: 'A disability advocate reviews your answers, usually the same day, and reaches out to walk you through your options. There is no obligation to continue.',
  },
  {
    q: 'What if I have already been denied?',
    a: 'Most people are denied the first time. A denial is not the end. This is often exactly where the right support matters most. We can help you understand why you were denied and take on your appeal.',
  },
  {
    q: 'How long does the SSDI process take?',
    a: 'It varies by case and by state, and the government moves slowly. We cannot change their timeline, but we can make sure your case is filed correctly and moving, and keep you informed the whole way.',
  },
  {
    q: 'Are you affiliated with the government?',
    a: 'No. We are a private company and are not affiliated with, endorsed by, or sponsored by the Social Security Administration or any other government agency.',
  },
];

const PROGRAMS = [
  {
    label: 'SSDI',
    title: 'Social Security Disability Insurance',
    body: 'Monthly benefits for workers who can no longer do their job because of a qualifying medical condition.',
  },
  {
    label: 'SSI',
    title: 'Supplemental Security Income',
    body: 'Financial support for people with limited income and resources who are disabled, blind, or aged.',
  },
  {
    label: "WORKERS' COMP",
    title: "Workers' Compensation",
    body: 'Benefits for employees injured or made ill as a direct result of their job.',
  },
  {
    label: 'VA BENEFITS',
    title: 'VA Disability Benefits',
    body: 'Compensation for veterans with service-connected disabilities caused or worsened by their military service.',
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="faq-list">
      {FAQS.map((item, i) => {
        const open = openIndex === i;
        return (
          <li className="faq-item" key={item.q}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span className="faq-question-text">{item.q}</span>
              <span className={`faq-caret${open ? ' faq-caret--open' : ''}`} aria-hidden="true">
                ▾
              </span>
            </button>
            {open && (
              <p className="faq-answer" id={`faq-answer-${i}`}>
                {item.a}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Landing() {
  return (
    <div className="landing">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header">
        <Link to="/" className="logo-link">
          {/*
            The full lockup is 5.6:1, wide enough on a phone to push the call to
            action off screen. Narrow screens get the mark on its own.
          */}
          <picture>
            <source media="(max-width: 640px)" srcSet="/assets/samora-mark.svg" />
            <img src="/assets/samora-logo.svg" width={1382} height={247} alt="Samora Care" />
          </picture>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <a href="#programs">Programs</a>
          <a href="#how">How it works</a>
          <a href="#story">Why we started</a>
          <a href="#faq">Questions</a>
        </nav>
        <Link to="/get-started" className="header-cta">
          See if you qualify <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main id="main">
      <section className="hero">
        <picture className="hero-picture">
          <source
            type="image/webp"
            srcSet="/assets/hero-portrait-2-750.webp 750w, /assets/hero-portrait-2-1400.webp 1400w"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <img
            className="hero-image"
            src="/assets/hero-portrait-2-1400.jpg"
            srcSet="/assets/hero-portrait-2-750.jpg 750w, /assets/hero-portrait-2-1400.jpg 1400w"
            sizes="(max-width: 900px) 100vw, 50vw"
            width={1400}
            height={976}
            fetchPriority="high"
            alt="A SamoraCare community member"
          />
        </picture>
        <div className="hero-content">
          <span className="eyebrow-badge">Disability owned and led</span>
          <h1 className="hero-h1">Access benefits that you deserve.</h1>
          <p className="hero-p">
            You have been doubted, delayed, and denied. We know that feeling because we have
            lived it. We help you claim the SSDI, SSI, Workers' Comp, and VA benefits you have
            already earned as an American.
          </p>
          <div className="btn-stack">
            <div className="btn-row">
              <Link to="/get-started" className="btn-primary">
                See if you qualify <span aria-hidden="true">→</span>
              </Link>
              <Link to="/talk-to-someone" className="btn-secondary">
                Talk to someone
              </Link>
            </div>
            <span className="hero-caption">2-minute check. Free, no obligation.</span>
          </div>
        </div>
      </section>

      <section className="trust-band">
        <div className="trust-card">
          <span className="trust-stat">10,000</span>
          <span className="trust-desc">people with disabilities in our community</span>
        </div>
        <div className="trust-card trust-card--logo">
          <picture>
            <source type="image/webp" srcSet="/assets/DSB_logo-figma-124.webp" />
            <img
              src="/assets/DSB_logo-figma-124.png"
              width={508}
              height={124}
              loading="lazy"
              alt="Washington State Department of Services for the Blind"
            />
          </picture>
          <span className="trust-desc">
            A proud partner of the Washington State Department of Services for the Blind
          </span>
        </div>
      </section>

      <section id="story" className="story">
        <div className="story-left">
          <span className="eyebrow-mono">Why we started this</span>
          <h2 className="story-h2">
            Most exclusion is not cruelty. It is a door no one thought to open.
          </h2>
          <p className="story-p">
            Our founder, Kartik Sawhney, spent much of his life being told the door was not open
            to him, not for anything he could not do, but for what others could not picture him
            doing. So he stopped waiting to be let in and started building the way in.
          </p>
          <p className="story-p">
            SamoraCare is that idea applied to disability benefits: a system designed to wear you
            down, made navigable by people who have been shut out too.
          </p>
          <p className="pull-quote">For people with disabilities, by people with disabilities.</p>
        </div>
        <div className="story-right">
          <picture>
            <source type="image/webp" srcSet="/assets/kartik-portrait.webp" />
            <img
              className="story-img"
              src="/assets/kartik-portrait.jpg"
              width={1000}
              height={803}
              loading="lazy"
              alt="Kartik Sawhney, founder"
            />
          </picture>
          <span className="story-caption">Kartik Sawhney, founder</span>
        </div>
      </section>

      <section className="pace dots-section">
        <div className="dots-overlay dots-overlay--pace" aria-hidden="true" />
        <div className="pace-inner">
          <div className="pace-heading">
            <h2 className="pace-h2">We move at your pace.</h2>
            <p className="pace-p">
              Waiting is the hardest part, so we move at your pace, not the government's. You hear
              back the same day, not in weeks.
            </p>
          </div>
          <div className="pace-points">
            <div className="pace-point">
              <div className="pace-point-title">One person, start to finish</div>
              <div className="pace-point-body">
                No call centers, no being passed around, no repeating your story to a stranger.
              </div>
            </div>
            <div className="pace-point">
              <div className="pace-point-title">We know where claims die</div>
              <div className="pace-point-body">
                Because we have navigated exclusion ourselves, we help you get it right the first
                time.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="how-heading">
        <h2 className="how-h2">Four steps to the benefits you have earned.</h2>
      </section>

      {/* Step 1 */}
      <section className="step-row step-row--text-left">
        <div className="step-text">
          <span className="step-eyebrow">STEP 01</span>
          <h3 className="step-h3">Check your eligibility</h3>
          <div className="step-hr" />
          <p className="step-p">
            Answer a few quick questions to see what you may qualify for. No email required, no
            obligation.
          </p>
        </div>
        <div className="step-visual step-visual--tint-a">
          <div className="step-card card-eligibility">
            <div className="prompt">Which benefit are you asking about?</div>
            <div className="chip-row">
              <span className="chip chip--selected">SSDI</span>
              <span className="chip">SSI</span>
              <span className="chip">Workers' Comp</span>
              <span className="chip">VA</span>
              <span className="chip">I am not sure yet</span>
            </div>
            <div className="card-hint">
              <span className="dot" aria-hidden="true" />
              Most people finish this in under two minutes.
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="step-row step-row--visual-left">
        <div className="step-visual step-visual--tint-b">
          <div className="step-card card-chat">
            <div className="chat-header">
              <img src="/assets/maya-portrait.jpg" width={240} height={204} loading="lazy" alt="Maya, benefits advocate" />
              <div>
                <div className="chat-name">Maya · benefits advocate</div>
                <div className="chat-meta">Will call you in 00:41s</div>
              </div>
            </div>
            <div className="chat-divider" />
            <div className="chat-line">
              To recap: your denial letter cites missing medical records. That is fixable, and it
              is a strong case.
            </div>
            <div className="chat-line">
              I will send the record request today. You will hear from me by tomorrow.
            </div>
            <div className="chat-signoff">Maya</div>
          </div>
        </div>
        <div className="step-text">
          <span className="step-eyebrow">STEP 02</span>
          <h3 className="step-h3">Talk to someone who gets it</h3>
          <div className="step-hr" />
          <p className="step-p">
            Speak with a disability advocate who reviews your case, answers your questions, and
            explains your options in plain language.
          </p>
          <div className="step-chips">
            <span>Same-day response</span>
            <span>Call, text, or email</span>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="step-row step-row--text-left">
        <div className="step-text">
          <span className="step-eyebrow">STEP 03</span>
          <h3 className="step-h3">We take on your case</h3>
          <div className="step-hr" />
          <p className="step-p">
            Our team represents you directly and builds your claim: evidence, forms, deadlines,
            and all the parts designed to wear you down.
          </p>
        </div>
        <div className="step-visual step-visual--tint-a">
          <div className="step-card card-timeline">
            <div className="prompt">Your case, in progress</div>
            <div className="timeline">
              <div className="timeline-row">
                <span className="timeline-dot timeline-dot--done" aria-hidden="true" />
                <div>
                  <div className="timeline-label">Medical records requested</div>
                  <div className="timeline-meta">Mar 4 · complete</div>
                </div>
              </div>
              <div className="timeline-row">
                <span className="timeline-dot timeline-dot--done" aria-hidden="true" />
                <div>
                  <div className="timeline-label">Appeal filed with SSA</div>
                  <div className="timeline-meta">Mar 19 · complete</div>
                </div>
              </div>
              <div className="timeline-row">
                <span className="timeline-dot timeline-dot--pending" aria-hidden="true" />
                <div>
                  <div className="timeline-label">Hearing scheduled</div>
                  <div className="timeline-meta">Maya is preparing your testimony</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4 */}
      <section className="step-row step-row--visual-left step-row--last">
        <div className="step-visual step-visual--tint-b">
          <div className="step-card card-approved">
            <div className="prompt">Your claim was approved.</div>
            <div className="approved-amount">$1,842</div>
            <div className="approved-hr" />
            <div className="approved-note">per month, plus back pay from your original filing date.</div>
          </div>
        </div>
        <div className="step-text">
          <span className="step-eyebrow">STEP 04</span>
          <h3 className="step-h3">Receive the aid you deserve</h3>
          <div className="step-hr" />
          <p className="step-p">
            We handle the filings, hearings, and appeals. You stay informed the whole way, and you
            only pay if you win.
          </p>
          <Link to="/get-started" className="step-outline-btn">
            Start your free check <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section id="programs" className="programs">
        <div className="programs-heading">
          <h2 className="programs-h2">Four programs. One place to start.</h2>
          <p className="programs-p">
            Federal and state disability programs are complex on purpose. We guide you through
            all of it, so you can focus on what matters.
          </p>
        </div>
        <div className="programs-grid">
          {PROGRAMS.map((p) => (
            <div className="program-card" key={p.label}>
              <span className="program-label">{p.label}</span>
              <h3 className="program-h3">{p.title}</h3>
              <p className="program-p">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq">
        <h2 className="faq-h2">Common questions</h2>
        <FaqAccordion />
      </section>

      <section id="cta" className="cta dots-section">
        <div className="dots-overlay dots-overlay--cta" aria-hidden="true" />
        <div className="cta-inner">
          <div className="cta-left">
            <span className="cta-line cta-line--accent">You have earned these benefits.</span>
            <span className="cta-line">Let us help you claim them.</span>
            <span className="cta-sub">Free eligibility check. No obligation.</span>
          </div>
          <div className="cta-right">
            <Link to="/get-started" className="cta-primary">
              Check your eligibility <span aria-hidden="true">→</span>
            </Link>
            <Link to="/talk-to-someone" className="cta-ghost">
              Talk to someone
            </Link>
          </div>
        </div>
      </section>

      </main>

      <footer className="site-footer">
        <div className="footer-row">
          <img src="/assets/samora-logo.svg" width={1382} height={247} loading="lazy" alt="Samora" />
        </div>
        <nav className="footer-legal">
          <Link to="/register">Check if you pre-qualify</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/accessibility-statement">Accessibility</Link>
        </nav>
        <div className="footer-copyright">© 2026 Samora AI, Inc. All rights reserved.</div>
        <p className="footer-disclaimer">
          This website is for informational purposes only. Results vary based on individual
          circumstances. We are a private company and are not affiliated with, endorsed by, or
          sponsored by the Social Security Administration or any other government agency.
        </p>
      </footer>
    </div>
  );
}
