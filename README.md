# Samora Legal

Disability benefits eligibility screening and intake platform.

**Live:** [samoracare.com](https://samoracare.com)

## Overview

Samora Legal helps people determine if they qualify for Social Security Disability Insurance (SSDI) and other disability benefits through a free screening tool. Qualifying applicants are connected with vetted disability benefits attorneys.

## Project Structure

```
├── index.html                    # Landing page with eligibility screening form
├── get-started/                  # Multi-step intake form
├── privacy-policy/               # Privacy policy
├── terms-and-conditions/         # Terms of use
├── accessibility-statement/      # Accessibility commitment
├── 404.html                      # Custom error page
├── images/                       # Static assets
├── fonts/                        # General Sans typeface
├── sitemap.xml                   # XML sitemap
├── robots.txt                    # Crawler directives
└── llms.txt                      # AI crawler context
```

## Tech Stack

- **Hosting:** Cloudflare Pages
- **Backend:** Google Apps Script (form submissions to Google Sheets)
- **Automation:** n8n workflow integration
- **Analytics:** Google Analytics, Meta Pixel
- **Fonts:** General Sans (self-hosted)

## Deployment

Push to `main` triggers automatic deployment via Cloudflare Pages.

## License

Proprietary. All rights reserved.
