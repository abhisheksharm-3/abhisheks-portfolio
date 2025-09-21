"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeaderPropsType } from "@/lib/types";

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
    className={cn("flex flex-col mb-16 sm:mb-20 relative z-10", className)}
  >
    <div className="flex items-center mb-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xs text-primary/60 uppercase tracking-wider font-light"
      >
        {subtitle}
      </motion.span>
    </div>
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
      transition={{ duration: 1, delay: 0.6 }}
      className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
    />
  </motion.div>
);