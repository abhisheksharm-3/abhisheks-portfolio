import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GhostIcon } from "./icons";

export function GraveyardIntroCard({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mb-16"
    >
      <Card className="border-red-500/10 backdrop-blur-sm overflow-hidden py-0 relative">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div className="w-full sm:w-1/3">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-16 h-16 rounded-md border border-red-500/10 flex items-center justify-center mb-8"
              >
                <GhostIcon className="h-8 w-8 text-amber-500/70" strokeWidth={1.25} />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl sm:text-3xl font-serif italic mb-6"
              >
                Digital Afterlife
              </motion.h3>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "3rem" } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="h-[1px] bg-gradient-to-r from-red-500/30 to-transparent mb-6"
              />
            </div>
            <div className="w-full sm:w-2/3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6"
              >
                Every developer has a collection of projects that never saw the light of day.
                Some were killed by technical challenges, others by shifting priorities, and a few
                simply ran out of runway.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed"
              >
                But even in death, these projects have value. Each tombstone represents a lesson learned,
                a skill gained, or an insight that informed future work. So pour one out for the fallen
                projects — they died so that others might live.
              </motion.p>
            </div>
          </div>
        </div>
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-red-500/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-red-500/20 to-transparent" />
        </div>
      </Card>
    </motion.div>
  );
}