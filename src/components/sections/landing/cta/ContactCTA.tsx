import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/contact";
import { getSectionClasses } from "@/lib/config/spacing-standards";

/**
 * The home page's close. The email address is the one action; the social links under it
 * are for finding me, not a second ask.
 */
export const ContactCTA = () => {
  return (
    <section className={getSectionClasses()}>
      <SharedBackground isInView noiseFilterId="contactCTANoiseFilter" />

      <div className="relative z-10 w-full">
        <SectionHeader subtitle="reach out">
          <span className="font-serif text-foreground select-none pr-4">let&apos;s talk</span>
        </SectionHeader>

        <p className="text-foreground/65 text-base font-light leading-relaxed max-w-lg mb-10">
          questions about something i built or wrote, or a problem you want a second pair of eyes
          on: email me.
        </p>

        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="group inline-flex items-center gap-3 mb-16 max-w-full"
        >
          <span className="min-w-0 break-words text-xl sm:text-3xl md:text-4xl font-light text-foreground/80 group-hover:text-foreground transition-colors duration-200 tracking-tight">
            {CONTACT_INFO.email}
          </span>
          <ArrowUpRight className="h-6 w-6 text-foreground/40 group-hover:text-foreground/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
        </a>

        <div className="h-px bg-primary/10 mb-8" />

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-light lowercase text-foreground/60 hover:text-foreground/85 transition-colors duration-200"
              >
                <link.icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
