"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import BioCard from "@/components/sections/about/BioCard";
import ContactCard from "@/components/sections/about/ContactCard";
import ExperienceEducationSection from "@/components/sections/about/ExperienceEducationSection";
import SkillsSection from "@/components/sections/about/SkillsSection";
import InterestsSection from "@/components/sections/about/InterestsSection";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { AboutPageHeader } from "@/components/sections/about/AboutPageHeader";
import { AboutPageCTA } from "@/components/sections/about/AboutPageCTA";

/**
 * The main "About Me" page component.
 * It orchestrates the layout of various informational sections, animated on scroll.
 *
 * @returns {JSX.Element} The rendered About page.
 */
const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <PageLayout activePage="About">
      <div ref={sectionRef} className="pt-24 px-6 sm:px-8 lg:px-32">
        <section className="py-36 sm:py-44 relative overflow-hidden">
          {/* Reusable background component for a consistent look and feel */}
          <SharedBackground isInView={isInView} noiseFilterId="aboutPageNoiseFilter" />

          <AboutPageHeader isInView={isInView} />

          {/* Bio & Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-2"
            >
              <BioCard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ContactCard />
            </motion.div>
          </div>
          
          {/* Experience, Skills, and Interests sections with staggered animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-20"
          >
            <ExperienceEducationSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <SkillsSection isInView={isInView} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-20"
          >
            <InterestsSection isInView={isInView} />
          </motion.div>

          <AboutPageCTA isInView={isInView} />
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutPage;