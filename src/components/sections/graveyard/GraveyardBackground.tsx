import { motion } from "framer-motion";
import { GhostIcon } from "./icons";
import AbstractPath from "@/components/shared/AbstractPath";

export function GraveyardBackground({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Noise */}
      <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
        <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
          <filter id="graveyardNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#graveyardNoiseFilter)" />
        </svg>
      </div>
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 bottom-0 w-[1px] bg-primary/30" style={{ left: '13%' }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-primary/10" style={{ left: '28%' }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" style={{ left: '67%' }} />
        <div className="absolute top-0 bottom-0 w-[1px] bg-primary/15" style={{ left: '89%' }} />
        <div className="absolute left-0 right-0 h-[1px] bg-primary/25" style={{ top: '22%' }} />
        <div className="absolute left-0 right-0 h-[1px] bg-primary/10" style={{ top: '58%' }} />
        <div className="absolute left-0 right-0 h-[1px] bg-primary/20" style={{ top: '81%' }} />
      </div>
      {/* Abstract SVG paths */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute left-[5%] top-[15%] text-primary/8"
      >
        <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
      >
        <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
      </motion.div>
      {/* Floating ghosts */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => {
          const size = `${30 + Math.random() * 40}px`;
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: 0
              }}
              animate={{
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0, 0.1, 0, 0.1, 0]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <GhostIcon className="text-white/10" style={{ width: size, height: size }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}