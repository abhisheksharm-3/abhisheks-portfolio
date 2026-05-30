"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeaderPropsType } from "@/lib/types";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";

/**
 * A reusable, animated header for different sections of the landing page.
 *
 * @param {SectionHeaderPropsType} props The component props.
 */
export const SectionHeader = ({
  subtitle,
  children,
  isInView,
  className,
}: SectionHeaderPropsType) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8 }}
    className={cn(
      `flex flex-col ${SPACING_STANDARDS.HEADER.SECTION_MARGIN_BOTTOM} relative z-10`,
      className,
    )}
  >
    <motion.p
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light ${SPACING_STANDARDS.HEADER.TITLE_MARGIN_BOTTOM}`}
    >
      {subtitle}
    </motion.p>
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: 60 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl leading-none"
      >
        {children}
      </motion.h2>
    </div>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "5rem", opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className={`h-[1px] bg-primary/20 ${SPACING_STANDARDS.HEADER.ACCENT_LINE_MARGIN}`}
    />
  </motion.div>
);
