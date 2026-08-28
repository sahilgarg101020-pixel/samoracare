import type { CoverPattern } from '../data/blogPosts';
import './BlogCover.css';

/**
 * Generated artwork for an article, in place of a photograph.
 *
 * Twenty articles would otherwise need twenty commissioned images. These are
 * drawn entirely in CSS from the brand palette and the site's existing dot
 * motif, so they cost nothing to load, never 404, and stay on-brand. The
 * pattern cycles by article so no two neighbouring cards look alike.
 */
export default function BlogCover({
  pattern,
  number,
  category,
  size = 'card',
}: {
  pattern: CoverPattern;
  number: string;
  category: string;
  size?: 'card' | 'banner';
}) {
  return (
    <div className={`cover cover--${size}`} data-pattern={pattern}>
      <div className="cover-texture" aria-hidden="true" />
      <span className="cover-number" aria-hidden="true">
        {number}
      </span>
      <span className="cover-category">{category}</span>
    </div>
  );
}
