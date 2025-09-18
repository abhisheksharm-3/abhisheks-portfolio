import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  navbarContainerVariants,
  navbarItemVariants,
  navigationItems,
} from "@/lib/config/nav-config";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/** Renders the navigation links and actions for desktop view. */
export const DesktopNavbar = ({ activeItem }: { activeItem: string | null }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <motion.ul
        variants={navbarContainerVariants}
        className="flex items-center space-x-6"
      >
        {navigationItems.map((item) => (
          <motion.li
            key={item.name}
            variants={navbarItemVariants}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={`text-sm transition-colors duration-300 ${activeItem === item.name ? "text-primary" : "text-foreground/70 hover:text-primary"}`}
            >
              {item.name}
            </Link>
            {(activeItem === item.name || hoveredItem === item.name) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 h-px w-full bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={navbarItemVariants}
        className="w-px h-4 bg-primary/20"
      />

      <motion.div variants={navbarItemVariants}>
        <ModeToggle />
      </motion.div>

      <motion.div variants={navbarItemVariants}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-primary/10 bg-primary/5 hover:bg-primary/10 text-xs group"
        >
          <Link href="/contact">
            Hire me{" "}
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </nav>
  );
};
