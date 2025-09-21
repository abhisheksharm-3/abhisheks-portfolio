import { TypeNavItem } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Renders a single animated navigation link for the mobile menu.
 */
export const MobileNavLink = ({
  item,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  item: TypeNavItem;
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) => (
  <motion.div
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
    className="relative w-full text-center group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    {/* Subtle background effect */}
    <motion.div
      className="
        absolute inset-0 -mx-1 -my-1 rounded-lg 
        bg-foreground/[0.02] backdrop-blur-sm
      "
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isHovered || isActive ? 1 : 0
      }}
      transition={{ duration: 0.2 }}
    />

    <Link
      href={item.href}
      className={`
        relative z-10 text-lg font-light flex items-center justify-center
        ${isActive ? "text-primary" : "text-foreground/80"} 
        transition-all duration-200 py-3 px-4 w-full
      `}
      onClick={onClick}
    >
      {/* Text with minimal animations */}
      <motion.span
        animate={{ 
          x: isHovered ? 2 : 0
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative tracking-wide text-center"
      >
        {item.name}
      </motion.span>

      {/* Arrow with subtle animation */}
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{
          opacity: isHovered || isActive ? 1 : 0,
          x: isHovered || isActive ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
        className="ml-2 absolute right-4"
      >
        <ArrowRight className="h-4 w-4 text-primary/70" />
      </motion.div>
    </Link>

    {/* Minimal underline */}
    <motion.div
      className="
        h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent 
        absolute -bottom-1 left-6 right-6
      "
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ 
        scaleX: isActive || isHovered ? 1 : 0,
        opacity: isActive || isHovered ? 1 : 0
      }}
      style={{ transformOrigin: "center" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  </motion.div>
);
