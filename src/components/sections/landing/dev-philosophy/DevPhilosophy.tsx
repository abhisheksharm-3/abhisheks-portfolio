"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  QuoteBlock,
  DecorativeDivider,
  PhilosophyDescription,
  CardCornerAccent,
} from "./DevPhilosophyComponents";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  getSectionClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * The main component for the Philosophy section.
 * It orchestrates the display of the development approach and core beliefs,
 * wrapped in a decorative, animated container.
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
        className={`container mx-auto ${SPACING_STANDARDS.PAGE.CONTAINER_PADDING} relative z-10`}
      >
        <SectionHeader subtitle="how i think about dev" isInView={isInView}>
          <span className="font-serif italic bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none pr-4">
            not a manifesto, just how i build
          </span>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Enhanced card with better visual hierarchy */}
          <div className="relative group">
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/50 to-primary/10 rounded-2xl blur-3xl opacity-60" />

            {/* Main card */}
            <Card
              className="
                relative border border-primary/10 backdrop-blur-lg 
                bg-background/60 shadow-2xl shadow-primary/5
                overflow-visible rounded-2xl
                group-hover:shadow-primary/10 transition-all duration-500
              "
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />

              {/* Content with enhanced spacing */}
              <div
                className={`relative z-10 ${SPACING_STANDARDS.CARD.PADDING} pt-20 sm:${SPACING_STANDARDS.CARD.PADDING_LARGE} sm:pt-16 lg:${SPACING_STANDARDS.CARD.PADDING_LARGE} lg:pt-20`}
              >
                <QuoteBlock isInView={isInView} />
                <DecorativeDivider isInView={isInView} />
                <PhilosophyDescription isInView={isInView} />
              </div>

              {/* Enhanced corner accents */}
              <CardCornerAccent />
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
