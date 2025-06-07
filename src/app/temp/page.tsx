"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Linkedin, ArrowRight, Code, Layout, Terminal, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SpinningText } from "@/components/magicui/spinning-text";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll position for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `fixed top-0 w-full px-6 sm:px-8 lg:px-32 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
    scrollPosition > 50 
      ? "bg-background/80 backdrop-blur-md border-b border-primary/5" 
      : ""
  }`;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Refined background elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        <div className="absolute top-1/3 left-1/4 w-[40vw] sm:w-[25vw] h-[40vw] sm:h-[25vw] bg-primary/3 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/5 w-[35vw] sm:w-[20vw] h-[35vw] sm:h-[20vw] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Header */}
      <header className={headerClasses}>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
            <span className="text-primary font-serif italic">A</span>
            <span className="font-extralight tracking-tight">BHK</span>
            <span className="text-primary/70 align-super text-[10px]">®</span>
          </h2>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["About", "Work", "Archive", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <ModeToggle />
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
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
                  onClick={() => setMobileMenuOpen(false)}
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
      
      {/* Main Content */}
      <main className="pt-24 px-6 sm:px-8 lg:px-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3"
          >
            <div className="inline-block bg-primary/5 text-primary/90 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-light border border-primary/10 backdrop-blur-sm">
              Developer Portfolio
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl leading-none font-serif italic tracking-tight bg-gradient-to-r from-primary/80 via-primary to-primary/70 bg-clip-text text-transparent w-auto mx-auto px-1 sm:px-3 overflow-visible mb-6"
          >
            Abhishek Sharma
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-2xl"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 font-extralight mb-8">
              Building refined digital experiences through thoughtful development and clean code
            </p>
            
            <p className="text-sm sm:text-base text-foreground/60 font-light leading-relaxed max-w-xl mx-auto mb-8">
              I create elegant solutions that balance technical excellence with intuitive user experiences, focusing on what works best for both users and developers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {["Frontend Development", "React & Next.js", "Full Stack", "Performance Optimization"].map((skill) => (
                <span key={skill} className="px-4 py-1.5 bg-foreground/3 border border-primary/5 rounded-full text-xs text-foreground/70">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-primary/30"></div>
            <button className="mt-4 text-xs text-foreground/50 hover:text-primary transition-colors duration-300">
              Explore Work
            </button>
          </motion.div>
        </section>
        
        {/* Selected Works Preview */}
        <section className="py-24 sm:py-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-[1px] bg-primary/30 mr-3"></div>
                <span className="text-xs text-primary/80 uppercase tracking-wider">Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif italic leading-tight">Selected Works</h2>
            </div>
            
            <a href="/work" className="mt-6 sm:mt-0 group flex items-center text-sm text-foreground/60 hover:text-primary transition-colors duration-300">
              View all projects
              <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            {[
              {
                title: "React Component Library",
                description: "A modular, accessible component library built with React and TypeScript for modern web applications.",
                image: "/project1.jpg",
                tags: ["React", "TypeScript", "Components"],
                year: "2024"
              },
              {
                title: "E-commerce Platform",
                description: "Full-stack solution with optimized performance and clean UI for an enhanced shopping experience.",
                image: "/project2.jpg",
                tags: ["Next.js", "API", "MongoDB"],
                year: "2023"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border border-primary/5 bg-card/20 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300"
              >
                {/* Project image placeholder */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10"></div>
                  <div className="h-full w-full bg-gradient-to-br from-primary/5 to-background/80"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl sm:text-2xl font-serif italic">{project.title}</h3>
                    <span className="text-xs text-primary/60">{project.year}</span>
                  </div>
                  
                  <p className="text-foreground/60 text-sm font-extralight leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/3 border border-primary/5 rounded-full text-xs text-primary/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground/40">Featured Project</span>
                    <Button variant="ghost" size="sm" className="text-xs hover:text-primary group/btn p-0 h-auto">
                      View details
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Skills / Services Preview */}
        <section className="py-20 sm:py-28">
          <Card className="w-full border border-primary/5 bg-card/20 backdrop-blur-sm overflow-hidden rounded-2xl transition-all duration-500 hover:border-primary/10">
            <CardContent className="p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                <div className="w-full lg:w-1/3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 sm:mb-8 border border-primary/10">
                    <Code className="h-7 w-7 sm:h-8 sm:w-8 text-primary/80" strokeWidth={1.25} />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif italic mb-6">Development Approach</h3>
                  
                  <p className="text-foreground/60 text-sm sm:text-base font-extralight leading-relaxed mb-8">
                    I build solutions that prioritize clean code, performance, and user experience. My approach combines technical expertise with an understanding of what makes interfaces intuitive and enjoyable.
                  </p>
                  
                  <Button variant="outline" className="text-xs border-primary/10 bg-primary/5 hover:bg-primary/10">
                    Learn more about me
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
                
                <div className="w-full lg:w-2/3 pt-8 mt-8 border-t lg:border-t-0 lg:pt-0 lg:mt-0 lg:pl-16 lg:border-l border-primary/5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                      {
                        icon: <Code className="h-5 w-5 text-primary/80" strokeWidth={1.5} />,
                        title: "Frontend Development",
                        description: "Building responsive, accessible web applications using React, Next.js, and modern CSS techniques."
                      },
                      {
                        icon: <Terminal className="h-5 w-5 text-primary/80" strokeWidth={1.5} />,
                        title: "Backend Solutions",
                        description: "Creating robust API endpoints and database architectures that power seamless user experiences."
                      },
                      {
                        icon: <Layout className="h-5 w-5 text-primary/80" strokeWidth={1.5} />,
                        title: "Performance Focus",
                        description: "Optimizing applications for speed, accessibility, and user experience across all devices."
                      }
                    ].map((service, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="p-3 bg-primary/5 rounded-lg inline-flex mb-4 border border-primary/10">
                          {service.icon}
                        </div>
                        
                        <h4 className="text-lg font-light mb-3">{service.title}</h4>
                        
                        <p className="text-foreground/60 text-sm font-extralight leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Developer Philosophy Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <SpinningText className="opacity-70 text-sm">code quality • user experience • performance • </SpinningText>
            </div>
            
            <blockquote className="text-2xl sm:text-3xl md:text-4xl text-foreground/80 font-serif italic leading-relaxed mb-8">
              &quot;Good code is as much about the user experience as it is about technical excellence.&quot;
            </blockquote>
            
            <div className="w-16 h-[1px] bg-primary/30 mx-auto mb-6"></div>
            
            <p className="text-foreground/50 font-extralight">
              My development philosophy
            </p>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-20 sm:py-28">
          <div className="border border-primary/10 rounded-2xl p-10 sm:p-16 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif italic mb-6">Let&apos;s build something valuable</h3>
            
            <p className="text-foreground/60 text-sm sm:text-base font-extralight leading-relaxed max-w-xl mx-auto mb-10">
              I&apos;m currently available for select projects. If you have a technical challenge that needs solving or a digital product that needs building, I&apos;d love to discuss how we can work together.
            </p>
            
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="px-6 sm:px-8 lg:px-32 py-10 sm:py-12 border-t border-primary/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
                <span className="text-primary font-serif italic">A</span>
                <span className="font-extralight tracking-tight">BHK</span>
                <span className="text-primary/70 align-super text-[10px]">®</span>
              </h2>
            </div>
            
            <p className="text-xs text-foreground/40 font-light tracking-wide">
              © <span className="text-primary/80">Abhishek Sharma</span>
            </p>
            <p className="text-[10px] text-foreground/30 mt-1 tracking-wider">
              Software Developer
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-8 mb-6">
              {[
                { name: 'GitHub', icon: <Github className="h-4 w-4" /> },
                { name: 'Twitter', icon: <Twitter className="h-4 w-4" /> },
                { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> }
              ].map((platform) => (
                <Button key={platform.name} variant="ghost" size="sm" className="rounded-full hover:bg-primary/3 hover:text-primary/90 transition-colors duration-300 h-9 w-9 p-0">
                  {platform.icon}
                  <span className="sr-only">{platform.name}</span>
                </Button>
              ))}
            </div>
            
            <a 
              href="mailto:hello@abhisheksharma.dev" 
              className="text-xs text-foreground/50 hover:text-primary transition-colors duration-300"
            >
              hello@abhisheksharma.dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}