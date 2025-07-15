"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { projects } from "@/data/project";
import AbstractPath from "@/components/shared/AbstractPath";
import ProjectsHeader from "@/components/sections/projects/ProjectsHeader";
import { ProjectsFilters } from "@/components/sections/projects/ProjectsFilter";
import ProjectsCTA from "@/components/sections/projects/ProjectsCTA";
const allTags = Array.from(
  new Set(projects.flatMap(project => project.tags))
).sort();

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.tags.includes(activeFilter))
      );
    }
  }, [activeFilter]);

  return (
    <PageLayout activePage="Projects">
      <div ref={sectionRef} className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise texture */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
              <filter id="projectsNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#projectsNoiseFilter)" />
            </svg>
          </div>
          {/* Asymmetrical grid lines */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/30" style={{ left: '13%' }} />
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/10" style={{ left: '28%' }} />
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" style={{ left: '67%' }} />
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/15" style={{ left: '89%' }} />
            <div className="absolute left-0 right-0 h-[1px] bg-primary/25" style={{ top: '22%' }} />
            <div className="absolute left-0 right-0 h-[1px] bg-primary/10" style={{ top: '58%' }} />
            <div className="absolute left-0 right-0 h-[1px] bg-primary/20" style={{ top: '81%' }} />
          </div>
          {/* Abstract SVG paths */}
          <AbstractPath className="absolute left-[5%] top-[15%] text-primary/8" pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
          <AbstractPath className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8" pathD="M10,50 Q40,20 50,50 T90,30" />
        </div>
        <ProjectsHeader isInView={isInView} />
        <div className="mb-12">
          <ProjectsFilters
            allTags={allTags}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filteredProjects={filteredProjects}
          />
        </div>
        <ProjectsCTA isInView={isInView} />
      </div>
    </PageLayout>
  );
}