"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/data/project";
import { ProjectsProps, ProjectCardProps } from "@/lib/types";
import {
  PROJECT_ANIMATION_DELAYS,
  PROJECT_ANIMATION_DURATIONS,
} from "@/lib/config/projects";
import { ProjectImageContainer, ProjectContent } from "./ProjectCard";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";

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
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-20 relative z-10">
    <div className="flex-1">
      <SectionHeader subtitle="stuff i’ve built" isInView={isInView}>
        <span className="font-serif italic bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none pr-3">
          {headline}
        </span>
      </SectionHeader>
    </div>
    <ViewAllLink isInView={isInView} />
  </div>
);

/**
 * Renders the final call-to-action button for the Projects section.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
const CTASection = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: PROJECT_ANIMATION_DELAYS.CTA, duration: 1.2 }}
    className="flex justify-center relative"
  >
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-2xl blur-xl" />
    
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-primary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-primary/30" />
      </div>
      
      <Button
        variant="outline"
        size="lg"
        className="
          group relative overflow-hidden
          border-primary/20 hover:border-primary/30
          bg-background/60 hover:bg-primary/5 backdrop-blur-lg
          text-base px-10 py-7 rounded-2xl
          shadow-lg shadow-primary/5 hover:shadow-primary/10
          transition-all duration-500
        "
        asChild
      >
        <Link href="/contact" className="flex items-center">
          {/* Background shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
            aria-hidden="true"
          />
          
          <motion.span
            className="font-medium tracking-wide relative z-10 mr-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            let&apos;s build something cool
          </motion.span>
          
          <motion.div
            className="
              relative z-10 w-8 h-8 rounded-full 
              border border-primary/30 bg-primary/10
              flex items-center justify-center
              group-hover:border-primary/50 group-hover:bg-primary/20
              transition-all duration-300
            "
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ArrowUpRight className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
          </motion.div>
        </Link>
      </Button>
    </div>
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
      className="relative group"
    >
      {/* Enhanced background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/30 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-105" />
      
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-500 py-0",
          "border border-primary/10 backdrop-blur-sm bg-background/60",
          "shadow-lg shadow-primary/5 rounded-2xl",
          "group-hover:shadow-xl group-hover:shadow-primary/10",
          "group-hover:border-primary/20 group-hover:bg-background/80",
          isHovered && "transform scale-[1.02]"
        )}
      >
        <ProjectImageContainer project={project} isHovered={isHovered} />
        <ProjectContent project={project} isHovered={isHovered} />
        
        {/* Corner accent enhancement */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-primary/40" />
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * The main component for displaying a list of featured projects.
 * @param {ProjectsProps} props - Component props.
 */
export const Projects = ({
  headline = "stuff i’m proud of",
  cta = true,
}: ProjectsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      className="py-36 sm:py-44 relative overflow-hidden"
      ref={sectionRef}
      id="work-section"
    >
      <SharedBackground
        isInView={isInView}
        noiseFilterId="projectsNoiseFilter"
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <ProjectsHeader headline={headline} isInView={isInView} />
        
        {/* Enhanced projects grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-primary/2 rounded-3xl opacity-60" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 p-6">
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