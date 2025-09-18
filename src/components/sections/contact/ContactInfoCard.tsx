"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import React from "react";

// --- CONFIG & DATA ---

const CONTACTS = [
  {
    label: "Email",
    Icon: Mail,
    link: "mailto:abhitiku2003@gmail.com",
    display: "abhitiku2003@gmail.com",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/**
 * A card component displaying a list of contact details and social media links.
 * @returns {JSX.Element} The ContactInfoCard component.
 */
export const ContactInfoCard: React.FC = () => {
  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="p-8 sm:p-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
            <Mail className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif italic">Contact Details</h2>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: { width: "3rem", transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
        />

        <motion.div variants={containerVariants} className="space-y-4">
          {CONTACTS.map(({ label, Icon, link, display }) => (
            <motion.div variants={itemVariants} className="flex items-start gap-3" key={label}>
              <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5 mt-0.5">
                <Icon className="h-4 w-4 text-primary/70" />
              </div>
              <div>
                <p className="text-xs text-foreground/40 mb-1">{label}</p>
                <a
                  href={link}
                  target={link.startsWith("http") ? "_blank" : undefined}
                  rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {display}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </Card>
  );
}