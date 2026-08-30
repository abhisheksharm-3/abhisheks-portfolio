"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { STAGGER_CONTAINER_VARIANTS, STAGGER_ITEM_VARIANTS } from "@/lib/config/page-animations";

/**
 * The shared shell for 404, error, and loading. These are pages a visitor lands on
 * unexpectedly, so they follow the same editorial language as every other page:
 * eyebrow, lowercase serif title, hairline, quiet body.
 */
export const StatePage = ({
  eyebrow,
  title,
  body,
  children,
  as: Heading = "h1",
}: {
  eyebrow: string;
  title: string;
  as?: "h1" | "p";
  body?: ReactNode;
  children?: ReactNode;
}) => (
  <AppShell>
    <div className="min-h-[70vh] flex items-center pt-36 pb-20 px-6 sm:px-10 lg:px-24">
      <motion.div
        variants={STAGGER_CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl"
      >
        <motion.p
          variants={STAGGER_ITEM_VARIANTS}
          className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5"
        >
          {eyebrow}
        </motion.p>

        <motion.div variants={STAGGER_ITEM_VARIANTS}>
          <Heading className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-foreground mb-6">
            {title}
          </Heading>
        </motion.div>

        <motion.div variants={STAGGER_ITEM_VARIANTS} className="h-px bg-primary/10 w-full mb-6" />

        {body && (
          <motion.p
            variants={STAGGER_ITEM_VARIANTS}
            className="text-foreground/55 text-sm sm:text-base font-light leading-relaxed"
          >
            {body}
          </motion.p>
        )}

        {children && (
          <motion.div variants={STAGGER_ITEM_VARIANTS} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  </AppShell>
);

/** A text link in the site's voice, used instead of filled buttons on state pages. */
export const StateLink = ({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const className =
    "group inline-flex items-center gap-2 text-sm font-light text-foreground/45 hover:text-foreground/75 transition-colors duration-200";

  if (onClick) {
    return (
      <button className={className} onClick={onClick} type="button">
        {children}
        <span className="text-foreground/25 group-hover:text-foreground/50 transition-colors duration-200">
          →
        </span>
      </button>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
      <span className="text-foreground/25 group-hover:text-foreground/50 transition-colors duration-200">
        →
      </span>
    </a>
  );
};
