"use server";

import { projects } from "@/data/project";
import { ProjectType } from "@/lib/types";
import {
  GitHubStats,
  GitHubUser,
  Repository,
  TechnicalExpertise,
  CombinedStats,
} from "@/lib/types/stats";
import { calculateProjectStats, calculateTechnicalExpertise } from "@/lib/stats";

const GITHUB_USERNAME = "abhisheksharm-3";

// ============================================================================
// GITHUB STATS SERVER ACTIONS
// ============================================================================

/**
 * Fetches comprehensive GitHub statistics using the GraphQL API.
 * Requires a GITHUB_ACCESS_TOKEN in your environment variables.
 * @returns GitHub statistics including repos, stars, contributions, and languages
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
    (acc: number, repo: Repository) => acc + repo.stargazerCount,
    0,
  );

  // Extract unique languages with proper typing
  const languages = user.repositories.nodes
    .filter((repo: Repository) => repo.primaryLanguage !== null)
    .map((repo: Repository) => repo.primaryLanguage!.name);
  const topLanguages: string[] = [...new Set(languages)].slice(0, 10);

  return {
    publicRepos: user.repositories.totalCount,
    totalStars,
    contributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    contributionCalendar:
      user.contributionsCollection.contributionCalendar.weeks,
    topLanguages,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
  };
}

// ============================================================================
// COMBINED STATS SERVER ACTIONS
// ============================================================================

/**
 * Fetches and calculates all statistics in one function call.
 * This is useful when you need all stats data together.
 * @returns Combined statistics including project stats, GitHub stats, and technical expertise
 */
export async function fetchAllStats(): Promise<CombinedStats> {
  const projectStats = calculateProjectStats();
  const githubStats = await fetchGitHubStats();
  const technicalExpertise = await calculateTechnicalExpertise(
    projects,
    githubStats,
  );

  return {
    projectStats,
    githubStats,
    technicalExpertise,
  };
}
