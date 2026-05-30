"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { featuredProjects } from "@/data/project";
import { ProjectsPropsType, LandingProjectCardPropsType } from "@/lib/types";
import { PROJECT_ANIMATIONS } from "@/data/animations";
import { ProjectImageContainer, ProjectContent } from "./ProjectCard";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  getSectionClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * Renders the "see all projects" link for the section header.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
const ViewAllLink = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="flex justify-center sm:justify-end mt-8 sm:mt-0"
  >
    <Link
      href="/projects"
      className="group flex items-center text-sm text-foreground/70 hover:text-primary transition-all duration-300 
                 px-6 py-3 rounded-xl border border-primary/10 hover:border-primary/20 
                 bg-background/50 hover:bg-primary/5 backdrop-blur-sm"
    >
      <span className="relative font-medium mr-3">
        see all projects
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
      </span>
      <div className="w-5 h-5 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  </motion.div>
);

/**
 * Enhanced header section combining the shared SectionHeader with the ViewAllLink
 * @param {{ headline: string; isInView: boolean }} props - Component props.
 */
const ProjectsHeader = ({
  headline,
  isInView,
}: {
  headline: string;
  isInView: boolean;
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 md:mb-16 lg:mb-20 relative z-10">
    <div className="flex-1">
      <SectionHeader subtitle="stuff i’ve built" isInView={isInView}>
        <span className="font-serif italic text-foreground select-none pr-3">
          {headline}
        </span>
      </SectionHeader>
    </div>
    <ViewAllLink isInView={isInView} />
  </div>
);

/**
 * Renders a simple "see all projects" link at the bottom of the section.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
const CTASection = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: PROJECT_ANIMATIONS.DELAYS.CTA, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center"
  >
    <Link
      href="/contact"
      className="group inline-flex items-center gap-2 text-sm font-light text-foreground/55 hover:text-primary transition-colors duration-300"
    >
      <span>let&apos;s build something cool</span>
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  </motion.div>
);

/**
 * Renders an individual project card, composing its image and content parts.
 * @param {ProjectCardProps} props - The component props.
 */
const ProjectCard = ({
  project,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
}: LandingProjectCardPropsType) => {
  const cardAnimation = {
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: PROJECT_ANIMATIONS.DURATIONS.FADE_IN,
      delay:
        PROJECT_ANIMATIONS.DELAYS.CARD_BASE +
        index * PROJECT_ANIMATIONS.DELAYS.CARD_STAGGER,
      ease: "easeOut" as const,
    },
  };

  return (
    <motion.div
      {...cardAnimation}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="relative group"
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300 py-0",
          "border border-primary/10 bg-background/60",
          "rounded-2xl",
          "group-hover:border-primary/20",
        )}
      >
        <ProjectImageContainer project={project} isHovered={isHovered} />
        <ProjectContent project={project} isHovered={isHovered} />
      </Card>
    </motion.div>
  );
};

/**
 * The main component for displaying a list of featured projects.
 * @param {ProjectsPropsType} props - Component props.
 */
export const Projects = ({
  headline = "stuff i’m proud of",
  cta = true,
}: ProjectsPropsType) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className={getSectionClasses()} ref={sectionRef} id="work-section">
      <SharedBackground
        isInView={isInView}
        noiseFilterId="projectsNoiseFilter"
      />

      <div className="relative z-10 w-full">
        <ProjectsHeader headline={headline} isInView={isInView} />

        {/* Enhanced projects grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-10 sm:mb-16 md:mb-20">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                isInView={isInView}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </motion.div>

        {cta && <CTASection isInView={isInView} />}
      </div>
    </section>
  );
};
