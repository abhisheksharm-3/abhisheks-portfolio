# Abhishek Sharma Portfolio

This is the source for my personal portfolio at [abhisheksan.com](https://abhisheksan.com).

It is a minimal Next.js portfolio for projects, writing, contact, and the older work I still want visible. The site is intentionally personal in tone: quiet interface, dark visual system, animated background, project archive, and a filesystem-backed MDX writing section.

## What's Inside

- Portfolio pages for about, projects, graveyard, writing, and contact
- Project data stored in `src/data/projects.ts`
- MDX writing system under `content/posts`
- Zod frontmatter validation for posts
- Syntax-highlighted technical articles
- Generated article metadata, JSON-LD, sitemap, robots, and OG images
- Contact form backed by a server action and email template

## Writing

Posts live in `content/posts/*.mdx`. Frontmatter is validated through `src/lib/content/schema.ts`, loaded through `src/lib/content/loader.ts`, and rendered at `/writing/[slug]`.

The writing system is built for technical posts with real code, concrete numbers, FAQs, and structured metadata. Before publishing, run `npm run check-post content/posts/<slug>.mdx` to catch weak post structure.

See `content/posts/` for the current set of posts, or browse them live at `/writing`.

## Template Use

You can use this repo as a template for your own portfolio without asking. Replace the copy, project data, images, posts, email settings, and branding with your own.

Credit is appreciated, but not required.
