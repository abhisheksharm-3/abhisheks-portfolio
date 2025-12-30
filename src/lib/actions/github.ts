"use server";

import {
    GitHubStatsType,
    GitHubUserType,
    RepositoryType,
} from "@/lib/types/stats";

const GITHUB_USERNAME = "abhisheksharm-3";
const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const CACHE_REVALIDATE_SECONDS = 3600;

const GITHUB_STATS_QUERY = `
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
`;

/**
 * Fetches comprehensive GitHub statistics using the GraphQL API.
 * @returns GitHub statistics including repos, stars, contributions, and languages
 * @throws Error if GITHUB_ACCESS_TOKEN is missing or API request fails
 */
export async function fetchGitHubStats(): Promise<GitHubStatsType> {
    const githubToken = process.env.GITHUB_ACCESS_TOKEN;

    if (!githubToken) {
        throw new Error("Missing GITHUB_ACCESS_TOKEN in environment variables.");
    }

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: GITHUB_STATS_QUERY,
            variables: {
                username: GITHUB_USERNAME,
                from: new Date(Date.now() - ONE_YEAR_MS).toISOString(),
                to: new Date().toISOString(),
            },
        }),
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch GitHub data: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
        throw new Error(`GitHub API errors: ${JSON.stringify(json.errors)}`);
    }

    if (!json.data?.user) {
        throw new Error("Invalid data structure received from GitHub API.");
    }

    const user: GitHubUserType = json.data.user;

    const totalStars = user.repositories.nodes.reduce(
        (acc: number, repo: RepositoryType) => acc + repo.stargazerCount,
        0
    );

    const languages = user.repositories.nodes
        .filter((repo: RepositoryType) => repo.primaryLanguage !== null)
        .map((repo: RepositoryType) => repo.primaryLanguage!.name);
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
