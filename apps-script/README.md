# Lead intake Apps Script

Receives leads from `samoracare.com/api/lead`, writes them to the spreadsheet,
and emails the team. Replaces the n8n step.

`Code.gs` is the source of truth. Edit it here, then paste into the Apps Script
editor, so the deployed script and the repo do not drift.

## Deploy

1. Open the leads Google Sheet → **Extensions → Apps Script**
2. Replace everything in `Code.gs` with this file's contents → save
3. Run `selfTest` once. It will ask for permission to use the sheet and to send
   mail as you — that prompt is expected, and is why step 5 must run as *Me*
4. Check a row appeared and the email arrived
5. **Deploy → New deployment → Web app**
   - Description: `lead intake`
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the `/exec` URL

"Anyone" is required because Cloudflare calls this without a Google identity.
Set a shared token so public does not also mean open.

## Point the site at it

Put the `/exec` URL in `wrangler.toml` as `LEAD_ENDPOINT`, commit, and the next
deploy uses it. Nothing else in the site changes.

## Shared token (recommended)

Without one, anyone who learns the URL can post fake leads and trigger emails.

1. Apps Script → **Project Settings → Script properties → Add**
   `SHARED_TOKEN` = a long random string
2. Add the same value to `wrangler.toml` as `LEAD_TOKEN`
3. The Worker sends it with every payload; the script rejects anything without it

Until `SHARED_TOKEN` exists the script accepts unauthenticated posts, so these
two steps can be done in either order without dropping leads.

## Re-deploying after an edit

Apps Script keeps serving the old version until you publish a new one:
**Deploy → Manage deployments → edit → Version: New version → Deploy.** The URL
stays the same. Editing the code alone changes nothing that is live.

## Things worth knowing

- **Two tabs**, created automatically on first lead of each kind: `Screener
  leads` and `Register leads`. The forms ask different questions, so one shared
  tab would be mostly blank cells.
- **Add columns at the end only.** Rows are written by column order.
- **Duplicate protection** is by `lead_id`. The Worker retries three times, so
  without it a lost response would mean a second row and a second email.
- **Acknowledgement emails to claimants are off.** `SEND_ACKNOWLEDGEMENT` at the
  top of `Code.gs` turns them on — read the wording first, since it goes to real
  people.
- **Mail quota** is 100 recipients/day on a consumer Gmail account, 1,500 on
  Workspace. Turning acknowledgements on doubles the usage per lead.
- **Failures are safe.** A non-ok response makes the Worker retry, and the lead
  stays flagged `delivered: false` in the `LEADS` KV namespace either way, so
  nothing is lost even if this script is broken.
