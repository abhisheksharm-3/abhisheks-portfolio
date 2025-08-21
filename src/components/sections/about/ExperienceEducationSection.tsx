import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    position: "Software Development Intern",
    company: "Stardom",
    duration: "Jan 2025 – Jun 2025",
    description:
      "Took charge of building Stardom’s web presence from scratch with Next.js. Tweaked and tuned the frontend till it actually felt fast. Also set up their cloud infra + email systems — basically made sure things didn’t break when people actually started using it."
  },
  {
    position: "Winner – Network18 Track",
    company: "Gen AI Exchange Hackathon (Google)",
    duration: "Oct 2024",
    description:
      "Built ‘Credify’, an AI-powered media verification tool. We hacked together Machine Learning + attribution logic to fight fake media — ended up winning the track. Intense 1 month, but super worth it."
  }
];

const education = [
  {
    degree: "B.E. in Computer Science & Engineering",
    institution: "CCET, Panjab University",
    year: "2021–2025",
    cgpa: "8.31",
    description:
      "Graduated with an 8.31 CGPA. Learnt my foundations in CS, but honestly most growth came from side projects and hackathons I kept grinding on."
  },
  {
    degree: "12th Grade (CBSE)",
    institution: "Mount Carmel School, Chandigarh",
    year: "2021",
    description:
      "Science + Math focus. Scored 92.4% — lots of late-night physics + coding side quests.",
    percentage: "92.4%"
  },
  {
    degree: "10th Grade (CBSE)",
    institution: "Mount Carmel School, Chandigarh",
    year: "2019",
    description:
      "Strong academics (92.2%) but also when I really got hooked on tinkering with computers beyond the classroom.",
    percentage: "92.2%"
  }
];


export default function ExperienceEducationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Experience */}
      <Card className="border-primary/10 backdrop-blur-sm relative">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5">
              <Briefcase className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif italic">Experience</h3>
          </div>
          <div className="space-y-8">
            {experience.map((item, index) => (
              <div key={index} className="relative pl-6 border-l border-primary/10 group hover:border-primary/30 transition-colors duration-300">
                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors duration-300" />
                <h4 className="text-lg font-medium group-hover:text-primary/90 transition-colors duration-300">{item.position}</h4>
                <div className="flex items-center text-sm text-foreground/60 mt-1 mb-2">
                  <span className="font-medium">{item.company}</span>
                  <span className="mx-2">•</span>
                  <span className="italic">{item.duration}</span>
                </div>
                <p className="text-sm text-foreground/70 font-light">{item.description}</p>
              </div>
            ))}
          </div>
          {/* Decorative corner element */}
          <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </CardContent>
      </Card>
      {/* Education */}
      <Card className="border-primary/10 backdrop-blur-sm relative">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5">
              <GraduationCap className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif italic">Education</h3>
          </div>
          <div className="space-y-8">
            {education.map((item, index) => (
              <div key={index} className="relative pl-6 border-l border-primary/10 group hover:border-primary/30 transition-colors duration-300">
                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors duration-300" />
                <h4 className="text-lg font-medium group-hover:text-primary/90 transition-colors duration-300">{item.degree}</h4>
                <div className="flex items-center text-sm text-foreground/60 mt-1 mb-2">
                  <span className="font-medium">{item.institution}</span>
                  <span className="mx-2">•</span>
                  <span className="italic">{item.year}</span>
                </div>
                <p className="text-sm text-foreground/70 font-light">{item.description}</p>
                <div className="flex gap-2 mt-3">
                  {item.cgpa && (
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary/80 border border-primary/10">
                      CGPA: {item.cgpa}
                    </div>
                  )}
                  {item.percentage && (
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary/80 border border-primary/10">
                      Score: {item.percentage}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Decorative corner element */}
          <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}