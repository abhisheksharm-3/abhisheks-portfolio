import { projects } from "@/data/project";
import { ProjectType } from "@/lib/types";
import {
  ProjectStats,
  GitHubStats,
  TechnicalExpertise,
} from "@/lib/types/stats";

const GITHUB_USERNAME = "abhisheksharm-3";

// ============================================================================
// PROJECT STATS FUNCTIONS
// ============================================================================

/**
 * Calculates comprehensive project statistics from the projects data.
 * @returns Project statistics including counts, breakdowns, and metrics
 */
export function calculateProjectStats(): ProjectStats {
  const currentYear = new Date().getFullYear();

  // Basic counts from actual data
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.building).length;

  // Yearly breakdown
  const yearlyBreakdown = Object.entries(
    projects.reduce(
      (acc, project) => {
        acc[project.year] = (acc[project.year] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  )
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  // Technology breakdown
  const techCounts = projects.reduce(
    (acc, project) => {
      project.tags.forEach((tech) => {
        acc[tech] = (acc[tech] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const technologyBreakdown = Object.entries(techCounts)
    .map(([technology, count]) => ({
      technology,
      count,
      percentage: Math.round((count / totalProjects) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 technologies

  // Diversity score based on different project types
  const projectTypes = new Set(
    projects.map((p) => {
      if (
        p.tags.some((tag) =>
          ["Machine Learning", "AI", "TensorFlow", "PyTorch"].includes(tag),
        )
      )
        return "AI/ML";
      if (
        p.tags.some((tag) =>
          ["Android", "React Native", "Flutter", "iOS"].includes(tag),
        )
      )
        return "Mobile";
      if (
        p.tags.some((tag) =>
          ["Web3", "Solidity", "Blockchain", "Ethereum"].includes(tag),
        )
      )
        return "Blockchain";
      if (
        p.tags.some((tag) =>
          ["NextJs", "React", "Vue", "Angular"].includes(tag),
        )
      )
        return "Web";
      if (
        p.tags.some((tag) =>
          ["Python", "FastAPI", "Node.js", "Express"].includes(tag),
        )
      )
        return "Backend";
      return "Other";
    }),
  );
  const diversityScore = Math.round((projectTypes.size / 6) * 100);

  const currentInternshipStatus = "Fresh off SDE Internship @ Stardom";
  const mostActiveYear =
    yearlyBreakdown.length > 0
      ? yearlyBreakdown[0].year
      : currentYear.toString();

  return {
    totalProjects,
    activeProjects,
    yearlyBreakdown,
    technologyBreakdown,
    diversityScore,
    currentInternshipStatus,
    mostActiveYear,
  };
}

// ============================================================================
// GITHUB STATS FUNCTIONS
// ============================================================================


// ============================================================================
// TECHNICAL EXPERTISE FUNCTIONS
// ============================================================================

/**
 * Calculates technical expertise metrics based on projects and GitHub stats.
 * @param projects - Array of projects to analyze
 * @param githubStats - GitHub statistics data
 * @returns Technical expertise data based on actual project and GitHub data
 */
export const calculateTechnicalExpertise = async (
  projects: ProjectType[],
  githubStats: GitHubStats,
): Promise<TechnicalExpertise[]> => {
  // Analyze technologies from projects
  const projectTechnologies = new Map<string, number>();

  projects.forEach((project) => {
    if (project.tags && project.tags.length > 0) {
      project.tags.forEach((tech: string) => {
        const category = categorizeLanguage(tech);
        projectTechnologies.set(
          category,
          (projectTechnologies.get(category) || 0) + 1,
        );
      });
    }
  });

  // Analyze GitHub languages
  const githubLanguageWeights = new Map<string, number>();
  githubStats.topLanguages.forEach((lang, index) => {
    const category = categorizeLanguage(lang);
    // Weight earlier languages more heavily (they're sorted by usage)
    const weight = Math.max(1, githubStats.topLanguages.length - index);
    githubLanguageWeights.set(
      category,
      (githubLanguageWeights.get(category) || 0) + weight,
    );
  });

  // Combine and normalize scores
  const allCategories = [
    "Frontend",
    "Backend",
    "Mobile",
    "AI/ML",
    "DevOps",
    "Blockchain",
  ];

  const results = allCategories.map((category) => {
    const projectScore = projectTechnologies.get(category) || 0;
    const githubScore = githubLanguageWeights.get(category) || 0;
    const combinedScore = projectScore * 2 + githubScore; // Weight projects more heavily

    return {
      technology: category,
      fullName: getCategoryFullName(category),
      value: combinedScore,
      normalized: Math.min(100, Math.max(0, combinedScore * 10)), // Scale to 0-100
    };
  });

  return results.sort((a, b) => b.normalized - a.normalized);
};

/**
 * Categorizes a programming language or technology into broader categories.
 * @param technology - The technology name to categorize
 * @returns The category name
 */
const categorizeLanguage = (technology: string): string => {
  const tech = technology.toLowerCase();

  if (
    [
      "javascript",
      "typescript",
      "react",
      "vue",
      "angular",
      "html",
      "css",
      "sass",
      "scss",
      "tailwind",
    ].includes(tech)
  ) {
    return "Frontend";
  }
  if (
    [
      "node.js",
      "python",
      "java",
      "c#",
      "go",
      "rust",
      "php",
      "ruby",
      "express",
      "django",
      "spring",
    ].includes(tech)
  ) {
    return "Backend";
  }
  if (
    ["react native", "flutter", "swift", "kotlin", "dart", "ionic"].includes(
      tech,
    )
  ) {
    return "Mobile";
  }
  if (
    [
      "python",
      "tensorflow",
      "pytorch",
      "scikit-learn",
      "pandas",
      "numpy",
      "jupyter",
    ].includes(tech)
  ) {
    return "AI/ML";
  }
  if (
    [
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "gcp",
      "terraform",
      "jenkins",
      "github actions",
    ].includes(tech)
  ) {
    return "DevOps";
  }
  if (
    ["solidity", "web3", "ethereum", "blockchain", "smart contracts"].includes(
      tech,
    )
  ) {
    return "Blockchain";
  }

  // Default to Backend for unknown technologies
  return "Backend";
};

/**
 * Gets the full name for a technology category.
 * @param category - The category short name
 * @returns The full category name
 */
const getCategoryFullName = (category: string): string => {
  const mapping: Record<string, string> = {
    Frontend: "Frontend Development",
    Backend: "Backend Development",
    Mobile: "Mobile Development",
    "AI/ML": "AI & Machine Learning",
    DevOps: "DevOps & Cloud",
    Blockchain: "Blockchain & Web3",
  };
  return mapping[category] || category;
};

// ============================================================================
// COMBINED STATS FUNCTIONS
// ============================================================================


/**
 * Utility function to get project statistics synchronously.
 * Use this when you only need project stats without GitHub data.
 * @returns Project statistics
 */
export function getProjectStatsSync(): ProjectStats {
  return calculateProjectStats();
}
