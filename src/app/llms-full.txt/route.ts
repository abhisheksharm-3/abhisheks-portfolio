import { getAllPosts, getPostSource } from "@/lib/content/loader";
import { AUTHOR, SITE_URL } from "@/lib/site";

/**
 * Every published post as one plain-text document, so an agent can read the whole
 * corpus in a single fetch instead of crawling sixteen pages of rendered HTML.
 */
async function renderCorpus(): Promise<string> {
  "use cache";

  const posts = await getAllPosts();
  const sources = await Promise.all(posts.map((post) => getPostSource(post.slug)));

  const documents = sources
    .filter((source) => source !== null)
    .map((source) =>
      [
        `# ${source.frontmatter.title}`,
        "",
        `> ${source.frontmatter.subhead}`,
        "",
        `URL: ${SITE_URL}/writing/${source.slug}`,
        `Published: ${source.frontmatter.date}${source.frontmatter.updatedAt ? ` (updated ${source.frontmatter.updatedAt})` : ""}`,
        `Tags: ${source.frontmatter.tags.join(", ")}`,
        "",
        source.raw,
      ].join("\n"),
    );

  const body = [
    `# ${AUTHOR.name}: complete writing`,
    "",
    `> Every published post on ${SITE_URL}, in full.`,
    "",
    documents.join("\n\n---\n\n"),
    "",
  ].join("\n");

  return body;
}

export async function GET() {
  return new Response(await renderCorpus(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
