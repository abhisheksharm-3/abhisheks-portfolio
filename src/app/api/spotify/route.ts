import { connection } from "next/server";
import { fetchListening } from "@/lib/spotify";

/**
 * Returns the owner's current or last-played Spotify track. The CDN holds each answer for 30
 * seconds, so Spotify sees a few calls a minute however many people have the footer open.
 */
export async function GET() {
  await connection();
  try {
    return Response.json(await fetchListening(), {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30, stale-if-error=300",
      },
    });
  } catch (error) {
    console.error("Failed to load Spotify listening", error);
    return Response.json({ error: "Failed to load Spotify listening" }, { status: 502 });
  }
}
