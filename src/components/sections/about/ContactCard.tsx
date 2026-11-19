import Image from "next/image";
import Link from "next/link";
import { PortraitFlip } from "@/components/sections/about/PortraitFlip";
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
      <PortraitFlip>
        <Image
          src="/images/portrait.webp"
          alt="Abhishek in profile at an art exhibit in mumbai, lit by projected painted flowers"
          sizes="(min-width: 1024px) 30vw, 90vw"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </PortraitFlip>

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
