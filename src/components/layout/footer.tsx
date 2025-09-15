"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { socialLinks } from "@/data/contact";

// --- DATA & CONFIG ---

const currentYear = new Date().getFullYear();

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const pathVariants: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- SUB-COMPONENTS ---

const FooterBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
        <filter id="footerNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#footerNoiseFilter)" />
      </svg>
    </div>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
      className="absolute inset-0"
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        className="absolute w-[100px] h-[100px] left-[5%] top-[15%] text-primary/8"
      >
        <motion.path
          d="M10,30 C20,50 40,10 50,40 S80,20 90,40"
          stroke="currentColor"
          strokeWidth="0.5"
          variants={pathVariants}
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        className="absolute w-[100px] h-[100px] right-[10%] bottom-[20%] rotate-180 text-primary/8"
      >
        <motion.path
          d="M10,50 Q40,20 50,50 T90,30"
          stroke="currentColor"
          strokeWidth="0.5"
          variants={pathVariants}
        />
      </motion.svg>
    </motion.div>
  </div>
);

// --- MAIN FOOTER ---

/**
 * Renders the main site footer with navigation, social links, and contact information.
 * Features a standout card design and orchestrated animations.
 * @returns {JSX.Element} The Footer component.
 */
export const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden"
    >
      <FooterBackground />

      <div className="container mx-auto px-6 py-16 sm:py-20 relative z-10">
        <motion.div variants={itemVariants}>
          <Card className="border-primary/10 backdrop-blur-sm overflow-hidden mb-12 relative">
            <div className="p-8 sm:p-10">
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-10"
              >
                {/* Brand & Socials */}
                <motion.div variants={itemVariants} className="flex flex-col">
                  <Link href="/" className="mb-5 inline-block">
                    <h2 className="text-2xl sm:text-3xl font-light tracking-tighter">
                      <span className="text-primary font-serif italic">A</span>
                      <span className="font-extralight tracking-tight">BHK</span>
                      <span className="text-primary/70 align-super text-[10px]">®</span>
                    </h2>
                  </Link>
                  <p className="text-sm text-foreground/60 font-light leading-relaxed mb-6 max-w-xs">
                    Crafting digital experiences where clean code meets real impact.
                  </p>
                  <motion.div variants={containerVariants} className="flex space-x-3">
                    {socialLinks.map((platform) => (
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
                        {platform.icon}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Navigation */}
                <motion.div variants={itemVariants} className="md:text-center">
                  <h3 className="text-sm font-medium text-foreground/70 mb-5">Explore</h3>
                  <motion.ul variants={containerVariants} className="space-y-3">
                    {navLinks.map((link) => (
                      <motion.li key={link.name} variants={itemVariants}>
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

                {/* Contact */}
                <motion.div variants={itemVariants} className="md:text-right flex flex-col items-start md:items-end">
                  <h3 className="text-sm font-medium text-foreground/70 mb-5">Let’s Connect</h3>
                  <motion.div variants={containerVariants} className="space-y-4 flex flex-col items-start md:items-end">
                    <motion.a
                      href="mailto:abhishek@abhisheksan.com"
                      className="inline-flex items-center text-sm text-foreground/50 hover:text-primary transition-colors group"
                      variants={itemVariants}
                    >
                      <Mail className="h-3.5 w-3.5 mr-2 text-primary/50 group-hover:text-primary" />
                      abhishek@abhisheksan.com
                    </motion.a>
                    <motion.div variants={itemVariants}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-primary/10 bg-primary/5 hover:bg-primary/10 group"
                        asChild
                      >
                        <Link href="/contact">
                          Let’s build together
                          <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
              <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4"
        >
          <p className="text-xs text-foreground/40 font-light">
            © {currentYear} <span className="text-primary/80">Abhishek Sharma</span>. All Rights Reserved.
          </p>
          <p className="text-[10px] text-foreground/30 tracking-wider uppercase max-w-sm">
            Based in Chandigarh, India. Available for projects worldwide.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};