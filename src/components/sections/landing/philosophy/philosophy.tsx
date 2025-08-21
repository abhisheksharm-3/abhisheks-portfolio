"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SpinningText } from "@/components/magicui/spinning-text";
import { Card } from "@/components/ui/card";
import {
  SectionHeader,
  QuoteBlock,
  DecorativeDivider,
  PhilosophyDescription,
  CardCornerAccent,
} from "./philosophy-components";
import { SharedBackground } from "@/components/shared/SharedBackground";

/**
 * The main component for the Philosophy section.
 * It orchestrates the display of the development approach and core beliefs,
 * wrapped in a decorative, animated container.
 *
 * @returns {JSX.Element} The rendered Philosophy section.
 */
export const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Trigger animation when the top of the section is 1% visible
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 relative overflow-hidden">
      <SharedBackground isInView={isInView} noiseFilterId="philosophyNoiseFilter" /> 

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader isInView={isInView} />

        <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-4xl mx-auto">
          <div className="p-8 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative inline-block mb-10"
            >
              <SpinningText className="opacity-70 text-sm">
                clean code • user experience • performance • accessibility •
              </SpinningText>
            </motion.div>

            <QuoteBlock isInView={isInView} />
            <DecorativeDivider isInView={isInView} />
            <PhilosophyDescription isInView={isInView} />
          </div>

          <CardCornerAccent />
        </Card>
      </div>
    </section>
  );
};