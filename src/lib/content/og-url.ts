import type { PostFrontmatterType } from "@/lib/content/schema";

/** The /og route's address for a post: its title, first tag, subhead, date and reading time. */
export const toPostOgUrl = (frontmatter: PostFrontmatterType) => {
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const params = new URLSearchParams({
    title: frontmatter.title,
    tag: frontmatter.tags[0] ?? "",
    subhead: frontmatter.subhead,
    date,
    min: String(frontmatter.readingTime),
  });
  return `/og?${params}`;
};
