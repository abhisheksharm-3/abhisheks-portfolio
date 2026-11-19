import { ExternalLink } from "lucide-react";

export const ScheduleMeetingCard = () => (
  <div>
    <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] mb-4 font-light">
      prefer to talk?
    </p>
    <h3 className="font-serif text-xl text-foreground mb-1.5">Schedule a call</h3>
    <p className="text-foreground/35 text-sm font-light mb-5">30 min &middot; Google Meet</p>
    <a
      href="https://cal.com/abhisheksan/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground/90 transition-colors duration-200 group font-light"
    >
      Book a time slot
      <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </a>
  </div>
);
