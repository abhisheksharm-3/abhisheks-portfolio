"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={sectionRef} 
      className="py-24 sm:py-32 px-6"
    >
      {/* Main container with animations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Border gradient container with hover effect */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Animated border gradient */}
          <div className="absolute inset-0 p-0.5 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-transparent">
            <div className="absolute inset-0 rounded-[14px] bg-background/95 backdrop-blur-md" />
          </div>
          
          {/* Background glow effect */}
          <motion.div
            animate={{
              opacity: isHovering ? 0.15 : 0.05,
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-2xl blur-2xl -z-10"
          />

          {/* Content container */}
          <div className="relative p-10 sm:p-16 text-center">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 opacity-10">
              <Mail className="w-24 h-24 text-primary" strokeWidth={1} />
            </div>
            <div className="absolute bottom-10 right-10 opacity-10">
              <MessageCircle className="w-20 h-20 text-primary" strokeWidth={1} />
            </div>

            {/* Main content */}
            <div className="relative z-10">
              {/* Title with animated underline */}
              <div className="mb-8 relative inline-block">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic">
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Let&apos;s build something valuable
                  </span>
                </h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent w-full mt-2 origin-left"
                />
              </div>
              
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
                  href="mailto:hello@abhisheksharma.dev" 
                  className="text-primary/70 hover:text-primary transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
                >
                  hello@abhisheksharma.dev
                </a>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative corner elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute -top-2 -left-2"
        >
          <div className="w-4 h-4 border-t-2 border-l-2 border-primary/30"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="absolute -bottom-2 -right-2"
        >
          <div className="w-4 h-4 border-b-2 border-r-2 border-primary/30"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}