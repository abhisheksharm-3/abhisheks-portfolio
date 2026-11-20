import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { FigureGrid, type FigureTileType } from "@/components/sections/projects/FigureTile";
import { MarginNotes } from "@/components/sections/projects/MarginNotes";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { SharedElement } from "@/components/shared/SharedElement";
import { PostCover } from "@/components/writing/PostCover";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/content/loader";

/** What it runs at, on the hero panel. */
const SCALE = [
  { figure: "170+", label: "paying customers" },
  { figure: "~$200k", label: "a month through billing" },
  { figure: "2", label: "engineers on it" },
] as const;

/** What the client handed over, as opposed to what got built. */
const TRUSTED: FigureTileType[] = [
  {
    figure: "55",
    label: "live subscriptions moved",
    name: "plan migrations",
    detail:
      "monthly and annual, onto modular pricing with a dry-run-first script and grandfather coupons that hold each old price. every annual account checked line by line.",
  },
  {
    figure: "42",
    label: "production releases since june",
    name: "releases",
    detail: "i promote to main and write the release notes the founders read.",
  },
  {
    figure: "live",
    label: "schema, not the repo's",
    name: "production data",
    detail:
      "migrations and edge functions reach production through me, checked against what's running.",
  },
  {
    figure: "68",
    label: "fixes in four months",
    name: "the support queue",
    detail:
      "customer reports come straight to me and go back with a root cause, a fix, and when it ships.",
  },
];

const BUILT: FigureTileType[] = [
  {
    figure: "+35%",
    label: "revenue from existing customers",
    name: "billing",
    detail:
      "pricing rebuilt into modular plans in 8 days, plus ach for large contracts, and pause, refund, and credit flows.",
  },
  {
    figure: "71%",
    label: "of quoted prospects paid",
    name: "checkout configurator",
    detail: "sales builds a proposal; the buyer pays through it at a median of 12 minutes.",
  },
  {
    figure: "5",
    label: "networks, one archive",
    name: "social analytics",
    detail:
      "built alone from scratch: a time series recorded on a schedule, because the provider only reports lifetime counters.",
  },
  {
    figure: "0.00%",
    label: "frozen frames, from 23.42%",
    name: "render fixes",
    detail:
      "the editor is a teammate's; i own what feeds its lambda render. a browser-side re-encode fixed the frames.",
  },
  {
    figure: "712 → 0",
    label: "type errors, across 46 prs",
    name: "ci",
    detail: "tests on changed files only, and feature-pr ci from 48 minutes to under 5.",
  },
  {
    figure: "1",
    label: "postgres rule for every seat",
    name: "teams",
    detail:
      "co-built with a teammate: the database, edge functions, and ui all read the same permission, with an audit trail of every action taken on someone's behalf.",
  },
];

const POST_SLUGS = [
  "remotion-jpeg-frames-bt601-bt709-color-shift",
  "stripe-pause-release-schedule-before-trial",
  "stripe-ach-subscriptions-settlement-grace-period",
] as const;

/**
 * The client-work page. The client is unnamed, so it opens on what the platform runs at instead
 * of screenshots, then puts every claim beside its number. A static route, so it takes precedence
 * over /projects/[slug].
 */
const AiVideoPlatformPage = async () => {
  const project = projects.find((p) => p.slug === "ai-video-platform");
  if (!project) notFound();

  const posts = await getAllPosts();
  const writtenUp = POST_SLUGS.flatMap((slug) => posts.filter((post) => post.slug === slug));

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
              client work · since june 2026
            </span>
            <SharedElement name="project-title-ai-video-platform">
              <h1 className="font-serif text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
                an ai video platform, for a us client
              </h1>
            </SharedElement>
            <p className="max-w-xl font-serif text-2xl italic leading-snug text-foreground/70">
              i own its billing, built its checkout and analytics, and ship every release.
            </p>
          </div>
          <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.04] p-6 sm:p-8">
            <span aria-hidden="true" className="drift-light" />
            <span className="relative font-mono text-[11px] text-foreground/60">
              what it runs at
            </span>
            <dl className="relative flex flex-col gap-6">
              {SCALE.map(({ figure, label }) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-serif text-5xl leading-none text-foreground sm:text-6xl">
                      {figure}
                    </span>
                    <span className="mt-2 block font-mono text-[11px] text-foreground/60">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="relative z-10 mt-16 mb-20">
          <ProjectDetailMeta project={project} />
        </div>

        <div className="relative z-10 space-y-24">
          <ContentBlock
            label="what they trusted me with"
            note="the money path, the releases, the production database"
          >
            <FigureGrid items={TRUSTED} columns={4} />
          </ContentBlock>

          <ContentBlock label="what i built">
            <FigureGrid items={BUILT} />
          </ContentBlock>

          <ContentBlock label="how i work on it">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
              <p className="font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
                renders came out warmer than the upload. i measured each stage instead of guessing,
                and found seven separate defects.
              </p>
              <div className="space-y-5 text-sm font-light leading-relaxed text-foreground/70">
                <p>
                  the last one was the frame format: capturing png instead of jpeg made the colour
                  exact, at 21% more render time and 27% more render cost. the acceptance test was a
                  re-render of a real customer video.
                </p>
                <p>
                  analytics went the other way. the old design stored the same lifetime counter
                  again and again: 10,254 rows over six months and no usable time series. i wrote
                  down the decision and rebuilt it as an append-only archive.
                </p>
              </div>
            </div>
          </ContentBlock>

          {project.notes && (
            <ContentBlock label="notes from building it">
              <MarginNotes notes={project.notes} />
            </ContentBlock>
          )}

          {writtenUp.length > 0 && (
            <ContentBlock label="written up">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {writtenUp.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/writing/${post.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="group block"
                    >
                      <PostCover post={post} />
                    </Link>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          )}
        </div>

        <ProjectDetailMoreProjects slug={project.slug} />
      </div>
    </AppShell>
  );
};

export default AiVideoPlatformPage;
