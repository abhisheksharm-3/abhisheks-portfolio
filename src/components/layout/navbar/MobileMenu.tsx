"use client";

import { motion } from "framer-motion";
import { MobileMenuPropsType } from "@/lib/types/components";
import { MobileNavLink } from "./MobileNavLink";
import { Logo } from "./Logo";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

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
          onClick={onClose}
          className="p-2 text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-start gap-1">
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease: "easeOut" }}
          >
            <MobileNavLink
              item={item}
              isActive={item.name === activeItem}
              onClick={onClose}
            />
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex items-center justify-between pt-8 border-t border-foreground/8"
      >
        <ModeToggle />

        <Link
          href="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs border border-foreground/15 text-foreground/55 hover:text-foreground/80 hover:border-foreground/25 transition-all duration-200 px-4 py-1.5"
        >
          Hire me
          <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>
    </motion.div>
  </>
);
