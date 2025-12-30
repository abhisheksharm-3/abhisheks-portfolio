"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGitHubStats } from "@/lib/actions";
import type { GitHubStatsType } from "@/lib/types/stats";

const GITHUB_STATS_QUERY_KEY = ["github-stats"] as const;
const STALE_TIME_MS = 60 * 60 * 1000; // 1 hour

/**
 * React Query hook for fetching GitHub statistics.
 * Provides loading, error, and data states with automatic caching.
 */
export function useGitHubStats() {
    return useQuery<GitHubStatsType, Error>({
        queryKey: GITHUB_STATS_QUERY_KEY,
        queryFn: fetchGitHubStats,
        staleTime: STALE_TIME_MS,
    });
}
