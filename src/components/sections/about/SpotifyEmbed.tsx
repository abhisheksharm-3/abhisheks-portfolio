/**
 * Spotify's own player for one track: a 30-second preview for visitors signed out of Spotify, the full
 * track for those signed in. Mounted only after a visitor asks to play, so nothing loads from Spotify
 * before that.
 */
export const SpotifyEmbed = ({ id, title }: { id: string; title: string }) => (
  <iframe
    src={`https://open.spotify.com/embed/track/${id}`}
    title={`play ${title} on Spotify`}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    className="h-[152px] w-full"
  />
);
