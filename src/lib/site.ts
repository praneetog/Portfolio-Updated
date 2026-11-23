/**
 * Canonical site URL, single source of truth for metadata, sitemap, robots
 * and JSON-LD. Reads NEXT_PUBLIC_SITE_URL so switching to a custom domain
 * later only requires setting that env var in Vercel — no code changes.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://praneet-teal.vercel.app";
  return raw.replace(/\/+$/, "");
}

export const SITE_URL = getSiteUrl();
