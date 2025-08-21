import { projects, deadProjects } from "@/data/project";

export interface ProjectStats {
  totalProjects: number;
  featuredProjects: number;
  deadProjects: number;
  activeProjects: number;
  completedProjects: number;
  yearlyBreakdown: Array<{ year: string; count: number }>;
  technologyBreakdown: Array<{ technology: string; count: number; percentage: number }>;
  projectsByRole: Array<{ role: string; count: number }>;
  projectsByStatus: Array<{ status: string; count: number; color: string }>;
  averageProjectDuration: string;
  mostUsedTechnologies: string[];
  recentProjects: number;
  totalDeadProjectProgress: number;
  // Real GitHub/Project stats
  githubRepositories: number;
  githubFollowers: number;
  githubFollowing: number;
  programmingLanguages: number;
  featuredProjectsBuilt: string[];
  currentInternshipStatus: string;
  pinnedProjects: number;
  mostActiveYear: string;
  diversityScore: number; // Based on different project types
}

export function calculateProjectStats(): ProjectStats {
  const currentYear = new Date().getFullYear();
  
  // Basic counts
  const totalProjects = projects.length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const deadProjectsCount = deadProjects.length;
  const activeProjects = projects.filter(p => p.building).length;
  const completedProjects = projects.filter(p => !p.building).length;
  const recentProjects = projects.filter(p => parseInt(p.year) === currentYear).length;

  // Yearly breakdown
  const yearlyBreakdown = Object.entries(
    projects.reduce((acc, project) => {
      acc[project.year] = (acc[project.year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Technology breakdown
  const techCounts = projects.reduce((acc, project) => {
    project.tags.forEach(tech => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const technologyBreakdown = Object.entries(techCounts)
    .map(([technology, count]) => ({
      technology,
      count,
      percentage: Math.round((count / totalProjects) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Role breakdown
  const roleCounts = projects.reduce((acc, project) => {
    const role = project.role || 'Developer';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const projectsByRole = Object.entries(roleCounts)
    .map(([role, count]) => ({ role, count }))
    .sort((a, b) => b.count - a.count);

  // Status breakdown
  const projectsByStatus = [
    { status: "Active", count: activeProjects, color: "hsl(var(--chart-1))" },
    { status: "Completed", count: completedProjects, color: "hsl(var(--chart-2))" },
    { status: "Dead", count: deadProjectsCount, color: "hsl(var(--chart-3))" }
  ];

  // Calculate average project duration (simplified)
  const durations = projects
    .map(p => {
      if (!p.duration) return 1;
      
      if (p.duration.includes("Present")) {
        // For ongoing projects, calculate from start to now
        const match = p.duration.match(/(\w+\s+\d{4})/);
        if (match) {
          const startDate = new Date(match[1]);
          const now = new Date();
          return Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
        }
      } else {
        // For completed projects, try to parse duration
        if (p.duration.includes("month")) {
          const monthMatch = p.duration.match(/(\d+)\s+month/);
          return monthMatch ? parseInt(monthMatch[1]) : 1;
        }
      }
      return 1; // Default to 1 month if can't parse
    })
    .filter(d => d > 0);

  const avgDuration = durations.length > 0 
    ? Math.round(durations.reduce((sum, d) => sum + d, 0) / durations.length)
    : 1;
  
  const averageProjectDuration = `${avgDuration} month${avgDuration !== 1 ? 's' : ''}`;

  // Most used technologies (top 5)
  const mostUsedTechnologies = technologyBreakdown
    .slice(0, 5)
    .map(t => t.technology);

  // Total dead project progress
  const totalDeadProjectProgress = deadProjects.reduce((sum, project) => {
    const progress = typeof project.progress === 'string' 
      ? parseInt(project.progress.replace('%', '')) 
      : project.progress || 0;
    return sum + progress;
  }, 0);

  // Real GitHub & Project stats based on your actual data
  const githubRepositories = 52; // From your GitHub
  const githubFollowers = 9; // From your GitHub
  const githubFollowing = 8; // From your GitHub
  
  // Programming languages count from your tech stack
  const uniqueLanguages = new Set([
    'TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'Go'
  ]);
  const programmingLanguages = uniqueLanguages.size;

  // Featured projects you actually built
  const featuredProjectsBuilt = [
    'Credify', 'Inquora', 'QuickGist', 'Retask', 'Kalendar'
  ];

  const currentInternshipStatus = "Fresh off SDE Internship @ Stardom";
  const pinnedProjects = 4; // Based on your pinned repos

  // Most active year based on your data
  const mostActiveYear = yearlyBreakdown.length > 0 ? yearlyBreakdown[0].year : '2024';

  // Diversity score based on different project types (AI, Web, Mobile, etc.)
  const projectTypes = new Set(projects.map(p => {
    if (p.tags.includes('Machine Learning') || p.tags.includes('AI')) return 'AI/ML';
    if (p.tags.includes('Android') || p.tags.includes('React Native')) return 'Mobile';
    if (p.tags.includes('Web3') || p.tags.includes('Solidity')) return 'Blockchain';
    if (p.tags.includes('NextJs') || p.tags.includes('React')) return 'Web';
    return 'Other';
  }));
  const diversityScore = Math.round((projectTypes.size / 5) * 100); // Out of 5 possible types

  return {
    totalProjects,
    featuredProjects,
    deadProjects: deadProjectsCount,
    activeProjects,
    completedProjects,
    yearlyBreakdown,
    technologyBreakdown,
    projectsByRole,
    projectsByStatus,
    averageProjectDuration,
    mostUsedTechnologies,
    recentProjects,
    totalDeadProjectProgress,
    // Real stats
    githubRepositories,
    githubFollowers,
    githubFollowing,
    programmingLanguages,
    featuredProjectsBuilt,
    currentInternshipStatus,
    pinnedProjects,
    mostActiveYear,
    diversityScore
  };
}

// Colors for chart themes
export const chartColors = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))"
};
