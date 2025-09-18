"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileMenu } from "./MobileMenu";
import { TypeNavItem } from "@/lib/types";
import { navigationItems } from "@/lib/config/nav-config";
import { NavbarBackground } from "./NavbarBackground";
import { Logo } from "./Logo";
import { DesktopNavbar } from "./DesktopNavbar";

/**
 * A hook that returns true if the user has scrolled past a certain threshold.
 * @param threshold The scroll distance in pixels.
 * @returns `true` if `window.scrollY` is greater than the threshold, otherwise `false`.
 */
const useScrollEffect = (threshold: number) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

/**
 * A hook that determines the active navigation item based on the current pathname.
 * @param items The array of navigation items.
 * @returns The name of the active navigation item, or `null`.
 */
const useActivePath = (items: TypeNavItem[]): string | null => {
  const pathname = usePathname();
  const activeItem = items.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  return activeItem?.name || null;
};

/**
 * Renders the main site Navbar with navigation, theme toggle, and CTA.
 * Features a blurred background on scroll and handles mobile menu logic.
 * @returns {JSX.Element} The Navbar component.
 */
export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrollEffect(40);
  const activeItem = useActivePath(navigationItems);

  // Toggles a class on the body to prevent scrolling when the mobile menu is open.
  // This requires a corresponding rule in your global CSS: .overflow-hidden { overflow: hidden; }
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed top-0 w-full px-6 sm:px-8 lg:px-32 flex justify-between items-center z-40 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}
      >
        <NavbarBackground isScrolled={isScrolled} />

        <Logo />
        <DesktopNavbar activeItem={activeItem} />

        <div className="flex md:hidden items-center space-x-2 z-50">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
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
