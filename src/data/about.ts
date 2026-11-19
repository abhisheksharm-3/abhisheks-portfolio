/**
 * How i work: one plain sentence per habit, each with the page that shows it.
 */
export const HOW_I_WORK = [
  {
    term: "small slices",
    sentence:
      "i ship in small slices and check each one against production: every database migration is run against the live schema before it goes out.",
    link: { href: "/projects/ai-video-platform", label: "the ai video platform" },
  },
  {
    term: "plain tools",
    sentence:
      "i pick the tool the problem needs, and that is often plain sql: authorization in row-level security, ledger rules in postgres triggers.",
    link: {
      href: "/writing/rag-to-duckdb-excel-text-to-sql",
      label: "the data wasn't in documents",
    },
  },
  {
    term: "write it up",
    sentence: "when something breaks in production, i find the cause and write it up as a post.",
    link: {
      href: "/writing/one-boolean-zeroed-a-teams-token-pool",
      label: "the over-broad boolean that zeroed a token pool",
    },
  },
  {
    term: "one quality bar",
    sentence:
      "i put one quality bar in front of every change: polaris enforces it on my client work, and the footer on this site went through it before it shipped.",
    link: { href: "/projects/polaris", label: "polaris" },
  },
] as const;

/**
 * Personal interests, one plain line each.
 */
export const PERSONAL_INTERESTS = [
  {
    category: "photography",
    description: "i photograph city corners and skies. my gallery is mostly clouds.",
  },
  {
    category: "reading",
    description:
      "recent reads: the almanack of naval ravikant and the courage to be disliked. mostly books that change how i think about work.",
  },
  {
    category: "music",
    description: "lo-fi while i work, plus rock and classical.",
  },
] as const;
