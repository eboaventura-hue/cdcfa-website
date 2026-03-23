# CDC Inc. — Cloudflare Pages via Git

## 📋 Dashboard Settings (CRITICAL)

When connecting via GitHub/GitLab, configure these EXACT settings in Cloudflare:

```
Framework preset:      None
Build command:         npm run deploy
Build output directory: .
Root directory:        /  (or wherever cdcfa-site is in your repo)
Node.js version:       18
```

## 🔑 Environment Variables (Settings → Environment variables)

Add this variable in BOTH Production and Preview:
- Name:  GOOGLE_SERVICE_ACCOUNT
- Value: (paste the full service account JSON)
- Check: Encrypt

---

## 📁 Repo structure expected by Cloudflare

Push ONLY the contents of cdcfa-site/ to your repo root:

```
your-repo/
├── index.html
├── package.json          ← Cloudflare runs: npm run deploy
├── wrangler.toml
├── _routes.json
├── _headers
├── .gitignore
├── app.js
├── styles.css
├── functions/
│   └── submit-application.js
├── images/
│   └── *.jpg / *.png
├── waitlist_fillable_EN.pdf
└── wait_list_app_2024_spanish__2_.pdf
```

## 🚀 Quick Start

```bash
# 1. Create a new repo on GitHub (e.g. cdcfa-site)

# 2. Extract this ZIP and push to GitHub
unzip cdcfa-final.zip
cd site_work/cdcfa-site
git init
git add .
git commit -m "Initial deploy"
git remote add origin https://github.com/YOUR_USER/cdcfa-site.git
git push -u origin main

# 3. In Cloudflare Dashboard:
#    Workers & Pages → Create → Pages → Connect to Git
#    Select your repo → Configure build settings as above → Deploy
```

## ⚙️ How the form submission works

1. User fills the Apply Now form → clicks Submit
2. Browser POSTs JSON to /submit-application (Cloudflare Pages Function)
3. Function authenticates with Google via service account JWT
4. Generates PDF + DOCX with form data
5. Uploads both files to Google Drive folder: 10LPRmu3Th3undReIjBURPoD0EoprQzn
6. Files named: FamilyName_YYYY-MM-DD_EN.pdf / .docx

## 📞 Support
registration@cdcfa.org · (310) 518-0776
