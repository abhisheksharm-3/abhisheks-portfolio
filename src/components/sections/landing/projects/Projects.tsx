"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { Card } from "@/components/ui/card";
import { featuredProjects } from "@/data/projects";
import { getSectionClasses } from "@/lib/config/spacing-standards";
import type { LandingProjectCardPropsType, ProjectsPropsType } from "@/lib/types/components";
import { ProjectContent, ProjectImageContainer } from "./ProjectCardParts";

interface ProjectsHeaderPropsType {
  headline: string;
}

const ViewAllLink = () => (
  <div className="flex flex-col sm:items-end gap-2 justify-center sm:justify-end mt-6 sm:mt-0">
    <Link
      href="/projects"
      className="group inline-flex items-center gap-2 text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200"
    >
      see all projects
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
    </Link>
    {/* The graveyard is the most distinctive page here and nothing linked to it. */}
    <Link
      href="/graveyard"
      className="group inline-flex items-center gap-2 text-xs font-light text-foreground/30 hover:text-foreground/55 transition-colors duration-200"
    >
      and the ones i killed
      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
    </Link>
  </div>
);

const ProjectsHeader = ({ headline }: ProjectsHeaderPropsType) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 md:mb-16 lg:mb-20 relative z-10">
    <div className="flex-1">
      <SectionHeader subtitle="stuff i've built">
        <span className="font-serif text-foreground select-none pr-3">{headline}</span>
      </SectionHeader>
    </div>
    <ViewAllLink />
  </div>
);

const CTASection = () => (
  <div className="flex justify-center">
    <Link
      href="/contact"
      className="group inline-flex items-center gap-2 text-sm font-light text-foreground/45 hover:text-foreground/70 transition-colors duration-200"
    >
      <span>get in touch</span>
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
    </Link>
  </div>
);

const ProjectCard = ({ project, isHovered, onHover, onLeave }: LandingProjectCardPropsType) => (
  <div className="relative group h-full">
    <Card
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="h-full rounded-none shadow-none py-0 gap-0 border-foreground/8 bg-transparent group-hover:border-foreground/15 group-focus-within:border-foreground/15 transition-colors duration-200 overflow-hidden flex flex-col"
    >
      <ProjectImageContainer project={project} isHovered={isHovered} />
      <ProjectContent project={project} isHovered={isHovered} />
    </Card>
  </div>
);

export const Projects = ({
  headline = "stuff i'm proud of",
  showCta = true,
  footer,
}: ProjectsPropsType) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={getSectionClasses()} id="work-section">
      <SharedBackground isInView noiseFilterId="projectsNoiseFilter" />

      <div className="relative z-10 w-full">
        <ProjectsHeader headline={headline} />

        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 md:gap-8 lg:gap-10 mb-10 sm:mb-16 md:mb-20">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {footer}

        {showCta && <CTASection />}
      </div>
    </section>
  );
};
