"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


/**
 * Renders the final call-to-action button for the About page.
 * @param props - The component's props.
 * @returns {JSX.Element} The rendered CTA component.
 */
export const AboutPageCTA = ({ isInView }: { isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.1, duration: 1.2 }}
      className="flex justify-center"
    >
      <Button
        variant="outline"
        size="lg"
        className="group border-primary/10 text-base px-8 py-6 rounded-xl hover:bg-primary/5 transition-colors relative overflow-hidden"
        asChild
      >
        <Link href="/projects" className="flex items-center">
          <motion.span 
            className="font-medium tracking-wide relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            View my projects
          </motion.span>
          <motion.div
            className="ml-3 h-6 w-6 rounded-full border border-primary/20 flex items-center justify-center relative z-10 group-hover:border-primary/40 transition-colors duration-300"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="h-3 w-3 text-primary/70 group-hover:text-primary/90 transition-colors duration-300" />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>
      </Button>
    </motion.div>
  );
};