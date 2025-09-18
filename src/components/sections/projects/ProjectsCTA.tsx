"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * ProjectsCTA - Call-to-action component for projects section
 * Renders a card prompting users to get in touch with continuous background glow
 * and staggered content animation.
 * 
 * @returns JSX.Element representing the projects CTA section
 */
export const ProjectsCTA = () => {
  return (
    <div className="mt-24 text-center">
      <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          className="p-8 sm:p-10 relative"
        >
          <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl -z-10"
          />

          <motion.h3 variants={itemVariants} className="text-2xl sm:text-3xl font-serif italic mb-4">
            Have a project in mind?
          </motion.h3>

          <motion.div
            variants={{
              hidden: { width: 0 },
              visible: { width: "8rem", transition: { duration: 1, ease: "easeOut" } },
            }}
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-6"
          />
          
          <motion.p variants={itemVariants} className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8" asChild>
              <Link href="/contact" className="flex items-center">
                Get in touch
                <motion.div
                  className="ml-2 flex items-center justify-center"
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </div>
  );
};