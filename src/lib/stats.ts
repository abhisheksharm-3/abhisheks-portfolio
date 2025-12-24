import { projects } from "@/data/project";
import { ProjectStats } from "@/lib/types/stats";

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

/**
 * Utility function to get project statistics synchronously.
 * Use this when you only need project stats without GitHub data.
 * @returns Project statistics
 */
export function getProjectStatsSync(): ProjectStats {
  return calculateProjectStats();
}

