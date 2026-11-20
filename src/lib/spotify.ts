/** Reads the owner's Spotify listening through the Web API, with a long-lived refresh token from the environment. */
import { cacheLife } from "next/cache";
import type {
  SpotifyItemType,
  SpotifyListeningType,
  SpotifyTopType,
  SpotifyTrackType,
} from "@/lib/types/spotify";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";
const TOP_LIMIT = 5;
const UP_NEXT_LIMIT = 3;

interface SpotifyImageJsonType {
  url: string;
  width: number | null;
}

interface SpotifyArtistJsonType {
  id: string;
  name: string;
  external_urls: { spotify: string };
  images?: SpotifyImageJsonType[];
}

interface SpotifyTrackJsonType extends SpotifyArtistJsonType {
  type: string;
  artists: SpotifyArtistJsonType[];
  album: { images: SpotifyImageJsonType[] };
}

/**
 * Trades the refresh token for a one-hour access token. Never cached and never returned to a caller
 * outside this file. A 400 here means Spotify revoked the refresh token: rerun the one-time
 * authorization in .polaris/reports/2026-11-19-spotify-listening-scope.md and replace the env var.
 */
const getAccessToken = async (): Promise<string> => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET or SPOTIFY_REFRESH_TOKEN.");
  }
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Spotify token refresh failed: ${response.status} ${await response.text()}`);
  }
  const { access_token, refresh_token } = await response.json();
  if (refresh_token && refresh_token !== SPOTIFY_REFRESH_TOKEN) {
    console.warn("Spotify issued a new refresh token; the env var still holds the old one.");
  }
  return access_token;
};

/** GETs a Web API path; resolves null on 204, which Spotify sends when nothing is playing. */
const getJson = async (path: string, token: string) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (response.status === 204) return null;
  if (!response.ok) {
    throw new Error(`Spotify ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.json();
};

/** Spotify lists images largest first; the largest (640px) fills the flipped portrait. */
const pickImage = (images: SpotifyImageJsonType[] = []) => images[0]?.url ?? null;

const toItem = ({ id, name, external_urls, images }: SpotifyArtistJsonType): SpotifyItemType => ({
  id,
  name,
  url: external_urls.spotify,
  image: pickImage(images),
});

const toTrack = (track: SpotifyTrackJsonType): SpotifyTrackType => ({
  ...toItem(track),
  image: pickImage(track.album.images),
  artists: track.artists.map((artist) => artist.name).join(", "),
});

/** Resolves the fallback instead of throwing, for data the page can live without. */
const orElse = async <T>(load: Promise<T>, fallback: T, what: string): Promise<T> => {
  try {
    return await load;
  } catch (error) {
    console.error(`Spotify ${what} unavailable`, error);
    return fallback;
  }
};

const isTrack = (item: SpotifyTrackJsonType | null | undefined): item is SpotifyTrackJsonType =>
  item?.type === "track";

/**
 * The track playing right now with its device and the next few in the queue; or, when
 * nothing (or an ad or a podcast) is playing, the last track played. Titles keep Spotify's casing.
 */
export const fetchListening = async (): Promise<SpotifyListeningType> => {
  const token = await getAccessToken();
  const player = await orElse(getJson("/me/player", token), null, "playback state");
  if (player?.is_playing && isTrack(player.item)) {
    const queue = await orElse(getJson("/me/player/queue", token), null, "queue");
    return {
      ...toTrack(player.item),
      playedAt: null,
      device: player.device?.type?.toLowerCase() ?? null,
      upNext: (queue?.queue ?? []).filter(isTrack).slice(0, UP_NEXT_LIMIT).map(toTrack),
    };
  }
  const recent = await getJson("/me/player/recently-played?limit=1", token);
  const last = recent?.items?.[0];
  return last
    ? {
        ...toTrack(last.track),
        playedAt: last.played_at,
        device: null,
        upNext: [],
      }
    : null;
};

const topOf = (type: "artists" | "tracks", range: string, token: string) =>
  getJson(`/me/top/${type}?time_range=${range}&limit=${TOP_LIMIT}`, token);

/**
 * Top tracks over four weeks, six months and a year; top artists over four weeks and a year; and
 * the newest liked songs. Cached for hours, so the about page prerenders it and Spotify is asked a
 * few times a day at most. Resolves null when the top lists are unavailable, and the page hides the
 * section. A failed or partial answer is cached for minutes only, so a rate limit at build time
 * does not leave the page empty for the hour.
 */
export const fetchTopListening = async (): Promise<SpotifyTopType | null> => {
  "use cache";
  try {
    const token = await getAccessToken();
    let hasLiked = true;
    const [tracksMonth, tracksHalfYear, tracksYear, artistsMonth, artistsYear, liked] =
      await Promise.all([
        topOf("tracks", "short_term", token),
        topOf("tracks", "medium_term", token),
        topOf("tracks", "long_term", token),
        topOf("artists", "short_term", token),
        topOf("artists", "long_term", token),
        getJson(`/me/tracks?limit=${TOP_LIMIT}`, token).catch((error) => {
          console.error("Spotify liked songs unavailable", error);
          hasLiked = false;
          return null;
        }),
      ]);
    if (hasLiked) cacheLife("hours");
    else cacheLife("minutes");
    return {
      tracksMonth: tracksMonth.items.map(toTrack),
      tracksHalfYear: tracksHalfYear.items.map(toTrack),
      tracksYear: tracksYear.items.map(toTrack),
      artistsMonth: artistsMonth.items.map(toItem),
      artistsYear: artistsYear.items.map(toItem),
      liked: (liked?.items ?? []).map(
        (entry: { added_at: string; track: SpotifyTrackJsonType }) => ({
          ...toTrack(entry.track),
          addedAt: entry.added_at,
        }),
      ),
    };
  } catch (error) {
    console.error("Failed to load Spotify top listening", error);
    cacheLife("minutes");
    return null;
  }
};
