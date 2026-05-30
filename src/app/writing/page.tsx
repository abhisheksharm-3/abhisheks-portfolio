"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowUpRight } from "lucide-react";

const PLANNED_TOPICS = [
  {
    tag: "ai / agents",
    title: "building an autonomous content pipeline with langgraph",
    note: "what nobody tells you about multi-agent state management",
  },
  {
    tag: "android",
    title: "on-device ai in react native with onnx and tts",
    note: "making llms work without the cloud",
  },
  {
    tag: "backend",
    title: "row-level security in supabase, done properly",
    note: "multi-tenant isolation without losing your mind",
  },
  {
    tag: "philosophy",
    title: "shipping scrappy vs shipping right",
    note: "where i draw the line and why it keeps moving",
  },
  {
    tag: "career",
    title: "one year at wednesday: what i actually learned",
    note: "the things probation doesn't prepare you for",
  },
];

const WritingPage = () => (
  <AppShell>
    <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 max-w-[2000px] mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 sm:mb-12"
      >
        <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5">
          writing
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-tight text-foreground mb-6">
          thoughts & notes
        </h1>
        <div className="h-px bg-primary/10 w-full mb-6" />
        <p className="text-foreground/55 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
          write-ups from production work. things that bit me, how i diagnosed them, and what i would do differently.
        </p>
      </motion.div>

      {/* Coming soon callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2.5 border border-foreground/10 bg-foreground/[0.02]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shrink-0" />
          <span className="text-sm text-foreground/50 font-light">
            setting up the writing workflow. first post drops soon.
          </span>
        </div>
      </motion.div>

      {/* Planned posts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
            drafts in progress
          </span>
          <div className="h-px bg-primary/10 flex-1" />
        </div>

        <div className="divide-y divide-primary/8">
          {PLANNED_TOPICS.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4 + index * 0.07,
              }}
              className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6"
            >
              <span className="text-[11px] text-primary/35 uppercase tracking-[0.15em] font-light sm:w-28 shrink-0">
                {post.tag}
              </span>
              <div className="flex-1">
                <p className="text-base font-light text-foreground/70 group-hover:text-foreground/90 transition-colors duration-200 leading-snug mb-1">
                  {post.title}
                </p>
                <p className="text-xs text-foreground/35 font-light italic">
                  {post.note}
                </p>
              </div>
              <span className="text-[10px] text-primary/25 uppercase tracking-[0.15em] font-light shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                drafting
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Notify section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="mt-12 pt-8 border-t border-primary/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-2">
              get notified
            </p>
            <p className="text-sm text-foreground/50 font-light">
              follow me on x or linkedin. i'll post when something drops.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/abhisheksan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors duration-200 font-light"
            >
              <span>x / twitter</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <a
              href="https://linkedin.com/in/abhisheksan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors duration-200 font-light"
            >
              <span>linkedin</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  </AppShell>
);

export default WritingPage;
