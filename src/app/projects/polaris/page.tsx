"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { projects } from "@/data/projects";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";
import { RunDiagram } from "./RunDiagram";

/** Every flow in rules/flows.json, with the phases it runs in order. */
const FLOWS: { name: string; phases: string[] }[] = [
  { name: "feature", phases: ["spec", "design", "build", "ship"] },
  { name: "foggy", phases: ["recon", "spec", "design", "build", "ship"] },
  { name: "bug", phases: ["reproduce", "rootcause", "fix", "verify", "ship"] },
  { name: "incident", phases: ["mitigate", "rootcause", "prevent", "notes"] },
  { name: "audit", phases: ["audit", "triage", "fix", "verify"] },
  { name: "security", phases: ["threat-model", "harden", "verify"] },
  { name: "modernize", phases: ["survey", "upgrade", "qa", "ship"] },
  { name: "release", phases: ["gate", "notes", "release"] },
  { name: "qa", phases: ["break", "fix", "verify"] },
  { name: "cleanup", phases: ["cleanup", "gate", "ship"] },
  { name: "docs", phases: ["drift", "write", "gate"] },
  { name: "review", phases: ["review", "verify"] },
  { name: "fix", phases: ["implement", "gate", "ship"] },
  { name: "spike", phases: ["spike", "decide"] },
  { name: "trivial", phases: ["edit", "gate"] },
  { name: "research", phases: ["research"] },
  { name: "context", phases: ["catchup"] },
  { name: "conversation", phases: [] },
];

const GUARDS = [
  {
    name: "guard-phase",
    detail:
      "refuses a dispatch the current phase does not name, and refuses one below the agent's model floor.",
  },
  {
    name: "guard-command",
    detail: "refuses a phase command whose predecessor has not been earned.",
  },
  {
    name: "advance-flow",
    detail:
      "blocks the end of a turn to ask for the phase or the approval it waits on, once per transition.",
  },
  {
    name: "the artifact",
    detail:
      "a phase is done only with its artifact on disk and its hash matching, not because the agent says so.",
  },
];

/**
 * The dedicated Polaris project page. A static route, so it takes precedence
 * over /projects/[slug] and every other project keeps the shared detail layout.
 */
const PolarisPage = () => {
  const project = projects.find((p) => p.slug === "polaris");
  const [active, setActive] = useState(FLOWS[0].name);

  if (!project) {
    notFound();
  }

  const activeFlow = FLOWS.find((flow) => flow.name === active) ?? FLOWS[0];

  return (
    <AppShell>
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden pt-36 pb-28 px-6 sm:px-10 lg:px-24"
      >
        <ProjectsPageBackground />

        <motion.div variants={ITEM_VARIANTS} className="mb-14">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs text-foreground/40 transition-colors duration-200 hover:text-foreground/70"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            back to projects
          </Link>
        </motion.div>

        <motion.header
          variants={ITEM_VARIANTS}
          className="grid gap-x-14 gap-y-10 lg:grid-cols-[1.6fr_1fr]"
        >
          <div>
            <h1 className="font-serif text-[4rem] leading-[0.85] tracking-tight text-foreground sm:text-[7rem] lg:text-[8.5rem]">
              Polaris
            </h1>
            <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-foreground/70 sm:text-3xl">
              A project operating system for Claude&nbsp;Code.
            </p>
          </div>

          <div className="space-y-6 self-end border-t border-foreground/10 pt-6 lg:border-t-0 lg:pt-0">
            <p className="font-mono text-[11px] leading-loose tracking-[0.15em] text-foreground/40">
              eighteen flows
              <br />
              thirty-one commands
              <br />
              twenty-seven agents
              <br />
              thirteen hooks
            </p>
            <p className="text-sm font-light leading-relaxed text-foreground/55">
              It holds itself to the bar it holds you to.
            </p>
            <a
              href="https://github.com/abhisheksharm-3/polaris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-light text-foreground/70 underline underline-offset-4 transition-colors duration-200 hover:text-foreground"
            >
              view source
            </a>
          </div>
        </motion.header>

        <motion.div variants={ITEM_VARIANTS} className="mt-16 mb-20">
          <ProjectDetailMeta project={project} />
        </motion.div>

        <motion.section variants={ITEM_VARIANTS} className="mb-24">
          <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[1fr_1.4fr]">
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/35">
              install
            </p>
            <div className="space-y-6">
              <pre className="overflow-x-auto border border-foreground/10 bg-foreground/[0.03] px-5 py-4 font-mono text-xs leading-relaxed text-foreground/70">
                {`/plugin marketplace add abhisheksharm-3/polaris
/plugin install polaris`}
              </pre>
              <p className="max-w-2xl text-sm font-light leading-relaxed text-foreground/55">
                Then run <span className="font-mono text-xs">/init</span> once
                at a project root. The interview asks how the standard should
                apply here and writes a config every agent and hook reads, so
                one engine enforces a different profile per project.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-28">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/35">
              the problem
              <br />
              it solves
            </p>

            <div>
              <p className="font-serif text-2xl leading-relaxed text-foreground/85 sm:text-[2rem]">
                <span className="float-left mr-3 mt-2 font-serif text-[4.5rem] leading-[0.7] text-foreground">
                  A
                </span>
                n agent left alone drifts two ways. It over-builds, writing
                fifty lines where one would do. And it writes prose full of the
                tells that mark it as machine-generated.
              </p>
              <p className="mt-8 max-w-2xl text-sm font-light leading-relaxed text-foreground/55">
                Polaris fixes both with one standard and the machinery to
                enforce it. A gate runs a deterministic pass plus a judgment
                pass and reports pass or fail with file and line. Agents call it
                before they are allowed to say they are done.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-28">
          <div className="mb-12 grid gap-x-14 gap-y-6 lg:grid-cols-[1fr_1.4fr]">
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/35">
              how a run
              <br />
              works
            </p>
            <div>
              <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                You never type <span className="italic">a flow name</span>
              </h2>
              <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-foreground/55">
                Describe the work. A hook classifies it, opens a run, and says
                which flow it chose. Pick one below to redraw the phases it
                runs.
              </p>
            </div>
          </div>

          <div className="mb-14 flex flex-wrap gap-x-6 gap-y-3">
            {FLOWS.map((flow) => (
              <button
                key={flow.name}
                type="button"
                onClick={() => setActive(flow.name)}
                aria-pressed={flow.name === active}
                className={`font-mono text-xs tracking-[0.05em] transition-colors duration-200 ${
                  flow.name === active
                    ? "text-foreground"
                    : "text-foreground/30 hover:text-foreground/60"
                }`}
              >
                {flow.name}
              </button>
            ))}
          </div>

          <div className="border-t border-foreground/8 pt-12">
            <RunDiagram flowName={activeFlow.name} phases={activeFlow.phases} />
          </div>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-4">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/35">
              what holds
              <br />
              the line
            </p>

            <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
              {GUARDS.map((guard) => (
                <div key={guard.name}>
                  <p className="mb-3 font-mono text-xs tracking-[0.05em] text-foreground/75">
                    {guard.name}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-foreground/55">
                    {guard.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectDetailMoreProjects />
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default PolarisPage;
