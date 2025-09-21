import { Variants } from "framer-motion";
import { TypeNavItem } from "../types";

export const navigationItems: TypeNavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Graveyard", href: "/graveyard" },
  { name: "Contact", href: "/contact" },
];

export const navbarContainerVariants: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.3,
      ease: "easeOut"
    } 
  },
};

export const navbarItemVariants: Variants = {
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
};

export const mobileMenuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: "easeOut"
    } 
  },
};

export const mobileNavItemVariants: Variants = {
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
};
