"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/contact";

export const ContactInfoCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] mb-4 font-light">
      elsewhere
    </p>
    <div>
      {CONTACT_DETAILS.map(({ label, Icon, link, display }) => (
        <a
          key={label}
          href={link}
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center gap-3 py-3 border-b border-primary/8 text-sm text-foreground/45 hover:text-foreground/80 transition-colors duration-200 group"
        >
          <Icon className="h-3.5 w-3.5 text-foreground/25 group-hover:text-foreground/50 transition-colors duration-200 shrink-0" strokeWidth={1.5} />
          <span className="flex-1 truncate font-light">{display}</span>
          <ArrowUpRight className="h-3 w-3 text-foreground/15 group-hover:text-foreground/45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
        </a>
      ))}
    </div>
  </motion.div>
);
