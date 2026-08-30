import { AUTHOR, SITE_URL } from "../site.ts";

/** Chrome caps a single tool's output at 1.5K characters. */
export const MAX_OUTPUT = 1500;

export type PostIndexEntry = {
  slug: string;
  title: string;
  subhead: string;
  date: string;
  tags: string[];
  readingTime: number;
};

export type ProjectIndexEntry = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url?: string;
  github?: string;
};

export type ToolResult = { content: { type: "text"; text: string }[] };

export type SiteTool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: true };
  // biome-ignore lint/suspicious/noExplicitAny: each tool declares its own input shape
  execute: (input: any) => Promise<ToolResult>;
};

export function text(value: string): ToolResult {
  const trimmed =
    value.length > MAX_OUTPUT ? `${value.slice(0, MAX_OUTPUT - 3).trimEnd()}...` : value;
  return { content: [{ type: "text", text: trimmed }] };
}

/**
 * The site's content as callable tools, so a browser agent can ask for a project
 * or a post instead of scraping the DOM for it. Pure: the caller supplies the data
 * and the fetcher, which is what makes this checkable outside a browser.
 */
export function createSiteTools({
  projects,
  posts,
  fetchPostMarkdown,
}: {
  projects: readonly ProjectIndexEntry[];
  posts: readonly PostIndexEntry[];
  fetchPostMarkdown: (slug: string) => Promise<string | null>;
}): SiteTool[] {
  const readOnly = { readOnlyHint: true } as const;

  return [
    {
      name: "list_projects",
      description: `List the software projects ${AUTHOR.name} has built, with the stack, year, and links for each. Optionally filter by a technology tag.`,
      inputSchema: {
        type: "object",
        properties: {
          tag: {
            type: "string",
            description: 'Technology to filter by, for example "TypeScript" or "Android".',
          },
        },
      },
      annotations: readOnly,
      execute: async ({ tag }: { tag?: string }) => {
        const needle = tag?.toLowerCase();
        const matches = needle
          ? projects.filter((project) =>
              project.tags.some((entry) => entry.toLowerCase().includes(needle)),
            )
          : projects;

        if (matches.length === 0) return text(`No projects match "${tag}".`);

        return text(
          matches
            .map(
              (project) =>
                `${project.title} (${project.year}) — ${project.description}. Stack: ${project.tags.join(", ")}. ${SITE_URL}/projects/${project.slug}`,
            )
            .join("\n"),
        );
      },
    },
    {
      name: "search_writing",
      description: `Search ${AUTHOR.name}'s technical writing by keyword. Returns matching post titles, summaries, and URLs.`,
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Keyword to match against post titles, summaries, and tags.",
          },
        },
        required: ["query"],
      },
      annotations: readOnly,
      execute: async ({ query }: { query: string }) => {
        const needle = query.toLowerCase();
        const matches = posts.filter((post) =>
          `${post.title} ${post.subhead} ${post.tags.join(" ")}`.toLowerCase().includes(needle),
        );

        if (matches.length === 0) return text(`No posts match "${query}".`);

        return text(
          matches
            .map(
              (post) =>
                `${post.title} (${post.date}, ${post.readingTime} min) — ${post.subhead} ${SITE_URL}/writing/${post.slug}`,
            )
            .join("\n"),
        );
      },
    },
    {
      name: "get_post",
      description: `Get the full text of one of ${AUTHOR.name}'s posts as markdown, by its slug. Use search_writing first to find a slug.`,
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "The post slug, as returned by search_writing." },
        },
        required: ["slug"],
      },
      annotations: readOnly,
      execute: async ({ slug }: { slug: string }) => {
        const markdown = await fetchPostMarkdown(slug);

        if (markdown === null) return text(`No post with slug "${slug}".`);

        return text(markdown);
      },
    },
    {
      name: "get_contact",
      description: `Get the ways to reach ${AUTHOR.name}: email and social profiles.`,
      inputSchema: { type: "object", properties: {} },
      annotations: readOnly,
      execute: async () =>
        text(
          [
            `Email: ${AUTHOR.email}`,
            `GitHub: ${AUTHOR.github}`,
            `LinkedIn: ${AUTHOR.linkedin}`,
            `X: ${AUTHOR.x}`,
            `Contact form: ${SITE_URL}/contact`,
          ].join("\n"),
        ),
    },
  ];
}
