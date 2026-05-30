"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraveyardBackground,
  GraveyardIntroCard,
  GraveyardProjectCard,
  GraveyardSectionHeader,
} from "@/components/sections/graveyard";
import { deadProjects } from "@/data/project";
import { ArrowRight } from "lucide-react";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";

const inspirationalQuotes = [
  "at least there’s a commit for it.",
  "dead repos are just proof i actually tried.",
  "some things are worth starting even when you can’t finish them.",
  "shipped nothing, learned plenty — fair trade.",
  "these taught me more than the ones that shipped.",
];

/**
 * Renders the Graveyard page, showcasing abandoned projects as learning experiences.
 * Features orchestrated animations and a random inspirational quote.
 * @returns {JSX.Element} The GraveyardPage component.
 */
const GraveyardPage = () => {
  // Use useState with an initializer function to select a quote only once on mount.
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    return inspirationalQuotes[randomIndex];
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <AppShell>
      <motion.div
        ref={sectionRef}
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 relative overflow-hidden"
      >
        <GraveyardBackground />

        <motion.div variants={ITEM_VARIANTS}>
          <GraveyardSectionHeader quote={quote} />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS}>
          <GraveyardIntroCard />
        </motion.div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${SPACING_STANDARDS.GRID.GAP_MEDIUM} mb-8`}
        >
          {deadProjects.map((project, index) => (
            <motion.div key={project.title} variants={ITEM_VARIANTS}>
              <GraveyardProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={ITEM_VARIANTS} className="mt-8">
          <div className="h-px bg-primary/10 mb-8" />
          <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5">
            prefer the living
          </p>
          <Button
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              Escape the Graveyard
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default GraveyardPage;
