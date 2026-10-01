# Decap CMS &mdash; The Fifth Wall Studio (Vercel Edition)

This directory configures **Decap CMS** using a standard **GitHub OAuth backend** designed for static sites deployed on **Vercel**.

---

## 📁 Architecture Overview

```text
├── admin/
│   ├── config.yml      # CMS schema, collections, fields, and GitHub OAuth config
│   ├── index.html      # Decap CMS web application entry point (pure Decap script)
│   └── README.md       # Setup and authentication documentation
├── api/
│   ├── auth.js         # Native Vercel Serverless Function to initiate GitHub OAuth
│   └── callback.js     # Native Vercel Serverless Function to exchange token with GitHub
├── content/
│   └── blog/           # Markdown (.md) articles committed by Decap CMS
├── images/
│   └── uploads/        # Uploaded cover images and article media
└── vercel.json         # SPA rewrites for /admin/* on Vercel
```

---

## 🔑 GitHub OAuth Setup (PKCE Flow)

The CMS uses GitHub's native **PKCE (Proof Key for Code Exchange)** authentication flow. This bypasses external third-party OAuth proxies completely, communicating directly between your browser and GitHub.

### GitHub OAuth App Settings:
1. In your GitHub account, go to **Settings** &rarr; **Developer Settings** &rarr; **OAuth Apps** &rarr; open your OAuth app (`Ov23liAe14yMQXRZJ3nk`).
2. Verify the following fields:
   - **Homepage URL**: `https://www.thefifthwallarchitecture.com`
   - **Authorization callback URL**:
     Set this directly to your admin dashboard URL:
     ```
     https://www.thefifthwallarchitecture.com/admin/
     ```
3. Save changes.

---

## 💻 Local Offline Testing
To test Decap CMS locally without committing directly to GitHub:
1. Run Decap Proxy Server:
   ```bash
   npx decap-server
   ```
2. Open `http://localhost:3000/admin/`. Because `local_backend: true` is configured in `config.yml`, Decap will connect to your local file system directly.
