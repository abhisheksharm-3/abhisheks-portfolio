import { motion } from "framer-motion";

export default function ProjectsHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="flex flex-col mb-16 sm:mb-20 relative z-10"
    >
      <div className="flex items-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
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
          Project Archive
        </motion.span>
      </div>
      <div className="overflow-visible mb-4">
        <motion.h1 
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
        >
          <div className="py-1">
            <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
              Complete Portfolio
            </span>
          </div>
        </motion.h1>
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
        Browse my comprehensive collection of projects spanning web development, mobile applications, 
        and design work. Use the filters below to explore by technology or focus area.
      </motion.p>
    </motion.div>
  );
}