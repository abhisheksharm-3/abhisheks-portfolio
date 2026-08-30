"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { PostMeta } from "@/lib/content/loader";

/**
 * The most recent post, as a quiet aside rather than a section of its own.
 * It sits under the projects grid to answer "what is he actually working through"
 * without competing with the work above it.
 */
export const FeaturedWriting = ({ post }: { post: PostMeta | undefined }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (!post) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 border-t border-foreground/8 pt-8"
    >
      <div className="flex items-baseline justify-between gap-6 mb-5">
        <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
          latest writing
        </p>
        <Link
          href="/writing"
          className="group inline-flex items-center gap-2 text-xs font-light text-foreground/35 hover:text-foreground/60 transition-colors duration-200"
        >
          <span>all posts</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <Link href={`/writing/${post.slug}`} className="group block max-w-3xl">
        <h3 className="font-serif text-lg sm:text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-200">
          {post.frontmatter.title}
        </h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-foreground/45">
          {post.frontmatter.subhead}
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] font-light text-primary/30">
          {post.frontmatter.tags[0]} / {post.frontmatter.readingTime} min
        </p>
      </Link>
    </motion.div>
  );
};
