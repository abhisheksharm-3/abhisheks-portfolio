"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ContactBackground } from "@/components/sections/contact/ContactBackground";
import { ContactHeader } from "@/components/sections/contact/ContactHeader";
import { SendMessageCard } from "@/components/sections/contact/ContactForm";
import { ScheduleMeetingCard } from "@/components/sections/contact/ScheduleMeetingCard";
import { ContactInfoCard } from "@/components/sections/contact/ContactInfoCard";

const ContactPage = () => (
  <AppShell>
    <div className="relative pt-36 pb-16 px-6 sm:px-10 lg:px-24">
      <ContactBackground />

      <ContactHeader />

      <div className="mt-10 mb-10 h-px bg-primary/10" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
        <SendMessageCard />
        <div className="flex flex-col gap-14">
          <ScheduleMeetingCard />
          <ContactInfoCard />
        </div>
      </div>
    </div>
  </AppShell>
);

export default ContactPage;
