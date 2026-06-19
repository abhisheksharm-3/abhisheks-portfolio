"use client";

import { motion } from "framer-motion";

export const ContactHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <p className="text-[11px] text-primary/40 uppercase tracking-[0.2em] mb-7 font-light">
      get in touch
    </p>

    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-tight text-foreground mb-7">
      let&apos;s connect
    </h1>

    <p className="text-foreground/45 text-base sm:text-lg font-light leading-relaxed max-w-md">
      open for freelance work, full-time roles, and the occasional wild idea.
    </p>
  </motion.div>
);
