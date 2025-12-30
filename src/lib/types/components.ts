import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { CONTACT_FORM_SCHEMA } from "@/data/contact";
import type z from "zod";

export interface MousePositionType {
    x: number;
    y: number;
}

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
    delay?: number;
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

export interface AppShellPropsType {
    className?: string;
    children: ReactNode;
    showBackground?: boolean;
}

export type ContactFormDataType = z.infer<typeof CONTACT_FORM_SCHEMA>;
