"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  navbarContainerVariants,
  navbarItemVariants,
  navigationItems,
} from "@/lib/config/nav-config";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

/**
 * Renders the navigation links, theme toggle, and action buttons for desktop viewports.
 *
 * @param {{ activeItem: string | null }} props - The currently active navigation item.
 */
export const DesktopNavbar = ({
  activeItem,
}: {
  activeItem: string | null;
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="hidden xl:flex items-center space-x-8">
      <motion.ul
        variants={navbarContainerVariants}
        className="flex items-center space-x-8"
      >
        {navigationItems.map((item) => (
          <motion.li
            key={item.name}
            variants={navbarItemVariants}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            onFocus={() => setHoveredItem(item.name)}
            onBlur={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors duration-300",
                activeItem === item.name
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              )}
            >
              <span className="relative z-10">{item.name}</span>
              
              <motion.div
                className="absolute inset-0 -mx-2 -my-1 rounded-lg bg-primary/5 -z-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredItem === item.name ? 1 : 0,
                  scale: hoveredItem === item.name ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {(activeItem === item.name || hoveredItem === item.name) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {activeItem === item.name && (
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary/20 blur-sm rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={navbarItemVariants}
        className="w-px h-6 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
      />

      <motion.div
        variants={navbarItemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <ModeToggle />
      </motion.div>

      <motion.div
        variants={navbarItemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Button
          variant="ghost"
          size="sm"
          asChild
          className={cn(
            "text-xs text-foreground/60 hover:text-foreground/80",
            "hover:bg-foreground/5 group transition-all duration-300",
            "border border-transparent hover:border-primary/10",
            "rounded-lg px-3 py-2"
          )}
        >
          <Link
            href="https://old.abhisheksan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <History className="mr-1.5 h-3 w-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <span className="group-hover:tracking-wide transition-all duration-300">Old Portfolio</span>
          </Link>
        </Button>
      </motion.div>

      <motion.div
        variants={navbarItemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Button
          variant="outline"
          size="sm"
          asChild
          className={cn(
            "relative border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10",
            "hover:from-primary/10 hover:to-primary/20 text-xs group",
            "transition-all duration-300 overflow-hidden",
            "shadow-sm hover:shadow-md hover:shadow-primary/10",
            "rounded-lg px-4 py-2"
          )}
        >
          <Link href="/contact">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={{ translateX: "200%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10 group-hover:tracking-wide transition-all duration-300">
              Hire me
            </span>
            <ArrowRight className="relative z-10 ml-1.5 h-3 w-3 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
          </Link>
        </Button>
      </motion.div>
    </nav>
  );
};