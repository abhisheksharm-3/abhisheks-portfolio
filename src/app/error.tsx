"use client";

import { RotateCw } from "lucide-react";
import { useEffect } from "react";
import { StateLink, StatePage } from "@/components/shared/StatePage";
import { SITE_MEDIA } from "@/data/site-media";
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from "@/lib/ui/button-classes";

interface ErrorPropsType {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Client-side error boundary: the title over a clip of one boat on a still sea, then a retry. */
const ErrorBoundary = ({ error, reset }: ErrorPropsType) => {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <StatePage
      body="something on this page threw. retrying usually clears it; if it doesn't, the fault is mine and i'd like to hear about it."
      eyebrow="error"
      title="something broke on my side."
      media={SITE_MEDIA.error}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={reset} className={PRIMARY_BUTTON}>
          <RotateCw aria-hidden="true" className="h-3.5 w-3.5" />
          try again
        </button>
        <a href="/" className={SECONDARY_BUTTON}>
          go home
        </a>
        <span className="ml-2">
          <StateLink href="/contact">tell me about it</StateLink>
        </span>
      </div>

      {error.digest && (
        <p className="mt-10 text-[11px] uppercase tracking-[0.18em] font-light text-primary/25">
          reference {error.digest}
        </p>
      )}
    </StatePage>
  );
};

export default ErrorBoundary;
