# CDC Inc. — Cloudflare Pages

## Environment Variables Required

| Variable | Where to get it |
|----------|----------------|
| `GOOGLE_SERVICE_ACCOUNT` | Service account JSON (already configured) |
| `RESEND_API_KEY` | Create free account at resend.com → API Keys |

## Setup RESEND_API_KEY (required for email)

1. Go to https://resend.com and create a free account
2. Add your domain `cdcfa.org` under Domains → Verify DNS records
3. Go to API Keys → Create API Key
4. In Cloudflare: Settings → Environment variables → Add `RESEND_API_KEY`

## Cloudflare Build Settings

| Field | Value |
|-------|-------|
| Build command | `npm run build` |
| Build output directory | `.` |
| Node.js version | `18` |

## What happens on form submit

1. Browser sends form data to `/submit-application`
2. Function builds 4 files: PDF EN, PDF ES, DOCX EN, DOCX ES
3. All 4 sent as email attachments to `digitalforms@cdcfa.org`
4. EN PDF + DOCX uploaded to Google Drive

## Google Drive Folder
https://drive.google.com/drive/folders/1zxZSkTIue0_wXhaeO7_94EwZmnqcQjuk
