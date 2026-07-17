# Samora Legal

Disability benefits eligibility screening and intake platform. Deployed on Cloudflare Pages at [samoracare.com](https://samoracare.com).

## Structure

```
index.html              Landing page with 11-step eligibility form
get-started/            Multi-step intake form (8 screens)
privacy-policy/         Privacy policy
terms-and-conditions/   Terms of use
accessibility-statement/ Accessibility commitment
404.html                Custom 404 page
sitemap.xml             XML sitemap
robots.txt              Crawler directives
llms.txt                AI crawler context
```

## Integrations

- **Google Sheets** via Apps Script for form submissions
- **n8n** workflow automation (columns J-P in Get Started sheet)
- **Google Analytics** (G-MZ73CHC4VW)
- **Meta Pixel** (1549812953598958)

## Deployment

Push to `main` triggers Cloudflare Pages deployment automatically.
