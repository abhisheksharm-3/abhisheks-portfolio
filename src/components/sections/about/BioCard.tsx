import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Calendar } from "lucide-react";

export default function BioCard() {
  return (
    <Card className="border-primary/10 backdrop-blur-sm h-full relative">
      <CardContent className="p-8">
        <h3 className="text-2xl font-serif italic mb-6">Biography</h3>
        {/* Decorative element */}
        <div className="absolute top-8 right-8 opacity-10">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <path d="M30,20 Q50,10 70,30 T90,50" stroke="currentColor" strokeWidth="1" />
            <path d="M20,40 Q40,20 60,40 T80,60" stroke="currentColor" strokeWidth="1" />
            <path d="M10,60 Q30,30 50,50 T70,70" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="space-y-4 text-foreground/70 font-light">
          <p>
            I&apos;m a Software Developer with a strong focus on creating intuitive and efficient digital experiences. 
            My journey in technology began with a curiosity about how applications work, which led me to pursue 
            Computer Science and develop expertise in both frontend and backend technologies.
          </p>
          <div className="pl-4 border-l-2 border-primary/30 my-6 italic">
            <p className="text-foreground/80">
              &ldquo;I believe in building technology that not only works well, but feels intuitive and brings joy to its users.&rdquo;
            </p>
          </div>
          <p>
            I specialize in building responsive web applications and mobile solutions using modern frameworks 
            and practices. My approach combines technical expertise with an understanding of user needs, 
            resulting in applications that are both functional and enjoyable to use.
          </p>
          <div className="bg-primary/5 p-4 rounded-md border border-primary/10 my-6">
            <h4 className="text-sm font-medium mb-2 text-primary/80">Current Focus</h4>
            <p className="text-sm">
              Expanding my knowledge in Android native development, generative AI applications, 
              and LLM integrations. I&apos;m particularly interested in creating the next generation of intelligent 
              mobile experiences that blend cutting-edge technology with intuitive design.
            </p>
          </div>
          <p>
            Beyond coding, I&apos;m passionate about solving real-world problems through technology. Whether it&apos;s building 
            a media verification system at a hackathon or optimizing user experiences for clients, I thrive on challenges 
            that push my skills forward. My experience in hackathons has taught me to work efficiently under pressure 
            and collaborate effectively with diverse teams.
          </p>
          <p>
            I believe in continuous learning and staying ahead of technological trends. Right now, I&apos;m diving deep into 
            Jetpack Compose, LLM integrations, and native Android development — all while balancing my academic 
            responsibilities and personal projects.
          </p>
        </div>
        <Separator className="my-6 bg-primary/10" />
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
              <User className="h-4 w-4 text-primary/60" />
            </div>
            <div>
              <p className="text-xs text-foreground/50">Name</p>
              <p className="text-sm font-medium">Abhishek Sharma</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary/60" />
            </div>
            <div>
              <p className="text-xs text-foreground/50">Location</p>
              <p className="text-sm font-medium">Chandigarh, India</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary/60" />
            </div>
            <div>
              <p className="text-xs text-foreground/50">Availability</p>
              <p className="text-sm font-medium">Open to new projects and job opportunities</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}