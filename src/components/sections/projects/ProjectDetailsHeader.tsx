import { motion } from "framer-motion";

export function ProjectDetailHeader({ title, description, isInView }: { title: string; description: string; isInView: boolean }) {
  return (
    <div className="overflow-visible mb-4">
      <motion.h1 
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
      >
        <div className="py-1">
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
            {title}
          </span>
        </div>
      </motion.h1>
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "5rem", opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4 mb-6"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-foreground/70 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
}