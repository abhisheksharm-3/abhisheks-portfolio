"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { TextMorph } from "@/components/shared/TextMorph";
import { PRIMARY_BUTTON } from "@/lib/ui/button-classes";

const RESET_MS = 2000;

/**
 * A button that copies a command to the clipboard; its label morphs to "copied" and back. A
 * blocked clipboard says so in the label, and the command stays on the page to select by hand.
 */
export const CopyCommand = ({ command, label }: { command: string; label: string }) => {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), RESET_MS);
  };

  return (
    <button type="button" onClick={copy} className={PRIMARY_BUTTON}>
      {status === "copied" ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <Copy aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      <TextMorph>
        {status === "copied" ? "copied" : status === "failed" ? "copy failed" : label}
      </TextMorph>
    </button>
  );
};
