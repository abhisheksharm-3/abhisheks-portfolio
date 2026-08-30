import type { PostMeta } from "./loader";

/**
 * One primary domain per post, derived from its tags. Reverse-chronological rows
 * hide the range; grouped, four domains are visible at a glance.
 */
export const POST_DOMAINS = [
  { id: "ai", label: "ai & agents" },
  { id: "payments", label: "payments" },
  { id: "backend", label: "backend & infra" },
  { id: "mobile", label: "mobile & integrations" },
] as const;

export type PostDomain = (typeof POST_DOMAINS)[number]["id"];

export function domainOf(post: PostMeta): PostDomain {
  const tags = post.frontmatter.tags;

  if (tags.includes("payments")) return "payments";
  if (tags.some((tag) => ["mobile", "android", "ios", "integrations", "frontend"].includes(tag))) {
    return "mobile";
  }
  if (tags.includes("ai")) return "ai";

  return "backend";
}

/** Posts bucketed by domain, in POST_DOMAINS order, skipping empty groups. */
export function groupByDomain(posts: PostMeta[]) {
  return POST_DOMAINS.map((domain) => ({
    ...domain,
    posts: posts.filter((post) => domainOf(post) === domain.id),
  })).filter((group) => group.posts.length > 0);
}

/** The headline numbers: how many write-ups, how many words, how many questions answered. */
export function corpusStats(posts: PostMeta[]) {
  return {
    posts: posts.length,
    words: posts.reduce((total, post) => total + post.wordCount, 0),
    questions: posts.reduce((total, post) => total + (post.frontmatter.faqs?.length ?? 0), 0),
  };
}
