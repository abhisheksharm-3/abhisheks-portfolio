import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactCard() {
  return (
    <Card className="border-primary/10 backdrop-blur-sm h-full relative">
      <CardContent className="p-8">
        {/* Decorative element */}
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Profile image */}
        <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-md group">
          <Image 
            src="https://github.com/abhisheksharm-3.png" 
            alt="Abhishek Sharma" 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Title + tagline */}
        <h3 className="text-xl font-medium mb-2">Contact Details</h3>
        <p className="text-xs text-foreground/50 mb-4">
          Always down to chat about code, ideas, or random side quests.
        </p>

        {/* Links */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-foreground/50 mb-1">LinkedIn</p>
            <a 
              href="https://linkedin.com/in/abhisheksan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary/80 hover:text-primary flex items-center group"
            >
              linkedin.com/in/abhisheksan
              <ArrowRight className="ml-1 h-3 w-3 transform transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div>
            <p className="text-xs text-foreground/50 mb-1">GitHub</p>
            <a 
              href="https://github.com/abhisheksharm-3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary/80 hover:text-primary flex items-center group"
            >
              github.com/abhisheksharm-3
              <ArrowRight className="ml-1 h-3 w-3 transform transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <Separator className="my-6 bg-primary/5" />

        {/* Button */}
        <Button 
          variant="outline" 
          className="w-full border-primary/10 hover:bg-primary/5 text-sm group relative overflow-hidden"
          asChild
        >
          <Link href="/contact" className="flex items-center justify-center">
            <span className="relative z-10">Let&apos;s talk</span>
            <ArrowRight className="ml-2 h-4 w-4 relative z-10 transform transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </Link>
        </Button>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-primary/20 to-transparent" />
          <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
}
