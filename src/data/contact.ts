import {
  Mail,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill } from "@remixicon/react";
import z from "zod";

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
    username: "abhisheksharm_3",
    url: "https://twitter.com/abhisheksharm_3",
  },
} as const;

/**
 * Contact channels for CTA sections
 */
export const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Code,
    label: "GitHub",
    value: CONTACT_INFO.github.username,
    href: CONTACT_INFO.github.url,
  },
  {
    icon: ExternalLink,
    label: "Website",
    value: CONTACT_INFO.website,
    href: `https://${CONTACT_INFO.website}`,
  },
] as const;

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
    Icon: Github,
    link: CONTACT_INFO.github.url,
    display: CONTACT_INFO.github.username,
  },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    link: CONTACT_INFO.linkedin.url,
    display: CONTACT_INFO.linkedin.username,
  },
  {
    label: "Instagram",
    Icon: Instagram,
    link: "https://instagram.com/abhisheksharm_3",
    display: "@abhisheksharm_3",
  },
] as const;

/**
 * Contact form validation schema
 */
export const CONTACT_FORM_SCHEMA = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

/**
 * Contact animation configurations
 */
export const CONTACT_ANIMATIONS = {
  section: { duration: 1 },
  header: { duration: 0.8, delay: 0.4 },
  content: { duration: 0.8, delay: 0.3 },
  buttons: { duration: 0.5, delay: 0.6 },
  contactInfo: { duration: 0.8, delay: 0.9 },
  channels: { duration: 0.8, delay: 1 },
  channelItem: { duration: 0.5, baseDelay: 1.1, stagger: 0.1 },
  pathAnimation: { duration: 2, delay: 0.5 },
  hoverTransition: { duration: 0.8 },
} as const;
