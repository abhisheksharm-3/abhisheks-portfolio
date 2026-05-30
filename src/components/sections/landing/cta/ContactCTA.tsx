"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/data/contact";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getSectionClasses } from "@/lib/config/spacing-standards";

export const ContactCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section ref={sectionRef} className={getSectionClasses()}>
      <SharedBackground isInView={isInView} noiseFilterId="contactCTANoiseFilter" />

      <div className="relative z-10 w-full">
        <SectionHeader subtitle="reach out" isInView={isInView}>
          <span className="font-serif italic text-foreground select-none pr-4">
            let&apos;s make cool stuff
          </span>
        </SectionHeader>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="text-foreground/55 text-base font-light leading-relaxed max-w-lg mb-10"
        >
          open for freelance, full-time roles, and interesting problems. if you
          have an idea or a project, just reach out.
        </motion.p>

        <motion.a
          href={`mailto:${CONTACT_INFO.email}`}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="group inline-flex items-center gap-3 mb-16"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground/80 group-hover:text-foreground transition-colors duration-300 tracking-tight">
            {CONTACT_INFO.email}
          </span>
          <ArrowUpRight className="h-6 w-6 text-foreground/30 group-hover:text-foreground/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="h-px bg-primary/10 mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground transition-colors duration-300"
          >
            <span>let&apos;s build together</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-sm font-light text-foreground/40 hover:text-foreground/80 transition-colors duration-200"
              >
                <link.icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 h-px bg-primary/10"
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs font-light text-foreground/35 hover:text-foreground/60 transition-colors duration-200"
          >
            <span>or browse things i&apos;ve made</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
