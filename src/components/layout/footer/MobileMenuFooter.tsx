"use client";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/data/contact";
import { motion } from "framer-motion";
import { Logo } from "../navbar";

/**
 * Renders the footer section for the mobile menu.
 * It includes a decorative divider, social media links, and a signature,
 * all with staggered entrance animations.
 */
export const MobileMenuFooter = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.4 }}
    className="w-full pt-8 flex flex-col items-center"
  >
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-12 h-px bg-primary/30 mb-8"
    />

    <div className="flex justify-center space-x-6">
      {SOCIAL_LINKS.map((platform, i) => (
        <motion.div
          key={platform.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10"
            asChild
          >
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.label}
            >
              <platform.icon className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-10 text-xs text-foreground/50 text-center"
    >
      <Logo />
      <p className="mt-1">made this. with love, with code.</p>
    </motion.div>
  </motion.div>
);
