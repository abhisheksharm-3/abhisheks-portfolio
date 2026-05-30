# Writing Ethos

The definitive reference for every post on this blog. This is not a style guide — it is the source of truth for why each rule exists and how to make judgment calls the automated checker cannot.

Derived from: Wednesday Content Pipeline `articles-writing-ethos.md`, Wednesday `brand_tone_and_voice.md`, Skald PRD §7 and §13, Skald roadmap SEO quality addendum.

---

## Who reads this

Developers. Specifically: a developer who has already hit the exact problem you are writing about, has searched for an answer, and landed on your post. They are not curious. They are stuck. They want the answer in the first two sentences and the proof immediately after.

Secondary reader: someone who is evaluating whether you know what you are talking about — a recruiter, a future collaborator, someone deciding whether to reach out. They are skimming for evidence of depth and real production experience. Generic explanations send them away. Specific numbers and real code keep them.

Neither reader wants a tutorial that restates the official docs. Neither wants a listicle. Neither wants your reflection on the industry. They want what you actually found when you ran this in production.

---

## The voice

First person. Past tense for what happened, present tense for what is true. Direct. No hedging. No throat-clearing.

Sounds like: a senior engineer explaining to a colleague what they hit, what they tried, what worked, and what the non-obvious thing was. Not a conference talk. Not a blog post trying to rank. A useful conversation.

Not a consultant deck. Not a vendor pitch. Not a tutorial that starts with "In this post, we will explore..."

---

## Writing structure rules

### Lead with the answer

Every post opens with the answer, not the setup. If the post is "langgraph multi-agent state: what the docs skip" — the first paragraph tells the reader the non-obvious thing. The rest of the post is the proof and the detail.

Wrong opening: "LangGraph is a powerful framework for building multi-agent systems. In this post, I will walk through..."

Right opening: "The thing that bit me hardest was not the graph structure. It was that two nodes writing to the same state key silently last-write-wins unless you define a reducer. The docs mention this once, in a footnote."

### Every H2 section answers a question

H2 headings are the implied question the reader is asking at that point in the article. The first sentence of the section directly answers that question before any supporting detail.

Wrong H2 + opening: `## State Management` → "State management in LangGraph works differently from traditional approaches..."

Right H2 + opening: `## How state channels actually work` → "Each key in your state dict is a channel. Without a reducer annotation, the last write wins."

The heading is the question. The first sentence is the answer. The rest of the section is the proof.

### Short paragraphs

Maximum 3–4 sentences per paragraph. AI extraction and human skimming both degrade on long paragraphs. A 10-sentence paragraph gets the first sentence cited if anything.

### No conclusion summaries

Do not add a section at the end that restates what was covered. The reader just read it. A summary adds words without adding information. End on the last substantive thing — the FAQ section, a specific recommendation, or the "what I would do differently" note.

### No throat-clearing

Cut every sentence that sets up what you are about to say instead of saying it.

Cut: "In this post, I will walk through the three main patterns I use."
Cut: "Before we dive in, it is worth understanding the context."
Cut: "Let's get started."
Cut: "Great question."

Just say the thing.

---

## AEO — Answer Engine Optimization

AI models (ChatGPT, Perplexity, Claude, Gemini) are increasingly the first stop for technical questions. They extract and cite content differently from Google. This is how you write for both.

### Why it matters

An AI model answering "how do you share state between langgraph nodes" reads the first 1–2 sentences of each section on your post and decides if it is citable. If those sentences hedge, set up context, or delay the answer, the section is skipped. The inverted pyramid is not a style preference — it is the citation mechanism.

### Inverted pyramid per section

Every section: answer first, then evidence, then detail. Not: context → explanation → answer. The reader and the AI both want the answer in sentence 1.

### H2 headings as questions

Write H2s as the question the reader is actually asking, not as a topic label.

Label: "Background" — not citable.
Question: "Why does LangGraph use reducers instead of direct state mutation" — citable.

### FAQ section

Every technical post requires 4 FAQs. Rules:
- Questions must be phrased exactly as someone would type or speak them into ChatGPT or Google. "How do I persist memory across LangGraph runs?" not "Memory persistence considerations."
- Answers must be at minimum 50 words. A 1–2 sentence FAQ answer is not an answer — it is a stub. AI models will not cite stubs.
- Answers must be complete standalone paragraphs. Do not assume the reader has read the rest of the post.
- FAQs generate `FAQPage` JSON-LD schema. Even though Google deprecated FAQ rich results in search in 2026, the schema remains a semantic signal for answer engine extraction.

### Specific numbers in the first 100 words

AI models prefer content that opens with verifiable specifics. Put the most concrete number or benchmark in the opening paragraph.

Citable: "A LangGraph pipeline with 6 nodes and shared state across all of them adds roughly 40ms of overhead per run on a t3.medium."
Not citable: "LangGraph adds some overhead compared to a simple chain."

### Information gain

Every post needs at least one thing that cannot be found by reading the official documentation or a generic tutorial. A specific number from your production setup. A failure mode you hit that is not documented. A benchmark you ran. An edge case that contradicts the happy-path example.

Generic content is not cited. Specific content that exists nowhere else is.

---

## E-E-A-T — adapted for a personal dev blog

Google's E-E-A-T framework (Experience, Expertise, Authority, Trust) scores your content for ranking. For a personal technical blog, each dimension has a specific meaning.

**Experience** — did you actually run this? Real evidence: actual error messages you hit, the exact command that fixed it, a number from your production logs, a screenshot, a benchmark you ran yourself. Not "you might encounter" but "I hit this."

**Expertise** — do you understand what you are writing about at depth? Evidence: you explain not just what to do but why it works that way, you know the edge cases, you have an opinion on the tradeoffs.

**Authority** — do others cite you? Built over time. The individual post level: link to the primary sources you are referencing, and earn links by producing content that cannot be found elsewhere (calculators, decision frameworks, specific benchmarks).

**Trust** — are your claims verifiable? Every number has a basis. Every recommendation is qualified by the context it applies to. You do not overstate. When something is your personal experience from one project, you say so.

### Practical checks per post

- At least one specific number or benchmark from real usage in the post (not made up, not "approximately")
- At least one code block with real, runnable code
- At least one place where you acknowledge the limits of what you know ("this worked for my setup; I haven't tested it at...")
- Named technologies, libraries, versions — not "a framework" or "a popular tool"
- First-person grounding in the first 300 words — "I hit this", "we ran", "in our pipeline"

---

## Helpful Content

Google's Helpful Content System targets articles written to rank rather than to help readers. AI-generated content is the primary target. The checks below are enforced by the quality script, but understanding why they exist makes the writing better.

### Every section must be actionable

After reading each H2 section, the reader should be able to do something they could not do before — run a command, apply a pattern, make a decision, understand a failure mode. A section that explains a concept without giving the reader anything to act on is thin content.

The strongest signal: a code block, a specific command, a decision framework ("if X, do Y; if Z, do W"), or a numbered process. One of these per H2 section minimum.

### No padding

Padding is sentences that add words without adding information. It is the most common AI writing failure and the easiest thing for Google to detect.

Padding signals:
- Restating what the previous sentence just said in different words
- Sentences that could be deleted without the paragraph losing meaning
- Opening sentences of sections that "set up" what the section is about instead of answering the question

The test: delete a sentence. Does the paragraph lose meaning? If no, delete it.

### FAQ depth

Each FAQ answer must be long enough to stand alone as a complete answer — minimum 50 words, but the test is not word count. The test is: if someone found only this FAQ on the page, would they have a genuinely useful answer? If not, the answer is not deep enough.

### Specificity in the opening

The first 800 words of the post must contain at least 3 specific numbers, named technologies, named libraries, or real version strings. "Several libraries" fails. "pgvector 0.5.1, pg_embedding, and Qdrant" passes.

---

## CTR Optimization

CTR (click-through rate) directly affects how rankings move. An article at position 8 with a 3% CTR will outperform one at position 3 with 0.3% CTR. Titles and meta descriptions are ranking inputs, not cosmetics.

### Title rules

- 50–60 characters — full display in SERP without truncation
- Primary keyword in the first 60 characters
- At least one specific number or concrete claim ("3 months", "60%", "$2M", "what the docs skip")
- At least one power word: reduces, eliminates, prevents, reveals, proves, breaks, fixes
- No AI-tell phrases: Exploring, Navigating, Mastering, Unlocking, Delving, Demystifying, Unveiling

### Title patterns that work for dev content

- Specific gap: "langgraph multi-agent state: what the docs skip"
- Outcome: "how I cut react native build time by 60% across 4 teams"
- Problem-solution: "avoiding the pgvector index that silently kills query performance"
- Honest experience: "on-device ai in react native — what actually works in 2026"
- Failure: "the supabase RLS mistake that exposed every user's data"

### Meta description (subhead field)

- 140–160 characters
- Contains primary keyword naturally
- Contains a specific benefit, outcome, or number
- Does not repeat the title verbatim — adds new information
- No marketing language, no "In this post we will..."

---

## Search Intent

Format must match intent. Wrong format = poor dwell time = ranking demotion.

| Intent | How to identify | Required format |
|---|---|---|
| Informational | "how does X work", "what is X", "X guide", error messages | Tutorial, explainer, deep dive. Progressive H2 sections. Real code. 800–2000 words. |
| BOFU | "X for [my specific situation]", "when to use X", "X vs Y for [use case]" | Decision framework, comparison with real tradeoffs, specific recommendation |
| Commercial investigation | "best X for Y", "X alternatives" | Evaluation with real criteria and your honest verdict |

Most dev blog posts are informational. Write for that reader — someone who wants to understand and implement, not just know that something exists.

Skip navigational and transactional queries — those are docs pages and product pages. They are not blog posts.

---

## Anti-AI Writing

The following words and patterns are banned. They are the fingerprints of AI-generated content and reduce both reader trust and search ranking.

### Banned vocabulary

delve, crucial, pivotal, vital, meticulous, intricate, tapestry, testament, landscape, underscore, bolstered, garnered, enduring, vibrant, rich (as vague intensifier), align with, resonate with, foster, cultivate, showcase, highlight (as verb), enhance, leverage, robust, comprehensive, valuable insights, seamlessly, game-changer, it's worth noting, in today's fast-paced, revolutionize, cutting-edge, state-of-the-art, best-in-class, next-generation, transformative

### Banned patterns

- "not just X, but Y"
- "it's not X, it's Y"
- "serves as / stands as / represents a"
- "plays a crucial role"
- "it is worth noting"
- "at the end of the day"
- "in today's landscape"
- "in the ever-evolving"
- "moving forward"
- "let's dive in"
- "in this post, we will explore"
- "I hope this helps"
- Conclusion paragraphs that restate what was covered

### Sentence structure

- Short sentences over em dashes. When you reach for a dash, ask whether two sentences work better. They usually do.
- No em dashes. No double hyphens as em dashes.
- Present tense for what is true. Past tense for what happened.
- First person throughout. "I hit this" not "developers often encounter."
- Lead with the specific. "The reducer annotation silently defaults to last-write-wins" not "There are some nuances to consider."

---

## Backlink-Worthy Formats

Backlinks are a top Google ranking signal. Most blog posts earn zero. Certain formats earn them naturally because other people link to them as resources. Target 1 in 5 posts being one of these:

| Format | Why it earns links | Example |
|---|---|---|
| Calculator or tool | Linked as a resource ("use this to calculate X") | "pgvector index size calculator for your embedding model" |
| Decision framework | Linked as the authoritative version ("this framework from X") | "when to use on-device vs cloud AI in React Native" |
| Definitive guide | Referenced as the foundational resource | "the complete guide to Supabase RLS for multi-tenant apps" |
| Original benchmark | Cited as the source of data | "react native new architecture: real-world performance numbers" |
| Documented failure | Shared by others who hit the same thing | "the LangGraph memory bug that corrupted our production runs" |

For calculator and framework posts: include a dedicated "how to use this" section with step-by-step application. This improves both helpfulness score and the chance someone links to it.

---

## Pre-publish Checklist

Run `npm run check-post content/posts/[slug].mdx` first. Then check the judgment calls below.

### Every technical post

- [ ] Title targets a specific search query someone would actually type
- [ ] First sentence of every H2 section directly answers an implied question
- [ ] At least one thing a reader can act on immediately (code they can run, a specific command, a decision framework, numbered steps)
- [ ] Every number or benchmark in the post comes from real experience — not approximated or invented
- [ ] FAQ questions are phrased as someone would type into ChatGPT or Google
- [ ] No section is just rephrasing what the previous section said
- [ ] Read the first 100 words aloud — do they earn the reader's attention?
- [ ] Code blocks use real, runnable code — not pseudocode or placeholder variable names

### Every essay post

- [ ] The opening line says the thing, not sets up the thing
- [ ] There is a specific observation or opinion that is yours — not something anyone could have written
- [ ] No conclusion summary that restates the body

### Both types

- [ ] `draft: false` set in frontmatter
- [ ] `npm run check-post` passes with zero errors
- [ ] relatedPosts slugs actually exist in `content/posts/`
