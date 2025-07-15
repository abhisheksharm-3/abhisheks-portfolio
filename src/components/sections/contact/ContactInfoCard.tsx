import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const CONTACTS = [
  {
    label: "Email",
    icon: (
      <Mail className="h-4 w-4 text-primary/70" />
    ),
    link: "&#109;&#97;&#x69;&#x6c;&#116;&#111;&#x3a;&#97;%62%68&#105;%74&#x69;%6b&#x75;%32%30%30&#51;%40&#103;&#x6d;%61%69&#108;&#x2e;&#99;&#x6f;%6d",
    text: "Email me",
    display: "Email me",
  },
  {
    label: "GitHub",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    link: "https://github.com/abhisheksharm-3",
    text: "github.com/abhisheksharm-3",
    display: "github.com/abhisheksharm-3",
  },
  {
    label: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    link: "https://www.linkedin.com/in/abhisheksan/",
    text: "linkedin.com/in/abhisheksan/",
    display: "linkedin.com/in/abhisheksan/",
  },
  {
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    link: "https://instagram.com/abhishekxsharmaa",
    text: "instagram.com/abhishekxsharmaa",
    display: "instagram.com/abhishekxsharmaa",
  },
];

export default function ContactInfoCard() {
  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
            <Mail className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif italic">Contact Details</h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "3rem" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
        />
        <div className="space-y-4">
          {CONTACTS.map(({ label, icon, link, display }) => (
            <div className="flex items-start gap-3" key={label}>
              <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5 mt-0.5">{icon}</div>
              <div>
                <p className="text-xs text-foreground/40 mb-1">{label}</p>
                <a
                  href={link}
                  target={link.startsWith("http") ? "_blank" : undefined}
                  rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {display}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </Card>
  );
}