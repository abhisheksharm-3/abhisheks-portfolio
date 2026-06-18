"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExpertiseType } from "@/lib/types";
import { SKILLS_ANIMATIONS } from "@/data/animations";

interface SkillRowPropsType {
  service: ExpertiseType;
  index: number;
}

interface FeaturedSkillsSectionPropsType {
  mainServices: ExpertiseType[];
  isInView: boolean;
}

interface SecondarySkillsGridPropsType {
  additionalServices: ExpertiseType[];
  isInView: boolean;
}

/**
 * Renders a single expertise row in the editorial list.
 */
const SkillRow = ({ service, index }: SkillRowPropsType) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.item}
    className="group"
  >
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-7">
      {/* Index + title column */}
      <div className="flex items-baseline gap-4 sm:w-2/5">
        <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light tabular-nums w-5 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className="text-lg font-light text-foreground group-hover:text-primary/80 transition-colors duration-300">
          {service.title}
        </h4>
      </div>

      {/* Description column */}
      <p className="text-foreground/55 text-sm font-light leading-relaxed sm:w-2/5 sm:pt-0.5">
        {service.description}
      </p>

      {/* Skills + level column */}
      <div className="flex flex-col gap-3 sm:w-1/5 sm:items-end">
        <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
          {service.level}
        </span>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {service.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] text-foreground/50 font-light"
            >
              {skill}
            </span>
          ))}
          {service.skills.length > 3 && (
            <span className="text-[11px] text-primary/35 font-light">
              +{service.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="h-px bg-primary/10" />
  </motion.div>
);

/**
 * Renders the featured skills area as an editorial list with a description aside.
 */
export const FeaturedSkillsSection = ({
  mainServices,
  isInView,
}: FeaturedSkillsSectionPropsType) => (
  <div className="mb-16">
    {/* Section intro row */}
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-10">
      <div className="lg:w-2/5">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-2xl sm:text-3xl font-serif italic text-foreground mb-4"
        >
          how i build stuff
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="text-foreground/55 text-sm font-light leading-relaxed mb-6"
        >
          i keep it simple: start small, ship fast, tweak along the way. could
          be spinning up an ai bot in a weekend or rolling out a backend that
          just scales. i move quick, but never forget the details that make
          things actually usable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
          >
            see how i build things
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      <div className="lg:w-3/5">
        {/* Top rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-px bg-primary/10 mb-0"
        />
        <motion.div
          variants={SKILLS_ANIMATIONS.container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {mainServices.map((service, index) => (
            <SkillRow key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  </div>
);

/**
 * Renders a minimal two-column list of secondary skills.
 */
export const SecondarySkillsGrid = ({
  additionalServices,
  isInView,
}: SecondarySkillsGridPropsType) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
        also comfortable with
      </span>
      <div className="h-px bg-primary/10 flex-1" />
    </div>

    <motion.div
      variants={SKILLS_ANIMATIONS.container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-3 gap-0"
    >
      {additionalServices.map((service, index) => (
        <motion.div
          key={service.title}
          variants={SKILLS_ANIMATIONS.item}
          className="group"
        >
          <div
            className={`py-6 pr-8 ${index < additionalServices.length - 1 ? "sm:border-r border-primary/10" : ""} ${index > 0 ? "sm:pl-8" : ""}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-light text-foreground group-hover:text-primary/80 transition-colors duration-300">
                {service.title}
              </h4>
              <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
                {service.level}
              </span>
            </div>
            <p className="text-foreground/50 text-xs font-light leading-relaxed mb-3">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] text-foreground/40 font-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="h-px bg-primary/10 sm:hidden" />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);
