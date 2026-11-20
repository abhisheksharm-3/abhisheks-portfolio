import Link from "next/link";
import { Suspense } from "react";
import { PathSuggestion } from "@/components/shared/PathSuggestion";
import { StatePage } from "@/components/shared/StatePage";
import { SITE_MEDIA } from "@/data/site-media";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/projects", label: "things i built" },
  { href: "/writing", label: "writing" },
  { href: "/contact", label: "say hi" },
] as const;

export const metadata = {
  title: "Not found | Abhishek Sharma",
};

/** 404: the title over a clip from the exhibit's glass room, then the typo correction and the pages that still work. */
const NotFound = () => (
  <StatePage
    eyebrow="404"
    title="this page is lost in here somewhere."
    media={SITE_MEDIA.notFound}
    overlay={
      <Suspense fallback={null}>
        <PathSuggestion onMedia />
      </Suspense>
    }
  >
    <nav
      aria-label="pages that still work"
      className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-xs text-foreground/60"
    >
      <span>these still work:</span>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          className="text-foreground/85 underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </StatePage>
);

export default NotFound;
