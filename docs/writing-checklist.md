# Pre-publish Checklist

Run the script first: `npm run check-post content/posts/[slug].mdx`

Then check the judgment calls below — these are the things the script cannot catch.

---

## Technical posts

- [ ] Title targets a specific search query someone would actually type
- [ ] First sentence of every H2 answers the implied question directly
- [ ] At least one actionable element per H2 (runnable code, command, decision framework, numbered steps)
- [ ] Every number in the post is real — not approximated or invented
- [ ] FAQ questions phrased as someone would type into ChatGPT or Google
- [ ] No section restates the previous section in different words
- [ ] First 100 words earn the reader's attention — read them aloud
- [ ] Code blocks use real, runnable code — no pseudocode or placeholder names

## Essay posts

- [ ] Opening line says the thing, not sets up the thing
- [ ] There is a specific observation that is yours — not generic
- [ ] No conclusion summary

## Both types

- [ ] `draft: false` in frontmatter
- [ ] Script passes with zero errors
- [ ] `relatedPosts` slugs actually exist in `content/posts/`

---

Full reasoning behind each rule: `docs/writing-ethos.md`
