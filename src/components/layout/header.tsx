"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileMenu } from "./mobile-menu";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  scrollPosition: number;
  activePage?: string;
}

// Define the NavItem type to be exported and reused
export type NavItem = {
  name: string;
  href: string;
};

// Single source of navigation items
export const navigationItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" }
];

export function Header({ scrollPosition, activePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [, setCursorPosition] = useState({ x: 0, y: 0 });
  const [, setIsHovering] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Animated values for cursor follower
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Set active item based on activePage prop or pathname
  useEffect(() => {
    if (activePage) {
      setActiveItem(activePage);
    } else {
      const active = navigationItems.find(item => 
        item.href === "/" 
          ? pathname === "/" 
          : pathname.startsWith(item.href)
      );
      setActiveItem(active?.name || null);
    }
  }, [pathname, activePage]);

  // Handle mouse movement for cursor and hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const { top, left } = headerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - left,
          y: e.clientY - top
        });
        cursorX.set(e.clientX - left);
        cursorY.set(e.clientY - top);
      }
    };
    
    const handleMouseEnter = () => setHeaderHovered(true);
    const handleMouseLeave = () => setHeaderHovered(false);
    
    const header = headerRef.current;
    if (header) {
      header.addEventListener("mousemove", handleMouseMove);
      header.addEventListener("mouseenter", handleMouseEnter);
      header.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        header.removeEventListener("mousemove", handleMouseMove);
        header.removeEventListener("mouseenter", handleMouseEnter);
        header.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [cursorX, cursorY]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Dynamic opacity based on scroll
  const headerOpacity = Math.min(1, scrollPosition / 150);
  const isScrolled = scrollPosition > 40;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="fixed top-0 w-full px-6 sm:px-8 lg:px-32 py-5 flex justify-between items-center z-50 transition-all duration-500"
        style={{ paddingTop: isScrolled ? "0.75rem" : "1.25rem", paddingBottom: isScrolled ? "0.75rem" : "1.25rem" }}
      >
        {/* Custom cursor follower */}
        <motion.div 
          className="pointer-events-none absolute w-16 h-16 rounded-full bg-primary/5 -z-10 hidden md:block"
          style={{ 
            x: cursorXSpring, 
            y: cursorYSpring,
            opacity: headerHovered && !mobileMenuOpen ? 0.6 : 0,
            filter: "blur(10px)",
            transform: "translate(-50%, -50%)"
          }}
          transition={{ opacity: { duration: 0.2 } }}
        />
        
        {/* Background blur that appears on scroll */}
        <div 
          className="absolute inset-0 -z-10 transition-opacity duration-500"
          style={{ 
            opacity: headerOpacity,
            backdropFilter: `blur(${8 * Math.min(1, scrollPosition / 100)}px)`,
            borderBottom: isScrolled ? '1px solid rgba(var(--primary), 0.08)' : 'none'
          }}
        >
          {/* Noise texture for header background */}
          {isScrolled && (
            <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
              <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <filter id="headerNoiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#headerNoiseFilter)" />
              </svg>
            </div>
          )}
        </div>

        {/* Logo Section with golden ratio design elements */}
        <Link href="/" className="group relative z-50">
          <div className="relative flex items-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex items-center"
              >
                <h2 className="text-xl sm:text-2xl font-light tracking-tighter relative">
                  <motion.span 
                    className="text-primary font-serif italic group-hover:text-primary/90 transition-colors duration-300"
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  >
                    A
                  </motion.span>
                  <span className="font-extralight tracking-tight group-hover:text-primary transition-colors duration-300">BHK</span>
                  <motion.span 
                    className="text-primary/70 align-super text-[10px] group-hover:text-primary transition-colors duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    ®
                  </motion.span>
                </h2>
              </motion.div>
            </motion.div>
            
            {/* Decorative underline with golden ratio proportions */}
            <div className="absolute -bottom-1 left-0 flex items-center space-x-1">
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="h-px w-8 bg-primary/30 origin-left"
              />
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="h-1 w-1 rounded-full bg-primary/50"
              />
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation with artistic touch */}
        <div 
          ref={navRef} 
          className="hidden md:flex items-center space-x-8"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoveredItem(null);
          }}
        >
          <motion.div 
            className="flex items-center space-x-8 relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {navigationItems.map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="relative"
              >
                <Link 
                  href={item.href}
                  className={`text-sm relative group ${
                    activeItem === item.name 
                      ? "text-primary" 
                      : "text-foreground/70 hover:text-primary"
                  } transition-colors duration-300`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                >
                  <motion.span
                    initial={{ y: 0 }}
                    whileHover={{ 
                      y: -1,
                      transition: { duration: 0.2 }
                    }}
                    className="inline-block relative"
                  >
                    {item.name}
                    
                    {/* Subtle dot indicator for hover state */}
                    <motion.span
                      className="absolute -right-2 -top-1 h-1 w-1 rounded-full bg-primary"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: hoveredItem === item.name || activeItem === item.name ? 1 : 0,
                        opacity: hoveredItem === item.name || activeItem === item.name ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.span>
                  
                  {/* Line indicator with animation */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-px bg-primary origin-left"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: activeItem === item.name || hoveredItem === item.name ? 1 : 0,
                      opacity: activeItem === item.name || hoveredItem === item.name ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Minimal separator */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.3, height: 16 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-px bg-primary/40"
          />
          
          {/* Artistic theme toggle with subtle animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <ModeToggle />
            
            {/* Decorative circle that appears on hover */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-primary/5"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ zIndex: -1 }}
            />
          </motion.div>
          
          {/* Contact Button with artistic animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Button 
              variant="outline"
              size="sm"
              className="border-primary/10 bg-primary/5 hover:bg-primary/10 text-xs group relative overflow-hidden cursor-pointer"
              asChild
            >
              <Link href="/contact">
                <motion.span className="relative z-10">
                  Hire me
                </motion.span>
                <motion.div
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-primary/10 z-0"
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary/40"
                />
                <ArrowRight className="ml-1 h-3 w-3 text-primary/80 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Mobile Navigation Toggle with artistic elements */}
        <div className="flex md:hidden items-center space-x-3 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ModeToggle />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative h-9 w-9 overflow-hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-primary"
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Artistic decorative elements */}
              <motion.div
                className="absolute top-0 right-0 h-1 w-1 rounded-full bg-primary/60"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{ zIndex: -1 }}
              />
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll progress indicator with golden ratio proportions */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-px bg-transparent overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.min(1, scrollPosition / (document.body.scrollHeight - window.innerHeight)) }}
              className="origin-left h-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/10"
            />
            
            {/* Animated dot that follows scroll progress */}
            <motion.div 
              style={{ 
                x: `${Math.min(100, (scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100)}%`,
                translateX: "-50%" 
              }}
              className="absolute top-1/2 h-1 w-1 rounded-full bg-primary/80 transform -translate-y-1/2"
            />
          </div>
        )}
      </motion.header>

      {/* Mobile menu */}
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