import Link from "next/link";
import { StatePage } from "@/components/shared/StatePage";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/projects", label: "things i built" },
  { href: "/writing", label: "writing" },
  { href: "/contact", label: "say hi" },
] as const;

export const metadata = {
  title: "Not found | Abhishek Sharma",
};

/** 404. Same language as every other page: no gradients, no shouting. */
const NotFound = () => (
  <StatePage
    body="the link is either stale or i moved something. these still work:"
    eyebrow="404"
    title="this page doesn't exist"
  >
    <ul className="divide-y divide-foreground/8 border-y border-foreground/8 max-w-sm">
      {LINKS.map((link) => (
        <li key={link.href}>
          <Link
            className="group flex items-center justify-between py-3 text-sm font-light text-foreground/55 hover:text-foreground/85 transition-colors duration-200"
            href={link.href}
          >
            {link.label}
            <span className="text-foreground/20 group-hover:text-foreground/50 group-hover:translate-x-0.5 transition-all duration-200">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </StatePage>
);

export default NotFound;
