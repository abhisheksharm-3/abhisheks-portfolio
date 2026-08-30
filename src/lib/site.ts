/** Canonical origin and author identity, shared by feeds, sitemaps, and structured data. */
// www is the origin Vercel serves; the apex 307s to it.
export const SITE_URL = "https://www.abhisheksan.com";

export const AUTHOR = {
  name: "Abhishek Sharma",
  email: "abhishek@abhisheksan.com",
  github: "https://github.com/abhisheksharm-3",
  linkedin: "https://linkedin.com/in/abhisheksan/",
  x: "https://x.com/iabhisheksan",
} as const;

/**
 * Chrome origin trial token for WebMCP, issued for https://www.abhisheksan.com
 * with subdomain matching. Public by design: it ships in the page head, and it is
 * bound to this origin. Expires 17 Nov 2026, when the trial ends.
 */
export const WEBMCP_ORIGIN_TRIAL_TOKEN =
  "Ar4jOY9Rt7nbr7HxZ8wMnNJufqEECpGKRKN3BzoUQZ2oQD2A2Gfo+aHStUTjXip8ExPpMLKNXYbvKMSe0L2pmwMAAABmeyJvcmlnaW4iOiJodHRwczovL3d3dy5hYmhpc2hla3Nhbi5jb206NDQzIiwiZmVhdHVyZSI6IldlYk1DUCIsImV4cGlyeSI6MTc5NDg3MzYwMCwiaXNTdWJkb21haW4iOnRydWV9";

/** Escapes the five XML entities. Feed titles and descriptions are author-written prose. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
