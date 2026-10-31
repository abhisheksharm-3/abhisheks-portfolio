import { BookOpen, Camera, Music } from "lucide-react";

/**
 * Personal interests and hobbies data
 */
export const PERSONAL_INTERESTS = [
  {
    category: "Photography",
    icon: Camera,
    description:
      "got into the habit of clicking random city corners and skies. my gallery is basically 70% cloud pics at this point.",
    tags: ["Street", "Nature", "Golden Hour"],
  },
  {
    category: "Reading",
    icon: BookOpen,
    description:
      "currently juggling naval's almanack and the courage to be disliked. i like books that make you pause mid-page and rethink stuff.",
    tags: ["Philosophy", "Self-Growth", "Business"],
  },
  {
    category: "Music",
    icon: Music,
    description:
      "lo-fi for deep work, rock when i'm stuck debugging, and the occasional classical binge when i need a brain reset.",
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
      "own problems from discovery to deployment. since june 2026, a client's ai video platform at ~$200k mrr: stripe billing and plan migrations, a sales checkout, social analytics, render fixes, and 42 production releases. before that, re-architected a us edtech client's grading platform on spring boot and aws (ecs, sqs, terraform), built an autonomous content engine (langgraph, fastapi, pgvector), and prototyped hands-free voice mode for off grid in a week. passed probation.",
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
      "led a three-person team on 'credify', a media verification tool: it hashes content to trace the first uploader, flags forgeries, and fact-checks with gemini. one intense month on next.js and fastapi, and we won the track.",
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
      "graduated with an 8.31 cgpa. learnt my foundations in cs, but honestly most growth came from side projects and hackathons i kept grinding on.",
    badges: [{ label: "CGPA", value: "8.31" }],
  },
] as const;
