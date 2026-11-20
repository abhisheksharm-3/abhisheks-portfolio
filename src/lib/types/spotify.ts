/**
 * A Spotify artist or track, named exactly as Spotify names it, with its open.spotify.com link and
 * its artwork (the album cover for a track, the artist photo for an artist) when Spotify has one.
 */
export interface SpotifyItemType {
  id: string;
  name: string;
  url: string;
  image: string | null;
}

/** A track with its artists joined into one line. */
export interface SpotifyTrackType extends SpotifyItemType {
  artists: string;
}

/**
 * The live track. playedAt is null while it plays, and then device and upNext describe the
 * playback; otherwise it is the last track played and when.
 */
export type SpotifyListeningType =
  | (SpotifyTrackType & {
      playedAt: string | null;
      device: string | null;
      upNext: SpotifyTrackType[];
    })
  | null;

/** The about page's listening data. */
export interface SpotifyTopType {
  tracksMonth: SpotifyTrackType[];
  tracksHalfYear: SpotifyTrackType[];
  tracksYear: SpotifyTrackType[];
  artistsMonth: SpotifyItemType[];
  artistsYear: SpotifyItemType[];
  liked: (SpotifyTrackType & { addedAt: string })[];
}
