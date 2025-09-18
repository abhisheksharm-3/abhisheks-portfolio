import { mobileNavItemVariants } from "@/lib/config/nav-config";
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
    variants={mobileNavItemVariants}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
    className="relative"
  >
    <Link
      href={item.href}
      className={`text-xl font-light ${isActive ? "text-primary" : "text-foreground/80"} transition-colors duration-300 flex items-center`}
      onClick={onClick}
    >
      <motion.span
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {item.name}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{
          opacity: isHovered || isActive ? 1 : 0,
          x: isHovered || isActive ? 0 : -5,
        }}
        transition={{ duration: 0.2 }}
        className="ml-2"
      >
        <ArrowRight className="h-4 w-4 text-primary" />
      </motion.div>
    </Link>

    <motion.div
      className="h-px bg-primary/50 absolute -bottom-1 left-0 right-0"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
      style={{ transformOrigin: "left" }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);
