"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { CONTACT_ANIMATION_CONFIG } from "@/lib/config/contact";
import {
  SectionHeader,
  BackgroundIcons,
  CallToActionButtons,
  ContactChannels,
} from "./cta-components";
import { SharedBackground } from "@/components/shared/SharedBackground";

/**
 * A decorative accent for the top-right corner of a card.
 */
const CardCornerAccent = () => (
  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
    <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
    <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
  </div>
);

/**
 * The main component for the Contact Call-to-Action section.
 * It orchestrates a visually engaging card with multiple interactive elements
 * and clear calls to action.
 *
 * @returns {JSX.Element} The rendered Contact CTA section.
 */
export const ContactCTA = () => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section
      ref={sectionRef}
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      <SharedBackground isInView={isInView} noiseFilterId="contactCTANoiseFilter" /> 

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader isInView={isInView} />

        <Card
          className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="p-8 sm:p-10 md:p-16 text-center relative">
            <motion.div
              animate={{
                opacity: isHovering ? 0.15 : 0.05,
                scale: isHovering ? 1.05 : 1,
              }}
              transition={{
                duration: CONTACT_ANIMATION_CONFIG.hoverTransition.duration,
              }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl -z-10"
            />
            <BackgroundIcons isHovering={isHovering} />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: CONTACT_ANIMATION_CONFIG.content.duration,
                  delay: CONTACT_ANIMATION_CONFIG.content.delay,
                }}
                className="space-y-4 max-w-xl mx-auto mb-12"
              >
                <p className="text-foreground/70 text-sm sm:text-base font-light leading-relaxed">
                  I’m open to select projects and exciting{" "}
                  <span className="text-primary/80 font-medium inline-flex items-center gap-1">
                    <Briefcase className="h-4 w-4" /> full-time opportunities
                  </span>
                  . If you’ve got an idea to build, a product to scale, or a
                  problem that needs solving — let’s make it happen together.
                </p>
              </motion.div>

              <CallToActionButtons isInView={isInView} />

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: CONTACT_ANIMATION_CONFIG.contactInfo.duration,
                  delay: CONTACT_ANIMATION_CONFIG.contactInfo.delay,
                }}
                className="mt-12 text-sm text-foreground/50 font-light"
              >
                Prefer straight to inbox?{" "}
                <a
                  href="mailto:abhishek@abhisheksan.com"
                  className="text-primary/70 hover:text-primary transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
                >
                  abhishek@abhisheksan.com
                </a>
              </motion.div>
            </div>

            <ContactChannels isInView={isInView} />
          </div>
          <CardCornerAccent />
        </Card>
      </div>
    </section>
  );
};
