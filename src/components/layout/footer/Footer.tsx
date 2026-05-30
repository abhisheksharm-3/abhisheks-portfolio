"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/data/contact";
import { NAVIGATION_ITEMS } from "@/data/navigation";
import {
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
} from "@/lib/config/page-animations";

export const Footer = () => (
  <footer className="border-t border-primary/10">
    <div className="px-6 sm:px-8 lg:px-24 py-16 sm:py-20">
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14"
      >
        {/* Brand */}
        <motion.div variants={ITEM_VARIANTS}>
          <Link href="/" className="inline-block mb-5">
            <span className="text-2xl font-light tracking-tighter">
              <span className="text-primary font-serif italic">A</span>
              <span className="font-extralight">BHK</span>
              <span className="text-primary/70 align-super text-[10px]">®</span>
            </span>
          </Link>
          <p className="text-sm text-foreground/50 font-light leading-relaxed mb-6 max-w-xs">
            building things that feel good to use.
          </p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((platform) => (
              <a
                key={platform.label}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform.label}
                className="text-foreground/30 hover:text-foreground/70 transition-colors duration-200"
              >
                <platform.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div variants={ITEM_VARIANTS} className="md:justify-self-center">
          <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5">
            pages
          </p>
          <ul className="space-y-3">
            {NAVIGATION_ITEMS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/50 hover:text-foreground/90 transition-colors duration-200 font-light"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={ITEM_VARIANTS}
          className="md:justify-self-end md:text-right"
        >
          <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5">
            say hi
          </p>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-sm text-foreground/50 hover:text-foreground/90 transition-colors duration-200 font-light block mb-4"
          >
            {CONTACT_INFO.email}
          </a>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/70 transition-colors duration-200 font-light"
          >
            <span>get in touch</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="h-px bg-primary/8 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <p className="text-xs text-foreground/35 font-light">
          © {new Date().getFullYear()}{" "}
          <span className="text-foreground/60">Abhishek Sharma</span>. all mine.
        </p>
        <p className="text-[10px] text-foreground/25 tracking-wider uppercase">
          Chandigarh · Pune, India · available remotely
        </p>
      </div>
    </div>
  </footer>
);
