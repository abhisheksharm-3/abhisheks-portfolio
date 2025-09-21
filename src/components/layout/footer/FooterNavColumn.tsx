import {
  footerContainerVariants,
  footerItemVariants,
  FooterNavLinks,
} from "@/lib/config/footer-config";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

/** Renders the navigation column with a animated underline hover effect. */
export const FooterNavColumn = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.div variants={footerItemVariants} className="md:text-center">
      <h3 className="text-sm font-medium text-foreground/70 mb-5">Explore</h3>
      <motion.ul variants={footerContainerVariants} className="space-y-3">
        {FooterNavLinks.map((link) => (
          <motion.li key={link.name} variants={footerItemVariants}>
            <Link
              href={link.href}
              className="text-sm text-foreground/50 hover:text-primary transition-colors relative inline-block"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.name}
              {hoveredLink === link.name && (
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
