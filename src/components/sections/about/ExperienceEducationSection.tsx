import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

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

const education = [
  {
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    institution: "Chandigarh College of Engineering and Technology (CCET)",
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