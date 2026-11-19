/** Which way a nav link travels, so the page slides toward the destination's place in the nav order. */
import { NAVIGATION_ITEMS } from "@/data/navigation";

const positionOf = (name: string | null) =>
  NAVIGATION_ITEMS.findIndex((item) => item.name === name);

/**
 * `nav-forward` when the destination sits right of the current page in the nav, `nav-back` when it
 * sits left. Undefined when either end is unknown (the URL has not resolved yet) or it is the same page.
 */
export const navTransitionTypes = (
  activeItem: string | null,
  targetName: string,
): string[] | undefined => {
  const from = positionOf(activeItem);
  const to = positionOf(targetName);
  if (from === -1 || to === -1 || from === to) return undefined;
  return [to > from ? "nav-forward" : "nav-back"];
};
