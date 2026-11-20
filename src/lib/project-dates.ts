/** "june 2026 - present" becomes "since june 2026"; any other duration is lowercased as it is. */
export const toSince = (duration?: string) =>
  duration?.toLowerCase().endsWith(" - present")
    ? `since ${duration.toLowerCase().replace(" - present", "")}`
    : (duration?.toLowerCase() ?? "");
