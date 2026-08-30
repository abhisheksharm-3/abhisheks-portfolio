import { getAllPosts } from "@/lib/content/loader";
import { AUTHOR, escapeXml, SITE_URL } from "@/lib/site";

/** RSS 2.0 feed of every published post. */
async function renderFeed(): Promise<string> {
  "use cache";

  const posts = await getAllPosts();
  const updated = posts[0]?.frontmatter.date;

  const items = posts.map((post) => {
    const url = `${SITE_URL}/writing/${post.slug}`;
    const published = new Date(`${post.frontmatter.date}T00:00:00Z`).toUTCString();

    return [
      "    <item>",
      `      <title>${escapeXml(post.frontmatter.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${published}</pubDate>`,
      `      <description>${escapeXml(post.frontmatter.subhead)}</description>`,
      ...post.frontmatter.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      "    </item>",
    ].join("\n");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(AUTHOR.name)} — Writing</title>`,
    `    <link>${SITE_URL}/writing</link>`,
    "    <description>Posts on building web apps, Android apps, and AI systems.</description>",
    "    <language>en-us</language>",
    `    <atom:link href="${SITE_URL}/writing/feed.xml" rel="self" type="application/rss+xml" />`,
    ...(updated
      ? [`    <lastBuildDate>${new Date(`${updated}T00:00:00Z`).toUTCString()}</lastBuildDate>`]
      : []),
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return body;
}

export async function GET() {
  return new Response(await renderFeed(), {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
