"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeMobileMenuProps } from "@/lib/types";
import { mobileMenuVariants } from "@/lib/config/nav-config";
import { MobileNavLink } from "./MobileNavLink";
import { MobileMenuFooter } from "../footer";

/**
 * Renders the full-screen mobile navigation menu.
 */
export const MobileMenu: React.FC<TypeMobileMenuProps> = ({
  onClose,
  navigationItems,
  activeItem,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 font-serif"
    >
      <div className="h-full flex flex-col justify-between px-6 pb-10">
        <motion.div
          className="flex flex-col items-center gap-6 pt-16"
          initial="hidden"
          animate="visible"
          variants={mobileMenuVariants}
        >
          {navigationItems.map((item) => (
            <MobileNavLink
              key={item.name}
              item={item}
              isActive={item.name === activeItem}
              isHovered={item.name === hoveredItem}
              onHoverStart={() => setHoveredItem(item.name)}
              onHoverEnd={() => setHoveredItem(null)}
              onClick={onClose}
            />
          ))}
        </motion.div>

        <MobileMenuFooter />
      </div>
    </motion.div>
  );
};
