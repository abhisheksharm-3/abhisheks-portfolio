import { RiSpotifyFill } from "@remixicon/react";
import { ListeningPanel } from "@/components/sections/about/ListeningPanel";
import { fetchTopListening } from "@/lib/spotify";

/**
 * The about page's listening section: this month's most played tracks and the artists behind them,
 * from Spotify. Renders nothing when Spotify or its env vars are unavailable.
 */
export const ListeningSection = async () => {
  const top = await fetchTopListening();
  if (!top) return null;

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between gap-6">
        <h2 className="text-2xl font-serif text-foreground">listening</h2>
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/60 transition-colors duration-200 hover:text-foreground"
        >
          <RiSpotifyFill aria-hidden="true" className="size-[21px]" />
          from Spotify
        </a>
      </div>
      <div className="h-px bg-primary/10 mb-8" />
      <ListeningPanel top={top} />
    </div>
  );
};
