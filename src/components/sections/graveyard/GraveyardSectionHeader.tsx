"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { STAGGER_ITEM_VARIANTS } from "@/lib/config/page-animations";

/**
 * Renders the main header for the Graveyard page.
 * This component is designed to be part of a larger staggered animation sequence.
 * @param {object} props - The component props.
 * @param {string} props.quote - The inspirational quote to display.
 * @returns {JSX.Element} The GraveyardSectionHeader component.
 */
export const GraveyardSectionHeader = ({ quote }: { quote: string }) => {
  return (
    <PageHeader
      eyebrow="R.I.P"
      title="the project graveyard"
      intro="projects i stopped, with the reason for each and what it changed in how i work."
    >
      <motion.p
        variants={STAGGER_ITEM_VARIANTS}
        className="mt-5 max-w-2xl text-xs text-foreground/30 italic font-light leading-relaxed"
      >
        &ldquo;{quote}&rdquo;
      </motion.p>
    </PageHeader>
  );
};
