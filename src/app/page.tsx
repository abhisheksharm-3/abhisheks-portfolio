import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SpinningText } from "@/components/magicui/spinning-text";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Refined background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        <div className="absolute top-1/3 left-1/4 w-[40vw] sm:w-[25vw] h-[40vw] sm:h-[25vw] bg-primary/3 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/5 w-[35vw] sm:w-[20vw] h-[35vw] sm:h-[20vw] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="w-full px-6 sm:px-8 lg:px-32 py-8 sm:py-16 flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Mobile-optimized header */}
        <header className="flex justify-between items-center w-full mb-10 sm:mb-16">
          <div className="hidden sm:block">
            <SpinningText className="mr-40 opacity-70 text-sm">new portfolio • coming soon • 2025 •</SpinningText>
          </div>
          
          <div className="text-center sm:mx-0">
            <h2 className="text-xl sm:text-2xl font-light tracking-tighter">
              <span className="text-primary font-serif italic">A</span>
              <span className="font-extralight tracking-tight">BHK</span>
              <span className="text-primary/70 align-super text-[10px]">®</span>
            </h2>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a 
              href="https://abhisheksharma.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs flex items-center text-foreground/60 hover:text-primary transition-colors duration-300"
            >
              <span className="hidden sm:inline">Previous Work</span>
              <span className="sm:hidden">Work</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
            <ModeToggle />
          </div>
        </header>

        {/* Mobile-optimized Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-2">
          {/* Coming Soon Badge */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-primary/5 text-primary/90 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-light border border-primary/10 backdrop-blur-sm">
              Coming Soon
            </div>
          </div>
          
          {/* Main Name with fixed sizing to prevent clipping - FIXED HERE */}
          <div className="mb-8 sm:mb-12 text-center w-full overflow-visible px-6 sm:px-12">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl leading-none font-serif italic tracking-tight bg-gradient-to-r from-primary/80 via-primary to-primary/70 bg-clip-text text-transparent w-auto mx-auto px-1 sm:px-3 overflow-visible">
                Abhishek
              </h1>
              <p className="text-xs sm:text-sm text-foreground/50 font-extralight tracking-widest mt-3 uppercase">
                Design × Development × Creativity
              </p>
            </div>
          </div>

          {/* Design Philosophy Badge */}
          <div className="mb-10 sm:mb-16">
            <div className="bg-foreground/3 backdrop-blur-sm border border-primary/5 px-5 sm:px-8 py-3 sm:py-4 rounded-2xl text-center">
              <p className="text-xs sm:text-sm text-foreground/70 font-light tracking-wide">
                <span className="text-primary/90 font-serif italic">Reimagining</span> digital experiences through refined design
              </p>
            </div>
          </div>

          {/* Preview Card - Mobile optimized */}
          <Card className="w-full sm:w-[85vw] max-w-6xl border border-primary/5 bg-card/20 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 mb-10 sm:mb-20 hover:border-primary/10">
            <CardContent className="p-6 sm:p-10 md:p-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-primary/10">
                    <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-primary/80" strokeWidth={1.25} />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-extralight mb-4 sm:mb-5 text-center md:text-left tracking-tight">Evolving Design Language</h3>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2 sm:mt-4">
                    {['Minimalism', 'Elegance', 'Interaction', 'Motion'].map((aesthetic) => (
                      <span key={aesthetic} className="px-3 py-1.5 bg-primary/3 border border-primary/5 rounded-full text-xs text-primary/70">
                        {aesthetic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 pt-6 mt-6 border-t md:border-t-0 md:pt-0 md:mt-0 md:pl-12 md:border-l border-primary/5 flex flex-col justify-center">
                  <p className="text-foreground/60 text-sm sm:text-base font-extralight leading-relaxed">
                    This new portfolio will showcase my evolved design approach — where minimalism meets 
                    functionality. Every project will reflect the design philosophy I&apos;ve cultivated through 
                    my recent work.
                  </p>
                  
                  <p className="text-foreground/50 text-sm sm:text-base font-extralight leading-relaxed mt-4">
                    The upcoming collection demonstrates how I blend form and function to create 
                    memorable digital experiences that resonate with users.
                  </p>
                  
                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-xs text-foreground/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse"></div>
                      <span>Currently refining my design system</span>
                    </div>
                    
                    <a 
                      href="https://abhisheksharma.tech" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center px-5 py-2 sm:py-1.5 bg-foreground/3 hover:bg-foreground/5 border border-primary/10 rounded-full flex items-center justify-center transition-all duration-300 text-xs"
                    >
                      View Current Work
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design ethos statement */}
          <div className="max-w-xs sm:max-w-2xl text-center mb-10 sm:mb-20 px-4">
            <blockquote className="text-lg sm:text-xl font-extralight text-foreground/60 font-serif italic leading-relaxed">
              &quot;Design is not just what it looks like and feels like. Design is how it works.&quot;
            </blockquote>
            <p className="text-xs text-foreground/40 mt-3 tracking-wider">My design approach for 2025 and beyond</p>
          </div>
        </div>

        {/* Mobile-friendly footer */}
        <footer className="pt-6 sm:pt-10 border-t border-primary/5 w-full">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="mt-4 md:mt-0 text-center md:text-left">
              <p className="text-xs text-foreground/40 font-light tracking-wide">
                © 2025 <span className="text-primary/80">Abhishek Sharma</span>
              </p>
              <p className="text-[10px] text-foreground/30 mt-1 tracking-wider">
                Design & Development Enthusiast
              </p>
            </div>
            
            <div className="flex space-x-8">
              {[
                { name: 'GitHub', icon: <Github className="h-4 w-4 sm:h-3.5 sm:w-3.5" /> },
                { name: 'Twitter', icon: <Twitter className="h-4 w-4 sm:h-3.5 sm:w-3.5" /> },
                { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4 sm:h-3.5 sm:w-3.5" /> }
              ].map((platform) => (
                <Button key={platform.name} variant="ghost" size="sm" className="rounded-full hover:bg-primary/3 hover:text-primary/90 transition-colors duration-300 h-10 w-10 sm:h-9 sm:w-9 p-0">
                  {platform.icon}
                  <span className="sr-only">{platform.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}