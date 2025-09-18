"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Renders a call-to-action to explore more projects.
 * Features a staggered entry animation for its content.
 * @returns {JSX.Element} The ProjectDetailMoreProjects component.
 */
export function ProjectDetailMoreProjects() {
  return (
    <motion.div variants={containerVariants} className="mt-24 text-center">
      <motion.h3 variants={itemVariants} className="text-2xl font-serif italic mb-4">
        Explore More Projects
      </motion.h3>
      
      <motion.div
        variants={{
          hidden: { width: 0 },
          visible: { width: "8rem", transition: { duration: 1, ease: "easeOut" } },
        }}
        className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8"
      />
      
      <motion.div variants={itemVariants}>
        <Button
          size="lg"
          className="group border-primary/10 bg-primary/5 hover:bg-primary/10 text-foreground px-8 py-6"
          asChild
        >
          <Link href="/projects" className="flex items-center">
            View All Projects
            <motion.div
              className="ml-2 flex items-center justify-center"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}