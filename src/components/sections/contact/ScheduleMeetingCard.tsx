"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Clock, Video } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * A card component with a call-to-action to schedule a meeting via an external link.
 * @returns {JSX.Element} The ScheduleMeetingCard component.
 */
export const ScheduleMeetingCard = () => {
  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative group">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="p-8 sm:p-10 relative"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2.5 rounded-lg border border-primary/10 bg-gradient-to-br from-primary/10 to-primary/5">
            <Calendar className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif italic">Schedule a Meeting</h2>
        </motion.div>

        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: {
              width: "4rem",
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mb-6"
        />

        <motion.p
          variants={itemVariants}
          className="text-foreground/60 text-sm font-light leading-relaxed mb-6"
        >
          Prefer to talk in real-time? Schedule a 30-minute call at your
          convenience.
        </motion.p>

        {/* Quick info badges */}
        <motion.div variants={itemVariants} className="flex gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-foreground/50">
            <Clock className="h-3.5 w-3.5" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground/50">
            <Video className="h-3.5 w-3.5" />
            <span>Google Meet</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/10"
            asChild
          >
            <a
              href="https://cal.com/abhisheksan/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a time slot
              <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-20 bg-gradient-to-l from-primary/30 via-primary/10 to-transparent" />
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/20" />
      </div>

      {/* Subtle pattern */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </Card>
  );
};

