import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Every crawler is allowed. Named agents are listed explicitly because some of
 * them look for their own user agent before falling back to the wildcard rule.
 */
const AGENT_USER_AGENTS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "DuckAssistBot",
  "cohere-ai",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AGENT_USER_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
