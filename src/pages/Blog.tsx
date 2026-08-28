import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCover from '../components/BlogCover';
import { BLOG_POSTS } from '../data/blogPosts';
import './Blog.css';

export default function Blog() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Guides — SamoraCare';
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
          <span className="eyebrow-mono">Guides</span>
          <h1 className="blog-h1">Disability benefits, explained plainly.</h1>
          <p className="blog-lede">
            Twenty short guides to the questions people actually ask us, from working out which
            programme is yours to what happens on the day of a hearing. No jargon, no assumed
            knowledge, and nothing you need to read in order.
          </p>
        </div>

        <ol className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="blog-card">
                <BlogCover
                  pattern={post.pattern}
                  number={post.number}
                  category={post.category}
                />
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-more" aria-hidden="true">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className="blog-cta">
          <h2 className="blog-cta-h2">Not sure where you stand?</h2>
          <p className="blog-cta-p">
            The eligibility check takes about two minutes and costs nothing. You will get a real
            answer about which programmes may be open to you.
          </p>
          <Link to="/get-started" className="blog-cta-btn">
            See if you qualify <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

      <footer className="blog-footer">
        <nav className="blog-footer-links">
          <Link to="/">Home</Link>
          <Link to="/register">Check if you pre-qualify</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/accessibility-statement">Accessibility</Link>
        </nav>
        <p className="blog-copyright">© 2026 Samora AI, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
