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
import { containerVariants, itemVariants } from "@/lib/config/page-animations";
import { getPageWrapperClasses, SPACING_STANDARDS } from "@/lib/config/spacing-standards";

/**
 * A collection of inspirational quotes about learning from failure.
 */
const inspirationalQuotes = [
  "Every dropped project is just another step toward the one that clicks.",
  "Failure isn’t the end — it’s just part of the process.",
  "The only real mistake is walking away without learning something new.",
  "Progress is moving from one failure to the next without losing your drive.",
  "Each project I leave behind clears the path for something better.",
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
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`${getPageWrapperClasses()} relative overflow-hidden`}
      >
        <GraveyardBackground />

        <motion.div variants={itemVariants}>
          <GraveyardSectionHeader quote={quote} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <GraveyardIntroCard />
        </motion.div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${SPACING_STANDARDS.GRID.GAP_MEDIUM} mb-16`}>
          {deadProjects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants}>
              <GraveyardProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-16">
          <h3 className="text-2xl font-serif italic mb-4">
            Prefer the land of the living?
          </h3>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8 w-32" />
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
