/**
 * Cloudflare Images integration.
 *
 * 1. Add your account hash to .env.local: VITE_CLOUDFLARE_IMAGES_ACCOUNT=your_hash
 * 2. In Cloudflare Dashboard → Images, copy each image ID and paste below.
 * 3. Variants: thumbnail (200×200), logo (200×200), avatar (256×256), card (800×600), full (1200×900)
 */

const account = import.meta.env.VITE_CLOUDFLARE_IMAGES_ACCOUNT as string | undefined;

/** Map of image key → Cloudflare image ID. Get IDs from Cloudflare Dashboard → Images. */
export const cloudflareImageIds: Record<string, string> = {
  // Hero
  "hand-icon": "8b259c82-6476-460c-034c-e04b641bd700",
  // About
  headshot: "590d5758-de6e-48b3-7547-b213044e0500",
  // Testimonials (avatar variant)
  "testimonial-victor": "abab3af1-b95c-41e5-2db6-6d6a54c55000",
  "testimonial-cassia": "bb4161b1-04cd-4acd-fc24-21e3a90e2700",
  "testimonial-zack": "b29cd707-749c-4596-ecfd-fc7b6d40e900",
  "testimonial-emily": "be3ac77e-a932-43ff-e114-ab9536a1ff00",
  "testimonial-josh": "68af6b9a-69e7-4399-8426-b879cf947200",
  "testimonial-jenn": "1672411d-17a1-4c34-e665-e09661822200",
  "testimonial-adam": "72a38a97-f71c-44ec-66d8-5e7f0f76ff00",
  "testimonial-noah": "199c7db0-e099-4886-96ec-347d463c1400",
  // Logos (logo variant)
  "logo-shopify": "f2cf0131-b6b3-4a83-40e7-cf9852a3c400",
  "logo-dribbble": "77167ff0-4c3b-49cc-faea-6e2a88b4ed00",
  "logo-vmware": "f6adcc0b-201a-4472-a561-4b755608c600",
  "logo-pivotal": "e555cdf9-cbf2-4da9-7980-54dbf22e2200",
  "logo-chegg": "ddf0325e-aee7-409a-772f-c121cfe9c400",
  "logo-healthtalk-ai": "00898fbb-2776-43b8-0257-58e2efed8b00",
  "logo-vizient": "4e026484-9a1e-4705-ffa5-d61f2a2f5400",
  "logo-hexarad": "4394ccd8-ac23-4b96-87ed-0005df523300",
  "logo-hipp": "7665346b-6cfe-4d7f-1500-94c6dfee9c00",
  "logo-augintel": "841c4d26-3b9b-433d-8e72-f057fb5e1600",
  // Project images (card for homepage, full for detail)
  "clinical-compliance-reports-side-drawer": "b6642bb0-cd91-43e6-ea55-4a0846ca4e00",
  "order-fulfillment-page-image-blue-cropped": "0341c0fc-03bb-4eac-1ce8-f3ccea693600",
  "order-fulfillment-page-image": "2726bce0-37f6-4400-4a49-e58579716800",
  "inventory-states-preview": "abafe7f2-617e-4975-6f3d-51f081f44f00",
  "inventory-states-overview": "e7a12a06-4560-48cf-2476-e04798774600",
};

/** Returns Cloudflare URL if configured, otherwise null. */
export function cfImage(key: string, variant = "public"): string | null {
  if (!account?.trim()) return null;
  const id = cloudflareImageIds[key]?.trim();
  if (!id) return null;
  return `https://imagedelivery.net/${account}/${id}/${variant}`;
}

/** Use Cloudflare URL when available, otherwise fallback. */
export function imageUrl(key: string, variant: string, fallback: string): string {
  return cfImage(key, variant) ?? fallback;
}
