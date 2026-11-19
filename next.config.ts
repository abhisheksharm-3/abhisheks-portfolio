import { execFileSync } from "node:child_process";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Subject line of the commit being built, for the footer's "deployed" row. Vercel exposes it as an
 * env var; a local build asks git. Empty when neither is available, and the footer hides the row.
 */
const readDeployMessage = (): string => {
  const fromVercel = process.env.VERCEL_GIT_COMMIT_MESSAGE;
  if (fromVercel) return fromVercel.split("\n")[0];
  try {
    return execFileSync("git", ["log", "-1", "--format=%s"], { encoding: "utf8" }).trim();
  } catch {
    console.warn("[next.config] no commit message available; the footer hides its deployed row");
    return "";
  }
};

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com",
  "frame-src https://open.spotify.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  // Baked at build time: cacheComponents rejects new Date() during a client prerender.
  env: {
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
    NEXT_PUBLIC_DEPLOY_MESSAGE: readDeployMessage(),
  },
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
    useOffline: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
        search: "",
      },
    ],
  },
  async redirects() {
    // WesternFront moved to the graveyard; keep its old URL alive.
    return [{ source: "/projects/westernfront", destination: "/graveyard", permanent: true }];
  },
  async rewrites() {
    // Agents conventionally append .md to a URL to get the source of a page.
    return [{ source: "/writing/:slug.md", destination: "/api/md/:slug" }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
