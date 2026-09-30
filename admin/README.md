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

## 🔑 GitHub OAuth Setup for Vercel

Because this site is hosted on Vercel, it uses standard GitHub OAuth authentication:

### Step 1: Create a GitHub OAuth App
1. Go to your GitHub account: **Settings** &rarr; **Developer Settings** &rarr; **OAuth Apps** &rarr; **New OAuth App**.
2. Fill in the fields:
   - **Application name**: `The Fifth Wall CMS`
   - **Homepage URL**: `https://thefifthwall.pk` (or your Vercel deployment URL)
   - **Authorization callback URL**:
     - If using the public proxy: `https://decap-cms-oauth.vercel.app/callback`
     - Or if using your own Vercel API: `https://your-site.vercel.app/api/callback`
3. Click **Register application**.
4. Generate and copy your **Client Secret** and **Client ID**.

---

### Step 2: Configure Environment Variables in Vercel (Recommended)
If using your site's native `/api/auth` and `/api/callback`:
1. In your **Vercel Project Dashboard**, go to **Settings** &rarr; **Environment Variables**.
2. Add the following:
   - `GITHUB_CLIENT_ID` = `your_github_client_id`
   - `GITHUB_CLIENT_SECRET` = `your_github_client_secret`
3. In `admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: hassankhan1902-spec/thefifthwall
     branch: main
     base_url: https://thefifthwall.pk # (or your Vercel domain)
     auth_endpoint: api/auth
   ```

---

### Step 3: Or Use the Public Decap OAuth Proxy
If you prefer not setting Vercel environment variables:
1. `admin/config.yml` is already configured with:
   ```yaml
   backend:
     name: github
     repo: hassankhan1902-spec/thefifthwall
     branch: main
     base_url: https://decap-cms-oauth.vercel.app
     auth_endpoint: auth
   ```
2. When registering your GitHub OAuth app, set the **Authorization callback URL** to:
   `https://decap-cms-oauth.vercel.app/callback`

---

## 💻 Local Offline Testing
To test Decap CMS locally without committing directly to GitHub:
1. Run Decap Proxy Server:
   ```bash
   npx decap-server
   ```
2. Open `http://localhost:3000/admin/`. Because `local_backend: true` is configured in `config.yml`, Decap will connect to your local file system directly.
