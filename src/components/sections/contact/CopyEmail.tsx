"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, Check, Copy } from "lucide-react";
import { useState } from "react";
import { TextMorph } from "@/components/shared/TextMorph";
import { CONTACT_INFO } from "@/data/contact";
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from "@/lib/ui/button-classes";

type CopyStatusType = "idle" | "copied" | "failed";

const RESET_MS = 2000;

const STATUS_LABEL: Record<CopyStatusType, string> = {
  idle: "copy email",
  copied: "copied",
  failed: "copy failed",
};

const STATUS_NOTICE: Record<CopyStatusType, string> = {
  idle: "",
  copied: "email address copied",
  failed: "couldn't copy the email address. select it and copy it by hand.",
};

/**
 * The email address as the page's main element: a large mailto link, then a copy button and a
 * link to book a call as real buttons. The copy button's icon and label morph through "copied". Clipboard access can be blocked, so a
 * failed copy says so; the address stays selectable either way.
 */
export const CopyEmail = () => {
  const [status, setStatus] = useState<CopyStatusType>("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), RESET_MS);
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="font-serif text-[clamp(1.25rem,2.4vw,2.25rem)] sm:whitespace-nowrap leading-tight text-foreground/90 underline decoration-1 decoration-foreground/25 underline-offset-8 transition-colors duration-200 hover:text-foreground hover:decoration-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 [overflow-wrap:anywhere]"
      >
        {CONTACT_INFO.email}
      </a>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={copy} className={PRIMARY_BUTTON}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status === "copied" ? "copied" : "copy"}
              initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {status === "copied" ? (
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
              ) : (
                <Copy aria-hidden="true" className="h-3.5 w-3.5" />
              )}
            </motion.span>
          </AnimatePresence>
          <TextMorph>{STATUS_LABEL[status]}</TextMorph>
        </button>
        <a
          href={CONTACT_INFO.booking}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${SECONDARY_BUTTON}`}
        >
          <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" />
          book a 30 min call
          <ArrowUpRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <p
        role="status"
        className={status === "failed" ? "text-sm font-light text-foreground/65" : "sr-only"}
      >
        {STATUS_NOTICE[status]}
      </p>
    </div>
  );
};
