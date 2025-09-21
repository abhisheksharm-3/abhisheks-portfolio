"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Renders the dynamic, blurred background for the main Navbar.
 * It transitions from transparent to a blurred, tinted surface when the user scrolls.
 * @param {{ isScrolled: boolean }} props - The component props.
 */
export const NavbarBackground = ({ isScrolled }: { isScrolled: boolean }) => (
  <motion.div
    className={cn(
      "absolute inset-0 -z-10 transition-all duration-500",
      isScrolled
        ? "backdrop-blur-xl"
        : "border-transparent backdrop-blur-none bg-transparent"
    )}
    animate={{
      opacity: isScrolled ? 1 : 0.8,
      y: isScrolled ? 0 : -1,
    }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {isScrolled && (
      <>
        {/* Gradient overlay for additional depth */}
        {/* Subtle border glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </>
    )}
  </motion.div>
);