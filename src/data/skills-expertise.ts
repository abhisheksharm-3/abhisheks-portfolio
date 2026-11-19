/**
 * Areas of work for the home page: one sentence of proof and the page that shows it.
 * The skills of every area also feed the site's structured data.
 */
export const EXPERTISE = [
  {
    title: "ai, rag & agents",
    proof:
      "a 26-agent content engine on langgraph and fastapi, with human review on postgres checkpoints.",
    link: {
      href: "/writing/langgraph-hitl-postgres-checkpoints-sse",
      label: "how the review step works",
    },
    skills: ["LangGraph", "LangChain", "LiteLLM", "pgvector", "RAG", "Claude API"],
  },
  {
    title: "frontend",
    proof:
      "analytics pages, a sales checkout where 71% of quoted prospects paid, and modular pricing in 8 days on a client's live platform.",
    link: { href: "/projects/ai-video-platform", label: "the ai video platform" },
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
  },
  {
    title: "backend, apis & data",
    proof:
      "authorization lives in postgres row-level security, so a handler that forgets a check still can't read someone else's private gist.",
    link: { href: "/projects/quickgist", label: "quickgist" },
    skills: ["Spring Boot", "FastAPI", "Go", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    title: "cloud & devops",
    proof:
      "self-hosted canvas has no webhooks, so submissions come in through an sqs polling chain with backoff retries and dead-letter queues.",
    link: {
      href: "/writing/canvas-lms-self-hosted-sqs-polling",
      label: "canvas lms self-hosted: polling submissions without kinesis",
    },
    skills: ["AWS (ECS, SQS, Terraform)", "GCP", "Docker", "Railway", "Vercel", "CI/CD"],
  },
  {
    title: "mobile",
    proof: "flockr, an android app in jetpack compose, with 22 releases up to v2.0.0.",
    link: { href: "/projects/flockr", label: "flockr" },
    skills: ["React Native", "Jetpack Compose", "Expo", "TTS Streaming", "Hardware AEC"],
  },
] as const;
