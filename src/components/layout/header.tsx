"use client";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileMenu } from "./mobile-menu";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  scrollPosition: number;
}

type NavItem = {
  name: string;
  href: string;
};

const navigationItems: NavItem[] = [
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Archive", href: "/archive" },
  { name: "Contact", href: "/contact" }
];

export function Header({ scrollPosition }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showActions, setShowActions] = useState(false);
  const pathname = usePathname();
  
  // Reveal the actions button after a small delay
  useEffect(() => {
    const timer = setTimeout(() => setShowActions(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // Dynamic header styling based on scroll position
  const isScrolled = scrollPosition > 50;
  
  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full px-6 sm:px-8 lg:px-32 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm" 
            : ""
        }`}
      >
        {/* Logo Section */}
        <Link href="/" className="group relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-center"
          >
            <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
              <span className="text-primary font-serif italic group-hover:text-primary/80 transition-colors duration-300">A</span>
              <span className="font-extralight tracking-tight group-hover:text-primary transition-colors duration-300">BHK</span>
              <span className="text-primary/70 align-super text-[10px] group-hover:text-primary transition-colors duration-300">®</span>
            </h2>
          </motion.div>
          
          {/* Decorative underline */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-6 bg-primary/30"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`text-sm relative ${
                isActive(item.href) 
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-primary"
              } transition-colors duration-300`}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
              
              {/* Active indicator or hover effect */}
              {(isActive(item.href) || hoveredItem === item.name) && (
                <motion.span 
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 h-px w-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          {/* Action button with staggered animation */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-xs border-primary/10 bg-primary/5 hover:bg-primary/10 group ml-2"
                >
                  Hire me
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Theme toggle with subtle animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <ModeToggle />
          </motion.div>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ModeToggle />
          </motion.div>
          
          <motion.div
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 relative overflow-hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence initial={false} mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll progress indicator */}
        {isScrolled && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: scrollPosition / document.body.scrollHeight, opacity: 1 }}
            className="absolute bottom-0 left-0 h-0.5 bg-primary/30 origin-left"
            style={{ width: "100%" }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}