"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/data/project";
import { ProjectsProps, ProjectCardProps } from "@/lib/types";
import {
  PROJECT_ANIMATION_DELAYS,
  PROJECT_ANIMATION_DURATIONS,
} from "@/lib/config/projects";
import { ProjectImageContainer, ProjectContent } from "./project-card";
import { SharedBackground } from "@/components/shared/SharedBackground";

/** Renders the animated badge for the section header. */
const SectionBadge = ({ isInView }: { isInView: boolean }) => (
  <div className="flex items-center mb-4">
    <motion.div
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
    </motion.div>
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-xs text-primary/60 uppercase tracking-widest font-light"
    >
      My Work
    </motion.span>
  </div>
);

/** Renders the main headline and decorative line for the section header. */
const HeaderContent = ({
  headline,
  isInView,
}: {
  headline: string;
  isInView: boolean;
}) => (
  <div>
    <SectionBadge isInView={isInView} />
    <div className="overflow-visible mb-4">
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
      >
        <div className="py-1">
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
            {headline}
          </span>
        </div>
      </motion.h2>
    </div>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "5rem", opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
    />
  </div>
);

/** Renders the "View all works" link in the section header. */
const ViewAllLink = ({ isInView }: { isInView: boolean }) => (
  <Link
    href="/projects"
    className="mt-7 sm:mt-0 group flex items-center text-sm text-foreground/60 hover:text-primary transition-colors"
  >
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="relative font-medium"
    >
      View all works
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
    </motion.span>
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </motion.div>
  </Link>
);

/** Renders the main section header, combining content and the view all link. */
const SectionHeader = ({
  headline,
  isInView,
}: {
  headline: string;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 1 }}
    className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-20 relative z-10"
  >
    <HeaderContent headline={headline} isInView={isInView} />
    <ViewAllLink isInView={isInView} />
  </motion.div>
);

/** Renders the final call-to-action button for the section. */
const CTASection = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: PROJECT_ANIMATION_DELAYS.CTA, duration: 1.2 }}
    className="flex justify-center"
  >
    <Button
      variant="outline"
      size="lg"
      className="group border-primary/10 text-base px-8 py-6 rounded-xl hover:bg-primary/5 transition-colors relative overflow-hidden"
      asChild
    >
      <Link href="/contact" className="flex items-center">
        <motion.span
          className="font-medium tracking-wide relative z-10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Let&apos;s collaborate
        </motion.span>
        <motion.div
          className="ml-3 h-6 w-6 rounded-full border border-primary/20 flex items-center justify-center relative z-10"
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="h-3 w-3 text-primary/70" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.5 }}
        />
      </Link>
    </Button>
  </motion.div>
);

/** Renders an individual project card, composing its image and content parts. */
const ProjectCard = ({
  project,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
}: ProjectCardProps) => {
  const cardAnimation = {
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: PROJECT_ANIMATION_DURATIONS.FADE_IN,
      delay:
        PROJECT_ANIMATION_DELAYS.CARD_BASE +
        index * PROJECT_ANIMATION_DELAYS.CARD_STAGGER,
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
      className="relative"
    >
      <Card
        className={`overflow-hidden border-primary/10 backdrop-blur-sm transition-all duration-300 py-0 ${isHovered ? "shadow-lg border-primary/20" : "shadow-md"}`}
      >
        <ProjectImageContainer project={project} isHovered={isHovered} />
        <ProjectContent project={project} isHovered={isHovered} />
      </Card>
    </motion.div>
  );
};

/**
 * The main component for displaying a list of featured projects.
 * @param {ProjectsProps} props - Component props.
 */
export const Projects = ({
  headline = "Selected Projects",
  cta = true,
}: ProjectsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section
      className="py-36 sm:py-44 relative overflow-hidden container mx-auto px-6"
      ref={sectionRef}
      id="work-section"
    >
      <SharedBackground
        isInView={isInView}
        noiseFilterId="preojectsNoiseFilter"
      />
      <SectionHeader headline={headline} isInView={isInView} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
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
      {cta && <CTASection isInView={isInView} />}
    </section>
  );
};
