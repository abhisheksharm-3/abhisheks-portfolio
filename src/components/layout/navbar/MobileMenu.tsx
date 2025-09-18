"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypeMobileMenuProps } from "@/lib/types";
import { mobileMenuVariants, mobileNavItemVariants } from "@/lib/config/nav-config";
import { MobileNavLink } from "./MobileNavLink";
import { MobileMenuFooter } from "../footer";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import Link from "next/link";

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
          
          <motion.div
            variants={mobileNavItemVariants}
            className="mt-4"
          >
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-sm text-foreground/60 hover:text-foreground/80 hover:bg-foreground/5 group"
              onClick={onClose}
            >
              <Link href="https://old.abhisheksan.com" target="_blank" rel="noopener noreferrer">
                <History className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Old Portfolio
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <MobileMenuFooter />
      </div>
    </motion.div>
  );
};
