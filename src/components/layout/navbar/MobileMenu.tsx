"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import type { MobileMenuPropsType } from "@/lib/types/components";
import { Logo } from "./Logo";
import { MobileNavLink } from "./MobileNavLink";
import { navTransitionTypes } from "./nav-direction";

export const MobileMenu: React.FC<MobileMenuPropsType> = ({
  onClose,
  navigationItems,
  activeItem,
}) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    />

    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-sm bg-background flex flex-col px-8 pt-6 pb-10 border-l border-foreground/8"
    >
      <div className="flex items-center justify-between mb-12">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 -mr-2 text-foreground/60 hover:text-foreground/85 transition-colors duration-200"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-start gap-1">
        {navigationItems.map((item) => (
          <MobileNavLink
            key={item.name}
            item={item}
            isActive={item.name === activeItem}
            transitionTypes={navTransitionTypes(activeItem, item.name)}
            onClick={onClose}
          />
        ))}
      </nav>

      <div className="flex items-center pt-8 border-t border-foreground/8">
        <ModeToggle />
      </div>
    </motion.div>
  </>
);
