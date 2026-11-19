import type { NavigationItemType } from "@/lib/types/components";

/**
 * Centralized navigation configuration
 * Used by the navbar components
 */
export const NAVIGATION_ITEMS: readonly NavigationItemType[] = [
  { name: "home", href: "/" },
  { name: "who i am", href: "/about" },
  { name: "things i built", href: "/projects" },
  { name: "things i killed", href: "/graveyard" },
  { name: "writing", href: "/writing" },
  { name: "resume", href: "/resume" },
  { name: "say hi", href: "/contact" },
] as const;
