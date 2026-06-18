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
| `npm run dev` | Start dev server (Next.js) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run check-post` | Validate MDX post structure before publishing |

## Architecture

```
src/app/           — Next.js App Router pages
  about/           — About page
  contact/         — Contact form (server action + nodemailer)
  graveyard/       — Archived/dead projects
  projects/[slug]  — Individual project pages
  writing/[slug]   — MDX post renderer
  og/              — OG image generation
src/components/    — Shared UI components (Radix + Tailwind)
src/data/          — Static data (projects.ts — source of truth for projects)
src/lib/           — Utilities: content/loader.ts (MDX loading), content/schema.ts (Zod frontmatter validation)
src/hooks/         — React hooks
content/posts/     — MDX writing content (*.mdx)
scripts/           — check-post.mjs pre-publish validator
public/images/     — Static assets
```

## Stack

- Next.js 16 + React 19, App Router, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss` — no tailwind.config.js)
- next-mdx-remote + rehype-pretty-code for MDX with syntax highlighting
- Framer Motion for animations, OGL for WebGL background
- Radix UI primitives, react-hook-form + Zod v4 for forms
- Playwright for E2E tests, Vercel for deployment

## Gotchas

- All MDX frontmatter is Zod-validated via `src/lib/post-schema.ts` — run `npm run check-post` before publishing a new post or the build will fail
- Tailwind v4 uses `@tailwindcss/postcss`; there is no `tailwind.config.js` — utility classes are configured via CSS
- Project data lives in `src/data/projects.ts` — this is the single source of truth; don't duplicate project info in MDX or elsewhere
- Contact form uses a Next.js server action; email is sent via nodemailer — requires `SMTP_*` env vars at runtime
