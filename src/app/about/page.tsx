"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { SharedBackground } from "@/components/shared/SharedBackground";
import PageLayout from "@/components/layout/page-layout";
import BioCard from "@/components/sections/about/BioCard";
import ContactCard from "@/components/sections/about/ContactCard";
import ExperienceEducationSection from "@/components/sections/about/ExperienceEducationSection";
import SkillsSection from "@/components/sections/about/SkillsSection";
import InterestsSection from "@/components/sections/about/InterestsSection";
import AboutPageHeader from "@/components/sections/about/AboutPageHeader";
import AboutPageCTA from "@/components/sections/about/AboutPageCTA";

/**
 * Defines reusable animation variants for page items.
 * The `visible` state accepts a custom number to stagger the animation delay.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

/**
 * Renders the 'About Me' page with performant, staggered animations on scroll.
 * @returns {JSX.Element} The About page component.
 */
const AboutPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <PageLayout activePage="About">
      <div ref={sectionRef} className="pt-24 px-6 sm:px-8 lg:px-32">
        <section className="py-36 sm:py-44 relative overflow-hidden">
          <SharedBackground
            isInView={isInView}
            noiseFilterId="aboutPageNoiseFilter"
          />

          <motion.div
            variants={itemVariants}
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AboutPageHeader />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <motion.div
              variants={itemVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="md:col-span-2"
            >
              <BioCard />
            </motion.div>
            <motion.div
              variants={itemVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <ContactCard />
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <ExperienceEducationSection />
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <SkillsSection />
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={5}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <InterestsSection />
          </motion.div>

          <motion.div
            variants={itemVariants}
            custom={6}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AboutPageCTA />
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
