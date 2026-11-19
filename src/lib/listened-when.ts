const MINUTE_MS = 60_000;

/** "now" while playing (playedAt null), then a coarse age: "4m ago", "3h ago", "2d ago". */
export const toListenedWhen = (playedAt: string | null) => {
  if (!playedAt) return "now";
  const minutes = Math.max(1, Math.round((Date.now() - Date.parse(playedAt)) / MINUTE_MS));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
};
