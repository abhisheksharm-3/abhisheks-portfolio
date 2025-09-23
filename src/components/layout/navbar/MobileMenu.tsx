"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileMenuPropsType } from "@/lib/types";
import { NAVIGATION_ANIMATIONS } from "@/data/navigation";
import { MobileNavLink } from "./MobileNavLink";
import { MobileMenuFooter } from "../footer";
import { Button } from "@/components/ui/button";
import { History, X } from "lucide-react";
import Link from "next/link";

/**
 * Renders the full-screen mobile navigation menu with orchestrated animations.
 *
 * @param {MobileMenuPropsType} props The component props.
 * @param {Function} props.onClose Callback to close the menu.
 * @param {TypeNavItem[]} props.navigationItems Array of navigation links.
 * @param {string | null} props.activeItem The name of the currently active link.
 */
export const MobileMenu: React.FC<MobileMenuPropsType> = ({
  onClose,
  navigationItems,
  activeItem,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl pt-20 font-serif"
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full hover:bg-foreground/5 transition-colors group"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
        </motion.button>

        <div className="h-full flex flex-col justify-between px-6 pb-10">
          <motion.div
            className="flex flex-col items-center pt-8"
            initial="hidden"
            animate="visible"
            variants={NAVIGATION_ANIMATIONS.mobileMenu.container}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="mb-12"
            >
              <Link href="/" onClick={onClose} className="group">
                <h2 className="text-3xl font-light tracking-tighter text-center">
                  <span className="text-primary font-serif italic">A</span>
                  <span className="font-extralight tracking-tight">BHK</span>
                  <span className="text-primary/70 align-super text-xs">
                    ®
                  </span>
                </h2>
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-3 w-16 mx-auto"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </Link>
            </motion.div>

            <div className="flex flex-col items-center gap-4 w-full max-w-sm px-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="w-full"
                >
                  <MobileNavLink
                    item={item}
                    isActive={item.name === activeItem}
                    isHovered={item.name === hoveredItem}
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={onClose}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-8"
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "text-sm text-foreground/60 hover:text-foreground/80",
                  "hover:bg-foreground/5 group transition-all duration-200",
                  "rounded-lg px-4 py-2",
                )}
                onClick={onClose}
              >
                <Link
                  href="https://old.abhisheksan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <History className="mr-2 h-4 w-4 group-hover:scale-105 transition-transform" />
                  <span>Old Portfolio</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <MobileMenuFooter />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
