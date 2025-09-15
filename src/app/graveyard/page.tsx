"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GraveyardBackground } from "@/components/sections/graveyard/GraveyardBackground";
import { GraveyardSectionHeader } from "@/components/sections/graveyard/GraveyardSectionHeader";
import { GraveyardIntroCard } from "@/components/sections/graveyard/GraveyardIntroCard";
import { deadProjects } from "@/data/project";
import { GraveyardProjectCard } from "@/components/sections/graveyard/GraveyardProjectCard";

const inspirationalQuotes = [
  "Every dead project is a stepping stone to success.",
  "Failure is just success in progress.",
  "The only real mistake is the one from which we learn nothing.",
  "Success is stumbling from failure to failure with no loss of enthusiasm.",
  "Every abandoned project brings you one step closer to the one that will succeed.",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Renders the Graveyard page, showcasing abandoned projects as learning experiences.
 * Features orchestrated animations and a random inspirational quote.
 * @returns {JSX.Element} The GraveyardPage component.
 */
export default function GraveyardPage() {
  const quote = useMemo(
    () => inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)],
    []
  );

  return (
    <PageLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden"
      >
        <GraveyardBackground />
        <motion.div variants={itemVariants}>
          <GraveyardSectionHeader quote={quote} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <GraveyardIntroCard />
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {deadProjects.map((project, index) => (
            <GraveyardProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-16">
          <h3 className="text-2xl font-serif italic mb-4">
            Prefer the land of the living?
          </h3>
          <div
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8 w-32"
          />
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
    </PageLayout>
  );
}