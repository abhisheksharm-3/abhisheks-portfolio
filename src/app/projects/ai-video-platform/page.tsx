"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { projects } from "@/data/projects";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";

/** What the client handed over, as opposed to what got built. */
const TRUSTED = [
  {
    name: "plan migrations",
    detail:
      "moved every eligible monthly and annual customer onto modular pricing, live in stripe. each account got a dry run first, and the batch had a rollback path.",
  },
  {
    name: "releases",
    detail:
      "i promote to main and write the release notes the founder reads. one release carried 57 pull requests across eight product areas.",
  },
  {
    name: "production data",
    detail:
      "migrations and edge functions reach production through me, checked against the live schema rather than the one in the repo.",
  },
  {
    name: "the support queue",
    detail:
      "customer reports come straight to me, and go back with a root cause, a fix, and when it ships.",
  },
];

const BUILT = [
  {
    name: "scriptwriting agents",
    detail:
      "a pipeline that plans a script's spine, drafts from it, and ties every figure to a cited source.",
  },
  {
    name: "ai video editor",
    detail:
      "a render path on remotion and aws lambda, with a browser-side re-encode that took frozen frames to zero.",
  },
  {
    name: "billing",
    detail:
      "modular pricing, sales proposals with their own checkout, ach for large contracts, and pause, refund, and credit flows.",
  },
  {
    name: "social analytics",
    detail:
      "a time series over five networks, recorded on a schedule because the provider only reports lifetime counters.",
  },
  {
    name: "teams",
    detail:
      "seat permissions enforced in the database, log-in-as for admins, and an audit trail of every action taken on someone's behalf.",
  },
  {
    name: "ci",
    detail: "an overhaul to node 24, tests on changed files only, and zero type errors.",
  },
];

const POSTS = [
  {
    slug: "remotion-jpeg-frames-bt601-bt709-color-shift",
    title: "jpeg frames shifted the colour of every render",
  },
  {
    slug: "stripe-pause-release-schedule-before-trial",
    title: "stripe pause: release the schedule before the trial",
  },
  {
    slug: "stripe-ach-subscriptions-settlement-grace-period",
    title: "provisioning stripe subscriptions before ach settles",
  },
];

/** A two-column editorial row: a mono label on the left, content on the right. */
const Row = ({ label, children }: { label: ReactNode; children: ReactNode }) => (
  <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
    <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/35">
      {label}
    </p>
    <div>{children}</div>
  </div>
);

const ItemGrid = ({ items }: { items: { name: string; detail: string }[] }) => (
  <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
    {items.map((item) => (
      <div key={item.name}>
        <p className="mb-3 font-mono text-xs tracking-[0.05em] text-foreground/75">{item.name}</p>
        <p className="text-sm font-light leading-relaxed text-foreground/55">{item.detail}</p>
      </div>
    ))}
  </div>
);

/**
 * The client-work page. The client is unnamed, so the page leads with what was
 * handed over and what it runs at, not with screenshots. A static route, so it
 * takes precedence over /projects/[slug].
 */
const AiVideoPlatformPage = () => {
  const project = projects.find((p) => p.slug === "ai-video-platform");

  if (!project) {
    notFound();
  }

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
            <h1 className="font-serif text-[3.25rem] leading-[0.9] tracking-tight text-foreground sm:text-[6rem] lg:text-[7rem]">
              AI video
              <br />
              platform
            </h1>
            <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-foreground/70 sm:text-3xl">
              Brought in to cover a month of leave. Still running it.
            </p>
          </div>

          <div className="space-y-6 self-end border-t border-foreground/10 pt-6 lg:border-t-0 lg:pt-0">
            <p className="font-mono text-[11px] leading-loose tracking-[0.15em] text-foreground/40">
              200+ paying customers
              <br />
              ~$270k billed a month
              <br />
              in production since june 2026
              <br />
              two engineers
            </p>
            <p className="text-sm font-light leading-relaxed text-foreground/55">
              Client work through Wednesday. The client stays unnamed, so there are no screenshots
              here, only what I was handed and what it runs at.
            </p>
          </div>
        </motion.header>

        <motion.div variants={ITEM_VARIANTS} className="mt-16 mb-20">
          <ProjectDetailMeta project={project} />
        </motion.div>

        <motion.section variants={ITEM_VARIANTS} className="mb-28">
          <Row
            label={
              <>
                what they
                <br />
                trusted me with
              </>
            }
          >
            <p className="mb-12 font-serif text-2xl leading-relaxed text-foreground/85 sm:text-[2rem]">
              The money path, the releases, and the production database.
            </p>
            <ItemGrid items={TRUSTED} />
          </Row>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-28">
          <Row
            label={
              <>
                what i
                <br />
                built
              </>
            }
          >
            <ItemGrid items={BUILT} />
          </Row>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-28">
          <Row
            label={
              <>
                how i
                <br />
                work on it
              </>
            }
          >
            <div className="space-y-8">
              <p className="font-serif text-2xl leading-relaxed text-foreground/85 sm:text-[2rem]">
                <span className="float-left mr-3 mt-2 font-serif text-[4.5rem] leading-[0.7] text-foreground">
                  R
                </span>
                enders came out warmer than the upload. I measured each stage instead of guessing,
                and found seven separate defects.
              </p>
              <p className="max-w-2xl text-sm font-light leading-relaxed text-foreground/55">
                The last one was the frame format: capturing PNG instead of JPEG made the colour
                exact, at 21% more render time and 27% more render cost. The client heard those
                numbers before it shipped, not after.
              </p>
              <p className="max-w-2xl text-sm font-light leading-relaxed text-foreground/55">
                Analytics went the other way. Halfway in, the design turned out to store the same
                lifetime counter again and again, with no usable time series. I closed the open pull
                requests, wrote down the decision, and started over from it.
              </p>
            </div>
          </Row>
        </motion.section>

        <motion.section variants={ITEM_VARIANTS} className="mb-4">
          <Row label="written up">
            <div>
              {POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-foreground/8 py-4 text-sm font-light text-foreground/55 transition-colors duration-200 hover:text-foreground/85"
                >
                  <span>{post.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-foreground/25 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Row>
        </motion.section>

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectDetailMoreProjects />
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default AiVideoPlatformPage;
