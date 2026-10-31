import { BookOpen, Camera, Music } from "lucide-react";

/**
 * Personal interests and hobbies data
 */
export const PERSONAL_INTERESTS = [
  {
    category: "Photography",
    icon: Camera,
    description: "i photograph city corners and skies. my gallery is mostly clouds.",
    tags: ["Street", "Nature", "Golden Hour"],
  },
  {
    category: "Reading",
    icon: BookOpen,
    description:
      "recent reads: the almanack of naval ravikant and the courage to be disliked. mostly books that change how i think about work.",
    tags: ["Philosophy", "Self-Growth", "Business"],
  },
  {
    category: "Music",
    icon: Music,
    description: "lo-fi while i work, plus rock and classical.",
    tags: ["Lo-fi", "Rock", "Classical"],
  },
] as const;

/**
 * Professional experience data
 */
export const EXPERIENCE_DATA = [
  {
    title: "Associate Forward Deployed Engineer",
    subtitle: "Wednesday Solutions",
    date: "Feb 2026 – Present",
    description:
      "since june 2026, a us client's ai video platform with 170+ paying customers and ~$200k mrr: built the analytics module alone from scratch, own stripe billing (modular pricing in 8 days, a sales checkout where 71% of quoted prospects paid), co-built team access, and ran 42 production releases. before that, re-architected a us edtech client's grading platform on spring boot and aws (ecs, sqs, terraform), built an autonomous content engine (langgraph, fastapi, pgvector), and prototyped hands-free voice mode for off grid in a week.",
  },
  {
    title: "Software Development Intern",
    subtitle: "Stardom",
    date: "Jan 2025 – Jun 2025",
    description:
      "built stardom's first web platform from scratch in next.js, with appwrite and react query services and a custom cms built alongside a freelancer. also set up their cloud and email, with netlify deploys on every merge.",
  },
  {
    title: "Winner – Network18 Track",
    subtitle: "Gen AI Exchange Hackathon (Google)",
    date: "Oct 2024",
    description:
      "led a three-person team on credify, a media verification tool: it hashes content to trace the first uploader, flags forgeries, and fact-checks with gemini. built in one month on next.js and fastapi; it won the track.",
  },
] as const;

/**
 * Educational background data
 */
export const EDUCATION_DATA = [
  {
    title: "B.E. in Computer Science & Engineering",
    subtitle: "CCET, Panjab University",
    date: "2021–2025",
    description:
      "graduated with an 8.31 cgpa. alongside the degree: the network18 track win at google's gen ai exchange hackathon and an internal round win at smart india hackathon.",
    badges: [{ label: "CGPA", value: "8.31" }],
  },
] as const;
