export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  imageSrc: string;
  tags: string[];
  year: string;
  url?: string;
  github?: string;
  featured: boolean;
  role?: string;
  client?: string;
  duration?: string;
}

export const featuredProjects: Project[] = [
  {
    title: "Credify",
    slug: "credify",
    description: "Media attribution and tampering detection system",
    longDescription: "Led a team of two to win the Gen AI Exchange Hackathon by Google and Devfolio, developing an innovative media attribution and tampering detection system. Managed team dynamics and effectively delegated tasks, ensuring seamless integration of individual contributions towards a winning solution.",
    imageSrc: "/images/projects/credify.png",
    tags: ["NextJs", "React", "TailwindCSS", "TypeScript", "AI", "Google Cloud"],
    year: "2024",
    url: "https://credify.fun/",
    github: "",
    featured: true,
    role: "Team Lead",
    client: "Hackathon Project",
    duration: "October 2024"
  },
  {
    title: "Kalendar",
    slug: "kalendar",
    description: "AI-powered scheduling application using Gemini API",
    longDescription: "Engineered Kalendar, an AI-powered scheduling application leveraging the Gemini API to automate daily scheduling and provide personalized insights. Implemented intelligent scheduling algorithms, resulting in an estimated 50% increase in user productivity through optimized time management.",
    imageSrc: "/images/projects/kalendar.png",
    tags: ["NextJs", "TypeScript", "Gemini API", "Appwrite", "TailwindCSS"],
    year: "2024",
    url: "https://kalendarapp.vercel.app",
    github: "",
    featured: true,
    role: "Solo Developer",
    client: "Personal Project",
    duration: "June 2024 - August 2024"
  },
  {
    title: "QuickGist",
    slug: "quickgist",
    description: "Full-stack code snippet sharing platform",
    longDescription: "Developed a full-stack code snippet sharing platform with a React frontend and Golang backend, delivering sub-100ms response times and 99.9% uptime. Designed a low-latency, scalable file-sharing backend using Firebase Storage to support real-time collaboration. Adopted by 20+ peers for seamless sharing of code and binary files not suited for version control systems.",
    imageSrc: "/images/projects/quickgist.png",
    tags: ["React", "Go", "Firebase", "Real-time", "Collaboration"],
    year: "2024",
    url: "https://quickgist.vercel.app",
    github: "",
    featured: true,
    role: "Full Stack Developer",
    client: "Personal Project",
    duration: "August 2024 - November 2024"
  },
  {
    title: "Retask",
    slug: "retask",
    description: "A no-fluff Android to-do app built with Jetpack Compose",
    longDescription: "A no-fluff Android to-do app built with Jetpack Compose for clean, distraction-free task management. Focused on minimalist UX and performance, tailored to real-life productivity habits.",
    imageSrc: "/images/projects/retask.png",
    tags: ["Jetpack Compose", "Android", "Native", "Room", "Kotlin"],
    year: "2025",
    url: "https://github.com/abhisheksharm-3/retask/releases",
    github: "https://github.com/abhisheksharm-3/retask",
    featured: true,
    role: "Solo Developer",
    client: "Personal Project",
    duration: "March 2025 - Present"
  }
];