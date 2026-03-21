/**
 * Cloudflare Stream video URLs.
 * MP4 downloads must be enabled per video (done via API or dashboard).
 */

const STREAM_CUSTOMER = "m0bg04f30urm642q";

/** Map of video key → Cloudflare Stream video UID */
const streamVideoIds: Record<string, string> = {
  "order-fulfillment-short-2": "bd6232485c3d3b0eea7e949ccb610dc4",
  "order-fulfillment-workflows": "0c811c1c3e5cbcd6c071955c139ac6da",
  "inventory-states-smaller": "260c1266571dda53a277d0d81bda3414",
};

/** Returns Cloudflare Stream MP4 URL if configured, otherwise null. */
export function streamVideo(key: string): string | null {
  const uid = streamVideoIds[key];
  if (!uid) return null;
  return `https://customer-${STREAM_CUSTOMER}.cloudflarestream.com/${uid}/downloads/default.mp4`;
}

/** Use Cloudflare Stream URL when available, otherwise fallback. */
export function videoUrl(key: string, fallback: string): string {
  return streamVideo(key) ?? fallback;
}
