"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";
import { NAVIGATION_ITEMS } from "@/data/navigation";

/**
 * Renders the navigation column for the site footer.
 * Features a "magic underline" that animates smoothly between links on hover or focus.
 */
export const FooterNavColumn = () => {
  const [focusedLink, setFocusedLink] = useState<string | null>(null);

  return (
    <motion.div variants={ITEM_VARIANTS} className="md:text-center">
      <h3 className="text-sm font-medium text-foreground/70 mb-5">jump to</h3>
      <motion.ul variants={CONTAINER_VARIANTS} className="space-y-3">
        {NAVIGATION_ITEMS.map((link) => (
          <motion.li key={link.name} variants={ITEM_VARIANTS}>
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
