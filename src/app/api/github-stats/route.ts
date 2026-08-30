import { connection } from "next/server";
import { fetchGitHubStats } from "@/lib/github-stats";

/**
 * Returns aggregated GitHub statistics for the portfolio owner.
 */
export async function GET() {
  await connection();
  try {
    const stats = await fetchGitHubStats();
    return Response.json(stats);
  } catch (error) {
    console.error("Failed to load GitHub stats", error);
    return Response.json({ error: "Failed to load GitHub stats" }, { status: 502 });
  }
}
