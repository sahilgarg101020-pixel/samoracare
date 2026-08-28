import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

/**
 * Without a catch-all route an unmatched URL rendered nothing at all: the SPA
 * fallback serves index.html, React matches no route, and the visitor is left
 * looking at a blank page with no way onward. A mistyped article slug is the
 * likeliest way to land here.
 */
export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Page not found — SamoraCare';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="blog">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="blog-header">
        <Link to="/" className="blog-logo">
          {/* Same reason as the landing header: the full lockup is too wide to
              leave the call to action on screen at phone widths. */}
          <picture>
            <source media="(max-width: 640px)" srcSet="/assets/samora-mark.svg" />
            <img src="/assets/samora-logo.svg" width={1382} height={247} alt="Samora Care" />
          </picture>
        </Link>
        <Link to="/get-started" className="blog-header-cta">
          See if you qualify <span aria-hidden="true">→</span>
        </Link>
      </header>

      <main id="main" className="blog-main">
        <div className="blog-intro">
          <span className="eyebrow-mono">404</span>
          <h1 className="blog-h1">We could not find that page.</h1>
          <p className="blog-lede">
            The link may be out of date, or the address may have a typo in it. Nothing you were
            doing has been lost, and these will get you back on track:
          </p>
        </div>
        <nav className="blog-footer-links">
          <Link to="/">Home</Link>
          <Link to="/blog">Guides</Link>
          <Link to="/get-started">See if you qualify</Link>
          <Link to="/talk-to-someone">Talk to someone</Link>
        </nav>
      </main>

      <footer className="blog-footer">
        <p className="blog-copyright">© 2026 Samora AI, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
