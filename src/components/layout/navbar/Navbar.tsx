"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { NavigationItemType } from "@/lib/types";
import { NAVIGATION_ITEMS as navigationItems } from "@/data/navigation";
import { NavbarBackground } from "./NavbarBackground";
import { Logo } from "./Logo";
import { DesktopNavbar } from "./DesktopNavbar";
import { ModeToggle } from "@/components/ModeToggle";

const useScrollEffect = (threshold: number): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

const useActivePath = (items: readonly NavigationItemType[]): string | null => {
  const pathname = usePathname();
  const activeItem = items.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );
  return activeItem?.name || null;
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollEffect(40);
  const activeItem = useActivePath(navigationItems);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={cn(
          "fixed top-0 w-full px-6 sm:px-8 lg:px-24 2xl:px-40 flex justify-between items-center z-40 transition-all duration-300",
          isScrolled ? "py-3" : "py-5",
        )}
      >
        <NavbarBackground isScrolled={isScrolled} />

        <Logo />

        <DesktopNavbar activeItem={activeItem} />

        <div className="flex xl:hidden items-center gap-3 z-50">
          <ModeToggle />

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="p-1.5 text-foreground/50 hover:text-foreground/80 transition-colors duration-200"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            navigationItems={navigationItems}
            activeItem={activeItem}
          />
        )}
      </AnimatePresence>
    </>
  );
};
