import { Brain, Cloud, Code, Smartphone, Terminal } from "lucide-react";

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
      "built a 26-agent content engine at work on langgraph and fastapi, with human review on postgres checkpoints. pgvector for retrieval, openrouter fallback chains for model routing. from personal rag apps to agent systems that publish their own pull requests.",
    skills: ["LangGraph", "LangChain", "LiteLLM", "pgvector", "RAG", "Claude API"],
  },
  {
    icon: Code,
    title: "frontend",
    description:
      "react and next.js for most of it: a sales checkout and analytics pages on a client's live platform, a grading ui with in-browser pdf annotation, and this site. svelte for small things.",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
  },
  {
    icon: Terminal,
    title: "backend, apis & data",
    description:
      "spring boot and java 21 for a client's grading api (105 endpoints), fastapi for agent backends, go and node on the side. postgres everywhere, with row-level security doing the authorization, plus mongo and neo4j where they fit.",
    skills: ["Spring Boot", "FastAPI", "Go", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    icon: Cloud,
    title: "cloud & devops",
    description:
      "provisioned a client's aws stack alone in terraform: 121 resources across 3 environments, ecs fargate, sqs with dead-letter queues, rds, cognito, and 20 alarms. load tested it with k6 at 100 concurrent graders. gcp for cloud run jobs.",
    skills: ["AWS (ECS, SQS, Terraform)", "GCP", "Docker", "Railway", "Vercel", "CI/CD"],
  },
  {
    icon: Smartphone,
    title: "mobile",
    description:
      "android apps in jetpack compose (flockr, 22 releases to v2.0.0), cross-platform in react native with expo. spent a week prototyping hands-free voice mode for off grid, wednesday's offline ai app: six swappable tts engines, sentence-by-sentence synthesis, and barge-in on hardware echo cancellation. the shipped voice mode drew on it.",
    skills: ["React Native", "Jetpack Compose", "Expo", "TTS Streaming", "Hardware AEC"],
  },
] as const;
