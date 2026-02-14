# Deployment Fix – URLs Not Loading

## What's going on

1. **Deployment Protection** – Your project has Deployment Protection enabled. `*.vercel.app` URLs return **401 Unauthorized** unless you're logged in.

2. **Standard Protection** – If you see "Standard Protection", it protects all `*.vercel.app` URLs. Only **Production Custom Domains** are public. So you must either add a custom domain or disable protection completely.

3. **Wrong alias** – The alias `personal-portfolio-website-rouge-xi.vercel.app` serves a different project, not your current portfolio.

## Fix: Choose one of these

### Option A: Add a custom domain (recommended)

With Standard Protection, **custom domains are always public**. Add your domain and it will work even if protection stays on.

1. Go to [vercel.com](https://vercel.com) → **my-portfolio-fromlovable** → **Settings** → **Domains**.
2. Click **Add** and enter your domain (e.g. `sampede.com` or `portfolio.sampede.com`).
3. Add the DNS records Vercel shows (CNAME or A record) at your DNS provider.
4. After propagation (a few minutes to hours), your site will load at that domain.

### Option B: Disable protection completely

1. Go to [vercel.com](https://vercel.com) → **my-portfolio-fromlovable** → **Settings** → **Deployment Protection**.
2. Under **Protection Level**, select **None** (not Standard Protection).
3. Also check **Team Settings** → **Deployment Protection** – set the default to **None** so it doesn't override project settings.
4. Save and wait a couple of minutes for changes to apply.
5. Try the URL in an **incognito/private window** (to avoid cached auth).

### Option C: Use Legacy "Only Preview Deployments"

If available, choose **(Legacy) Only Preview Deployments**. That keeps production URLs public while protecting previews.

## URLs to try

- **Project URL:** https://my-portfolio-fromlovable-sams-projects-139fdd6a.vercel.app
- **Latest deployment:** https://my-portfolio-fromlovable-f24evzlzd-sams-projects-139fdd6a.vercel.app

## Troubleshooting

- **Still 401?** Try incognito so cached Vercel auth cookies don't apply.
- **Different project?** Confirm you're in **my-portfolio-fromlovable**, not another project.
- **Team vs project:** Ensure both Team and Project Deployment Protection settings are configured as above.
