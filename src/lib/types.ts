import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { contactFormSchema } from "./config/contact";
import z from "zod";

export interface MousePosition {
  x: number;
  y: number;
}

export interface SkillItemProps {
  skill: string;
  index: number;
}
export interface Project {
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
export interface ProjectsProps {
  headline?: string;
  cta?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export interface TypeExpertise {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
  level: string;
}

export interface AnimatedPathProps {
  className?: string;
  pathD?: string;
  delay?: number;
}

export interface ContactChannel {
  readonly icon: React.ReactNode;
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

export type TypeTimelineItemProps = {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  badges?: { label: string; value: string }[];
};

export type TypeTimelineCardProps = {
  title: string;
  Icon: LucideIcon;
  items: TypeTimelineItemProps[];
};

export interface TypeContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  userAgent: string;
  referer: string;
}

export type TypeNavItem = { name: string; href: string };

export interface TypeMobileMenuProps {
  onClose: () => void;
  navigationItems: TypeNavItem[];
  activeItem: string | null;
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

export type ContactFormDataType = z.infer<typeof contactFormSchema>;
