"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ContactBackground } from "@/components/sections/contact/ContactBackground";
import { SendMessageCard } from "@/components/sections/contact/ContactForm";
import { ContactHeader } from "@/components/sections/contact/ContactHeader";
import { ScheduleMeetingCard } from "@/components/sections/contact/ScheduleMeetingCard";
import { ElsewhereLinks } from "@/components/shared/ElsewhereLinks";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/data/contact";

const ELSEWHERE_LINKS = [
  { label: "Email", href: `mailto:${CONTACT_INFO.email}`, displayUrl: CONTACT_INFO.email },
  ...SOCIAL_LINKS,
];

const ContactPage = () => (
  <AppShell>
    <div className="relative pt-36 pb-16 px-6 sm:px-10 lg:px-24">
      <ContactBackground />

      <ContactHeader />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24">
        <SendMessageCard />
        <div className="flex flex-col gap-14">
          <ScheduleMeetingCard />
          <ElsewhereLinks links={ELSEWHERE_LINKS} />
        </div>
      </div>
    </div>
  </AppShell>
);

export default ContactPage;
