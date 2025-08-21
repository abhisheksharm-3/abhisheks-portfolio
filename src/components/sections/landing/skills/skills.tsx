"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SERVICES } from "@/data/skills";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { FeaturedSkillsSection, SecondarySkillsGrid, SectionHeader } from "./skills-components";

/**
 * The main component for the Skills/Expertise section.
 * It orchestrates the display of background elements, a header, a featured skills section,
 * and a grid of additional skills, all animated on scroll.
 *
 * @returns {JSX.Element} The rendered Skills section.
 */
export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // Trigger animation when the top of the section is 1% visible
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  // Split the services data for different layout treatments
  const mainServices = SERVICES.slice(0, 3);
  const additionalServices = SERVICES.slice(3);

  return (
    <section ref={sectionRef} className="py-36 sm:py-44 relative overflow-hidden">
      <SharedBackground isInView={isInView} noiseFilterId="skillsNoiseFilter" /> 

      <div className="container mx-auto px-6">
        <SectionHeader isInView={isInView} />
        <FeaturedSkillsSection mainServices={mainServices} isInView={isInView} />
        <SecondarySkillsGrid additionalServices={additionalServices} isInView={isInView} />
      </div>
    </section>
  );
};