// Verifies the WebMCP tool handlers without a browser: the origin trial is only
// live on the deployed origin, so the logic is checked here instead.
import assert from "node:assert/strict";
import { createSiteTools, MAX_OUTPUT } from "../src/lib/webmcp/tools.ts";

const projects = [
  {
    slug: "polaris",
    title: "Polaris",
    description: "a project operating system for claude code",
    tags: ["Claude Code", "TypeScript"],
    year: "2026",
    github: "https://github.com/abhisheksharm-3/polaris",
  },
  {
    slug: "flockr",
    title: "Flockr",
    description: "household management platform",
    tags: ["Kotlin", "Android"],
    year: "2025",
  },
];

const posts = [
  {
    slug: "one-boolean",
    title: "the over-broad boolean",
    subhead: "a flag that zeroed a token pool",
    date: "2026-07-03",
    tags: ["backend", "payments"],
    readingTime: 10,
  },
];

const tools = createSiteTools({
  projects,
  posts,
  fetchPostMarkdown: async (slug) => (slug === "one-boolean" ? "x".repeat(5000) : null),
});

const byName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const run = async (name, input) => (await byName[name].execute(input)).content[0].text;

assert.deepEqual(Object.keys(byName).sort(), [
  "get_contact",
  "get_post",
  "list_projects",
  "search_writing",
]);

// Every tool must declare itself read-only, or an agent may treat it as a mutation.
for (const tool of tools) {
  assert.equal(tool.annotations.readOnlyHint, true, `${tool.name} must be read-only`);
  assert.equal(typeof tool.description, "string");
  assert.equal(tool.inputSchema.type, "object");
}

// list_projects: unfiltered, filtered, case-insensitive, and no match.
assert.match(await run("list_projects", {}), /Polaris.*\n.*Flockr/s);
assert.match(await run("list_projects", { tag: "kotlin" }), /Flockr/);
assert.doesNotMatch(await run("list_projects", { tag: "kotlin" }), /Polaris/);
assert.match(await run("list_projects", { tag: "cobol" }), /No projects match "cobol"/);

// URLs must be absolute, or an agent quoting them sends people nowhere.
assert.match(await run("list_projects", {}), /https:\/\/www\.abhisheksan\.com\/projects\/polaris/);

// search_writing matches title, summary, and tags.
assert.match(await run("search_writing", { query: "boolean" }), /over-broad/);
assert.match(await run("search_writing", { query: "PAYMENTS" }), /over-broad/);
assert.match(await run("search_writing", { query: "kubernetes" }), /No posts match/);

// get_post truncates to Chrome's per-tool output cap.
const post = await run("get_post", { slug: "one-boolean" });
assert.equal(post.length, MAX_OUTPUT, `expected ${MAX_OUTPUT} chars, got ${post.length}`);
assert.ok(post.endsWith("..."), "truncated output should be marked");
assert.match(await run("get_post", { slug: "nope" }), /No post with slug "nope"/);

// get_contact returns a reachable address.
assert.match(await run("get_contact", {}), /Email: abhishek@abhisheksan\.com/);

console.log(`webmcp: ${tools.length} tools, all checks passed`);
