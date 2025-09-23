import {
  containerVariants,
  itemVariants,
} from "@/lib/config/page-animations";
import { SOCIAL_LINKS } from "@/data/contact";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Renders the brand column for the site footer.
 * Includes the logo, a brief tagline, and animated social media links.
 */
export const FooterBrandColumn = () => (
  <motion.div variants={itemVariants} className="flex flex-col">
    <Link href="/" className="mb-5 inline-block">
      <h2 className="text-2xl sm:text-3xl font-light tracking-tighter">
        <span className="text-primary font-serif italic">A</span>
        <span className="font-extralight tracking-tight">BHK</span>
        <span className="text-primary/70 align-super text-[10px]">®</span>
      </h2>
    </Link>
    <p className="text-sm text-foreground/60 font-light leading-relaxed mb-6 max-w-xs">
      building things on the web that actually feel good to use.
    </p>
    <motion.div variants={containerVariants} className="flex space-x-3">
      {SOCIAL_LINKS.map((platform) => (
        <motion.a
          key={platform.label}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/10 bg-primary/5 text-foreground/60 hover:text-primary hover:border-primary/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={platform.label}
          variants={itemVariants}
        >
          <platform.icon />
        </motion.a>
      ))}
    </motion.div>
  </motion.div>
);