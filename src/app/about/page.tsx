"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code, Terminal, Database, Cloud, Smartphone, Globe, GraduationCap, Briefcase, User, Calendar, MapPin, BookOpen, Camera, Music, Gamepad, Film, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";
import Image from "next/image";

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

// Skills data from the skills component
const skillCategories = [
  {
    icon: <Code className="h-5 w-5" />,
    title: "Frontend Development",
    skills: ["React.js", "Next.js", "SvelteKit", "TailwindCSS", "TypeScript"],
  },
  {
    icon: <Terminal className="h-5 w-5" />,
    title: "Backend Solutions",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI", "Go"],
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Database Management",
    skills: ["MongoDB", "Neo4j", "MySQL", "Firebase", "Appwrite"],
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Mobile Development",
    skills: ["React Native", "Expo", "Jetpack Compose", "Kotlin"],
  },
  {
    icon: <Cloud className="h-5 w-5" />,
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Firebase", "Appwrite", "CI/CD"],
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Go", "Kotlin"],
  }
];

// Education data
const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Maharaja Surajmal Institute of Technology",
    year: "2021-2025",
    description: "Focused on core computer science principles, web development, and software engineering.",
    cgpa: 8.31
  },
  {
    degree: "12th Grade",
    institution: "Mount Carmel School, Chandigarh",
    year: "2021",
    description: "Completed senior secondary education with focus on science and mathematics.",
    percentage: "92.4%"
  },
  {
    degree: "10th Grade",
    institution: "Mount Carmel School, Chandigarh",
    year: "2019",
    description: "Completed secondary education with excellent academic performance.",
    percentage: "92.2%"
  }
];

// Experience data
const experience = [
  {
    position: "Software Development Intern",
    company: "Stardom",
    duration: "January 2025 - June 2025",
    description: "Driving the company's website development and digital infrastructure. Built company website with Next.js and optimized frontend performance. Designed and deployed cloud infrastructure and email systems."
  },
  {
    position: "Winner - Network 18 Track",
    company: "Gen AI Exchange Hackathon by Google",
    duration: "October 2024",
    description: "Developed AI-powered media verification system called Credify. Applied cutting-edge techniques in AI media attribution."
  },
];

// Personal interests
const personalInterests = [
  {
    category: "Photography",
    icon: <Camera className="h-5 w-5" />,
    description: "Capturing city life and nature. My phone gallery is 70% cloud shots!",
    tags: ["Urban Photography", "Nature", "Golden Hour"]
  },
  {
    category: "Reading",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Currently reading The Almanack of Naval Ravikant and The Courage to be Disliked.",
    tags: ["Personal Development", "Popular Science", "Business"]
  },
  {
    category: "Music",
    icon: <Music className="h-5 w-5" />,
    description: "Soundtrack to my coding sessions. Lo-fi beats for focused coding, rock classics for debugging.",
    tags: ["Lo-fi", "Rock", "Classical"]
  },
  {
    category: "Gaming",
    icon: <Gamepad className="h-5 w-5" />,
    description: "Perfect way to unwind after debugging sessions. Currently playing Valorant and Red Dead Redemption 2.",
    tags: ["Valorant", "RDR2", "PC Gaming"]
  },
  {
    category: "Sci-Fi Media",
    icon: <Film className="h-5 w-5" />,
    description: "Love sci-fi that blends technology with imagination. Favorites include Interstellar and The Martian.",
    tags: ["Interstellar", "The Martian", "Inception"]
  },
  {
    category: "Exploration",
    icon: <Coffee className="h-5 w-5" />,
    description: "Weekend wanderer & street food enthusiast. Love discovering hidden cafes and quiet spots for reading & coding.",
    tags: ["Cafes", "Street Food", "City Exploration"]
  }
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <PageLayout activePage="About">
      <div className="pt-24 px-6 sm:px-8 lg:px-32">
        <section 
          ref={sectionRef}
          className="py-36 sm:py-44 relative overflow-hidden"
        >
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
                About Me
              </motion.span>
            </div>
            <div className="overflow-visible mb-4">
              <motion.h2 
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
              >
                <div className="py-1">
                  <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                    Abhishek Sharma
                  </span>
                </div>
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
              CS Graduate & Tech Enthusiast. Building useful stuff with code, one project at a time.
              With a passion for clean code and intuitive design, I build applications that solve real problems.
            </motion.p>
          </motion.div>

          {/* Bio Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-2"
            >
              <Card className="border-primary/10 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif italic mb-6">Biography</h3>
                  <div className="space-y-4 text-foreground/70 font-light">
                    <p>
                      I&apos;m a Software Developer with a strong focus on creating intuitive and efficient digital experiences. 
                      My journey in technology began with a curiosity about how applications work, which led me to pursue 
                      Computer Science and develop expertise in both frontend and backend technologies.
                    </p>
                    <p>
                      I specialize in building responsive web applications and mobile solutions using modern frameworks 
                      and practices. My approach combines technical expertise with an understanding of user needs, 
                      resulting in applications that are both functional and enjoyable to use.
                    </p>
                    <p>
                      Currently, I&apos;m focused on expanding my knowledge in Android native development, generative AI applications, 
                      and LLM integrations. I&apos;m particularly interested in creating the next generation of intelligent mobile experiences 
                      that blend cutting-edge technology with intuitive design.
                    </p>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary/60" />
                      <span className="text-sm">Abhishek Sharma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary/60" />
                      <span className="text-sm">Delhi, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary/60" />
                      <span className="text-sm">Available for new projects</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="border-primary/10 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-md">
                    <Image 
                      src="https://github.com/abhisheksharm-3.png" 
                      alt="Abhishek Sharma" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-medium mb-4">Contact Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">Email</p>
                      <p className="text-sm">abhitiku2003@gmail.com</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">Phone</p>
                      <p className="text-sm">+91 7340945835</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/abhisheksan/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary/80 hover:text-primary flex items-center"
                      >
                        linkedin.com/in/abhisheksan
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 mb-1">GitHub</p>
                      <a 
                        href="https://github.com/abhisheksharm-3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary/80 hover:text-primary flex items-center"
                      >
                        github.com/abhisheksharm-3
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-primary/5" />
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/10 hover:bg-primary/5 text-sm"
                    asChild
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      <span>Get in touch</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Experience & Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Experience */}
              <Card className="border-primary/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center mr-3">
                      <Briefcase className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-serif italic">Experience</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {experience.map((item, index) => (
                      <div key={index} className="relative pl-6 border-l border-primary/10">
                        <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary/40" />
                        <h4 className="text-lg font-medium">{item.position}</h4>
                        <div className="flex items-center text-sm text-foreground/60 mt-1 mb-2">
                          <span>{item.company}</span>
                          <span className="mx-2">•</span>
                          <span>{item.duration}</span>
                        </div>
                        <p className="text-sm text-foreground/70 font-light">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Education */}
              <Card className="border-primary/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center mr-3">
                      <GraduationCap className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-serif italic">Education</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {education.map((item, index) => (
                      <div key={index} className="relative pl-6 border-l border-primary/10">
                        <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary/40" />
                        <h4 className="text-lg font-medium">{item.degree}</h4>
                        <div className="flex items-center text-sm text-foreground/60 mt-1 mb-2">
                          <span>{item.institution}</span>
                          <span className="mx-2">•</span>
                          <span>{item.year}</span>
                        </div>
                        <p className="text-sm text-foreground/70 font-light">{item.description}</p>
                        {item.cgpa && (
                          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary/80">
                            CGPA: {item.cgpa}
                          </div>
                        )}
                        {item.percentage && (
                          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary/80">
                            Score: {item.percentage}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-serif italic mb-6">Technical Skills</h3>
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "3rem" } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5">
                        {category.icon}
                      </div>
                      <h4 className="text-base font-medium">{category.title}</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs text-foreground/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
          
          {/* Personal Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-20"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-serif italic mb-6">Beyond Code</h3>
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "3rem" } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
              />
              <p className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mb-8">
                When I&apos;m not coding, you&apos;ll find me exploring these interests and hobbies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalInterests.map((interest, index) => (
                <Card 
                  key={index} 
                  className="border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5">
                        {interest.icon}
                      </div>
                      <h4 className="text-base font-medium">{interest.category}</h4>
                    </div>
                    
                    <p className="text-sm text-foreground/70 font-light mb-4">
                      {interest.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {interest.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 1.2 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-primary/10 text-base px-8 py-6 rounded-xl hover:bg-primary/5 transition-colors relative overflow-hidden"
              asChild
            >
              <Link href="/projects" className="flex items-center">
                <motion.span 
                  className="font-medium tracking-wide relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  View my projects
                </motion.span>
                <motion.div
                  className="ml-3 h-6 w-6 rounded-full border border-primary/20 flex items-center justify-center relative z-10"
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-3 w-3 text-primary/70" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
} 