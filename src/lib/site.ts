/** Canonical origin and author identity, shared by feeds, sitemaps, and structured data. */
export const SITE_URL = "https://abhisheksan.com";

export const AUTHOR = {
  name: "Abhishek Sharma",
  email: "abhishek@abhisheksan.com",
  github: "https://github.com/abhisheksharm-3",
  linkedin: "https://linkedin.com/in/abhisheksan/",
  x: "https://x.com/iabhisheksan",
} as const;

/** Escapes the five XML entities. Feed titles and descriptions are author-written prose. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
