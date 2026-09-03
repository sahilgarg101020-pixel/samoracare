import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BlogCover from '../components/BlogCover';
import { BLOG_POSTS, getPost } from '../data/blogPosts';
import NotFound from './NotFound';
import './Blog.css';

/**
 * Splits **bold** runs out of body text. The content is authored as prose in
 * blogPosts.ts, so this keeps emphasis out of the data without ever putting
 * author-supplied HTML into the page.
 */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * `slug` is only passed by the prerenderer. At build time each article is
 * rendered on its own, outside a <Routes> tree, so there is no route match for
 * useParams to read from. In the browser the prop is absent and the URL wins.
 */
export default function BlogPost({ slug: slugFromProps }: { slug?: string }) {
  const params = useParams();
  const post = getPost(slugFromProps ?? params.slug);

  useEffect(() => {
    const previous = document.title;
    document.title = post ? `${post.title} — SamoraCare` : 'Guide not found — SamoraCare';
    return () => {
      document.title = previous;
    };
  }, [post]);

  // An unknown slug is the same situation as any other bad URL, so it gets the
  // same page rather than a second variant to keep in step.
  if (!post) return <NotFound />;

  const index = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const previousPost = index > 0 ? BLOG_POSTS[index - 1] : undefined;
  const nextPost = index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : undefined;

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
        <article className="post">
          <Link to="/blog" className="post-back">
            ‹ All guides
          </Link>
          <BlogCover
            pattern={post.pattern}
            number={post.number}
            category={post.category}
            size="banner"
          />
          <h1 className="post-h1">{post.title}</h1>
          {post.blocks.map((block, i) =>
            block.type === 'ul' ? (
              <ul className="post-list" key={i}>
                {block.items?.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="post-p" key={i}>
                <RichText text={block.text ?? ''} />
              </p>
            ),
          )}

          <aside className="post-cta">
            <p className="post-cta-p">
              If any of this is where you are right now, the free eligibility check takes about two
              minutes and tells you which programmes may be open to you.
            </p>
            <Link to="/get-started" className="post-cta-btn">
              See if you qualify <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </article>

        <nav className="post-nav" aria-label="More guides">
          {previousPost ? (
            <Link to={`/blog/${previousPost.slug}`} className="post-nav-link">
              <span className="post-nav-label">Previous</span>
              <span className="post-nav-title">{previousPost.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextPost && (
            <Link to={`/blog/${nextPost.slug}`} className="post-nav-link post-nav-link--next">
              <span className="post-nav-label">Next</span>
              <span className="post-nav-title">{nextPost.title}</span>
            </Link>
          )}
        </nav>
      </main>

      <footer className="blog-footer">
        <nav className="blog-footer-links">
          <Link to="/">Home</Link>
          <Link to="/blog">Guides</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/accessibility-statement">Accessibility</Link>
        </nav>
        <p className="blog-copyright">© 2026 Samora AI, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
