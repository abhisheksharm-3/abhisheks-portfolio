import {
  Code,
  Terminal,
  Database,
  Cloud,
  Smartphone,
  Brain,
  Globe,
} from "lucide-react";

/**
 * Skills displayed in the Hero section
 */
export const HERO_SKILLS = [
  "Frontend Engineering (React & Next.js)",
  "Backend & APIs (Node.js, Go, FastAPI)",
  "AI Agents & Pipelines (LangGraph, LiteLLM)",
  "Cloud & DevOps (AWS, GCP, Docker, Firebase)",
  "Mobile Development (Jetpack Compose, React Native)",
] as const;

/**
 * Detailed expertise breakdown for the Skills/Expertise section
 */
export const EXPERTISE = [
  {
    icon: Code,
    title: "frontend stuff",
    description:
      "i like making interfaces that don't feel like a chore to use. from quick hackathon mvp's to dashboards people actually enjoy, react/next/svelte is where i live. clean code, smooth ux, no dead weight.",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
    level: "pretty sharp",
  },
  {
    icon: Terminal,
    title: "backend & apis",
    description:
      "been in the trenches with fastapi, flask, go, node. wired up auth, storage, serverless with appwrite. i care about speed + resilience, not overengineering.",
    skills: ["Node.js", "Express.js", "FastAPI", "Flask", "Go", "Appwrite"],
    level: "solid",
  },
  {
    icon: Database,
    title: "data & storage",
    description:
      "postgresql for production work (with pgvector for vector search). mongo, neo4j, mysql, supabase for various projects. i care about the data being retrievable and fast, not just stored.",
    skills: ["PostgreSQL", "pgvector", "MongoDB", "MySQL", "Supabase", "Neo4j"],
    level: "comfortable",
  },
  {
    icon: Brain,
    title: "ai, rag & agents",
    description:
      "building production multi-agent pipelines at work. langgraph for orchestration, pgvector for retrieval, litellm for model routing. from personal rag apps to shipped autonomous pipelines.",
    skills: ["LangGraph", "LangChain", "LiteLLM", "pgvector", "RAG", "Claude API"],
    level: "deep",
  },
  {
    icon: Cloud,
    title: "cloud & devops",
    description:
      "deployed full aws stacks with terraform from scratch. ecs fargate, sqs, rds, cognito, cloudwatch. gcp for cloud run jobs. load tested with k6. can get infra live and keep it that way.",
    skills: ["AWS (ECS, SQS, Terraform)", "GCP", "Docker", "Railway", "Vercel", "CI/CD"],
    level: "solid",
  },
  {
    icon: Smartphone,
    title: "mobile builds",
    description:
      "android apps in jetpack compose, cross-platform in react native with expo. spent a week on off grid, wednesday's offline ai app: fixed a broken tts lifecycle, built sentence-chunked synthesis/playback, benchmarked kokoro/piper/native tts, and added hands-free voice chat with hardware aec interruption handling.",
    skills: ["React Native", "Jetpack Compose", "Expo", "TTS Streaming", "Hardware AEC"],
    level: "building",
  },
  {
    icon: Globe,
    title: "languages i speak (code)",
    description:
      "comfortable hopping across js/ts/python/c++/go/kotlin. i don't marry languages, i just use what gets the job done cleanly.",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Go", "Kotlin"],
    level: "fluent",
  },
] as const;
