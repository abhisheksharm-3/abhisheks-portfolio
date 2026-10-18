# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Behavioral Rules

These rules apply to every task unless explicitly overridden.
Bias: caution over speed on non-trivial work.

### Rule 1 — Think Before Coding
State assumptions explicitly. Ask rather than guess.
If multiple interpretations exist, present them — don't pick silently.
Push back when a simpler approach exists. Stop when confused.

### Rule 2 — Simplicity First
Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
If you write 200 lines and it could be 50, rewrite it.

### Rule 3 — Surgical Changes
Touch only what you must. Don't improve adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.
Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.

### Rule 4 — Goal-Driven Execution
Define success criteria. Loop until verified.
For multi-step tasks, state a brief plan with numbered steps before touching code.
Strong success criteria let Claude loop independently.

### Rule 5 — Use the Model Only for Judgment Calls
Use for: classification, drafting, summarization, extraction.
Do NOT use for: routing, retries, deterministic transforms.
If code can answer, code answers.

### Rule 6 — Token Budgets Are Not Advisory
If a session is spiraling or re-suggesting rejected fixes, summarize and start fresh.
Surface the breach. Do not silently overrun.

### Rule 7 — Surface Conflicts, Don't Average Them
If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup. Don't blend conflicting patterns.

### Rule 8 — Read Before You Write
Before adding code, read exports, immediate callers, shared utilities.
If unsure why existing code is structured a certain way, ask.

### Rule 9 — Tests Verify Intent, Not Just Behavior
Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

### Rule 10 — Checkpoint After Every Significant Step
Summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back. If you lose track, stop and restate.

### Rule 11 — Match the Codebase's Conventions, Even if You Disagree
Conformance > taste inside the codebase.
If you think a convention is harmful, surface it. Don't fork it silently.

### Rule 12 — Fail Loud
"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Biome check (lint + format) across the repo |
| `npm run format` | Biome formatter, writing changes |
| `npm run check-webmcp` | Verify the WebMCP tool handlers |
| `npm run check-post content/posts/<slug>.mdx` | Validate a post before publishing |

There is no test suite. `npm run check-webmcp` is the only automated check: a node script that
exercises the WebMCP tool handlers. There is no E2E setup.

## Architecture

```
src/app/               Next.js App Router. Each route is page.tsx plus a layout.tsx for metadata.
  api/github-stats/    Route handler backing the About page activity graph
  og/route.tsx         Runtime OG image generation (accepts a section param)
  projects/[slug]/     Project detail pages driven by src/data/projects.ts
  projects/polaris/    Hand-built one-off project page, outside the [slug] template
  writing/[slug]/      MDX post renderer
  robots.ts sitemap.ts Generated crawl metadata
src/components/
  sections/<page>/     Presentational components, foldered by the page they serve
  layout/              Shell, navbar, footer, and the background system
  ui/                  shadcn primitives (Radix + CVA)
  shared/              Cross-page pieces (PageHeader, SectionHeader, SharedBackground)
  writing/             MDX-only components (PostCallout, PostCta)
src/data/              Static content as typed exports. projects.ts is the source of truth.
src/lib/
  content/loader.ts    MDX file loading and post list assembly
  content/schema.ts    Zod frontmatter validation
  actions/contact.ts   Contact form server action
  config/              Spacing, animation, and background tuning constants
  canvas/              Particle and spatial-hash helpers for the background
  types/               Shared type definitions
src/hooks/             React hooks (useGitHubStats)
content/posts/         MDX posts, one file per slug
scripts/check-post.mjs Pre-publish structure validator
```

`DESIGN.md` documents the visual system. `docs/writing-ethos.md` and `docs/writing-checklist.md`
govern post content.

## Gotchas

- Post frontmatter is Zod-validated in `src/lib/content/schema.ts`. A post that fails validation
  breaks the build, so run `npm run check-post` before publishing.
- Tailwind v4 via `@tailwindcss/postcss`. There is no `tailwind.config.js`; theme tokens live in
  `src/app/globals.css`.
- `next.config.ts` sets a strict Content-Security-Policy. Any new external script, font, or API
  origin must be added there or it is blocked at runtime, not at build time.
- `reactCompiler: true` is on. Avoid patterns the React Compiler rejects (mutating props, reading
  refs during render).
- Remote images are only allowed from `github.com`. Other hosts need a `remotePatterns` entry.
- The contact form needs `MAIL_USER`, `MAIL_CLIENT_ID`, `MAIL_CLIENT_SECRET`, `MAIL_REFRESH_TOKEN`,
  and `MY_MAIL` at runtime (Gmail OAuth2 via nodemailer). `CONTACT_PUBLIC_EMAIL` overrides the
  fallback address shown in error messages.
- The GitHub activity graph needs `GITHUB_ACCESS_TOKEN` and `GITHUB_USERNAME`.
- The background system (`ConstellationBackground`, `*Background` files, `ColorBlobs`,
  `LightBeams`, `NoiseTexture`, `ScanLines`, `AbstractPath`) is hand-tuned. Do not modify it
  unless the task is explicitly about the background.
- Project information belongs in `src/data/projects.ts` only. Do not duplicate it into MDX or
  component files.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
