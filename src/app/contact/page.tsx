"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ContactBackground } from "@/components/sections/contact/ContactBackground";
import { SendMessageCard } from "@/components/sections/contact/ContactForm";
import { ContactHeader } from "@/components/sections/contact/ContactHeader";
import { CopyEmail } from "@/components/sections/contact/CopyEmail";
import { ScheduleMeetingCard } from "@/components/sections/contact/ScheduleMeetingCard";

const ContactPage = () => (
  <AppShell>
    <div className="relative pt-36 pb-16 px-6 sm:px-10 lg:px-24">
      <ContactBackground />

      <ContactHeader />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14 lg:gap-24">
        <CopyEmail />
        <ScheduleMeetingCard />
      </div>

      <div className="my-16 h-px bg-primary/10" />

      <div className="max-w-2xl">
        <SendMessageCard />
      </div>
    </div>
  </AppShell>
);

export default ContactPage;
