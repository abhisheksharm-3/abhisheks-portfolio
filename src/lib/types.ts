import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { CONTACT_FORM_SCHEMA } from "@/data/contact";
import z from "zod";

export interface MousePositionType {
  x: number;
  y: number;
}

/**
 * Defines the props for the MobileNavLink component.
 */
export interface MobileNavLinkPropsType {
  item: NavigationItemType;
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export interface SkillItemPropsType {
  skill: string;
  index: number;
}

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
  featured: boolean;
  role?: string;
  client?: string;
  duration?: string;
  building?: boolean;
}

export interface ProjectsPropsType {
  headline?: string;
  cta?: boolean;
}

export interface ProjectCardPropsType {
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
  level: string;
}

export interface AnimatedPathPropsType {
  className?: string;
  pathD?: string;
  delay?: number;
}

export interface ContactChannelType {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export interface PersonalInterestType {
  readonly category: string;
  readonly icon: LucideIcon;
  readonly description: string;
  readonly tags: readonly string[];
}

export interface SocialLinkType {
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly href: string;
  readonly displayUrl: string;
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

/**
 * Defines the props for the AppShell component.
 */
export interface AppShellPropsType {
  /** Optional classes to apply to the main container for custom styling. */
  className?: string;
  /** The main content of the page to be rendered within the layout. */
  children: ReactNode;
  /**
   * If `true`, renders the animated background component.
   * @default true
   */
  showBackground?: boolean;
}

export type ContactFormDataType = z.infer<typeof CONTACT_FORM_SCHEMA>;
