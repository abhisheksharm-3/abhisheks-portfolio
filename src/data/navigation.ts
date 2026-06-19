import { NavigationItemType } from "@/lib/types/components";

/**
 * Centralized navigation configuration
 * Used by both navbar and footer components
 */
export const NAVIGATION_ITEMS: readonly NavigationItemType[] = [
  { name: "home", href: "/" },
  { name: "who i am", href: "/about" },
  { name: "things i built", href: "/projects" },
  { name: "things i killed", href: "/graveyard" },
  { name: "writing", href: "/writing" },
  { name: "say hi", href: "/contact" },
] as const;
