import { Brain, Cloud, Code, Database, Globe, Smartphone, Terminal } from "lucide-react";

/**
 * Skills displayed in the Hero section
 */
export const HERO_SKILLS = [
  "frontend",
  "backend & apis",
  "ai agents",
  "cloud & devops",
  "mobile",
] as const;

/**
 * Detailed expertise breakdown for the Skills/Expertise section
 */
export const EXPERTISE = [
  {
    icon: Brain,
    title: "ai, rag & agents",
    description:
      "building production multi-agent pipelines at work. langgraph for orchestration, pgvector for retrieval, litellm for model routing. from personal rag apps to shipped autonomous pipelines.",
    skills: ["LangGraph", "LangChain", "LiteLLM", "pgvector", "RAG", "Claude API"],
  },
  {
    icon: Code,
    title: "frontend stuff",
    description:
      "i like making interfaces that don't feel like a chore to use. from quick hackathon mvp's to dashboards people actually enjoy, react/next/svelte is where i live. clean code, smooth ux, no dead weight.",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
  },
  {
    icon: Terminal,
    title: "backend, apis & data",
    description:
      "fastapi, flask, go, node in the trenches: auth, storage, serverless. postgres with pgvector in production, plus mongo, neo4j and supabase where they fit. speed and resilience over overengineering.",
    skills: ["FastAPI", "Go", "Node.js", "PostgreSQL", "pgvector", "Supabase"],
  },
  {
    icon: Cloud,
    title: "cloud & devops",
    description:
      "deployed full aws stacks with terraform from scratch. ecs fargate, sqs, rds, cognito, cloudwatch. gcp for cloud run jobs. load tested with k6. can get infra live and keep it that way.",
    skills: ["AWS (ECS, SQS, Terraform)", "GCP", "Docker", "Railway", "Vercel", "CI/CD"],
  },
  {
    icon: Smartphone,
    title: "mobile builds",
    description:
      "android apps in jetpack compose, cross-platform in react native with expo. spent a week on off grid, wednesday's offline ai app: fixed a broken tts lifecycle, built sentence-chunked synthesis/playback, benchmarked kokoro/piper/native tts, and added hands-free voice chat with hardware aec interruption handling.",
    skills: ["React Native", "Jetpack Compose", "Expo", "TTS Streaming", "Hardware AEC"],
  },
] as const;
