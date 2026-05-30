import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";
import { SOCIAL_LINKS } from "@/data/contact";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Renders the brand column for the site footer.
 * Includes the logo, a brief tagline, and animated social media links.
 */
export const FooterBrandColumn = () => (
  <motion.div variants={ITEM_VARIANTS} className="flex flex-col">
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
    <motion.div variants={CONTAINER_VARIANTS} className="flex space-x-3">
      {SOCIAL_LINKS.map((platform) => (
        <motion.a
          key={platform.label}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 border border-foreground/8 text-foreground/40 hover:text-foreground/70 hover:border-foreground/20 transition-colors duration-200"
          aria-label={platform.label}
          variants={ITEM_VARIANTS}
        >
          <platform.icon />
        </motion.a>
      ))}
    </motion.div>
  </motion.div>
);
