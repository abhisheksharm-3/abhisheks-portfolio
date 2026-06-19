"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { featuredProjects } from "@/data/projects";
import {
  ProjectsPropsType,
  LandingProjectCardPropsType,
  InViewPropsType,
} from "@/lib/types/components";
import { PROJECT_ANIMATIONS } from "@/data/animations";
import { ProjectImageContainer, ProjectContent } from "./ProjectCardParts";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getSectionClasses } from "@/lib/config/spacing-standards";

interface ProjectsHeaderPropsType extends InViewPropsType {
  headline: string;
}

const ViewAllLink = ({ isInView }: InViewPropsType) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="flex justify-center sm:justify-end mt-6 sm:mt-0"
  >
    <Link
      href="/projects"
      className="group inline-flex items-center gap-2 text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200"
    >
      see all projects
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  </motion.div>
);

const ProjectsHeader = ({ headline, isInView }: ProjectsHeaderPropsType) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 md:mb-16 lg:mb-20 relative z-10">
    <div className="flex-1">
      <SectionHeader subtitle="stuff i've built" isInView={isInView}>
        <span className="font-serif italic text-foreground select-none pr-3">
          {headline}
        </span>
      </SectionHeader>
    </div>
    <ViewAllLink isInView={isInView} />
  </div>
);

const CTASection = ({ isInView }: InViewPropsType) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: PROJECT_ANIMATIONS.DELAYS.CTA, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-center"
  >
    <Link
      href="/contact"
      className="group inline-flex items-center gap-2 text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200"
    >
      <span>let&apos;s build something cool</span>
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  </motion.div>
);

const ProjectCard = ({
  project,
  index,
  isInView,
  isHovered,
  onHover,
  onLeave,
}: LandingProjectCardPropsType) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: PROJECT_ANIMATIONS.DURATIONS.FADE_IN,
      delay: PROJECT_ANIMATIONS.DELAYS.CARD_BASE + index * PROJECT_ANIMATIONS.DELAYS.CARD_STAGGER,
      ease: "easeOut",
    }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    onFocus={onHover}
    onBlur={onLeave}
    className="relative group"
  >
    <Card className="rounded-none shadow-none py-0 gap-0 border-foreground/8 bg-transparent group-hover:border-foreground/15 transition-colors duration-200 overflow-hidden flex flex-col">
      <ProjectImageContainer project={project} isHovered={isHovered} />
      <ProjectContent project={project} isHovered={isHovered} />
    </Card>
  </motion.div>
);

export const Projects = ({
  headline = "stuff i'm proud of",
  showCta = true,
}: ProjectsPropsType) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className={getSectionClasses()} ref={sectionRef} id="work-section">
      <SharedBackground isInView={isInView} noiseFilterId="projectsNoiseFilter" />

      <div className="relative z-10 w-full">
        <ProjectsHeader headline={headline} isInView={isInView} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-10 sm:mb-16 md:mb-20"
        >
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
        </motion.div>

        {showCta && <CTASection isInView={isInView} />}
      </div>
    </section>
  );
};
