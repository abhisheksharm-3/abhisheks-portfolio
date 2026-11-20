import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { CopyCommand } from "@/components/sections/projects/CopyCommand";
import { FigureGrid, type FigureTileType } from "@/components/sections/projects/FigureTile";
import { MarginNotes } from "@/components/sections/projects/MarginNotes";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { SharedElement } from "@/components/shared/SharedElement";
import { projects } from "@/data/projects";
import { SECONDARY_BUTTON } from "@/lib/ui/button-classes";
import { FlowPicker } from "./FlowPicker";

const REPO_URL = "https://github.com/abhisheksharm-3/polaris";
const INSTALL = "/plugin marketplace add abhisheksharm-3/polaris\n/plugin install polaris";

/** What ships in 1.19.0, counted from the repo. */
const COUNTS = [
  { figure: "27", label: "flows" },
  { figure: "31", label: "commands" },
  { figure: "29", label: "agents" },
  { figure: "15", label: "hooks" },
] as const;

/**
 * An illustrative run of the feature flow for a change that touches the api and the data but no
 * ui, so the experience phase is skipped as 1.19.0 does. `done` and `now` mark how far it got.
 */
const EXAMPLE_RUN = [
  { phase: "spec", state: "done" },
  { phase: "experience", state: "skipped", note: "no ui surface" },
  { phase: "contract", state: "done" },
  { phase: "schema", state: "done" },
  { phase: "threat-model", state: "now" },
  { phase: "design", state: "next" },
  { phase: "build", state: "next" },
  { phase: "ship", state: "next" },
] as const;

const RUN_MARK = { done: "✓", skipped: "–", now: "●", next: "○" } as const;

const GUARDS = [
  {
    name: "guard-phase",
    detail:
      "refuses a dispatch the current phase does not name, and one below the agent's model floor.",
  },
  {
    name: "guard-command",
    detail: "refuses a phase command whose predecessor has not been earned.",
  },
  {
    name: "advance-flow",
    detail: "blocks the end of a turn to ask for the phase or the approval it waits on.",
  },
  {
    name: "guard-tests",
    detail:
      "refuses removing an assertion, adding a skip, or rewriting a test through the shell, unless a waiver is logged.",
  },
  {
    name: "guard-bypass",
    detail:
      "refuses skipping hooks or ci, quoted flags and bash -c included. a speed bump; branch protection is the wall.",
  },
  {
    name: "the artifact",
    detail:
      "a phase is done only with its artifact on disk and its hash matching, not because the agent says so.",
  },
] as const;

/** The 1.18 and 1.19 changes, from the changelog. */
const LATELY: FigureTileType[] = [
  {
    figure: "0.4s → 0.01s",
    label: "routing every prompt",
    name: "a faster router",
    detail:
      "one jq pass instead of a grep per pattern; a 160 kb pasted log went from over two minutes to 15 ms.",
  },
  {
    figure: "27",
    label: "flows, six of them new",
    name: "flows follow the change",
    detail:
      "a spec declares its surfaces, so a backend change no longer stops for ux, and the ledger records the skip.",
  },
  {
    figure: "28",
    label: "agents at most, down from 40",
    name: "a smaller verify",
    detail: "two rounds and two lenses; a split vote is reported instead of dropped.",
  },
  {
    figure: "38",
    label: "sources behind the testing rules",
    name: "testing with judgment",
    detail:
      "name the break before writing a test, prefer a type to a test, prove each test fails, delete change detectors.",
  },
  {
    figure: "10",
    label: "questions in the patch test",
    name: "root cause, for every issue",
    detail:
      "fix phases ask for the cause and its class, and guard-tests stops a weakened test in code.",
  },
  {
    figure: "5",
    label: "phases in the design flow",
    name: "design, first-class",
    detail:
      "direction, build, critique, polish, gate, with DESIGN.md as the contract and every ui rendered before it's done.",
  },
];

/**
 * The Polaris project page: a run panel beside the title, the counts, the problem, an
 * interactive flow diagram, the guards, what changed lately, the companion plugin, and the
 * install. Written against 1.19.0. A static route, so it takes precedence over /projects/[slug].
 */
const PolarisPage = () => {
  const project = projects.find((p) => p.slug === "polaris");
  if (!project) notFound();

  return (
    <AppShell>
      <div className="relative overflow-hidden px-6 pt-36 pb-28 sm:px-10 lg:px-24">
        <ProjectsPageBackground />

        <div className="relative z-10 mb-12">
          <Link
            href="/projects"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-2 text-xs text-foreground/60 transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-1" />
            back to projects
          </Link>
        </div>

        <header className="relative z-10 grid grid-cols-1 items-stretch gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-14">
          <div className="flex flex-col justify-end gap-6">
            <span className="font-mono text-[11px] text-foreground/60">
              ai &amp; agents · v1.19.0, oct 2026 · open source
            </span>
            <SharedElement name="project-title-polaris">
              <h1 className="font-serif text-6xl leading-none text-foreground sm:text-7xl lg:text-8xl">
                polaris
              </h1>
            </SharedElement>
            <p className="max-w-xl font-serif text-2xl italic leading-snug text-foreground/70">
              a project operating system for claude code: one quality bar from a rough idea to
              production, enforced by hooks instead of asked for. it holds its own author to it too.
            </p>
            <div className="flex flex-wrap gap-3">
              <CopyCommand command={INSTALL} label="copy install" />
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${SECONDARY_BUTTON}`}
              >
                view source
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <figure className="flex aspect-[4/5] flex-col gap-2.5 md:aspect-auto md:min-h-[26rem] overflow-hidden border border-foreground/10 bg-foreground/[0.04] p-6 font-mono text-xs sm:p-8">
            <figcaption className="text-[11px] text-foreground/60">an example run</figcaption>
            <p className="mt-4 text-foreground">› add stripe ach to checkout</p>
            <p className="text-foreground/60">&nbsp;&nbsp;routed → feature · surfaces: api, data</p>
            <ol className="mt-2 flex flex-col gap-2">
              {EXAMPLE_RUN.map((step) => (
                <li
                  key={step.phase}
                  className={
                    step.state === "done" || step.state === "now"
                      ? "text-foreground"
                      : "text-foreground/60"
                  }
                >
                  &nbsp;&nbsp;{RUN_MARK[step.state]} {step.phase}
                  {"note" in step && (
                    <span className="text-foreground/60">, skipped: {step.note}</span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-auto text-foreground/60">
              &nbsp;&nbsp;each phase ends on a gate and an artifact on disk
            </p>
          </figure>
        </header>

        <dl className="relative z-10 mt-14 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
          {COUNTS.map(({ figure, label }) => (
            <div key={label} className="border-t border-foreground/10 pt-4">
              <dd className="font-serif text-5xl leading-none text-foreground sm:text-6xl">
                {figure}
              </dd>
              <dt className="mt-2 font-mono text-[11px] text-foreground/60">{label}</dt>
            </div>
          ))}
        </dl>

        <div className="relative z-10 mt-14 mb-20">
          <ProjectDetailMeta project={project} />
        </div>

        <div className="relative z-10 space-y-24">
          <ContentBlock label="the problem it solves">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
              <p className="font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
                an agent left alone drifts two ways: it writes fifty lines where one would do, and
                prose full of the tells of a machine.
              </p>
              <p className="text-sm font-light leading-relaxed text-foreground/70">
                polaris fixes both with one standard and the machinery to enforce it. a gate runs a
                deterministic pass plus a judgment pass and reports pass or fail with file and line.
                agents call it before they are allowed to say they are done.
              </p>
            </div>
          </ContentBlock>

          <ContentBlock label="how a run works" note="pick a flow to redraw it">
            <p className="mb-8 max-w-2xl text-sm font-light leading-relaxed text-foreground/70">
              you never type a flow name. describe the work; a hook classifies it, opens a run, and
              says which flow it chose.
            </p>
            <FlowPicker />
          </ContentBlock>

          <ContentBlock label="what holds the line" note="hooks, not instructions">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {GUARDS.map((guard) => (
                <li
                  key={guard.name}
                  className="flex flex-col gap-2 border-t border-foreground/10 pt-4"
                >
                  <span className="font-mono text-xs text-foreground">{guard.name}</span>
                  <span className="text-sm font-light leading-relaxed text-foreground/70">
                    {guard.detail}
                  </span>
                </li>
              ))}
            </ul>
          </ContentBlock>

          <ContentBlock label="lately" note="1.18 and 1.19, sep to oct 2026">
            <FigureGrid items={LATELY} />
          </ContentBlock>

          <ContentBlock label="and for the rest of the day">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
              <p className="font-serif text-2xl leading-snug text-foreground/90">
                polaris-work, a companion plugin: a dated briefing across every work source, a daily
                journal, okr pace, and a manager 1:1 prepared from state it already has.
              </p>
              <p className="text-sm font-light leading-relaxed text-foreground/70">
                it ships in the same repo, with its own off switch.
              </p>
            </div>
          </ContentBlock>

          <ContentBlock label="install">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
              <pre className="overflow-x-auto border border-foreground/10 bg-foreground/[0.03] px-5 py-4 font-mono text-xs leading-relaxed text-foreground/80">
                {INSTALL}
              </pre>
              <p className="text-sm font-light leading-relaxed text-foreground/70">
                then run <span className="font-mono text-xs">/init</span> once at a project root.
                the interview asks how the standard should apply there and writes a config every
                agent and hook reads, so one engine enforces a different profile per project.
              </p>
            </div>
          </ContentBlock>

          {project.notes && (
            <ContentBlock label="notes from building it">
              <MarginNotes notes={project.notes} />
            </ContentBlock>
          )}
        </div>

        <ProjectDetailMoreProjects slug={project.slug} />
      </div>
    </AppShell>
  );
};

export default PolarisPage;
