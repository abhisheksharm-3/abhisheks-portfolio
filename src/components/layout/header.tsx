"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileMenu } from "./mobile-menu";

// --- CONFIG & TYPES ---

export type NavItem = { name: string; href: string };

export const navigationItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Graveyard", href: "/graveyard" },
  { name: "Contact", href: "/contact" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

// --- SUB-COMPONENTS ---

const Logo = () => (
  <Link href="/" className="group relative z-50">
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
      <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
        <span className="text-primary font-serif italic">A</span>
        <span className="font-extralight tracking-tight">BHK</span>
        <span className="text-primary/70 align-super text-[10px]">®</span>
      </h2>
    </motion.div>
  </Link>
);

const DesktopNav = ({ activeItem }: { activeItem: string | null }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <motion.ul variants={containerVariants} className="flex items-center space-x-6">
        {navigationItems.map((item) => (
          <motion.li key={item.name} variants={itemVariants} className="relative" onMouseEnter={() => setHoveredItem(item.name)} onMouseLeave={() => setHoveredItem(null)}>
            <Link href={item.href} className={`text-sm transition-colors duration-300 ${activeItem === item.name ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>
              {item.name}
            </Link>
            {(activeItem === item.name || hoveredItem === item.name) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 h-px w-full bg-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div variants={itemVariants} className="w-px h-4 bg-primary/20" />
      
      <motion.div variants={itemVariants}>
        <Button variant="ghost" size="sm" asChild>
          <a href="https://old.abhisheksan.com" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground/60">
            V1 Site
          </a>
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}><ModeToggle /></motion.div>
      
      <motion.div variants={itemVariants}>
        <Button variant="outline" size="sm" asChild className="border-primary/10 bg-primary/5 hover:bg-primary/10 text-xs group">
          <Link href="/contact">
            Hire me <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </motion.div>
    </nav>
  );
};

// --- MAIN HEADER ---

/**
 * Renders the main site header with navigation, theme toggle, and CTA.
 * Features a blurred background on scroll and handles mobile menu logic.
 * @returns {JSX.Element} The Header component.
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const activeItem = navigationItems.find(item => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))?.name || null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className={`fixed top-0 w-full px-6 sm:px-8 lg:px-32 flex justify-between items-center z-40 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div 
          className="absolute inset-0 -z-10 transition-all duration-300"
          style={{
            borderColor: isScrolled ? 'rgba(var(--primary), 0.08)' : 'transparent',
            backdropFilter: `blur(${isScrolled ? 8 : 0}px)`,
            WebkitBackdropFilter: `blur(${isScrolled ? 8 : 0}px)`,
          }}
        />
        
        <Logo />
        <DesktopNav activeItem={activeItem} />

        <div className="flex md:hidden items-center space-x-2 z-50">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
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
}