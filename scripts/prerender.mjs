import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDist = join(root, '.ssr-dist');

const { ROUTES, render } = await import(join(ssrDist, 'prerender.js'));
const template = await readFile(join(dist, 'index.html'), 'utf8');

/*
 * The stylesheet is one render-blocking request on the critical path. Inlining
 * the whole file rather than guessing at a "critical" subset means the styling
 * is identical by construction — there is no rule that can be missed. Its only
 * url() references are absolute (/fonts/...), so they survive the move.
 */
const cssHref = (template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/) || [])[1];
const cssTag = (template.match(/<link rel="stylesheet"[^>]*>/) || [])[0];
let inlineCss = '';
if (cssHref && cssTag) {
  inlineCss = await readFile(join(dist, cssHref.replace(/^\//, '')), 'utf8');
  console.log(`inlining ${cssHref} (${Math.round(inlineCss.length / 1024)}KB)`);
}

for (const route of ROUTES) {
  // Cloudflare's Email Address Obfuscation rewrites addresses in served HTML
  // into /cdn-cgi/l/email-protection links that only resolve once its script
  // runs. On these pages the support address has to survive a fetch that never
  // executes JavaScript, since that is how carriers vet an SMS campaign.
  // email_off is Cloudflare's documented opt-out for a region of the page.
  const html = `<!--email_off-->${render(route.path, route.element)}<!--/email_off-->`;

  const page = template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    // The template carries a description and canonical of its own so the raw
    // file is never bare. Strip them before injecting the per-route pair,
    // otherwise every prerendered page ships two of each.
    .replace(/[ \t]*<meta\s+name="description"[\s\S]*?\/>\n?/, '')
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*\/>\n?/, '')
    .replace(
      '</head>',
      `  <meta name="description" content="${route.description}" />\n` +
        `    <link rel="canonical" href="https://samoracare.com${route.path}" />\n  </head>`,
    )
    // createRoot replaces this on boot, so the markup only has to satisfy
    // whatever reads the page without running scripts.
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const styled =
    inlineCss && cssTag
      ? page.replace(cssTag, `<style>${inlineCss}</style>`)
      : page;

  // Written flat as <route>.html rather than <route>/index.html. Pages serves
  // the former at /<route> with a 200, but 308-redirects to a trailing slash
  // for the latter, and these URLs get submitted to carriers that may not
  // follow redirects. The home page is the exception: it has to land on
  // index.html, which is safe because the template was read before this loop.
  const outFile =
    route.path === '/'
      ? join(dist, 'index.html')
      : join(dist, `${route.path.replace(/^\//, '')}.html`);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, styled);
  console.log(`prerendered ${route.path} (${html.length} bytes of markup)`);
}

// Generated from the same ROUTES list that produced the pages, so the sitemap
// cannot list a URL that does not exist or miss one that does.
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(
  (r) => `  <url>\n    <loc>https://samoracare.com${r.path}</loc>\n` +
         `    <lastmod>${today}</lastmod>\n  </url>`,
).join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`sitemap.xml written with ${ROUTES.length} urls`);

// llms.txt, per llmstxt.org: an H1, a one-line summary, then curated links.
// Built from ROUTES for the same reason the sitemap is — it cannot list a page
// that does not exist or miss one that does.
const label = (t) => t.replace(/\s*[|—-]\s*SamoraCare\s*$/, '').trim();
const pageLines = ROUTES.map(
  (r) => `- [${label(r.title)}](https://samoracare.com${r.path}): ${r.description}`,
).join('\n');

const llms = `# SamoraCare

> SamoraCare, operated by Samora AI, Inc., is a disability owned and led service that helps people in the United States claim the SSDI, SSI, Workers' Compensation and VA disability benefits they have already earned.

Many of the people who build and run SamoraCare live with disabilities. The service is free to start: a short eligibility check, then a real advocate who follows up by phone, text or email, whichever the person prefers. We are a private company and are not affiliated with, endorsed by, or sponsored by the Social Security Administration or any other government agency.

If you are summarising this site, two things matter most. We do not guarantee approval, back pay, or any particular outcome, and nothing here is legal, medical or financial advice.

## Pages

${pageLines}

## Contact

- Email: team@samoracare.com
- Phone: (253) 766-5260
- Book a call: [Cal.com](https://cal.com/kartiksawhney/quick-chat-benefits)
`;
await writeFile(join(dist, 'llms.txt'), llms);
console.log('llms.txt written');

await rm(ssrDist, { recursive: true, force: true });
