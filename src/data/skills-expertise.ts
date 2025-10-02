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
  "Cloud & DevOps (AWS, Docker, Firebase)",
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
      "played with all flavors of dbs — mysql, mongo, neo4j. lately into vector search + rag pipelines. i enjoy making data not just stored, but useful.",
    skills: ["MongoDB", "Neo4j", "MySQL", "Firebase", "Appwrite", "Vector DBs"],
    level: "comfortable",
  },
  {
    icon: Brain,
    title: "ai, rag & agents",
    description:
      "built ai-native apps like inquora + kalendar. i get how to talk to llms, chain them up, and make them actually do things. not just hype, actual shipped stuff.",
    skills: ["RAG Pipelines", "AI Agents", "LangChain", "Gemini API", "LLMs"],
    level: "hands-on",
  },
  {
    icon: Cloud,
    title: "cloud & devops",
    description:
      "spun things up on aws, vercel, docker. set up ci/cd so i don't babysit deploys. not a devops guru, but i can get apps live and scaling without drama.",
    skills: ["AWS", "Docker", "Vercel", "Firebase", "CI/CD"],
    level: "getting there",
  },
  {
    icon: Smartphone,
    title: "mobile builds",
    description:
      "made minimal android apps with jetpack compose (retask) and cross-platform stuff in react native. focus is always offline-first + uncluttered.",
    skills: ["Jetpack Compose", "Kotlin", "React Native", "Expo"],
    level: "dabbling",
  },
  {
    icon: Globe,
    title: "languages i speak (code)",
    description:
      "comfortable hopping across js/ts/python/c++/go/kotlin. i don't marry languages — i just use what gets the job done cleanly.",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Go", "Kotlin"],
    level: "fluent",
  },
] as const;

/**
 * Skills animation configurations
 */
export const SKILLS_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
} as const;
