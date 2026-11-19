import Image from "next/image";
import Link from "next/link";
import { ElsewhereLinks } from "@/components/shared/ElsewhereLinks";
import { RESUME_URL, SOCIAL_LINKS } from "@/data/contact";

/**
 * Renders the portrait, the shared elsewhere list, and a link to the contact page.
 * Minimal editorial style: no card wrapper.
 */
export const ContactCard = () => {
  const links = [
    ...SOCIAL_LINKS,
    ...(RESUME_URL
      ? [{ label: "Resume", href: RESUME_URL, displayUrl: RESUME_URL.replace(/^https?:\/\//, "") }]
      : []),
  ];

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="relative w-full aspect-square overflow-hidden group">
        <Image
          src="https://github.com/abhisheksharm-3.png"
          alt="Abhishek Sharma"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <ElsewhereLinks links={links} />

      <Link
        href="/contact"
        transitionTypes={["nav-forward"]}
        className="text-sm font-light text-foreground/60 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-foreground/85 hover:decoration-foreground/60"
      >
        say hi
      </Link>
    </div>
  );
};
