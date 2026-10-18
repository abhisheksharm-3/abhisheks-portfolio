import {
  RiGithubFill,
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinFill,
  RiLinkedinLine,
  RiTwitterXFill,
} from "@remixicon/react";
import { Mail } from "lucide-react";

/**
 * Personal contact information - centralized source of truth
 */
export const CONTACT_INFO = {
  email: "abhishek@abhisheksan.com",
  website: "abhisheksan.com",
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
    displayUrl: `twitter.com/${CONTACT_INFO.twitter.username}`,
  },
] as const;

/**
 * Contact info for ContactInfoCard component
 */
export const CONTACT_DETAILS = [
  {
    label: "Email",
    Icon: Mail,
    link: `mailto:${CONTACT_INFO.email}`,
    display: CONTACT_INFO.email,
  },
  {
    label: "GitHub",
    Icon: RiGithubLine,
    link: CONTACT_INFO.github.url,
    display: CONTACT_INFO.github.username,
  },
  {
    label: "LinkedIn",
    Icon: RiLinkedinLine,
    link: CONTACT_INFO.linkedin.url,
    display: CONTACT_INFO.linkedin.username,
  },
  {
    label: "Instagram",
    Icon: RiInstagramLine,
    link: "https://instagram.com/abhishekxsharmaa",
    display: "@abhishekxsharmaa",
  },
] as const;
