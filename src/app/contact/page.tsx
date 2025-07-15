"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import ContactHeader from "@/components/sections/contact/ContactHeader";
import ContactBackground from "@/components/sections/contact/ContactBackground";
import SendMessageCard from "@/components/sections/contact/SendMessageCard";
import ScheduleMeetingCard from "@/components/sections/contact/ScheduleMeetingCard";
import ContactInfoCard from "@/components/sections/contact/ContactInfoCard";

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <PageLayout activePage="Contact">
      <div
        ref={sectionRef}
        className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden"
      >
        <ContactBackground isInView={isInView} />
        <ContactHeader isInView={isInView} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <SendMessageCard />
          <div className="flex flex-col gap-8">
            <ScheduleMeetingCard />
            <ContactInfoCard />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}