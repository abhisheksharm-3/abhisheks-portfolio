"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

/** Foreground ink for each theme, matching the site's neutral. */
const INK = {
  dark: { base: "249, 249, 251", canvas: "28, 28, 34" },
  light: { base: "28, 28, 34", canvas: "249, 249, 251" },
};

/**
 * Builds the flowchart definition for one flow: a prompt is classified into a
 * catalog row (or composed into one), the run opens a ledger, and every phase
 * passes a gate before the next one starts.
 */
const buildDefinition = (phases: string[]) => {
  const nodes = phases
    .map(
      (phase, index) =>
        `  P${index}["${String(index + 1).padStart(2, "0")}  ${phase}"]`,
    )
    .join("\n");

  const links = phases
    .slice(1)
    .map((_, index) => `  P${index} -- "gate" --> P${index + 1}`)
    .join("\n");

  return `flowchart LR
  IN(["your prompt"]) --> CL["classify<br/><span class='sub'>hooks/enhance-prompt</span>"]
  CL -- "no row matches" --> CO["compose a flow"]
  CO -- "validated as a row" --> LG
  CL -- "one of eighteen flows" --> LG[("run ledger<br/><span class='sub'>.polaris/runs/&lt;slug&gt;/state.json</span>")]
  LG --> P0
${nodes}
${links}
  P${phases.length - 1} -- "gate" --> OUT(["artifact on disk<br/><span class='sub'>hash must match</span>"])

  classDef node fill:none,stroke-width:1px;
  class IN,CL,CO,LG,OUT node;
`;
};

/**
 * Renders the run architecture with mermaid. The library is imported inside the
 * effect so it only loads on this route.
 */
export const RunDiagram = ({
  flowName,
  phases,
}: {
  flowName: string;
  phases: string[];
}) => {
  const container = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (phases.length === 0) return;

    let cancelled = false;
    const ink = resolvedTheme === "light" ? INK.light : INK.dark;
    const rgba = (alpha: number) => `rgba(${ink.base}, ${alpha})`;

    const draw = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          themeVariables: {
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: "15px",
            background: "transparent",
            primaryColor: "transparent",
            primaryTextColor: rgba(0.85),
            primaryBorderColor: rgba(0.18),
            secondaryColor: "transparent",
            tertiaryColor: "transparent",
            lineColor: rgba(0.22),
            textColor: rgba(0.55),
            edgeLabelBackground: `rgb(${ink.canvas})`,
          },
          flowchart: {
            curve: "linear",
            padding: 22,
            nodeSpacing: 52,
            rankSpacing: 58,
            // Scaling to fit shrinks a long chain until the labels are
            // unreadable. Render at natural size and let the wrapper scroll.
            useMaxWidth: false,
            htmlLabels: true,
          },
        });

        const { svg } = await mermaid.render(
          `polaris-${reactId}-${flowName}`,
          buildDefinition(phases),
        );

        if (!cancelled && container.current) {
          container.current.innerHTML = svg;
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    draw();
    return () => {
      cancelled = true;
    };
  }, [flowName, phases, reactId, resolvedTheme]);

  if (phases.length === 0) {
    return (
      <p className="font-serif text-2xl italic text-foreground/45">
        a question routes nowhere.
      </p>
    );
  }

  if (failed) {
    return (
      <p className="font-mono text-xs text-foreground/45">
        {phases
          .map((phase, index) => `${String(index + 1).padStart(2, "0")} ${phase}`)
          .join("  →  ")}
      </p>
    );
  }

  return (
    <div
      ref={container}
      aria-label={`The ${flowName} flow runs ${phases.join(", then ")}, with a gate after every phase.`}
      role="img"
      className="-mx-6 overflow-x-auto px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 [&_.sub]:text-[11px] [&_.sub]:opacity-45 [&_svg]:h-auto [&_svg]:max-w-none"
    />
  );
};
