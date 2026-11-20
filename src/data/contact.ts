import { RiGithubFill, RiInstagramFill, RiLinkedinFill, RiTwitterXFill } from "@remixicon/react";

/**
 * Personal contact information - centralized source of truth
 */
export const CONTACT_INFO = {
  email: "abhishek@abhisheksan.com",
  website: "abhisheksan.com",
  /** 30-minute call, booked through cal.com, held on google meet. */
  booking: "https://cal.com/abhisheksan/30min",
  github: {
    username: "abhisheksharm-3",
    url: "https://github.com/abhisheksharm-3",
  },
  linkedin: {
    username: "abhisheksan",
    url: "https://linkedin.com/in/abhisheksan/",
  },
  twitter: {
    username: "iabhisheksan",
    url: "https://x.com/iabhisheksan",
  },
  instagram: {
    username: "abhishekxsharmaa",
    url: "https://instagram.com/abhishekxsharmaa",
  },
} as const;

/** Resume link for the about page. Set it to a URL and the row appears; null hides it. */
export const RESUME_URL: string | null = null;

/**
 * Social media links with consistent styling
 */
export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    icon: RiLinkedinFill,
    href: CONTACT_INFO.linkedin.url,
    displayUrl: `linkedin.com/in/${CONTACT_INFO.linkedin.username}`,
  },
  {
    label: "GitHub",
    icon: RiGithubFill,
    href: CONTACT_INFO.github.url,
    displayUrl: `github.com/${CONTACT_INFO.github.username}`,
  },
  {
    label: "X",
    icon: RiTwitterXFill,
    href: CONTACT_INFO.twitter.url,
    displayUrl: `x.com/${CONTACT_INFO.twitter.username}`,
  },
  {
    label: "Instagram",
    icon: RiInstagramFill,
    href: CONTACT_INFO.instagram.url,
    displayUrl: `instagram.com/${CONTACT_INFO.instagram.username}`,
  },
] as const;
