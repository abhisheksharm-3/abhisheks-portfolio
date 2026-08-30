"use client";

import { useEffect } from "react";
import { projects } from "@/data/projects";
import { createSiteTools, type PostIndexEntry, type SiteTool } from "@/lib/webmcp/tools";

type ModelContext = {
  registerTool: (tool: SiteTool, options?: { signal?: AbortSignal }) => Promise<unknown>;
};

/**
 * Registers this site's content as callable tools for browser agents.
 *
 * WebMCP is a Chrome origin trial (149 through 156, ending 17 Nov 2026).
 * Everywhere else `document.modelContext` is undefined and this is inert.
 */
export function WebMcpTools({ posts }: { posts: PostIndexEntry[] }) {
  useEffect(() => {
    const modelContext = (document as Document & { modelContext?: ModelContext }).modelContext;

    if (!modelContext) return;

    const controller = new AbortController();
    const { signal } = controller;

    const tools = createSiteTools({
      projects,
      posts,
      fetchPostMarkdown: async (slug) => {
        const response = await fetch(`/writing/${encodeURIComponent(slug)}.md`, { signal });
        return response.ok ? await response.text() : null;
      },
    });

    for (const tool of tools) {
      // A duplicate name or a revoked trial should not break the page.
      modelContext.registerTool(tool, { signal }).catch(() => {});
    }

    return () => controller.abort();
  }, [posts]);

  return null;
}
