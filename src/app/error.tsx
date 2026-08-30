"use client";

import { useEffect } from "react";
import { StateLink, StatePage } from "@/components/shared/StatePage";

interface ErrorPropsType {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Client-side error boundary. */
const Error = ({ error, reset }: ErrorPropsType) => {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <StatePage
      body="something on this page threw. retrying usually clears it; if it doesn't, the fault is mine and i'd like to hear about it."
      eyebrow="error"
      title="that didn't work"
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        <StateLink onClick={reset}>try again</StateLink>
        <StateLink href="/">go home</StateLink>
        <StateLink href="/contact">tell me about it</StateLink>
      </div>

      {error.digest && (
        <p className="mt-10 text-[11px] uppercase tracking-[0.18em] font-light text-primary/25">
          reference {error.digest}
        </p>
      )}
    </StatePage>
  );
};

export default Error;
