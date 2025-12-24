"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import React from "react";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";

// --- CONFIG & DATA ---

const CONTACTS = [
  {
    label: "Email",
    Icon: Mail,
    link: "mailto:abhishek@abhisheksan.com",
    display: "abhishek@abhisheksan.com",
  },
  {
    label: "GitHub",
    Icon: Github,
    link: "https://github.com/abhisheksharm-3",
    display: "github.com/abhisheksharm-3",
  },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    link: "https://www.linkedin.com/in/abhisheksan/",
    display: "linkedin.com/in/abhisheksan",
  },
  {
    label: "Instagram",
    Icon: Instagram,
    link: "https://instagram.com/abhishekxsharmaa",
    display: "instagram.com/abhishekxsharmaa",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * A card component displaying a list of contact details and social media links.
 * @returns {JSX.Element} The ContactInfoCard component.
 */
export const ContactInfoCard: React.FC = () => {
  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative group">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`${SPACING_STANDARDS.CARD.PADDING} sm:${SPACING_STANDARDS.CARD.PADDING_LARGE} relative`}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2.5 rounded-lg border border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5">
            <Mail className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif italic">contact details</h2>
        </motion.div>

        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: {
              width: "4rem",
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mb-6"
        />

        <motion.div variants={containerVariants} className="space-y-3">
          {CONTACTS.map(({ label, Icon, link, display }) => (
            <motion.a
              variants={itemVariants}
              key={label}
              href={link}
              target={link.startsWith("http") ? "_blank" : undefined}
              rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 p-3 -mx-3 rounded-lg hover:bg-primary/5 transition-colors duration-300 group/link"
            >
              <div className="p-2 rounded-lg border border-primary/10 bg-primary/5 group-hover/link:bg-primary/10 group-hover/link:border-primary/20 transition-colors duration-300">
                <Icon className="h-4 w-4 text-primary/60 group-hover/link:text-primary/80 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-foreground/40 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-sm text-foreground/70 group-hover/link:text-foreground/90 transition-colors duration-300 truncate">
                  {display}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-foreground/20 group-hover/link:text-foreground/50 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-20 bg-gradient-to-l from-primary/30 via-primary/10 to-transparent" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/20" />
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-foreground" />
          ))}
        </div>
      </div>
    </Card>
  );
};

