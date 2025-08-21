import { Code, Terminal, Database, Cloud, Smartphone, Brain, Globe } from "lucide-react";
import { Service } from "@/lib/types";

/**
 * The single source of truth for all skills and services data across the application.
 */
export const SERVICES: Service[] = [
  {
    icon: <Code />,
    title: "Frontend Engineering",
    description: "Building polished, performant UIs with React, Next.js, and SvelteKit. From hackathon-winning prototypes to SaaS dashboards, I focus on clean code and delightful UX.",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
    level: "Specialist",
  },
  {
    icon: <Terminal />,
    title: "Backend & APIs",
    description: "Designing resilient APIs and backend systems with FastAPI, Flask, Go, and Node.js. Integrated Appwrite for auth, storage, and serverless workflows.",
    skills: ["Node.js", "Express.js", "FastAPI", "Flask", "Go", "Appwrite"],
    level: "Advanced",
  },
  {
    icon: <Database />,
    title: "Data & Storage",
    description: "Worked across relational (MySQL), NoSQL (MongoDB), and graph (Neo4j) databases. Implemented vector search pipelines for RAG apps.",
    skills: ["MongoDB", "Neo4j", "MySQL", "Firebase", "Appwrite", "Vector DBs"],
    level: "Proficient",
  },
  {
    icon: <Brain />,
    title: "AI, RAG & Agents",
    description: "Built AI-native applications like Inquora (RAG) and Kalendar (Gemini-powered). Skilled in prompt engineering, agentic workflows, and integrating LLMs.",
    skills: ["RAG Pipelines", "AI Agents", "LangChain", "Gemini API", "LLMs"],
    level: "Advanced",
  },
  {
    icon: <Cloud />,
    title: "Cloud & DevOps",
    description: "Deployed and scaled applications across AWS, Vercel, and Docker. Automated CI/CD pipelines and managed infra, focusing on fast, reproducible deploys.",
    skills: ["AWS", "Docker", "Vercel", "Firebase", "CI/CD"],
    level: "Intermediate",
  },
  {
    icon: <Smartphone />,
    title: "Mobile Development",
    description: "Created distraction-free Android apps with Jetpack Compose (Retask) and cross-platform prototypes with React Native, focusing on offline-first experiences.",
    skills: ["Jetpack Compose", "Kotlin", "React Native", "Expo"],
    level: "Intermediate",
  },
  // Added from the About page's list
  {
    icon: <Globe />,
    title: "Programming Languages",
    description: "Proficiency across multiple programming languages for diverse application development, from web and mobile to systems programming.",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Go", "Kotlin"],
    level: "Proficient",
  }
];