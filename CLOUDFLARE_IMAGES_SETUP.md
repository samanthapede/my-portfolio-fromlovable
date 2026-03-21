# Cloudflare Images Setup Guide

This guide walks you through using **Cloudflare Images** to host and serve optimized images with on-the-fly resizing. Use this if you want Cloudflare to handle image delivery and resizing at the edge.

---

## Next steps (images already uploaded)

1. **Get your account hash**  
   In Cloudflare Dashboard → Images, open any image. The URL looks like:  
   `https://imagedelivery.net/YOUR_ACCOUNT_HASH/image-id/public`  
   Copy the part between `imagedelivery.net/` and the first `/`.

2. **Add to `.env.local`**  
   ```
   VITE_CLOUDFLARE_IMAGES_ACCOUNT=your_account_hash
   ```

3. **Get each image ID**  
   In Cloudflare Dashboard → Images, click an image and copy its ID.

4. **Fill in `src/lib/cloudflare-images.ts`**  
   Paste each image ID into the matching key in `cloudflareImageIds`. The keys map to:
   - `hand-icon` — Hero wave icon
   - `headshot` — About section photo
   - `testimonial-victor`, `testimonial-cassia`, etc. — Testimonial avatars
   - `logo-shopify`, `logo-dribbble`, etc. — Company logos
   - `clinical-compliance-reports-side-drawer`, etc. — Project images

5. **Restart dev server**  
   Run `npm run dev` so env changes load.

Until IDs are filled in, the site uses local images. Add IDs gradually; each one switches that image to Cloudflare.

---

## Option A: Cloudflare Images (On-the-fly resizing)

Cloudflare Images lets you upload images and serve them with URL parameters for automatic resizing—great for responsive images and different screen sizes.

### 1. Create a Cloudflare account and add Images

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in (or create an account).
2. Navigate to **Images** in the left sidebar (or **Images & Media**).
3. Enable Cloudflare Images if prompted. The free tier includes **100,000 images/month**.

### 2. Upload your images

1. Click **Upload images** or drag-and-drop.
2. Upload your portfolio assets from:
   - `public/assets/projects/` (project screenshots, posters)
   - `src/assets/` (headshot, testimonials, logos)
3. After upload, Cloudflare gives each image a URL like:
   ```
   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/public
   ```

### 3. Use variants for different sizes

Cloudflare Images supports **variants**—predefined sizes you can request via URL:

1. Go to **Images** → **Variants**.
2. Create variants, e.g.:
   - `thumbnail` — 200×200, fit
   - `card` — 800×600, fit (for project cards)
   - `full` — 1200×900, fit (for detail pages)

3. Use in URLs:
   ```
   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/card
   ```

### 4. Update your code to use Cloudflare URLs

Create a config file for your image base URL:

```ts
// src/lib/images.ts
const CLOUDFLARE_ACCOUNT = "your-account-hash"; // From Cloudflare dashboard

export const imageUrl = (imageId: string, variant = "public") =>
  `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT}/${imageId}/${variant}`;
```

Then in `projects.ts` and components, replace paths like `/assets/projects/...` with `imageUrl("your-image-id", "card")`.

---

## Option B: Cloudflare in front of Vercel (Polish)

**Polish** automatically optimizes images when traffic passes through Cloudflare. This requires:

- Putting Cloudflare in front of your site (proxy mode)
- A **Cloudflare Pro plan** ($20/month) or higher—Polish is not available on Free

**Important:** Vercel [does not recommend](https://vercel.com/docs/integrations/external-platforms/cloudflare) using Cloudflare as a reverse proxy in front of Vercel. It can add latency, cause caching conflicts, and limit Vercel’s security features.

If you still want to use Polish:

1. Add your domain to Cloudflare.
2. Change nameservers at your registrar (Squarespace) from Vercel to Cloudflare.
3. In Cloudflare DNS, add:
   - **A** record: `@` → `76.76.21.21` (Vercel)
   - **CNAME** record: `www` → `cname.vercel-dns.com`
4. Enable **Proxy** (orange cloud) on both records.
5. Go to **Speed** → **Optimization** → **Image Optimization**.
6. Enable **Polish** (Lossy or Lossless).

---

## What’s already in place

Your project uses **build-time image optimization** via `vite-plugin-image-optimizer`:

- PNG, JPEG, and WebP are compressed during `npm run build`.
- Typical savings: ~40–75% on many images.
- No Cloudflare account required.
- Works with your current Vercel deployment.

This gives you immediate speed improvements. Cloudflare Images is optional if you want edge-based resizing or to offload image hosting.
