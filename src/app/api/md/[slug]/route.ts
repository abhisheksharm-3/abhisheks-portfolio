import { getAllPosts, getPostSource } from "@/lib/content/loader";
import { SITE_URL } from "@/lib/site";

/**
 * Raw markdown for one post, served at /writing/<slug>.md through a rewrite.
 * An agent that appends `.md` gets the source instead of parsing rendered HTML.
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

async function renderPost(slug: string): Promise<string | null> {
  "use cache";

  const post = await getPostSource(slug);

  if (!post) return null;

  return [
    `# ${post.frontmatter.title}`,
    "",
    `> ${post.frontmatter.subhead}`,
    "",
    `URL: ${SITE_URL}/writing/${post.slug}`,
    `Published: ${post.frontmatter.date}${post.frontmatter.updatedAt ? ` (updated ${post.frontmatter.updatedAt})` : ""}`,
    `Reading time: ${post.frontmatter.readingTime} min`,
    `Tags: ${post.frontmatter.tags.join(", ")}`,
    "",
    post.raw,
    "",
  ].join("\n");
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await renderPost(slug);

  if (body === null) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(body, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
