import {
  RiAmazonLine,
  RiGoogleLine,
  RiNextjsLine,
  RiNodejsLine,
  RiReactjsLine,
  RiSupabaseLine,
} from "@remixicon/react";
import { Gauge, Layers, PenLine, Wrench } from "lucide-react";

/**
 * How i work: one plain sentence per habit, each with the page that shows it.
 */
export const HOW_I_WORK = [
  {
    term: "small slices",
    icon: Layers,
    sentence:
      "i ship in small slices and check each one against production: every database migration is run against the live schema before it goes out.",
    link: { href: "/projects/ai-video-platform", label: "the ai video platform" },
  },
  {
    term: "plain tools",
    icon: Wrench,
    sentence:
      "i pick the tool the problem needs, and that is often plain sql: authorization in row-level security, ledger rules in postgres triggers.",
    link: {
      href: "/writing/rag-to-duckdb-excel-text-to-sql",
      label: "the data wasn't in documents",
    },
  },
  {
    term: "write it up",
    icon: PenLine,
    sentence: "when something breaks in production, i find the cause and write it up as a post.",
    link: {
      href: "/writing/one-boolean-zeroed-a-teams-token-pool",
      label: "the over-broad boolean that zeroed a token pool",
    },
  },
  {
    term: "one quality bar",
    icon: Gauge,
    sentence:
      "i put one quality bar in front of every change: polaris enforces it on my client work, and the footer on this site went through it before it shipped.",
    link: { href: "/projects/polaris", label: "polaris" },
  },
] as const;

/**
 * The person reading's photo essay: a sentence from the bio beside one of the photographs, by the
 * photo's src in photos.ts. These photos are left out of the collage below the essay.
 */
export const ESSAY = [
  {
    photo: "/images/photos/mumbai-taj-night.webp",
    sentence: "i photograph city corners and skies. my gallery is mostly clouds.",
  },
  {
    photo: "/images/photos/shimla-christ-church.webp",
    sentence: "i started coding in 8th grade. on my own time i build polaris and flockr.",
  },
] as const;

/** Recent reads, newest first. The isbn picks the cover from Open Library's cover service. */
export const RECENT_READS = [
  { title: "the almanack of naval ravikant", author: "eric jorgenson", isbn: "9781544514215" },
  {
    title: "the courage to be disliked",
    author: "ichiro kishimi & fumitake koga",
    isbn: "9781501197277",
  },
] as const;

/** The work reading's areas, each with the post (by slug) that shows the work. */
export const SHIPPED_IN = [
  { area: "agents", slug: "langgraph-hitl-postgres-checkpoints-sse" },
  { area: "llm infra", slug: "llm-router-openrouter-fallback-prompt-caching" },
  { area: "on-device ai", slug: "react-native-tts-hardware-aec-interruption" },
  { area: "infra from zero", slug: "canvas-lms-self-hosted-sqs-polling" },
  { area: "billing", slug: "stripe-ach-subscriptions-settlement-grace-period" },
  { area: "video", slug: "remotion-jpeg-frames-bt601-bt709-color-shift" },
] as const;

/** The path so far, one row per year, each with the projects (by slug) built that year. */
export const PATH = [
  {
    year: "2023",
    what: "first projects on my own",
    slugs: ["overcastly", "tokyotaste", "tacticplay", "nostra"],
  },
  {
    year: "2024",
    what: "led credify, built in a month; it won the network18 track at google's gen ai exchange",
    slugs: ["credify", "votegrity", "getresume", "kalendar"],
  },
  {
    year: "2025",
    what: "finished computer science at ccet, panjab university, and kept building",
    slugs: ["inquora", "retask", "resummarize", "flockr"],
  },
  {
    year: "2026",
    what: "joined wednesday in feb 2026; forward deployed on a us client's ai video platform since june, and polaris on my own time",
    slugs: ["project-sleeve", "quickgist"],
  },
] as const;

/** The tools behind the work, grouped by layer. A tool's icon is its own logo, where one exists. */
export const STACK = [
  {
    layer: "frontend",
    tools: [
      { name: "typescript" },
      { name: "react", icon: RiReactjsLine },
      { name: "next.js", icon: RiNextjsLine },
    ],
  },
  {
    layer: "backend",
    tools: [
      { name: "python" },
      { name: "fastapi" },
      { name: "node.js", icon: RiNodejsLine },
      { name: "postgres" },
      { name: "pgvector" },
      { name: "supabase", icon: RiSupabaseLine },
    ],
  },
  { layer: "ai", tools: [{ name: "langgraph" }, { name: "litellm" }, { name: "rag pipelines" }] },
  {
    layer: "infra",
    tools: [
      { name: "aws", icon: RiAmazonLine },
      { name: "terraform" },
      { name: "gcp", icon: RiGoogleLine },
      { name: "docker" },
    ],
  },
  { layer: "mobile", tools: [{ name: "react native", icon: RiReactjsLine }, { name: "kotlin" }] },
] as const;
