"use client";

import { motion, Variants } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import ContactHeader from "@/components/sections/contact/ContactHeader";
import ContactBackground from "@/components/sections/contact/ContactBackground";
import ContactForm from "@/components/sections/ContactForm";
import ScheduleMeetingCard from "@/components/sections/contact/ScheduleMeetingCard";
import ContactInfoCard from "@/components/sections/contact/ContactInfoCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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
    <PageLayout>
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

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>

          {/* Right Column (with its own staggered items) */}
          <motion.div variants={containerVariants} className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <ScheduleMeetingCard />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ContactInfoCard />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default ContactPage;