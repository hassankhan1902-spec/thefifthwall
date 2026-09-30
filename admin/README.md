# Decap CMS &mdash; The Fifth Wall Studio

This directory configures **Decap CMS** (formerly Netlify CMS), a free, open-source, Git-based Content Management System for your static architectural website.

---

## 📁 Architecture Overview

```text
├── admin/
│   ├── config.yml      # CMS schema, collections, fields, and backend config
│   ├── index.html      # Decap CMS web application entry point
│   └── README.md       # Setup and authentication documentation
├── content/
│   └── blog/           # Markdown (.md) articles committed by Decap CMS
└── images/
    └── uploads/        # Uploaded cover images and article media
```

---

## 🔑 Authentication Setup Options

Decap CMS requires authorization to commit new articles and images to your GitHub repository (`hassankhan1902-spec/thefifthwall`). Choose either of the two standard methods below:

### Option A: Netlify Identity + Git Gateway (Recommended & 100% Free)
If hosting your static site on **Netlify**:
1. In your Netlify dashboard for this site, go to **Site configuration** &rarr; **Identity**.
2. Click **Enable Identity**.
3. Under **Registration preferences**, select **Invite only** (so only you and trusted studio members can create author accounts).
4. Under **Services** &rarr; **Git Gateway**, click **Enable Git Gateway** (connects Netlify to your GitHub repo `hassankhan1902-spec/thefifthwall`).
5. In `admin/config.yml`, set:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```
6. Visit `https://your-site.com/admin/`, log in using your invite email, and start publishing!

---

### Option B: Direct GitHub Backend (via Decap OAuth Gateway or Cloudflare Worker)
If using direct GitHub authentication without Netlify:
1. Register a GitHub OAuth App in **GitHub Settings** &rarr; **Developer Settings** &rarr; **OAuth Apps**.
2. Deploy a free Decap OAuth server (e.g., using a free Cloudflare Worker, Vercel template, or Netlify function).
3. In `admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: hassankhan1902-spec/thefifthwall
     branch: main
     base_url: https://your-oauth-provider.com
     auth_endpoint: auth
   ```

---

### Option C: Local Offline Testing (Decap Local Backend)
To test Decap CMS locally without committing directly to GitHub:
1. Run Decap Proxy Server in your terminal:
   ```bash
   npx decap-server
   ```
2. Start a local web server (e.g. `python -m http.server 8000` or Live Server).
3. Open `http://localhost:8000/admin/`. Because `local_backend: true` is configured in `config.yml`, Decap will automatically connect to your local file system!

---

## 📝 Included Editorial Features

- **Visual Rich-Text Editor**: Compose headings (`H2`, `H3`), bold/italic formatting, architectural blockquotes, and lists visually or in raw markdown.
- **Cover Image Uploader**: Drag and drop images or select existing photos stored under `images/uploads/`.
- **SEO & Social Sharing Metadata**: Dedicated collapsible group for Meta Title, Meta Description, Canonical URL, Keywords, and Social Share Image.
- **Automatic Slugging**: Posts are saved as `YYYY-MM-DD-article-title.md` directly into `content/blog/`.
