import { Card, CardContent } from "@/components/ui/card";
import { Code, Terminal, Database, Cloud, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";

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

export default function SkillsSection({ isInView }: { isInView: boolean }) {
  return (
    <div>
      <div className="mb-10 relative">
        <h3 className="text-2xl font-serif italic mb-6">Technical Skills</h3>
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: "3rem" } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
        />
        {/* Decorative element */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none hidden md:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="70" cy="30" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="70" cy="30" r="10" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="30" r="5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <Card 
            key={index} 
            className="border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group relative overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="text-primary/70"
                  >
                    {category.icon}
                  </motion.div>
                </div>
                <h4 className="text-base font-medium group-hover:text-primary/90 transition-colors duration-300">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs text-foreground/70 group-hover:border-primary/20 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* Decorative corner element */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}