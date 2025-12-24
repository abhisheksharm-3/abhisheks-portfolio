import { Camera, BookOpen, Music, Gamepad, Film, Coffee } from "lucide-react";

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
  {
    category: "Gaming",
    icon: Gamepad,
    description:
      "valorant for the chaos, rdr2 for the escape. honestly the best way to cool down after a long coding session.",
    tags: ["Valorant", "RDR2", "Far Cry 4"],
  },
  {
    category: "Sci-Fi Media",
    icon: Film,
    description:
      "obsessed with sci-fi that feels a little too close to reality. interstellar and the martian are on permanent rewatch.",
    tags: ["Interstellar", "The Martian", "Inception"],
  },
  {
    category: "Exploration",
    icon: Coffee,
    description:
      "weekends = wandering streets, chasing food stalls, or finding low-key cafes to sit and code/read for hours.",
    tags: ["Cafes", "Street Food", "City Walks"],
  },
] as const;

/**
 * Professional experience data
 */
export const EXPERIENCE_DATA = [
  {
    title: "Software Development Intern",
    subtitle: "Stardom",
    date: "Jan 2025 – Jun 2025",
    description:
      "took charge of building stardom's web presence from scratch with next.js. tweaked and tuned the frontend till it actually felt fast. also set up their cloud infra + email systems — basically made sure things didn't break when people actually started using it.",
  },
  {
    title: "Winner – Network18 Track",
    subtitle: "Gen AI Exchange Hackathon (Google)",
    date: "Oct 2024",
    description:
      "built 'credify', an ai-powered media verification tool. we hacked together machine learning + attribution logic to fight fake media — ended up winning the track. intense 1 month, but super worth it.",
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
  {
    title: "12th Grade (CBSE)",
    subtitle: "Mount Carmel School, Chandigarh",
    date: "2021",
    description:
      "science + math focus. scored 92.4% — lots of late-night physics + coding side quests.",
    badges: [{ label: "Score", value: "92.4%" }],
  },
  {
    title: "10th Grade (CBSE)",
    subtitle: "Mount Carmel School, Chandigarh",
    date: "2019",
    description:
      "strong academics (92.2%) but also when i really got hooked on tinkering with computers beyond the classroom.",
    badges: [{ label: "Score", value: "92.2%" }],
  },
] as const;
