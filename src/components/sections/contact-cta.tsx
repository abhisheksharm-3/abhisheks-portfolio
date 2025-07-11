"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Send, Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

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

export function ContactCTA() {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={sectionRef} 
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise texture matching hero component */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
          <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="contactNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#contactNoiseFilter)" />
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

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header matching other sections */}
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
              Contact
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: 60 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-none"
            >
              <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                Let&apos;s Collaborate
              </span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "5rem", opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
          />
        </motion.div>

        {/* Main content card */}
        <Card 
          className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="p-8 sm:p-10 md:p-16 text-center relative">
            {/* Background glow effect */}
            <motion.div
              animate={{
                opacity: isHovering ? 0.15 : 0.05,
                scale: isHovering ? 1.05 : 1,
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl -z-10"
            />

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 opacity-10">
              <Mail className="w-24 h-24 text-primary" strokeWidth={1} />
            </div>
            <div className="absolute bottom-10 right-10 opacity-10">
              <MessageCircle className="w-20 h-20 text-primary" strokeWidth={1} />
            </div>

            {/* Main content */}
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-foreground/70 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-12"
              >
                I&apos;m currently available for select projects. If you have a technical challenge that needs 
                solving or a digital product that needs building, I&apos;d love to discuss how we can work together.
              </motion.p>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button 
                    size="lg"
                    className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 shadow-sm shadow-primary/20"
                    asChild
                  >
                    <Link href="/contact">
                      Start a conversation
                      <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    className="group border-primary/20 hover:bg-primary/5 hover:border-primary/30 px-8 py-6"
                    asChild
                  >
                    <Link href="/projects">
                      View my work
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-12 text-sm text-foreground/50 font-light"
              >
                Or reach me directly at{" "}
                <a 
                  href="mailto:abhitiku2003@gmail.com" 
                  className="text-primary/70 hover:text-primary transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
                >
                  abhitiku2003@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Contact channels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 pt-8 border-t border-primary/10 flex flex-wrap justify-center gap-6"
            >
              {[
                { icon: <Mail className="h-4 w-4" />, label: "Email", value: "abhitiku2003@gmail.com" },
                { icon: <Code className="h-4 w-4" />, label: "GitHub", value: "abhisheksharm-3" },
                { icon: <ExternalLink className="h-4 w-4" />, label: "Website", value: "abhisheksharma.tech" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  className="flex items-center gap-2 text-foreground/60 text-xs"
                >
                  <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-foreground/40 block mb-0.5">{item.label}</span>
                    <span className="text-foreground/80">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </Card>
      </div>
    </section>
  );
}