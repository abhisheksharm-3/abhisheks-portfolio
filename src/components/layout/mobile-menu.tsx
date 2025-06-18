"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-6"
        >
          <div className="flex flex-col items-center gap-8 py-10">
            {["About", "Work", "Archive", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-lg text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={onClose}
              >
                {item}
              </a>
            ))}
            
            <div className="w-full border-t border-primary/10 my-4 pt-8 flex justify-center space-x-6">
              {[
                { name: 'GitHub', icon: <Github className="h-5 w-5" /> },
                { name: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
                { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> }
              ].map((platform) => (
                <Button key={platform.name} variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary/90 h-10 w-10 p-0">
                  {platform.icon}
                  <span className="sr-only">{platform.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}