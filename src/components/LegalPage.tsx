import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

interface LegalPageProps {
  title: string;
  intro: string;
  effectiveDate: string;
  children: ReactNode;
}

/**
 * Shared shell for the privacy policy and terms pages. Both are linked from
 * carrier registration forms, so they need to stand on their own when opened
 * cold, without the visitor having seen the rest of the site.
 */
export default function LegalPage({ title, intro, effectiveDate, children }: LegalPageProps) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — SamoraCare`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="legal">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="legal-header">
        <Link to="/" className="legal-logo">
          <img src="/assets/samora-logo.svg" alt="Samora" />
        </Link>
        <Link to="/" className="legal-back">
          ‹ Back to site
        </Link>
      </header>

      <main id="main" className="legal-main">
        <article className="legal-article">
          <h1 className="legal-h1">{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-effective">
            <span>Effective date</span>
            <strong>{effectiveDate}</strong>
          </p>
          {children}
        </article>
      </main>

      <footer className="legal-footer">
        <nav className="legal-footer-links">
          <Link to="/register">Check if you pre-qualify</Link>
          <Link to="/blog">Guides</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/accessibility-statement">Accessibility</Link>
        </nav>
        <p className="legal-copyright">© 2026 Samora AI, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

/** Heading plus body used for every numbered section on both legal pages. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="legal-section">
      <h2 className="legal-h2">{heading}</h2>
      {children}
    </section>
  );
}
