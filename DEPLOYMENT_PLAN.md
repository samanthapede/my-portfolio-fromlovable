# Deployment Plan: samanthapede.com

This plan walks you through deploying your portfolio to Vercel, connecting your domain (www.samanthapede.com), and hosting images on Cloudflare and Dreamhost.

---

## Phase 1: Deploy to Vercel

### 1.1 Push your code to GitHub

- Make sure your repo is up to date:  
  `git add .` → `git commit -m "Ready for deployment"` → `git push`
- Repo: `https://github.com/samanthapede/my-portfolio-fromlovable`

### 1.2 Create a Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in (use “Continue with GitHub” if you prefer).
2. Click **Add New…** → **Project**.
3. Import your repo: `samanthapede/my-portfolio-fromlovable`.
4. Vercel will detect **Vite**:
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)
5. Click **Deploy**.
6. Wait for the build. You’ll get a URL like `your-project-xxx.vercel.app`.

### 1.3 SPA routing (already set up)

The repo includes a `vercel.json` that sends all routes to `index.html` so React Router works (e.g. `/work`). No extra steps needed for client-side routes.

---

## Phase 2: Connect your domain (www.samanthapede.com)

### 2.1 Add the domain in Vercel

1. In the Vercel dashboard, open your project.
2. Go to **Settings** → **Domains**.
3. Enter **www.samanthapede.com** and add it.
4. Vercel will show the DNS records you need.

### 2.2 Configure DNS at your domain registrar

Where you bought **samanthapede.com** (e.g. Dreamhost, Cloudflare, Namecheap), open the DNS settings and add what Vercel asks for.

**Typical setup:**

| Type | Name   | Value                    | TTL  |
|------|--------|---------------------------|------|
| CNAME | www   | `cname.vercel-dns.com`    | 3600 |

- **If Vercel shows an A record** for the root domain (`samanthapede.com`), add that too if you want the non-www version to point to Vercel.

### 2.3 Optional: Root domain (samanthapede.com)

- To have **samanthapede.com** (no www) also open the site, add **samanthapede.com** as a domain in Vercel and add the A record they provide (often `76.76.21.21`).
- Or use a redirect: **samanthapede.com** → **www.samanthapede.com** (many registrars have a “Redirect” or “URL forwarding” option).

### 2.4 Wait and verify

- DNS can take from a few minutes up to 48 hours.
- In Vercel → **Domains**, you’ll see a checkmark when the domain is valid and SSL is issued (HTTPS).

---

## Phase 3: Image hosting (Cloudflare + Dreamhost)

You’ll host images outside the repo and reference them by URL so the site stays fast and the repo small.

### 3.1 Choose where to host which images

- **Cloudflare:** Good for images you want to optimize, resize, or cache at the edge (e.g. **Cloudflare Images** or **R2** + a public URL).
- **Dreamhost:** Use for images on existing Dreamhost hosting (e.g. a subdomain or folder like `images.samanthapede.com` or `www.samanthapede.com/images` if the main site later points to Dreamhost for something else).

Practical split:

- **Cloudflare:** New portfolio images, project screenshots, headshot, logos (if you want transforms/CDN).
- **Dreamhost:** Any images you already have on Dreamhost or want to keep there.

### 3.2 Option A: Cloudflare Images (recommended for flexibility)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Images** (or **Images & Media**).
2. Create an account/namespace if needed.
3. Upload images; Cloudflare gives you URLs like:  
   `https://imagedelivery.net/<account_hash>/<image_id>/public`
4. (Optional) Use variants (e.g. `thumbnail`, `medium`) in the URL for different sizes.

**In the code:** Replace local paths with these URLs, e.g. in components:

- Headshot: use the Cloudflare URL instead of `import headshot from "@/assets/headshot.jpg"`.
- Testimonials / logos: same idea (e.g. a constant or config with full URLs).

### 3.3 Option B: Cloudflare R2 (bucket for “raw” files)

1. In Cloudflare → **R2** → Create a bucket (e.g. `portfolio-assets`).
2. Enable public access or use a custom domain (e.g. `assets.samanthapede.com`) so each object has a URL.
3. Upload images; use the object URLs in your app.

Good if you want simple storage and don’t need built-in image resizing.

### 3.4 Option C: Dreamhost

1. Upload images to your Dreamhost hosting (e.g. via FTP or File Manager) into a folder like `images` or `portfolio`.
2. Get the public URL (e.g. `https://www.samanthapede.com/images/headshot.jpg` or a subdomain).
3. Use those full URLs in the app.

**Tip:** If the main site is on Vercel, you can still serve images from Dreamhost by using that domain (or a subdomain) only for image URLs.

### 3.5 Use a single base URL in code (optional)

To switch between Cloudflare and Dreamhost without editing many files, define a base URL and build paths in one place, e.g.:

```ts
// src/lib/assets.ts or in env
export const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE ?? '';
// Then: `${IMAGE_BASE}/headshot.jpg`, etc.
```

Set `VITE_IMAGE_BASE` in Vercel (Environment Variables) to your Cloudflare or Dreamhost base URL when you’re ready.

---

## Phase 4: Before and after going live

### 4.1 Before switching the domain to Vercel

- [ ] Test the Vercel preview URL (all pages, project modal, Calendly, dark mode).
- [ ] Add and verify the domain in Vercel (Phase 2).
- [ ] (Optional) Move images to Cloudflare/Dreamhost and replace paths (Phase 3).
- [ ] Set any env vars in Vercel (e.g. `VITE_IMAGE_BASE`) and redeploy if needed.

### 4.2 When you’re ready to “go live”

- [ ] Point **www** (and optionally root) DNS to Vercel (Phase 2.2).
- [ ] Wait for DNS and SSL (Phase 2.4).
- [ ] Visit **https://www.samanthapede.com** and do a final check.
- [ ] If the old site was elsewhere, remove or redirect the old hosting so only Vercel serves the portfolio.

### 4.3 After launch

- **Updates:** Push to GitHub; Vercel will redeploy automatically.
- **Preview URLs:** Every push can get a preview URL so you can review before merging.
- **Analytics:** Optional: add Vercel Analytics or another script in `index.html` or a layout component.

---

## Quick reference

| Step | Where | Action |
|------|--------|--------|
| Deploy app | Vercel | Import GitHub repo → Deploy |
| SPA routes | Repo | Handled by `vercel.json` |
| Domain | Vercel + DNS | Add www.samanthapede.com → CNAME to Vercel |
| Images | Cloudflare / Dreamhost | Upload → use full URLs in code (or `VITE_IMAGE_BASE`) |

---

## Need help?

- [Vercel – Deploying](https://vercel.com/docs/deployments/overview)
- [Vercel – Custom domains](https://vercel.com/docs/projects/domains)
- [Cloudflare Images](https://developers.cloudflare.com/images/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)

Once your first Vercel deploy is done, you can do Phase 2 (domain) and Phase 3 (images) in any order that fits your schedule.
