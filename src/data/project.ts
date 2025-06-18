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
    title: "React Design System",
    slug: "react-design-system",
    description: "A comprehensive, accessible component library built with React and TypeScript featuring 40+ components with thorough documentation and theming support.",
    longDescription: "This design system provides a complete set of UI primitives to build modern web applications with consistent design language. Includes dark mode support, responsive components, and comprehensive accessibility features.",
    imageSrc: "/projects/design-system.jpg",
    tags: ["React", "TypeScript", "Storybook", "Accessibility", "Design System"],
    year: "2024",
    url: "https://design-system-demo.dev",
    github: "https://github.com/abhisheksharm-3/react-design-system",
    featured: true,
    role: "Lead Developer",
    client: "Open Source",
    duration: "6 months"
  },
  {
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "Full-stack solution with server-side rendering, optimized performance metrics and clean UI designed to handle thousands of products with minimal load times.",
    longDescription: "Built with Next.js, this platform features inventory management, payment processing with Stripe, dynamic product filtering, and a responsive admin dashboard. Implements performance optimizations including image optimization, code splitting and effective caching strategies.",
    imageSrc: "/projects/ecommerce.jpg",
    tags: ["Next.js", "MongoDB", "Stripe API", "Redux", "Performance"],
    year: "2023",
    url: "https://shop-demo.vercel.app",
    github: "https://github.com/abhisheksharm-3/ecommerce-platform",
    featured: true,
    role: "Full Stack Developer",
    client: "RetailTech Inc.",
    duration: "4 months"
  },
  {
    title: "AI Content Dashboard",
    slug: "ai-content-dashboard",
    description: "Analytics dashboard for AI-generated content performance with real-time metrics, visualization tools, and customizable reporting features.",
    longDescription: "This application helps content creators monitor and optimize AI-generated content across multiple platforms. Features include sentiment analysis, engagement tracking, and predictive analytics for content performance.",
    imageSrc: "/projects/ai-dashboard.jpg",
    tags: ["React", "D3.js", "Node.js", "Machine Learning", "WebSockets"],
    year: "2024",
    url: "https://ai-metrics-dash.vercel.app",
    featured: true,
    role: "Frontend Developer & Data Visualization",
    client: "ContentAI Labs",
    duration: "3 months"
  },
  {
    title: "Portfolio Website Template",
    slug: "portfolio-template",
    description: "A minimalist, high-performance portfolio template for developers with dark mode, animations, and blog capabilities built on modern web technologies.",
    longDescription: "This template provides developers with a ready-to-use portfolio solution featuring smooth page transitions, responsive design, markdown blog support, and performance optimization techniques.",
    imageSrc: "/projects/portfolio.jpg",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "MDX"],
    year: "2023",
    url: "https://dev-portfolio-template.vercel.app",
    github: "https://github.com/abhisheksharm-3/dev-portfolio",
    featured: false,
    role: "Designer & Developer",
    duration: "2 months"
  }
];

export const allProjects: Project[] = [
  ...featuredProjects,
  {
    title: "Weather Forecast App",
    slug: "weather-app",
    description: "Minimal weather application with location detection and detailed 7-day forecasts using modern weather APIs and clean visualization.",
    imageSrc: "/projects/weather-app.jpg",
    tags: ["React", "Weather API", "Geolocation", "PWA"],
    year: "2023",
    url: "https://weather-forecast-demo.netlify.app",
    github: "https://github.com/abhisheksharm-3/weather-app",
    featured: false,
    role: "Frontend Developer"
  },
  {
    title: "Task Management System",
    slug: "task-management",
    description: "Collaborative task management solution with Kanban boards, team assignments, and progress tracking features for remote teams.",
    imageSrc: "/projects/task-manager.jpg",
    tags: ["Vue.js", "Firebase", "Real-time", "Authentication"],
    year: "2022",
    url: "https://task-flow-demo.web.app",
    featured: false,
    role: "Full Stack Developer",
    client: "Remote Work Solutions",
    duration: "3 months"
  }
];