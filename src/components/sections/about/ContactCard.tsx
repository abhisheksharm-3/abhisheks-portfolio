import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/contact";
import Link from "next/link";
import Image from "next/image";

/**
 * Renders contact details, social media links, and a CTA on the about page.
 * Minimal editorial style — no card wrapper.
 */
export const ContactCard = () => {
  return (
    <div className="h-full flex flex-col gap-8">
      <div className="relative w-full aspect-square overflow-hidden rounded-sm group">
        <Image
          src="https://github.com/abhisheksharm-3.png"
          alt="Abhishek Sharma"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div>
        <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
          elsewhere
        </p>
        <div>
          {SOCIAL_LINKS.map(({ label, href, displayUrl }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-3 border-b border-primary/8 text-sm text-foreground/45 hover:text-foreground/80 transition-colors duration-200 group"
            >
              <span className="text-[11px] text-primary/30 uppercase tracking-[0.15em] font-light w-16 shrink-0">
                {label}
              </span>
              <span className="flex-1 truncate font-light">{displayUrl}</span>
              <ArrowUpRight className="h-3 w-3 text-foreground/15 group-hover:text-foreground/45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      <div className="h-px bg-primary/10" />

      <Link
        href="/contact"
        className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground/80 transition-colors duration-200 group font-light"
      >
        <span>let&apos;s talk</span>
        <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1 duration-200" />
      </Link>
    </div>
  );
};
