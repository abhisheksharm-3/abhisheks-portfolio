"use client";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Renders the site logo as a clickable link to the homepage.
 * Features a subtle hover animation for interactivity.
 */
export const Logo = () => (
  <Link href="/" className="group relative z-50">
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
        <span className="text-primary font-serif italic">A</span>
        <span className="font-extralight tracking-tight">BHK</span>
        <span className="text-primary/70 align-super text-[10px]">®</span>
      </h2>
    </motion.div>
  </Link>
);
