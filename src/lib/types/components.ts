import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type z from "zod";
import type { CONTACT_FORM_SCHEMA } from "@/data/contact-schema";

/** Props for components that animate based on scroll-into-view state */
export interface InViewPropsType {
  isInView: boolean;
}

export interface MobileNavLinkPropsType {
  item: NavigationItemType;
  isActive: boolean;
  onClick: () => void;
}

export type ProjectCategory = "ai" | "web" | "mobile";

export interface ProjectType {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  imageSrc: string;
  tags: string[];
  year: string;
  url?: string;
  github?: string;
  isFeatured: boolean;
  /** Early learning work: listed as a text row, not a card. */
  isArchived?: boolean;
  /** Primary discipline, used for the filter. Archived work has none. */
  category?: ProjectCategory;
  /** Shown on the card for projects you install rather than visit. */
  installCommand?: string;
  role?: string;
  client?: string;
  duration?: string;
  isBuilding?: boolean;
}

export interface ProjectsPropsType {
  headline?: string;
  showCta?: boolean;
  /** Rendered under the project grid, inside the section's spacing. */
  footer?: ReactNode;
}

export interface ProjectCardPropsType {
  project: ProjectType;
  delay?: number;
  priority?: boolean;
}

/** Props for landing page project card with hover state management */
export interface LandingProjectCardPropsType {
  project: ProjectType;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export interface ExpertiseType {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: readonly string[];
}

export interface AnimatedPathPropsType {
  className?: string;
  pathD?: string;
  delay?: number;
}

export interface TimelineItemType {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  badges?: readonly { readonly label: string; readonly value: string }[];
}

export interface TimelineCardPropsType {
  title: string;
  Icon: LucideIcon;
  items: readonly TimelineItemType[];
}

export interface ContactEmailPropsType {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  userAgent: string;
  referer: string;
}

export interface NavigationItemType {
  name: string;
  href: string;
}

export interface MobileMenuPropsType {
  onClose: () => void;
  navigationItems: readonly NavigationItemType[];
  activeItem: string | null;
}

export interface SectionHeaderPropsType {
  subtitle: string;
  children: React.ReactNode;
  isInView: boolean;
  className?: string;
}

export interface AppShellPropsType {
  className?: string;
  children: ReactNode;
  showBackground?: boolean;
}

export type ContactFormDataType = z.infer<typeof CONTACT_FORM_SCHEMA>;
