import { Variants } from "framer-motion";
import { NavigationItemType } from "@/lib/types";

/**
 * Centralized navigation configuration
 * Used by both navbar and footer components
 */
export const NAVIGATION_ITEMS: readonly NavigationItemType[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Graveyard", href: "/graveyard" },
  { name: "Contact", href: "/contact" },
] as const;

/**
 * Navigation animation configurations
 * Centralized for consistency across navbar and footer
 */
export const NAVIGATION_ANIMATIONS = {
  // Navbar animations
  navbar: {
    container: {
      hidden: {},
      visible: { 
        transition: { 
          staggerChildren: 0.1, 
          delayChildren: 0.3,
          ease: "easeOut"
        } 
      },
    } as Variants,
    
    item: {
      hidden: { 
        opacity: 0, 
        y: -15,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.6
        }
      },
    } as Variants,
  },

  // Mobile menu animations  
  mobileMenu: {
    container: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.1,
          ease: "easeOut"
        } 
      },
    } as Variants,
    
    item: {
      hidden: { 
        y: 30, 
        opacity: 0,
        scale: 0.9,
        rotateX: -15
      },
      visible: { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.6
        }
      },
    } as Variants,
  },

  // Footer animations
  footer: {
    container: {
      hidden: {},
      visible: { 
        transition: { 
          staggerChildren: 0.1, 
          delayChildren: 0.2 
        } 
      },
    } as Variants,
    
    item: {
      hidden: { opacity: 0, y: 15 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.6, 
          ease: "easeOut" 
        } 
      },
    } as Variants,
    
    path: {
      hidden: { opacity: 0, pathLength: 0 },
      visible: {
        opacity: 1,
        pathLength: 1,
        transition: { duration: 2, ease: "easeInOut" },
      },
    } as Variants,
  },
} as const;
