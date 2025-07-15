import { Card } from "@/components/ui/card";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ScheduleMeetingCard() {
  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md border border-primary/10 bg-primary/5">
            <Calendar className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-serif italic">Schedule a Meeting</h2>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "3rem" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
        />
        <p className="text-foreground/60 text-sm font-light leading-relaxed mb-6">
          Prefer to talk in real-time? Schedule a 30-minute call at your convenience.
        </p>
        <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
          <a href="https://cal.com/abhisheksan/30min" target="_blank" rel="noopener noreferrer">
            Book a time slot
            <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Button>
      </div>
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </Card>
  );
}