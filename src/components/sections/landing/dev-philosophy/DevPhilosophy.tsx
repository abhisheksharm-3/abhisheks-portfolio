"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  PhilosophyQuote,
  PhilosophyPrinciples,
} from "./DevPhilosophyComponents";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  getSectionClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * The main component for the Philosophy section.
 * Redesigned as a minimal editorial section.
 */
export const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className={getSectionClasses()}>
      <SharedBackground
        isInView={isInView}
        noiseFilterId="philosophyNoiseFilter"
      />

      <div
        className="relative z-10 w-full"
      >
        <SectionHeader subtitle="how i think about dev" isInView={isInView}>
          <span className="font-serif italic text-foreground select-none pr-4">
            not a manifesto, just how i build
          </span>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="w-full"
        >
          <PhilosophyQuote isInView={isInView} />

          <div className="h-px bg-primary/10 my-12" />

          <PhilosophyPrinciples isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
};
