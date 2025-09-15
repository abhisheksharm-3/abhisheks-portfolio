import { LucideIcon } from "lucide-react";

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