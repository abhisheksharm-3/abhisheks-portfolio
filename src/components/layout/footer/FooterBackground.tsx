import { footerPathVariants } from "@/lib/config/footer-config";
import { motion } from "framer-motion";

/** Renders the decorative, animated background elements for the footer. */
export const FooterBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
    <div className="absolute inset-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
        <filter id="footerNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#footerNoiseFilter)" />
      </svg>
    </div>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
      className="absolute inset-0"
    >
      <motion.svg viewBox="0 0 100 100" fill="none" className="absolute w-24 h-24 left-[5%] top-[15%] text-primary/8">
        <motion.path d="M10,30 C20,50 40,10 50,40 S80,20 90,40" stroke="currentColor" strokeWidth="0.5" variants={footerPathVariants} />
      </motion.svg>
      <motion.svg viewBox="0 0 100 100" fill="none" className="absolute w-24 h-24 right-[10%] bottom-[20%] rotate-180 text-primary/8">
        <motion.path d="M10,50 Q40,20 50,50 T90,30" stroke="currentColor" strokeWidth="0.5" variants={footerPathVariants} />
      </motion.svg>
    </motion.div>
  </div>
);