import { Code, Terminal, Database, Smartphone, Cloud, Brain } from "lucide-react";
import { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    icon: <Code />,
    title: "Frontend Engineering",
    description:
      "Building polished, performant UIs with React, Next.js, and SvelteKit. From hackathon-winning prototypes (Credify) to SaaS dashboards (GetResume, WesternFront), I focus on clean code, accessibility, and delightful UX.",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
    level: "Specialist",
  },
  {
    icon: <Terminal />,
    title: "Backend & APIs",
    description:
      "Designing resilient APIs and backend systems with FastAPI, Flask, Go, and Node.js. Integrated Appwrite for auth, storage, and serverless workflows across projects like Kalendar and QuickGist.",
    skills: ["Node.js", "Express.js", "FastAPI", "Flask", "Go", "Appwrite"],
    level: "Advanced",
  },
  {
    icon: <Database />,
    title: "Data & Storage",
    description:
      "Worked across relational, NoSQL, and graph databases — MongoDB, Neo4j, Firebase. Implemented vector search pipelines for RAG apps (Inquora) to enable knowledge retrieval across PDFs, slides, and videos.",
    skills: ["MongoDB", "Neo4j", "Firebase", "Appwrite", "Vector DBs"],
    level: "Proficient",
  },
  {
    icon: <Brain />,
    title: "AI, RAG & Agents",
    description:
      "Built AI-native applications like Inquora (RAG over diverse file types) and Kalendar (Gemini-powered scheduling). Skilled in chaining prompts, orchestrating agents, and integrating LLMs into real-time apps.",
    skills: ["RAG Pipelines", "AI Agents", "LangChain", "Gemini API", "LLMs"],
    level: "Advanced",
  },
  {
    icon: <Cloud />,
    title: "Cloud & DevOps",
    description:
      "Deployed and scaled applications across AWS, Vercel, and Docker. Automated CI/CD pipelines and managed infra at Stardom, focusing on fast, reproducible deploys that don’t block iteration.",
    skills: ["AWS", "Docker", "Vercel", "Firebase", "CI/CD"],
    level: "Intermediate",
  },
  {
    icon: <Smartphone />,
    title: "Mobile Development",
    description:
      "Created distraction-free Android apps with Jetpack Compose (Retask) and cross-platform prototypes with React Native. Focused on offline-first and lightweight user experiences.",
    skills: ["Jetpack Compose", "Kotlin", "React Native", "Expo"],
    level: "Intermediate",
  },
];
