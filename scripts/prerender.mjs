import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDist = join(root, '.ssr-dist');

const { ROUTES, render } = await import(join(ssrDist, 'prerender.js'));
const template = await readFile(join(dist, 'index.html'), 'utf8');

for (const route of ROUTES) {
  // Cloudflare's Email Address Obfuscation rewrites addresses in served HTML
  // into /cdn-cgi/l/email-protection links that only resolve once its script
  // runs. On these pages the support address has to survive a fetch that never
  // executes JavaScript, since that is how carriers vet an SMS campaign.
  // email_off is Cloudflare's documented opt-out for a region of the page.
  const html = `<!--email_off-->${render(route.path, route.element)}<!--/email_off-->`;

  const page = template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      '</head>',
      `  <meta name="description" content="${route.description}" />\n` +
        `    <link rel="canonical" href="https://samoracare.com${route.path}" />\n  </head>`,
    )
    // createRoot replaces this on boot, so the markup only has to satisfy
    // whatever reads the page without running scripts.
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  // Written flat as <route>.html rather than <route>/index.html. Pages serves
  // the former at /<route> with a 200, but 308-redirects to a trailing slash
  // for the latter, and these URLs get submitted to carriers that may not
  // follow redirects.
  const outFile = join(dist, `${route.path.replace(/^\//, '')}.html`);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page);
  console.log(`prerendered ${route.path} (${html.length} bytes of markup)`);
}

await rm(ssrDist, { recursive: true, force: true });
