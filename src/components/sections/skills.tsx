"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Terminal, Layout, ArrowRight, Layers, LineChart, Palette, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Expanded services with more details but no numerical proficiency
const services = [
  {
    icon: <Code />,
    title: "Frontend Development",
    description: "Building responsive, accessible web applications using modern frameworks and styling approaches.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    level: "Specialist"
  },
  {
    icon: <Terminal />,
    title: "Backend Solutions",
    description: "Creating robust API endpoints and database architectures that power seamless user experiences.",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    level: "Advanced"
  },
  {
    icon: <Layout />,
    title: "UI/UX Design",
    description: "Crafting intuitive interfaces with a focus on user experience, accessibility and visual consistency.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Testing"],
    level: "Proficient"
  },
  {
    icon: <LineChart />,
    title: "Performance Focus",
    description: "Optimizing applications for speed, accessibility, and user experience across all devices.",
    skills: ["Lighthouse", "WebVitals", "Lazy Loading", "Code Splitting"],
    level: "Advanced"
  },
  {
    icon: <Layers />,
    title: "Full Stack Integration",
    description: "Connecting frontend and backend layers into cohesive, scalable application architectures.",
    skills: ["API Design", "State Management", "Authentication", "Deployment"],
    level: "Experienced"
  },
  {
    icon: <Users />,
    title: "Collaboration",
    description: "Working effectively with teams through clear communication and efficient development practices.",
    skills: ["Git", "Code Review", "Agile", "Documentation"],
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

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Selected skills for the main section
  const mainServices = services.slice(0, 3);
  // Additional skills for the expanded grid
  const additionalServices = services.slice(3);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute right-0 top-20 w-64 h-64 text-primary/3" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
        <svg className="absolute left-10 bottom-10 w-40 h-40 text-primary/3" viewBox="0 0 100 100">
          <path d="M10,30 L90,30 M10,50 L90,50 M10,70 L90,70" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-[1px] bg-primary/30 mr-3"></div>
            <span className="text-xs text-primary/80 uppercase tracking-wider font-light">Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic leading-tight mb-6">
            <span className="bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
              Technical Proficiency
            </span>
          </h2>
          <p className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            I bring a versatile skill set focused on building exceptional digital experiences through clean code, 
            thoughtful design, and performance optimization.
          </p>
        </motion.div>

        {/* Main skills card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full border border-primary/5 bg-card/20 backdrop-blur-sm overflow-hidden rounded-2xl transition-all duration-500 hover:border-primary/10 relative mb-12"
        >
          <div className="p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="w-full lg:w-1/3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10"
                >
                  <Palette className="h-8 w-8 text-primary/80" strokeWidth={1.25} />
                </motion.div>
                
                <h3 className="text-2xl sm:text-3xl font-serif italic mb-6">Development Approach</h3>
                
                <p className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8">
                  I build solutions that prioritize clean code, performance, and user experience. My approach combines 
                  technical expertise with an understanding of what makes interfaces intuitive and enjoyable to use.
                </p>
                
                <Button 
                  variant="outline" 
                  className="group text-xs border-primary/10 bg-primary/5 hover:bg-primary/10"
                  asChild
                >
                  <Link href="/about">
                    Learn more about my process
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1 duration-300" />
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
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg inline-flex mb-4 border border-primary/10 group-hover:border-primary/30 transition-colors duration-300">
                        {service.icon}
                      </div>
                      
                      <h4 className="text-lg font-light mb-3 flex items-center gap-2">
                        {service.title}
                        <span className="text-xs font-light text-primary/60 px-2 py-0.5 border border-primary/10 rounded-full">
                          {service.level}
                        </span>
                      </h4>
                      
                      <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
                        {service.description}
                      </p>
                      
                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {service.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 bg-primary/5 border border-primary/5 rounded-md text-xs text-primary/70"
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
        </motion.div>
        
        {/* Additional skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group border border-primary/5 bg-card/10 backdrop-blur-sm p-6 rounded-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="p-2 bg-primary/5 rounded-lg mr-3 border border-primary/10 group-hover:border-primary/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-medium">{service.title}</h4>
                    <span className="text-xs text-primary/60 px-2 py-0.5 border border-primary/10 rounded-full">
                      {service.level}
                    </span>
                  </div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary/30 to-transparent rounded-full mt-1" />
                </div>
              </div>
              
              <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-2 py-1 bg-primary/3 border border-primary/5 rounded-md text-xs text-primary/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}