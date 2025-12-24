"use in client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FooterBackground } from "./FooterBackground";
import { FooterBrandColumn } from "./FooterBrandColumn";
import { FooterNavColumn } from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterBottomBar } from "./FooterBottomBar";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";

/**
 * Renders the main site footer with navigation, social links, and contact information.
 * Features a distinct card design and orchestrated animations that trigger on scroll.
 */
export const Footer = () => {
  return (
    <motion.footer
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden"
    >
      <FooterBackground />

      <div className="container mx-auto px-6 py-16 sm:py-20 relative z-10">
        <motion.div variants={ITEM_VARIANTS}>
          <Card className="border-primary/10 backdrop-blur-sm overflow-hidden mb-12 relative">
            <div className="p-8 sm:p-10">
              <motion.div
                variants={CONTAINER_VARIANTS}
                className="grid grid-cols-1 md:grid-cols-3 gap-10"
              >
                <FooterBrandColumn />
                <FooterNavColumn />
                <FooterContactColumn />
              </motion.div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
              <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
            </div>
          </Card>
        </motion.div>

        <FooterBottomBar />
      </div>
    </motion.footer>
  );
};
