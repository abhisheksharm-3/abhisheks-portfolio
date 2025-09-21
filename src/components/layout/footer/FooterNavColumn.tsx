"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  footerContainerVariants,
  footerItemVariants,
  FooterNavLinks,
} from "@/lib/config/footer-config";

/**
 * Renders the navigation column for the site footer.
 * Features a "magic underline" that animates smoothly between links on hover or focus.
 */
export const FooterNavColumn = () => {
  const [focusedLink, setFocusedLink] = useState<string | null>(null);

  return (
    <motion.div variants={footerItemVariants} className="md:text-center">
      <h3 className="text-sm font-medium text-foreground/70 mb-5">jump to</h3>
      <motion.ul variants={footerContainerVariants} className="space-y-3">
        {FooterNavLinks.map((link) => (
          <motion.li key={link.name} variants={footerItemVariants}>
            <Link
              href={link.href}
              className="text-sm text-foreground/50 hover:text-primary transition-colors relative inline-block"
              onMouseEnter={() => setFocusedLink(link.name)}
              onMouseLeave={() => setFocusedLink(null)}
              onFocus={() => setFocusedLink(link.name)}
              onBlur={() => setFocusedLink(null)}
            >
              {link.name}
              {focusedLink === link.name && (
                <motion.span
                  layoutId="footerUnderline"
                  className="absolute left-0 top-full h-px w-full bg-primary"
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};