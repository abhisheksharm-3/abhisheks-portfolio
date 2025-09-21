import { Camera, BookOpen, Music, Gamepad, Film, Coffee } from "lucide-react";

export const personalInterests = [
  {
    category: "Photography",
    icon: <Camera className="h-5 w-5" />,
    description:
      "Got into the habit of clicking random city corners and skies. My gallery is basically 70% cloud pics at this point.",
    tags: ["Street", "Nature", "Golden Hour"],
  },
  {
    category: "Reading",
    icon: <BookOpen className="h-5 w-5" />,
    description:
      "Currently juggling Naval’s Almanack and The Courage to be Disliked. I like books that make you pause mid-page and rethink stuff.",
    tags: ["Philosophy", "Self-Growth", "Business"],
  },
  {
    category: "Music",
    icon: <Music className="h-5 w-5" />,
    description:
      "Lo-fi for deep work, rock when I’m stuck debugging, and the occasional classical binge when I need a brain reset.",
    tags: ["Lo-fi", "Rock", "Classical"],
  },
  {
    category: "Gaming",
    icon: <Gamepad className="h-5 w-5" />,
    description:
      "Valorant for the chaos, RDR2 for the escape. Honestly the best way to cool down after a long coding session.",
    tags: ["Valorant", "RDR2", "Far Cry 4"],
  },
  {
    category: "Sci-Fi Media",
    icon: <Film className="h-5 w-5" />,
    description:
      "Obsessed with sci-fi that feels a little too close to reality. Interstellar and The Martian are on permanent rewatch.",
    tags: ["Interstellar", "The Martian", "Inception"],
  },
  {
    category: "Exploration",
    icon: <Coffee className="h-5 w-5" />,
    description:
      "Weekends = wandering streets, chasing food stalls, or finding low-key cafes to sit and code/read for hours.",
    tags: ["Cafes", "Street Food", "City Walks"],
  },
];

export const experienceData = [
  {
    title: "Software Development Intern",
    subtitle: "Stardom",
    date: "Jan 2025 – Jun 2025",
    description:
      "Took charge of building Stardom’s web presence from scratch with Next.js. Tweaked and tuned the frontend till it actually felt fast. Also set up their cloud infra + email systems — basically made sure things didn’t break when people actually started using it.",
  },
  {
    title: "Winner – Network18 Track",
    subtitle: "Gen AI Exchange Hackathon (Google)",
    date: "Oct 2024",
    description:
      "Built ‘Credify’, an AI-powered media verification tool. We hacked together Machine Learning + attribution logic to fight fake media — ended up winning the track. Intense 1 month, but super worth it.",
  },
];

export const educationData = [
  {
    title: "B.E. in Computer Science & Engineering",
    subtitle: "CCET, Panjab University",
    date: "2021–2025",
    description:
      "Graduated with an 8.31 CGPA. Learnt my foundations in CS, but honestly most growth came from side projects and hackathons I kept grinding on.",
    badges: [{ label: "CGPA", value: "8.31" }],
  },
  {
    title: "12th Grade (CBSE)",
    subtitle: "Mount Carmel School, Chandigarh",
    date: "2021",
    description:
      "Science + Math focus. Scored 92.4% — lots of late-night physics + coding side quests.",
    badges: [{ label: "Score", value: "92.4%" }],
  },
  {
    title: "10th Grade (CBSE)",
    subtitle: "Mount Carmel School, Chandigarh",
    date: "2019",
    description:
      "Strong academics (92.2%) but also when I really got hooked on tinkering with computers beyond the classroom.",
    badges: [{ label: "Score", value: "92.2%" }],
  },
];
