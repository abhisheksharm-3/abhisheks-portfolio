import { motion } from "framer-motion";

/** Renders the blurred background effect for the Navbar. */
export const NavbarBackground = ({ isScrolled }: { isScrolled: boolean }) => (
  <motion.div
    className={`
      absolute inset-0 -z-10 border-b transition-all duration-500 ease-out
      ${isScrolled
        ? "border-primary/20 backdrop-blur-xl bg-background/80 shadow-lg shadow-primary/5"
        : "border-transparent backdrop-blur-none bg-transparent"
      }
    `}
    animate={{
      opacity: isScrolled ? 1 : 0.8,
      y: isScrolled ? 0 : -1
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {/* Gradient overlay for additional depth */}
    {isScrolled && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    )}
    
    {/* Subtle border glow */}
    {isScrolled && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    )}
  </motion.div>
);
