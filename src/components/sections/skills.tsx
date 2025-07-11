"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Terminal, Layout, ArrowRight, Layers, LineChart, Palette, Users, Globe, Database, Cloud, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

// Updated services with real skills from resume
const services = [
  {
    icon: <Code />,
    title: "Frontend Development",
    description: "Building responsive, accessible web applications using modern frameworks and styling approaches.",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
    level: "Specialist"
  },
  {
    icon: <Terminal />,
    title: "Backend Solutions",
    description: "Creating robust API endpoints and database architectures that power seamless user experiences.",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI", "Go"],
    level: "Advanced"
  },
  {
    icon: <Database />,
    title: "Database Management",
    description: "Designing and implementing efficient database solutions for various application needs.",
    skills: ["MongoDB", "Neo4j", "MySQL", "Firebase", "Appwrite"],
    level: "Proficient"
  },
  {
    icon: <Smartphone />,
    title: "Mobile Development",
    description: "Creating native and cross-platform mobile applications with modern frameworks.",
    skills: ["React Native", "Expo", "Jetpack Compose", "Kotlin"],
    level: "Advanced"
  },
  {
    icon: <Cloud />,
    title: "Cloud & DevOps",
    description: "Deploying and managing applications with modern cloud infrastructure and DevOps practices.",
    skills: ["AWS", "Docker", "Firebase", "Appwrite", "CI/CD"],
    level: "Experienced"
  },
  {
    icon: <Globe />,
    title: "Programming Languages",
    description: "Proficiency across multiple programming languages for diverse application development.",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Go", "Kotlin"],
    level: "Proficient"
  }
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

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

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Selected skills for the main section
  const mainServices = services.slice(0, 3);
  // Additional skills for the expanded grid
  const additionalServices = services.slice(3);

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise texture */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
          <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
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

      {/* Main content */}
      <div className="container mx-auto px-6">
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
              Expertise
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
                Technical Proficiency
              </span>
            </motion.h2>
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
            I bring a versatile skill set focused on building exceptional digital experiences through clean code, 
            thoughtful design, and performance optimization.
          </motion.p>
        </motion.div>

        {/* Main skills card */}
        <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="w-full lg:w-1/3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 rounded-md border border-primary/10 flex items-center justify-center mb-8"
                >
                  <Palette className="h-8 w-8 text-primary/70" strokeWidth={1.25} />
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl sm:text-3xl font-serif italic mb-6"
                >
                  Development Approach
                </motion.h3>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "3rem" } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
                />
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8"
                >
                  I build solutions that prioritize clean code, performance, and user experience. My approach combines 
                  technical expertise with an understanding of what makes interfaces intuitive and enjoyable to use.
                </motion.p>
                
                <Button 
                  variant="outline" 
                  className="group border-primary/10 hover:bg-primary/5 rounded-md"
                  asChild
                >
                  <Link href="/about" className="flex items-center">
                    <span className="text-sm">Learn more about my process</span>
                    <motion.div
                      className="ml-2 flex items-center justify-center"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-4 w-4 text-primary/70" />
                    </motion.div>
                  </Link>
                </Button>
              </div>
              
              <div className="w-full lg:w-2/3 pt-8 mt-8 border-t lg:border-t-0 lg:pt-0 lg:mt-0 lg:pl-16 lg:border-l border-primary/5">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-8"
                >
                  {mainServices.map((service, index) => (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      className="group flex flex-col"
                    >
                      <div className="p-3 rounded-md border border-primary/10 inline-flex mb-4 group-hover:border-primary/20 transition-colors duration-300">
                        <motion.div 
                          whileHover={{ rotate: 15 }}
                          transition={{ duration: 0.3 }}
                          className="text-primary/70"
                        >
                          {service.icon}
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-light">{service.title}</h4>
                        <span className="text-xs font-light text-primary/60 px-2 py-0.5 border border-primary/10 rounded-md">
                          {service.level}
                        </span>
                      </div>
                      
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "2rem" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-3"
                      />
                      
                      <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {service.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </Card>
        
        {/* Additional skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {additionalServices.map((service, index) => (
            <Card 
              key={index}
              className="group border-primary/10 backdrop-blur-sm py-0 hover:border-primary/20 transition-all duration-300"
            >
              <CardHeader className="pt-6 pb-0 px-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md border border-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                    <motion.div 
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary/70"
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-medium">{service.title}</h4>
                      <span className="text-xs text-primary/60 px-2 py-0.5 border border-primary/10 rounded-md">
                        {service.level}
                      </span>
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "2rem" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mt-2"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4 px-6">
                <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
                  {service.description}
                </p>
              </CardContent>
              
              <CardFooter className="px-6 pt-0 pb-6">
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}