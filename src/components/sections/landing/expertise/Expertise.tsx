"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Expertise } from "@/data/skills";
import { SharedBackground } from "@/components/shared/SharedBackground";
import {
  FeaturedSkillsSection,
  SecondarySkillsGrid,
} from "./ExpertiseComponents";
import { SectionHeader } from "@/components/shared/SectionHeader";

/**
 * The main component for the Skills/Expertise section.
 * It orchestrates the display of a header, featured skills, and a grid of
 * additional skills, all animated on scroll.
 */
export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Split the services data for different layout treatments
  const mainServices = Expertise.slice(0, 3);
  const additionalServices = Expertise.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="py-36 sm:py-44 relative overflow-hidden"
      id="skills"
    >
      <SharedBackground isInView={isInView} noiseFilterId="skillsNoiseFilter" />

      <div className="container mx-auto px-6">
        <SectionHeader subtitle="Expertise" isInView={isInView}>
          <span className="font-serif italic bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none pr-4">
            what i do best
          </span>
        </SectionHeader>
        
        <FeaturedSkillsSection
          mainServices={mainServices}
          isInView={isInView}
        />
        <SecondarySkillsGrid
          additionalServices={additionalServices}
          isInView={isInView}
        />
      </div>
    </section>
  );
};