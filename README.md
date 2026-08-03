# SamoraCare

Disability benefits marketing site and eligibility screener.

## Project structure

```
├── src/pages/Landing.tsx      # Marketing landing page ("/")
├── src/pages/GetStarted.tsx   # 8-step eligibility screener ("/get-started")
├── public/assets/             # Logo, photography
└── public/_redirects          # SPA fallback for Cloudflare Pages
```

## Tech stack

- React + TypeScript + Vite, client-side routed with React Router
- No backend: the screener's final step only shows a local confirmation
  screen. It is **not** wired to any lead-capture backend, analytics, or CRM.

## Local development

```
npm install
npm run dev
```

## Deployment (Cloudflare Pages)

This replaces the previous static-HTML build of this repo. If the Cloudflare
Pages project for this repo still has build settings from the old static
site, update them in the Cloudflare dashboard:

- Build command: `npm run build`
- Build output directory: `dist`

`public/_redirects` is included so client-side routes (e.g. `/get-started`)
resolve correctly on direct load/refresh.

## Known gaps vs. the previous production site

The previous version of this repo (static HTML) had integrations that this
rewrite does **not** carry over yet:

- Google Analytics (GA4) and Meta Pixel conversion tracking
- Intake form backend (Google Apps Script → Google Sheets → n8n)
- Privacy Policy, Terms and Conditions, Accessibility Statement pages
  (footer links to these were removed until the pages exist again)
- SEO infra: sitemap.xml, robots.txt, llms.txt, JSON-LD structured data

These need to be reconnected/rebuilt before this is a full replacement for
the previous production site.
