"use client";

import { motion, Variants } from "framer-motion";
import {AppShell} from "@/components/layout/AppShell";
import { ContactBackground, ContactHeader, ContactInfoCard, ScheduleMeetingCard, SendMessageCard } from "@/components/sections/contact";

/**
 * Animation variants for the main page container.
 * Orchestrates a staggered animation for its children.
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/**
 * Animation variants for individual items within the container.
 * Each item fades and slides into view.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Renders the main contact page, orchestrating the animated entry of its sections.
 * @returns {JSX.Element} The ContactPage component.
 */
const ContactPage = () => {
  return (
    <AppShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden"
      >
        <ContactBackground />

        <motion.div variants={itemVariants}>
          <ContactHeader />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div variants={itemVariants}>
            <SendMessageCard />
          </motion.div>

          <div className="flex flex-col gap-8">
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