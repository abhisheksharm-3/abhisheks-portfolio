"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "./header"; // Import the NavItem type from header

interface MobileMenuProps {
  onClose: () => void;
  navigationItems: NavItem[]; // Accept navigationItems as a prop
  activeItem: string | null;
}

export function MobileMenu({ onClose, navigationItems, activeItem }: MobileMenuProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const isActive = (item: NavItem) => {
    if (activeItem) {
      return item.name === activeItem;
    }
    
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 font-serif"
    >
      <motion.div 
        className="h-full flex flex-col justify-between px-6 pb-10"
      >
        <motion.div 
          className="flex flex-col items-center gap-6 pt-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.07 } 
            }
          }}
        >
          {navigationItems.map((item) => (
            <motion.div
              key={item.name}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              onHoverStart={() => setHoveredItem(item.name)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className={`text-xl font-light ${
                  isActive(item) 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-primary"
                } transition-colors duration-300 relative group flex items-center`}
                onClick={onClose}
              >
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: hoveredItem === item.name ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                
                {/* Special style for Graveyard item */}
                {item.name === "Graveyard" && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className="ml-2 text-xs opacity-60 italic"
                  >
                    ⚰️
                  </motion.span>
                )}
                
                {/* Arrow indicator on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ 
                    opacity: hoveredItem === item.name || isActive(item) ? 1 : 0,
                    x: hoveredItem === item.name || isActive(item) ? 0 : -5
                  }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  <ArrowRight className="h-4 w-4 text-primary" />
                </motion.div>
              </Link>
              
              {/* Underline animation */}
              <motion.div 
                className="h-px bg-primary/50 absolute -bottom-1 left-0 right-0"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: isActive(item) || hoveredItem === item.name ? 1 : 0,
                  opacity: isActive(item) || hoveredItem === item.name ? 1 : 0
                }}
                style={{ transformOrigin: 'left' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Social links and decorative elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="w-full pt-8 flex flex-col items-center"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-12 h-px bg-primary/30 mb-8"
          />
          
          <div className="flex justify-center space-x-6">
            {[
              { name: 'GitHub', icon: <Github className="h-5 w-5" />, href: 'https://github.com/abhisheksharm-3' },
              { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com/abhisheksharm_3' },
              { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/in/abhisheksan/' }
            ].map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-primary/10 hover:text-primary h-10 w-10 p-0 relative overflow-hidden"
                  asChild
                >
                  <a href={platform.href} target="_blank" rel="noopener noreferrer">
                    <span className="relative z-10">{platform.icon}</span>
                    <span className="sr-only">{platform.name}</span>
                    
                    {/* Radial gradient effect on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/5 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
          
          {/* Signature line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 text-xs text-foreground/50 flex flex-col items-center"
          >
            <span className="font-medium">ABHK ®</span>
            <span className="mt-1">Designed & Developed with passion</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}