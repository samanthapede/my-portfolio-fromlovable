# How to deploy this site (simple steps)

Two ways to get your site live on Vercel. Use **Option A** if your code is already on GitHub. Use **Option B** to deploy straight from your computer without pushing.

---

## Option A: Deploy from GitHub (recommended)

### Step 1: Push your code to GitHub

1. Open **Terminal** (Mac) or **Command Prompt** (Windows).
2. Go to your project folder and push:

```bash
cd /Users/samanthapede/my-portfolio-fromlovable
git push origin main
```

- If it asks for a username/password, use your GitHub username and a **Personal Access Token** (not your GitHub password). Create one here: https://github.com/settings/tokens — enable "repo" and copy the token.
- If you get "nothing to push", your code is already on GitHub — go to Step 2.

### Step 2: Deploy on Vercel

1. Go to **https://vercel.com** and sign in (choose **Continue with GitHub**).
2. Click the **"Add New..."** button (top right) → **"Project"**.
3. You’ll see a list of your GitHub repos. Find **my-portfolio-fromlovable** and click **"Import"** next to it.
4. On the next screen, leave the settings as they are:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**.
6. Wait 1–2 minutes. When it’s done, click **"Visit"** to see your live site.

**Later:** Every time you run `git push origin main`, Vercel will automatically deploy the latest version.

---

## Option B: Deploy from your computer (no GitHub push)

You can deploy directly from the project folder without pushing to GitHub.

1. Open **Terminal** (or Cursor’s terminal) and go to the project:

```bash
cd /Users/samanthapede/my-portfolio-fromlovable
```

2. Run:

```bash
npx vercel
```

3. First time only:
   - It will say "Log in to Vercel". Press Enter — your browser will open.
   - Log in to Vercel (with GitHub or email).
   - Return to the terminal.
4. It will ask:
   - **Set up and deploy?** → **Y** (Yes)
   - **Which scope?** → pick your account (press Enter)
   - **Link to existing project?** → **N** (No) the first time
   - **Project name?** → press Enter to use the folder name (or type a name)
   - **Directory?** → press Enter (current directory)
5. Vercel will build and give you a URL like `https://my-portfolio-fromlovable-xxx.vercel.app`. Open that link to see your site.

**To deploy updates later:** Run `npx vercel` again from the same folder. To go live on the same URL every time, run `npx vercel --prod` after the first deploy.

---

## If something goes wrong

**"Build failed" on Vercel**

- In the Vercel dashboard, open your project → **Deployments** → click the failed deployment → open the **Building** log.
- Often it’s a missing dependency or wrong Node version. Share the error message and we can fix it.

**"I don’t see my repo on Vercel"**

- Vercel only lists repos it can access. When you signed in with GitHub, did you grant access to your account or to the org that owns the repo? Try **Settings** → **Git Integrations** and make sure the right GitHub account is connected.

**"Page not found" when I click a link (e.g. /work)**

- The project already has a `vercel.json` that fixes this. If you deployed before that file was added, push again (Option A) or run `npx vercel --prod` again (Option B) so the new config is used.

---

## Quick checklist

- [ ] Code is in the folder: `my-portfolio-fromlovable`
- [ ] Option A: Pushed to GitHub (`git push origin main`) then imported and deployed on vercel.com  
  **OR**  
  Option B: Ran `npx vercel` (and logged in if needed) in that folder
- [ ] Opened the URL Vercel gave you and the site loads

You’re done when you can open the Vercel URL and see your portfolio.
