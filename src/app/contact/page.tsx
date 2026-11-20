"use client";

import Image from "next/image";
import { AppShell } from "@/components/layout/AppShell";
import { FooterDateline } from "@/components/layout/footer/FooterDateline";
import { ContactBackground } from "@/components/sections/contact/ContactBackground";
import { SendMessageCard } from "@/components/sections/contact/ContactForm";
import { CopyEmail } from "@/components/sections/contact/CopyEmail";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { ListeningLine } from "@/components/shared/ListeningLine";
import { SITE_MEDIA } from "@/data/site-media";

/**
 * The contact page: the email with its copy and book-a-call buttons, the time in pune and what's
 * playing, beside a photo at marine drive; the form underneath.
 */
const ContactPage = () => {
  const { contact } = SITE_MEDIA;

  return (
    <AppShell>
      <div className="relative px-6 pt-36 pb-16 sm:px-10 lg:px-24">
        <ContactBackground />

        <div className="relative z-10 grid grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
          <div className="flex min-w-0 flex-col gap-6">
            <p className="text-[11px] font-light uppercase tracking-[0.2em] text-primary/60">
              contact
            </p>
            <h1 className="font-serif text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
              say hi
            </h1>
            <p className="max-w-md text-sm font-light leading-relaxed text-foreground/65 sm:text-base">
              questions about my work, a post, or a project: email me, book a call, or write below.
            </p>
            <CopyEmail />
            <div className="max-w-md">
              <FooterDateline />
              <div className="mt-4">
                <ListeningLine />
              </div>
            </div>
          </div>
          <figure className="flex flex-col gap-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10">
              <Image
                src={contact.src}
                alt={contact.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="font-mono text-[11px] text-foreground/60">
              {contact.caption}
            </figcaption>
          </figure>
        </div>

        <div className="relative z-10 mt-20 sm:mt-28">
          <ContentBlock label="or write here">
            <SendMessageCard />
          </ContentBlock>
        </div>
      </div>
    </AppShell>
  );
};

export default ContactPage;
