import { ArrowUpRight } from "lucide-react";
import type { ElsewhereLinksPropsType } from "@/lib/types/components";

/**
 * The "elsewhere" list shared by /about and /contact, so the same places read the same way
 * on both. Web addresses open in a new tab; mailto links stay in place.
 */
export const ElsewhereLinks = ({ links }: ElsewhereLinksPropsType) => (
  <div>
    <h2 className="text-[11px] text-primary/60 uppercase tracking-[0.2em] mb-4 font-light">
      elsewhere
    </h2>
    <ul>
      {links.map(({ label, href, displayUrl }) => {
        const isWeb = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              target={isWeb ? "_blank" : undefined}
              rel={isWeb ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 py-3 border-b border-primary/10 text-sm text-foreground/65 hover:text-foreground/90 transition-colors duration-200"
            >
              <span className="w-20 shrink-0 text-[11px] uppercase tracking-[0.15em] font-light text-primary/60">
                {label}
              </span>
              <span className="min-w-0 flex-1 truncate font-light">{displayUrl}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-3 w-3 shrink-0 text-foreground/40 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/60"
              />
            </a>
          </li>
        );
      })}
    </ul>
  </div>
);
