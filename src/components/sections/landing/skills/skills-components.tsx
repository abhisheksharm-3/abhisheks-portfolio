"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, ArrowRight } from "lucide-react";
import { TypeExpertise } from "@/lib/types";
import { SKILLS_ANIMATION_CONFIG } from "@/lib/config/skills";

/**
 * Renders the main header for the Skills section with animated elements.
 * @param {{ isInView: boolean }} props - Component props.
 */
export const SectionHeader = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 1 }}
    className="flex flex-col mb-16 sm:mb-20 relative z-10"
  >
    <div className="flex items-center mb-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xs text-primary/60 uppercase tracking-wider font-light"
      >
        Expertise
      </motion.span>
    </div>
    <div className="overflow-visible mb-4">
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
      >
        <div className="py-1">
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
            Technical Proficiency
          </span>
        </div>
      </motion.h2>
    </div>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "5rem", opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
    />
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
    >
      I&apos;ve built everything from hackathon-winning AI apps to minimalist
      Android tools. My strengths lie in turning complex ideas into usable
      products — blending fast iterations, scalable backends, and thoughtful
      interfaces that people actually enjoy using.
    </motion.p>
  </motion.div>
);

/**
 * Renders a single skill card used in the 'FeaturedSkillsSection'.
 * @param {{ service: TypeExpertise; index: number }} props - Component props.
 */
const SkillCard = ({ service }: { service: TypeExpertise }) => (
  <motion.div
    variants={SKILLS_ANIMATION_CONFIG.item}
    className="group flex flex-col"
  >
    <div className="p-3 rounded-md border border-primary/10 inline-flex mb-4 group-hover:border-primary/20 transition-colors duration-300">
      <motion.div
        whileHover={{ rotate: 15 }}
        transition={{ duration: 0.3 }}
        className="text-primary/70"
      >
        {service.icon}
      </motion.div>
    </div>
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-light">{service.title}</h4>
      <span className="text-xs font-light text-primary/60 px-2 py-0.5 border border-primary/10 rounded-md">
        {service.level}
      </span>
    </div>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "2rem" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-3"
    />
    <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
      {service.description}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {service.skills.map((skill) => (
        <span
          key={skill}
          className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

/**
 * Renders the main featured skills area, combining a description with a grid of core skills.
 * @param {{ mainServices: TypeExpertise[]; isInView: boolean }} props - Component props.
 */
export const FeaturedSkillsSection = ({
  mainServices,
  isInView,
}: {
  mainServices: TypeExpertise[];
  isInView: boolean;
}) => (
  <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative">
    <div className="p-8 sm:p-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="w-full lg:w-1/3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-16 h-16 rounded-md border border-primary/10 flex items-center justify-center mb-8"
          >
            <Palette className="h-8 w-8 text-primary/70" strokeWidth={1.25} />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-serif italic mb-6"
          >
            Development Approach
          </motion.h3>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8"
          >
            My process is pragmatic: build small, ship fast, refine
            continuously. Whether it&apos;s prototyping an AI agent in 48 hours
            or deploying a scalable backend with Appwrite, I value momentum and
            clarity — without losing sight of design and usability.
          </motion.p>

          <Button
            variant="outline"
            className="group border-primary/10 hover:bg-primary/5 rounded-md"
            asChild
          >
            <Link href="/about" className="flex items-center">
              <span className="text-sm">Learn more about my process</span>
              <motion.div
                className="ml-2 flex items-center justify-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-4 w-4 text-primary/70" />
              </motion.div>
            </Link>
          </Button>
        </div>
        <div className="w-full lg:w-2/3 pt-8 mt-8 border-t lg:border-t-0 lg:pt-0 lg:mt-0 lg:pl-16 lg:border-l border-primary/5">
          <motion.div
            variants={SKILLS_ANIMATION_CONFIG.container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {mainServices.map((service) => (
              <SkillCard key={service.title} service={service} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
      <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
    </div>
  </Card>
);

/**
 * Renders a grid of cards for secondary or additional skills.
 * @param {{ additionalServices: TypeExpertise[]; isInView: boolean }} props - Component props.
 */
export const SecondarySkillsGrid = ({
  additionalServices,
  isInView,
}: {
  additionalServices: TypeExpertise[];
  isInView: boolean;
}) => (
  <motion.div
    variants={SKILLS_ANIMATION_CONFIG.container}
    initial="hidden"
    animate={isInView ? "show" : "hidden"}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  >
    {additionalServices.map((service) => (
      <motion.div key={service.title} variants={SKILLS_ANIMATION_CONFIG.item}>
        <Card className="group border-primary/10 backdrop-blur-sm py-0 hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
          <CardHeader className="pt-6 pb-0 px-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md border border-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary/70"
                >
                  {service.icon}
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium">{service.title}</h4>
                  <span className="text-xs text-primary/60 px-2 py-0.5 border border-primary/10 rounded-md">
                    {service.level}
                  </span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "2rem" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mt-2"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 px-6">
            <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
              {service.description}
            </p>
          </CardContent>
          <CardFooter className="px-6 pt-0 pb-6 mt-auto">
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    ))}
  </motion.div>
);
