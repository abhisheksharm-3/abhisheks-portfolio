"use server"
import { Project } from "@/lib/types";

const GITHUB_USERNAME = "abhisheksharm-3";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface Repository {
  name: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

export interface GitHubUser {
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: ContributionWeek[];
    };
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
}

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  contributions: number;
  contributionCalendar: ContributionWeek[];
  topLanguages: string[];
  followers: number;
  following: number;
}

/**
 * Fetches comprehensive statistics, including the contribution calendar,
 * from the GitHub GraphQL API.
 * Requires a GITHUB_ACCESS_TOKEN in your environment variables.
 */
export async function fetchGitHubStats(): Promise<GitHubStats> {
  const githubToken = process.env.GITHUB_ACCESS_TOKEN;

  if (!githubToken) {
    console.error("Missing GITHUB_ACCESS_TOKEN in environment variables.");
    throw new Error("Missing GitHub credentials. Cannot fetch stats.");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
              totalCount
              nodes {
                name
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                createdAt
                updatedAt
                isPrivate
              }
            }
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      `,
      variables: {
        username: GITHUB_USERNAME,
        // Get contributions from exactly one year ago to now, ensuring we include the current month
        from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
      },
    }),
    next: { revalidate: 3600 }, // Cache the response for 1 hour
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to fetch GitHub data:", errorBody);
    throw new Error(`Failed to fetch GitHub data: ${response.statusText}`);
  }
  
  const json = await response.json();
  
  if (json.errors) {
    console.error("GitHub API GraphQL Errors:", json.errors);
    throw new Error(`GitHub API errors: ${JSON.stringify(json.errors)}`);
  }
  
  if (!json.data || !json.data.user) {
    console.error("Unexpected response structure from GitHub API:", json);
    throw new Error("Invalid data structure received from GitHub API.");
  }
  
  const user: GitHubUser = json.data.user;

  const totalStars = user.repositories.nodes.reduce(
    (acc: number, repo: Repository) => acc + repo.stargazerCount, 0
  );

  // Extract unique languages with proper typing
  const languages = user.repositories.nodes
    .filter((repo: Repository) => repo.primaryLanguage !== null)
    .map((repo: Repository) => repo.primaryLanguage!.name);
  const topLanguages: string[] = [...new Set(languages)].slice(0, 10);

  return {
    publicRepos: user.repositories.totalCount,
    totalStars,
    contributions: user.contributionsCollection.contributionCalendar.totalContributions,
    contributionCalendar: user.contributionsCollection.contributionCalendar.weeks,
    topLanguages,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
  };
}

/**
 * Calculates technical expertise metrics based on projects and GitHub stats.
 * @param projects - Array of projects to analyze
 * @param githubStats - GitHub statistics data
 * @returns Technical expertise data based on actual project and GitHub data
 */
export const calculateTechnicalExpertise = async (
  projects: Project[], 
  githubStats: GitHubStats
): Promise<Array<{
  technology: string;
  fullName: string;
  value: number;
  normalized: number;
}>> => {
  // Analyze technologies from projects
  const projectTechnologies = new Map<string, number>();
  
  projects.forEach(project => {
    if (project.tags && project.tags.length > 0) {
      project.tags.forEach((tech: string) => {
        const category = categorizeLanguage(tech);
        projectTechnologies.set(category, (projectTechnologies.get(category) || 0) + 1);
      });
    }
  });

  // Analyze GitHub languages
  const githubLanguageWeights = new Map<string, number>();
  githubStats.topLanguages.forEach((lang, index) => {
    const category = categorizeLanguage(lang);
    // Weight earlier languages more heavily (they're sorted by usage)
    const weight = Math.max(1, githubStats.topLanguages.length - index);
    githubLanguageWeights.set(category, (githubLanguageWeights.get(category) || 0) + weight);
  });

  // Combine and normalize scores
  const allCategories = [
    "Frontend", "Backend", "Mobile", "AI/ML", "DevOps", "Blockchain"
  ];

  const results = allCategories.map(category => {
    const projectScore = projectTechnologies.get(category) || 0;
    const githubScore = githubLanguageWeights.get(category) || 0;
    const combinedScore = projectScore * 2 + githubScore; // Weight projects more heavily
    
    return {
      technology: category,
      fullName: getCategoryFullName(category),
      value: combinedScore,
      normalized: Math.min(100, Math.max(0, combinedScore * 10)) // Scale to 0-100
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
  
  if (['javascript', 'typescript', 'react', 'vue', 'angular', 'html', 'css', 'sass', 'scss', 'tailwind'].includes(tech)) {
    return "Frontend";
  }
  if (['node.js', 'python', 'java', 'c#', 'go', 'rust', 'php', 'ruby', 'express', 'django', 'spring'].includes(tech)) {
    return "Backend";
  }
  if (['react native', 'flutter', 'swift', 'kotlin', 'dart', 'ionic'].includes(tech)) {
    return "Mobile";
  }
  if (['python', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'jupyter'].includes(tech)) {
    return "AI/ML";
  }
  if (['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'jenkins', 'github actions'].includes(tech)) {
    return "DevOps";
  }
  if (['solidity', 'web3', 'ethereum', 'blockchain', 'smart contracts'].includes(tech)) {
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
    "Frontend": "Frontend Development",
    "Backend": "Backend Development", 
    "Mobile": "Mobile Development",
    "AI/ML": "AI & Machine Learning",
    "DevOps": "DevOps & Cloud",
    "Blockchain": "Blockchain & Web3"
  };
  return mapping[category] || category;
};