"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Send } from "lucide-react";
import { CONTACT_CHANNELS } from "@/data/contact";
import { CONTACT_ANIMATION_CONFIG } from "@/lib/config/contact";

/**
 * Renders the main header for the Contact CTA section.
 */
export const SectionHeader = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: CONTACT_ANIMATION_CONFIG.section.duration }}
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
        Contact
      </motion.span>
    </div>
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: 60 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: CONTACT_ANIMATION_CONFIG.header.duration,
          delay: CONTACT_ANIMATION_CONFIG.header.delay,
        }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-none"
      >
        <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
          Let’s Build Something
        </span>
      </motion.h2>
    </div>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "5rem", opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
    />
  </motion.div>
);

/**
 * Decorative background icons
 */
export const BackgroundIcons = ({ isHovering }: { isHovering: boolean }) => (
  <>
    <motion.div
      animate={{ scale: isHovering ? 1.1 : 1, rotate: isHovering ? 5 : 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-10 left-10 opacity-10"
    >
      <Mail className="w-24 h-24 text-primary" strokeWidth={1} />
    </motion.div>
    <motion.div
      animate={{ scale: isHovering ? 1.05 : 1, rotate: isHovering ? -3 : 0 }}
      transition={{ duration: 0.7 }}
      className="absolute bottom-10 right-10 opacity-10"
    >
      <MessageCircle className="w-20 h-20 text-primary" strokeWidth={1} />
    </motion.div>
  </>
);

/**
 * Call-to-action buttons
 */
export const CallToActionButtons = ({ isInView }: { isInView: boolean }) => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: CONTACT_ANIMATION_CONFIG.buttons.duration,
        delay: CONTACT_ANIMATION_CONFIG.buttons.delay,
      }}
    >
      <Button
        size="lg"
        className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 shadow-sm shadow-primary/20"
        asChild
      >
        <Link href="/contact">
          Build with me
          <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </Button>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: CONTACT_ANIMATION_CONFIG.buttons.duration,
        delay: CONTACT_ANIMATION_CONFIG.buttons.delay + 0.1,
      }}
    >
      <Button
        variant="outline"
        size="lg"
        className="group border-primary/20 hover:bg-primary/5 hover:border-primary/30 px-8 py-6"
        asChild
      >
        <Link href="/projects">
          See what I’ve built
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </motion.div>
  </div>
);

/**
 * Direct contact channels
 */
export const ContactChannels = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: CONTACT_ANIMATION_CONFIG.channels.duration,
      delay: CONTACT_ANIMATION_CONFIG.channels.delay,
    }}
    className="mt-16 pt-8 border-t border-primary/10 flex flex-wrap justify-center gap-6"
  >
    {CONTACT_CHANNELS.map((channel, index) => (
      <motion.a
        key={channel.label}
        href={channel.href}
        target={channel.href.startsWith("http") ? "_blank" : undefined}
        rel={
          channel.href.startsWith("http") ? "noopener noreferrer" : undefined
        }
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: CONTACT_ANIMATION_CONFIG.channelItem.duration,
          delay:
            CONTACT_ANIMATION_CONFIG.channelItem.baseDelay +
            index * CONTACT_ANIMATION_CONFIG.channelItem.stagger,
        }}
        className="flex items-center gap-2 text-foreground/60 text-xs hover:text-foreground/80 transition-colors duration-300"
      >
        <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5">
          {channel.icon}
        </div>
        <div>
          <span className="text-foreground/40 block mb-0.5">
            {channel.label === "Email"
              ? "Drop me a mail"
              : channel.label === "LinkedIn"
                ? "Let’s connect"
                : channel.label === "GitHub"
                  ? "Peek at my code"
                  : channel.label}
          </span>
          <span className="text-foreground/80">{channel.value}</span>
        </div>
      </motion.a>
    ))}
  </motion.div>
);
