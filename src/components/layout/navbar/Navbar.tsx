"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { MobileMenu } from "./MobileMenu";
import { TypeNavItem } from "@/lib/types";
import { navigationItems } from "@/lib/config/nav-config";
import { NavbarBackground } from "./NavbarBackground";
import { Logo } from "./Logo";
import { DesktopNavbar } from "./DesktopNavbar";

/**
 * A custom hook that returns true if the user has scrolled past a given threshold.
 * @param {number} threshold - The scroll distance in pixels from the top.
 * @returns {boolean} `true` if `window.scrollY` is greater than the threshold.
 */
const useScrollEffect = (threshold: number): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

/**
 * A custom hook that determines the active navigation item based on the current URL pathname.
 * @param {TypeNavItem[]} items - The array of navigation items to check against.
 * @returns {string | null} The name of the active navigation item, or null if none are active.
 */
const useActivePath = (items: TypeNavItem[]): string | null => {
  const pathname = usePathname();
  const activeItem = items.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  return activeItem?.name || null;
};

/**
 * Renders the main site navigation bar.
 * It features a dynamic background on scroll, handles mobile menu state,
 * and orchestrates desktop and mobile navigation components.
 */
export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrollEffect(40);
  const activeItem = useActivePath(navigationItems);

  // Toggles a class on the body to prevent scrolling when the mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
          opacity: { duration: 0.4 },
        }}
        className={cn(
          "fixed top-0 w-full px-6 sm:px-8 lg:px-32 flex justify-between items-center z-40 transition-all duration-500 ease-out",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <NavbarBackground isScrolled={isScrolled} />

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Logo />
        </motion.div>
        
        <DesktopNavbar activeItem={activeItem} />

        <div className="flex xl:hidden items-center space-x-3 z-50">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ModeToggle />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-lg hover:bg-primary/5 transition-all duration-200 p-2"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={18} className="text-foreground/70 hover:text-foreground transition-colors" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            navigationItems={navigationItems}
            activeItem={activeItem}
          />
        )}
      </AnimatePresence>
    </>
  );
};