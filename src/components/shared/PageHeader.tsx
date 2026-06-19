"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  STAGGER_CONTAINER_VARIANTS,
  STAGGER_ITEM_VARIANTS,
} from "@/lib/config/page-animations";
import { cn } from "@/lib/utils";

type PageHeaderPropsType = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * The single source of truth for every content page's header.
 * Renders a staggered eyebrow, title, divider, and optional intro, with an
 * optional slot for page-specific extras (e.g. the graveyard quote).
 */
export const PageHeader = ({
  eyebrow,
  title,
  intro,
  children,
  className,
}: PageHeaderPropsType) => {
  return (
    <motion.div
      variants={STAGGER_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col mb-10 sm:mb-12 relative z-10", className)}
    >
      <motion.p
        variants={STAGGER_ITEM_VARIANTS}
        className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5"
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        variants={STAGGER_ITEM_VARIANTS}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-foreground mb-6"
      >
        {title}
      </motion.h1>

      <motion.div
        variants={STAGGER_ITEM_VARIANTS}
        className="h-px bg-primary/10 w-full mb-6"
      />

      {intro && (
        <motion.p
          variants={STAGGER_ITEM_VARIANTS}
          className="text-foreground/55 max-w-2xl text-sm sm:text-base font-light leading-relaxed"
        >
          {intro}
        </motion.p>
      )}

      {children}
    </motion.div>
  );
};
