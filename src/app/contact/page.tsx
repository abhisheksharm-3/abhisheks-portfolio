"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";

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

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <PageLayout activePage="Contact">
      <div ref={sectionRef} className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise texture */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="contactPageNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#contactPageNoiseFilter)" />
            </svg>
          </div>
          
          {/* Asymmetrical grid lines */}
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

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex flex-col mb-16 sm:mb-20 relative z-10"
        >
          <div className="flex items-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs text-primary/60 uppercase tracking-wider font-light"
            >
              Get in Touch
            </motion.span>
          </div>
          <div className="overflow-visible mb-4">
            <motion.h1 
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
            >
              <div className="py-1">
                <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                  Let&apos;s Connect
                </span>
              </div>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "5rem", opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
          >
            I&apos;m available for freelance projects, collaborations, and full-time opportunities. 
            Feel free to reach out through the form below or schedule a meeting directly.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative h-full">
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
                    <MessageCircle className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-serif italic">Send a Message</h2>
                </div>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
                />
                
                <ContactForm />
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
              </div>
            </Card>
          </motion.div>

          {/* Calendar and Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Calendar Card */}
            <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
                    <Calendar className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-serif italic">Schedule a Meeting</h2>
                </div>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
                />
                
                <p className="text-foreground/60 text-sm font-light leading-relaxed mb-6">
                  Prefer to talk in real-time? Schedule a 30-minute call at your convenience.
                </p>
                
                <Button 
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <a href="https://cal.com/abhisheksan/30min" target="_blank" rel="noopener noreferrer">
                    Book a time slot
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
              </div>
            </Card>

            {/* Contact Info Card */}
            <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
                    <Mail className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-serif italic">Contact Details</h2>
                </div>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
                />
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5 mt-0.5">
                      <Mail className="h-4 w-4 text-primary/70" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/40 mb-1">Email</p>
                      <a 
                        href="&#109;&#97;&#x69;&#x6c;&#116;&#111;&#x3a;&#97;%62%68&#105;%74&#x69;%6b&#x75;%32%30%30&#51;%40&#103;&#x6d;%61%69&#108;&#x2e;&#99;&#x6f;%6d"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        Email me
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/40 mb-1">GitHub</p>
                      <a 
                        href="https://github.com/abhisheksharm-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        github.com/abhisheksharm-3
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/40 mb-1">LinkedIn</p>
                      <a 
                        href="https://www.linkedin.com/in/abhisheksan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        linkedin.com/in/abhisheksan/
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/40 mb-1">Instagram</p>
                      <a 
                        href="https://instagram.com/abhishekxsharmaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        instagram.com/abhishekxsharmaa
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
} 