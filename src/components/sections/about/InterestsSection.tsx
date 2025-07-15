import { Card, CardContent } from "@/components/ui/card";
import { Camera, BookOpen, Music, Gamepad, Film, Coffee } from "lucide-react";
import { motion } from "framer-motion";

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
    tags: ["Valorant", "RDR2", "Far Cry 4", "PC Gaming"]
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