"use client";

import { useQuery } from "@tanstack/react-query";
import type { SpotifyListeningType } from "@/lib/types/spotify";

const POLL_MS = 30_000;

async function fetchListening(): Promise<SpotifyListeningType> {
  const response = await fetch("/api/spotify");
  if (!response.ok) {
    throw new Error("Failed to fetch Spotify listening");
  }
  return response.json();
}

/**
 * The owner's current or last Spotify track, refetched every 30 seconds while the tab is visible,
 * matching the route's CDN cache.
 */
export function useListening() {
  return useQuery<SpotifyListeningType, Error>({
    queryKey: ["spotify-listening"],
    queryFn: fetchListening,
    refetchInterval: POLL_MS,
    retry: 1,
  });
}
