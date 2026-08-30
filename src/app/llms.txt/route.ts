import { archivedProjects, selectedProjects } from "@/data/projects";
import { corpusStats } from "@/lib/content/domains";
import { getAllPosts } from "@/lib/content/loader";
import { AUTHOR, SITE_URL } from "@/lib/site";

/**
 * An index of this site in the llms.txt format, for agents that would otherwise
 * have to infer the structure from rendered HTML.
 */
async function renderIndex(): Promise<string> {
  "use cache";

  const posts = await getAllPosts();
  const stats = corpusStats(posts);

  const body = [
    `# ${AUTHOR.name}`,
    "",
    "> Full-stack developer. I build web apps, Android apps, and AI systems.",
    "> This site holds my projects, the work I abandoned, and what I write about building things.",
    "",
    `${stats.posts} write-ups, ${stats.words.toLocaleString("en-US")} words, ${stats.questions} questions answered, all from production incidents.`,
    "",
    "Every post is also available as raw markdown at the same URL with `.md` appended.",
    `The complete text of every post is at ${SITE_URL}/llms-full.txt.`,
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about): who I am, what I work on, and my GitHub activity`,
    `- [Projects](${SITE_URL}/projects): what I have built and shipped`,
    `- [Graveyard](${SITE_URL}/graveyard): projects I killed, and why`,
    `- [Writing](${SITE_URL}/writing): posts on building software`,
    `- [Contact](${SITE_URL}/contact): how to reach me`,
    "",
    "## Projects",
    "",
    ...selectedProjects.map((project) => {
      const links = [
        project.url && `live: ${project.url}`,
        project.github && `source: ${project.github}`,
      ]
        .filter(Boolean)
        .join(", ");
      const suffix = links ? ` (${links})` : "";
      const summary = project.description.replace(/\.+$/, "");
      return `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${summary}. ${project.tags.join(", ")}. ${project.year}${suffix}`;
    }),
    "",
    "## Earlier work",
    "",
    "Learning projects, kept for the record.",
    "",
    ...archivedProjects.map(
      (project) =>
        `- [${project.title}](${SITE_URL}/projects/${project.slug}): ${project.description.replace(/\.+$/, "")} (${project.year})`,
    ),
    "",
    "## Writing",
    "",
    ...posts.map(
      (post) =>
        `- [${post.frontmatter.title}](${SITE_URL}/writing/${post.slug}): ${post.frontmatter.subhead} (${post.frontmatter.date}, ${post.frontmatter.readingTime} min)`,
    ),
    "",
    "## Questions answered in these posts",
    "",
    ...posts.flatMap((post) =>
      (post.frontmatter.faqs ?? []).map(
        (faq) => `- ${faq.question} — ${SITE_URL}/writing/${post.slug}`,
      ),
    ),
    "",
    "## Contact",
    "",
    `- Email: ${AUTHOR.email}`,
    `- GitHub: ${AUTHOR.github}`,
    `- LinkedIn: ${AUTHOR.linkedin}`,
    `- X: ${AUTHOR.x}`,
    "",
  ].join("\n");

  return body;
}

export async function GET() {
  return new Response(await renderIndex(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
