"use client";

import { motion, useInView } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import {
  ContactBackground,
  ContactHeader,
  ContactInfoCard,
  ScheduleMeetingCard,
  SendMessageCard,
} from "@/components/sections/contact";
import { containerVariants, itemVariants } from "@/lib/config/page-animations";
import { useRef } from "react";
import {
  getHalfScreenPageWrapperClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * Renders the main contact page, orchestrating the animated entry of its sections.
 * @returns {JSX.Element} The ContactPage component.
 */
const ContactPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  return (
    <AppShell>
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`${getHalfScreenPageWrapperClasses()} relative overflow-hidden`}
      >
        <ContactBackground />

        <motion.div variants={itemVariants}>
          <ContactHeader />
        </motion.div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 ${SPACING_STANDARDS.GRID.GAP_MEDIUM} max-w-6xl mx-auto`}
        >
          <motion.div variants={itemVariants}>
            <SendMessageCard />
          </motion.div>

          <div className={`flex flex-col ${SPACING_STANDARDS.GRID.GAP_MEDIUM}`}>
            <motion.div variants={itemVariants}>
              <ScheduleMeetingCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ContactInfoCard />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
};

export default ContactPage;
