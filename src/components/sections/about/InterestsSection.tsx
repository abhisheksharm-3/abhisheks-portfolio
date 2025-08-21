import { Card, CardContent } from "@/components/ui/card";
import { Camera, BookOpen, Music, Gamepad, Film, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const personalInterests = [
  {
    category: "Photography",
    icon: <Camera className="h-5 w-5" />,
    description:
      "Got into the habit of clicking random city corners and skies. My gallery is basically 70% cloud pics at this point.",
    tags: ["Street", "Nature", "Golden Hour"]
  },
  {
    category: "Reading",
    icon: <BookOpen className="h-5 w-5" />,
    description:
      "Currently juggling Naval’s Almanack and The Courage to be Disliked. I like books that make you pause mid-page and rethink stuff.",
    tags: ["Philosophy", "Self-Growth", "Business"]
  },
  {
    category: "Music",
    icon: <Music className="h-5 w-5" />,
    description:
      "Lo-fi for deep work, rock when I’m stuck debugging, and the occasional classical binge when I need brain reset.",
    tags: ["Lo-fi", "Rock", "Classical"]
  },
  {
    category: "Gaming",
    icon: <Gamepad className="h-5 w-5" />,
    description:
      "Valorant for the chaos, RDR2 for the escape. Honestly the best way to cool down after a long coding session.",
    tags: ["Valorant", "RDR2", "Far Cry 4"]
  },
  {
    category: "Sci-Fi Media",
    icon: <Film className="h-5 w-5" />,
    description:
      "Obsessed with sci-fi that feels a little too close to reality. Interstellar and The Martian are on permanent rewatch.",
    tags: ["Interstellar", "The Martian", "Inception"]
  },
  {
    category: "Exploration",
    icon: <Coffee className="h-5 w-5" />,
    description:
      "Weekends = wandering streets, chasing food stalls, or finding low-key cafes to sit and code/read for hours.",
    tags: ["Cafes", "Street Food", "City Walks"]
  }
];


export default function InterestsSection({ isInView }: { isInView: boolean }) {
  return (
    <div>
      <div className="mb-10 relative">
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
        {/* Decorative element */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none hidden md:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M10,90 Q30,70 50,90 T90,90" stroke="currentColor" strokeWidth="1" />
            <path d="M10,70 Q30,50 50,70 T90,70" stroke="currentColor" strokeWidth="1" />
            <path d="M10,50 Q30,30 50,50 T90,50" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalInterests.map((interest, index) => (
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
                    {interest.icon}
                  </motion.div>
                </div>
                <h4 className="text-base font-medium group-hover:text-primary/90 transition-colors duration-300">{interest.category}</h4>
              </div>
              <p className="text-sm text-foreground/70 font-light mb-4">
                {interest.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {interest.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs text-foreground/70 group-hover:border-primary/20 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Decorative corner dot */}
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}