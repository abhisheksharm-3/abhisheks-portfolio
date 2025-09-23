"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { AppShell } from "@/components/layout/AppShell";
import {
  AboutPageCTA,
  AboutPageHeader,
  BioCard,
  ContactCard,
  ExperienceEducationSection,
  InterestsSection,
  SkillsSection,
} from "@/components/sections/about";
import { containerVariants, itemVariants } from "@/lib/config/page-animations";
import {
  getHalfScreenPageWrapperClasses,
  getSectionClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * Renders the "About Me" page, featuring sections that animate into view on scroll.
 * Animations are orchestrated using a parent container for a clean and maintainable implementation.
 * @returns {JSX.Element} The About page component.
 */
const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <AppShell>
      <div className={getHalfScreenPageWrapperClasses()}>
        <motion.section
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SharedBackground
            isInView={isInView}
            noiseFilterId="aboutPageNoiseFilter"
          />

          <motion.div variants={itemVariants}>
            <AboutPageHeader />
          </motion.div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 ${SPACING_STANDARDS.GRID.GAP_LARGE} ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
          >
            <motion.div variants={itemVariants} className="md:col-span-2">
              <BioCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ContactCard />
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}
          >
            <ExperienceEducationSection />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}
          >
            <SkillsSection />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}
          >
            <InterestsSection />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AboutPageCTA />
          </motion.div>
        </motion.section>
      </div>
    </AppShell>
  );
};

export default AboutPage;
