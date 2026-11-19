import type { PostMeta } from "./loader";

/** One primary domain per post, derived from its tags. */
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

export function domainLabel(post: PostMeta): string {
  const id = domainOf(post);
  return POST_DOMAINS.find((domain) => domain.id === id)?.label ?? id;
}

/** The headline numbers: how many write-ups, how many words, how many questions answered. */
export function corpusStats(posts: PostMeta[]) {
  return {
    posts: posts.length,
    words: posts.reduce((total, post) => total + post.wordCount, 0),
    questions: posts.reduce((total, post) => total + (post.frontmatter.faqs?.length ?? 0), 0),
  };
}

function monthYear(isoDate: string) {
  const [year, month] = isoDate.split("-");
  const name = new Date(Date.UTC(Number(year), Number(month) - 1)).toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  return { name: name.toLowerCase(), year };
}

/** The span the posts cover, as "april to september 2026". Empty when there are no posts. */
export function postDateRange(posts: PostMeta[]): string {
  if (posts.length === 0) return "";

  const dates = posts.map((post) => post.frontmatter.date).sort();
  const first = monthYear(dates[0]);
  const last = monthYear(dates[dates.length - 1]);

  if (first.name === last.name && first.year === last.year) return `${first.name} ${first.year}`;
  if (first.year === last.year) return `${first.name} to ${last.name} ${last.year}`;
  return `${first.name} ${first.year} to ${last.name} ${last.year}`;
}
