"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { TextMorph } from "@/components/shared/TextMorph";
import { CONTACT_INFO } from "@/data/contact";

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
 * The email address as the page's main element: a large mailto link and a copy button.
 * The button's icon and label morph through "copied". Clipboard access can be blocked, so a
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
        className="font-serif text-[clamp(1.25rem,5.6vw,3.75rem)] leading-tight text-foreground/90 underline decoration-1 decoration-foreground/25 underline-offset-8 transition-colors duration-200 hover:text-foreground hover:decoration-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 [overflow-wrap:anywhere]"
      >
        {CONTACT_INFO.email}
      </a>

      <button
        type="button"
        onClick={copy}
        className="inline-flex cursor-pointer items-center gap-2 border border-foreground/30 px-5 py-2.5 text-sm font-light text-foreground/65 transition-colors duration-200 hover:border-foreground/50 hover:text-foreground focus-visible:border-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30"
      >
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

      <p
        role="status"
        className={status === "failed" ? "text-sm font-light text-foreground/65" : "sr-only"}
      >
        {STATUS_NOTICE[status]}
      </p>
    </div>
  );
};
