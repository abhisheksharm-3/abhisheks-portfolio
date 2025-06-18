"use client";
import { useState } from "react";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: 'GitHub', icon: <Github className="h-4 w-4" />, href: 'https://github.com/abhisheksharm-3' },
  { name: 'Twitter', icon: <Twitter className="h-4 w-4" />, href: 'https://twitter.com/abhisheksharm_3' },
  { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4" />, href: 'https://linkedin.com/in/abhisheksharm-3' }
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  return (
    <footer className="relative border-t border-primary/5">
      {/* Subtle gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand column */}
          <div className="flex flex-col">
            <div className="mb-5">
              <h2 className="text-2xl sm:text-3xl font-light tracking-tighter">
                <span className="text-primary font-serif italic">A</span>
                <span className="font-extralight tracking-tight">BHK</span>
                <span className="text-primary/70 align-super text-[10px]">®</span>
              </h2>
            </div>
            
            <p className="text-sm text-foreground/60 font-light leading-relaxed mb-6 max-w-xs">
              Creating thoughtful digital experiences through clean, 
              efficient code and user-centered design.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/10 bg-primary/5 text-foreground/60 hover:text-primary hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={platform.name}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Navigation links column */}
          <div className="md:text-center">
            <h3 className="text-sm font-medium text-foreground/70 mb-5">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-foreground/50 hover:text-primary transition-colors relative inline-block"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                    {hoveredLink === link.name && (
                      <motion.span 
                        layoutId="underline"
                        className="absolute left-0 top-full h-px w-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact column */}
          <div className="md:text-right">
            <h3 className="text-sm font-medium text-foreground/70 mb-5">Contact</h3>
            <div className="space-y-3">
              <a 
                href="mailto:hello@abhisheksharma.dev" 
                className="inline-flex items-center text-sm text-foreground/50 hover:text-primary transition-colors group"
              >
                <Mail className="h-3.5 w-3.5 mr-2 text-primary/50 group-hover:text-primary" />
                hello@abhisheksharma.dev
              </a>
              
              <div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-4 text-xs border-primary/10 bg-primary/5 hover:bg-primary/10 group"
                  asChild
                >
                  <Link href="/contact">
                    Get in touch
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright section */}
        <div className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-foreground/40 font-light mb-3 sm:mb-0">
            © {currentYear} <span className="text-primary/80">Abhishek Sharma</span>. All rights reserved.
          </p>
          <p className="text-[10px] text-foreground/30 tracking-wider uppercase">
            Software Developer & Designer
          </p>
        </div>
      </div>
    </footer>
  );
}