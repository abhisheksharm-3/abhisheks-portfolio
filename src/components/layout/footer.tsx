"use client";
import { useState, useRef } from "react";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: 'GitHub', icon: <Github className="h-4 w-4" />, href: 'https://github.com/abhisheksharm-3' },
  { name: 'Twitter', icon: <Twitter className="h-4 w-4" />, href: 'https://twitter.com/abhisheksharm_3' },
  { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4" />, href: 'https://linkedin.com/in/abhisheksan/' }
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

// Abstract SVG paths for decorative elements
function AbstractPath({ className, pathD }: { className?: string; pathD?: string }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={className}>
      <motion.path
        d={pathD || "M30,20 Q50,10 70,30 T90,50"}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  );
}

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  
  return (
    <footer 
      ref={footerRef}
      className="relative border-t border-primary/5 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise texture matching hero component */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
          <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="footerNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#footerNoiseFilter)" />
          </svg>
        </div>
        
        {/* Asymmetrical grid lines matching hero component */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/30" style={{ left: '13%' }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/10" style={{ left: '28%' }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" style={{ left: '67%' }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/15" style={{ left: '89%' }} />
          
          <div className="absolute left-0 right-0 h-[1px] bg-primary/25" style={{ top: '22%' }} />
          <div className="absolute left-0 right-0 h-[1px] bg-primary/10" style={{ top: '58%' }} />
          <div className="absolute left-0 right-0 h-[1px] bg-primary/20" style={{ top: '81%' }} />
        </div>

        {/* Abstract SVG paths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute left-[5%] top-[15%] text-primary/8"
        >
          <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
        >
          <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
        </motion.div>
      </div>

      {/* Subtle gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 py-16 sm:py-20 relative z-10">
        <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative">
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              {/* Brand column */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-5">
                  <h2 className="text-2xl sm:text-3xl font-light tracking-tighter">
                    <span className="text-primary font-serif italic">A</span>
                    <span className="font-extralight tracking-tight">BHK</span>
                    <span className="text-primary/70 align-super text-[10px]">®</span>
                  </h2>
                </div>
                
                <p className="text-sm text-foreground/60 font-light leading-relaxed mb-6 max-w-xs">
                  Building refined digital experiences through clean code, thoughtful development, and technical excellence.
                </p>
                
                <div className="flex space-x-4">
                  {socialLinks.map((platform, index) => (
                    <motion.a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/10 bg-primary/5 text-foreground/60 hover:text-primary hover:border-primary/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={platform.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      {platform.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              {/* Navigation links column */}
              <motion.div 
                className="md:text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-sm font-medium text-foreground/70 mb-5">Navigation</h3>
                <ul className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Link 
                        href={link.href}
                        className="text-sm text-foreground/50 hover:text-primary transition-colors relative inline-block"
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        {link.name}
                        {hoveredLink === link.name && (
                          <motion.span 
                            layoutId="footerUnderline"
                            className="absolute left-0 top-full h-px w-full bg-primary"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Contact column */}
              <motion.div 
                className="md:text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-sm font-medium text-foreground/70 mb-5">Contact</h3>
                <div className="space-y-3">
                  <motion.a 
                    href="mailto:abhitiku2003@gmail.com" 
                    className="inline-flex items-center text-sm text-foreground/50 hover:text-primary transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Mail className="h-3.5 w-3.5 mr-2 text-primary/50 group-hover:text-primary" />
                    abhitiku2003@gmail.com
                  </motion.a>
                  
                  <motion.div 
                    className="block text-sm text-foreground/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <span className="inline-flex items-center">
                      <span className="mr-2 text-primary/50">+91</span>
                      7340945835
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
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
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </Card>
        
        {/* Bottom copyright section */}
        <motion.div 
          className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-xs text-foreground/40 font-light mb-3 sm:mb-0">
            © {currentYear} <span className="text-primary/80">Abhishek Sharma</span>. All rights reserved.
          </p>
          <p className="text-[10px] text-foreground/30 tracking-wider uppercase">
            Software Developer
          </p>
        </motion.div>
      </div>
    </footer>
  );
}