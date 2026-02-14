# Deploy to Netlify (Alternative to Vercel)

Netlify avoids the deployment protection issues. Here's how to deploy:

## Option 1: Drag and drop (quickest)

1. Run `npm run build` in your project
2. Go to [app.netlify.com](https://app.netlify.com)
3. Sign up or log in (free)
4. Drag and drop your **dist** folder onto the Netlify dashboard
5. You'll get a live URL immediately (e.g. `random-name-123.netlify.app`)

## Option 2: Netlify CLI

1. Install: `npm install -g netlify-cli`
2. From your project folder: `netlify login`
3. Deploy: `netlify deploy --prod`
4. When prompted, create a new site or link to existing
5. Build command: `npm run build`
6. Publish directory: `dist`

## Option 3: Connect to Git

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → Add new site → Import from Git
3. Connect your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy – Netlify will auto-deploy on every push

---

The `netlify.toml` in this project is already configured for the SPA (all routes → index.html).
