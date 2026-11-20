"use client";

import { useState } from "react";
import { RunDiagram } from "./RunDiagram";

/** Every flow in Polaris 1.19.0's rules/flows.json, with the phases it runs in order. */
const FLOWS: { name: string; phases: string[] }[] = [
  {
    name: "feature",
    phases: ["spec", "experience", "contract", "schema", "threat-model", "design", "build", "ship"],
  },
  {
    name: "foggy",
    phases: [
      "recon",
      "spec",
      "experience",
      "contract",
      "schema",
      "threat-model",
      "design",
      "build",
      "ship",
    ],
  },
  { name: "bug", phases: ["reproduce", "rootcause", "fix", "verify", "ship"] },
  { name: "continuation", phases: [] },
  { name: "conversation", phases: [] },
  { name: "trivial", phases: ["edit", "gate"] },
  { name: "fix", phases: ["implement", "gate", "ship"] },
  { name: "ship", phases: ["gate", "ship"] },
  { name: "migration", phases: ["plan", "migrate", "verify", "ship"] },
  { name: "perf", phases: ["measure", "fix", "remeasure", "ship"] },
  { name: "integration", phases: ["contract", "threat-model", "build", "verify", "ship"] },
  { name: "design", phases: ["direction", "build", "critique", "polish", "gate"] },
  { name: "testing", phases: ["survey", "write", "prove", "gate"] },
  { name: "spike", phases: ["spike", "decide"] },
  { name: "review", phases: ["review", "verify"] },
  { name: "audit", phases: ["audit", "triage", "fix", "verify"] },
  { name: "qa", phases: ["break", "pin", "fix", "verify"] },
  { name: "cleanup", phases: ["cleanup", "gate", "ship"] },
  { name: "security", phases: ["threat-model", "harden", "verify"] },
  { name: "incident", phases: ["mitigate", "rootcause", "prevent", "notes"] },
  { name: "release", phases: ["gate", "notes", "release"] },
  { name: "readiness", phases: ["audit", "observe", "rollout", "ship"] },
  { name: "platform", phases: ["change", "gate", "ship"] },
  { name: "modernize", phases: ["survey", "upgrade", "qa", "ship"] },
  { name: "docs", phases: ["drift", "write", "gate"] },
  { name: "research", phases: ["research"] },
  { name: "context", phases: ["catchup"] },
];

const CHIP_CLASS =
  "border px-3 py-1.5 font-mono text-[11px] transition-[border-color,color,transform] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 motion-reduce:active:scale-100";

/** The flow names as buttons; picking one redraws the run diagram with that flow's phases. */
export const FlowPicker = () => {
  const [active, setActive] = useState(FLOWS[0].name);
  const activeFlow = FLOWS.find((flow) => flow.name === active) ?? FLOWS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {FLOWS.map((flow) => (
          <button
            key={flow.name}
            type="button"
            onClick={() => setActive(flow.name)}
            aria-pressed={flow.name === active}
            className={`${CHIP_CLASS} ${
              flow.name === active
                ? "border-foreground text-foreground"
                : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {flow.name}
          </button>
        ))}
      </div>
      <div className="border border-foreground/10 bg-foreground/[0.02] p-4 sm:p-6">
        <RunDiagram flowName={activeFlow.name} phases={activeFlow.phases} />
      </div>
    </div>
  );
};
