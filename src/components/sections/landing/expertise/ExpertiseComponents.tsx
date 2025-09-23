// src/components/sections/landing/skills/SkillsComponents.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, ArrowRight } from "lucide-react";
import { ExpertiseType } from "@/lib/types";
import { SKILLS_ANIMATIONS } from "@/data/animations";

/**
 * Renders a single skill card with its associated technologies.
 * @param {{ service: ExpertiseType }} props - The service/skill data to display.
 */
const SkillCard = ({ service }: { service: ExpertiseType }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.item}
    className="group flex flex-col h-full"
  >
    <div className="p-3 rounded-md border border-primary/10 inline-flex self-start mb-4 group-hover:border-primary/20 transition-colors duration-300">
      <motion.div
        whileHover={{ rotate: 15 }}
        transition={{ duration: 0.3 }}
        className="text-primary/70"
      >
        <service.icon className="h-5 w-5" />
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
 * Renders the featured skills area, combining a description with a grid of core skills.
 * @param {{ mainServices: ExpertiseType[]; isInView: boolean }} props - Component props.
 */
export const FeaturedSkillsSection = ({
  mainServices,
  isInView,
}: {
  mainServices: ExpertiseType[];
  isInView: boolean;
}) => (
  <Card className="border-primary/10 backdrop-blur-sm overflow-hidden mb-12 relative">
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
            how i build stuff
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
            i keep it simple: start small, ship fast, tweak along the way. could
            be spinning up an ai bot in a weekend or rolling out a backend that
            just scales. i move quick, but never forget the details that make
            things actually usable.
          </motion.p>
          <Button
            variant="outline"
            className="group border-primary/10 hover:bg-primary/5 rounded-md"
            asChild
          >
            <Link href="/about" className="flex items-center text-sm">
              check out more on my process
              <motion.div whileHover={{ x: 3 }} className="ml-2">
                <ArrowRight className="h-4 w-4 text-primary/70" />
              </motion.div>
            </Link>
          </Button>
        </div>
        <div className="w-full lg:w-2/3 pt-8 mt-8 border-t lg:border-t-0 lg:pt-0 lg:mt-0 lg:pl-16 lg:border-l border-primary/5">
          <motion.div
            variants={SKILLS_ANIMATIONS.container}
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
 * @param {{ additionalServices: ExpertiseType[]; isInView: boolean }} props - Component props.
 */
export const SecondarySkillsGrid = ({
  additionalServices,
  isInView,
}: {
  additionalServices: ExpertiseType[];
  isInView: boolean;
}) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.container}
    initial="hidden"
    animate={isInView ? "show" : "hidden"}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  >
    {additionalServices.map((service) => (
      <motion.div key={service.title} variants={SKILLS_ANIMATIONS.item}>
        <Card className="group border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-colors duration-300 h-full flex flex-col">
          <CardHeader className="pt-6 pb-0 px-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md border border-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="text-primary/70"
                >
                  <service.icon className="h-4 w-4" />
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