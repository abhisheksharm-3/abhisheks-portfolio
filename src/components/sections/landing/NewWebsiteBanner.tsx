"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewWebsiteBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.5 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-lg px-6"
      >
        <div className="relative bg-background/80 backdrop-blur-md border border-primary/20 rounded-lg p-4 shadow-lg">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg" />
          
          {/* Content */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary/70" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground/90 mb-1">
                  Welcome to my new portfolio!
                </div>
                <div className="text-xs text-foreground/60">
                  Prefer simpler design? Visit{" "}
                  <a 
                    href="https://old.abhisheksan.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary/80 hover:text-primary underline decoration-1 underline-offset-2 inline-flex items-center gap-1"
                  >
                    old.abhisheksan.com
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0 hover:bg-primary/10 text-foreground/40 hover:text-foreground/70"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close banner</span>
            </Button>
          </div>
          
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-30">
            <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}