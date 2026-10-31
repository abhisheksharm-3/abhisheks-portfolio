/**
 * The resume corpus: every claim worth making, tagged with the lenses it belongs to. The /resume
 * page and scripts/build-resume.mjs both read it, so the web page and the PDFs cannot drift.
 * Built from the private knowledge base (resume-kb) on 2026-10-31: every number traces to Stripe,
 * Jira, the client repositories, Slack, Fathom, or the work journal there. Clients stay unnamed.
 * Each lens carries 6 experience bullets (resumeskills: 3 to 6 per role at entry level) and fills
 * the page with projects (claude-resume-kit page-fill gate).
 */
import type {
  ResumeEntry,
  ResumeLensMeta,
  ResumeProject,
  ResumeRole,
  ResumeSkillGroup,
} from "../lib/types/resume.ts";

export const RESUME_HEADER = {
  name: "Abhishek Sharma",
  phone: "+917340945835",
  email: "abhitiku2003@gmail.com",
  links: [
    { label: "linkedin.com/in/abhisheksan", url: "https://linkedin.com/in/abhisheksan" },
    { label: "github.com/abhisheksharm-3", url: "https://github.com/abhisheksharm-3" },
    { label: "abhisheksan.com", url: "https://www.abhisheksan.com" },
  ],
} as const;

export const RESUME_LENSES: readonly ResumeLensMeta[] = [
  {
    id: "general",
    label: "general",
    summary:
      "the engineer behind a client's ai video platform at ~$200k mrr: analytics, billing, team access, and every release. 746 pull requests merged since june 2026.",
    pdfSummary:
      "Software engineer at Wednesday Solutions (Associate Forward Deployed Engineer), and the engineer behind a client's AI video platform at ~$200K MRR: its analytics, billing, team access, and releases, with 746 PRs merged. Re-architected a US EdTech client's grading platform on Spring Boot and AWS, and build LLM agents.",
  },
  {
    id: "fde",
    label: "forward deployed",
    summary:
      "i work directly with client founders, on the calls where pricing gets decided and in the production systems where it has to work, and i write the release notes they read.",
    pdfSummary:
      "Associate Forward Deployed Engineer at Wednesday Solutions, working directly with client founders. The engineer behind a client's AI video platform at ~$200K MRR and 170+ paying customers: analytics, billing, team access, and releases, from pricing calls to production fixes. Rebuilt and handed over a US EdTech client's grading platform.",
  },
  {
    id: "fullstack",
    label: "full stack",
    summary:
      "postgres to the pixel: migrations, edge functions, queues, react, and the aws underneath them.",
    pdfSummary:
      "Full-stack engineer at Wednesday Solutions (Associate Forward Deployed Engineer). Build across a client's AI video platform at ~$200K MRR on React, Supabase, and Stripe: analytics, billing, checkout, and team access. Re-architected a US EdTech client's grading platform: a Spring Boot API with 105 endpoints and a React frontend.",
  },
];

export const RESUME_EXPERIENCE: readonly ResumeRole[] = [
  {
    company: "Wednesday Solutions",
    title: "Associate Forward Deployed Engineer",
    location: "Pune, IN",
    period: "Feb. 2026 -- Present",
    lenses: ["general", "fde", "fullstack"],
    engagements: [
      {
        name: "AI video platform, US client",
        period: "Jun. 2026 -- Present",
        stack: "React, Supabase, Stripe, AWS Lambda, Python",
        bullets: [
          {
            text: "Own Stripe billing for the platform at ~$200K MRR and 170+ paying customers; rebuilt its pricing into modular plans in 8 days, and revenue from existing customers then rose 35% with new customers up from 11.3 to 12.6 a month.",
            lenses: ["general", "fde", "fullstack"],
          },
          {
            text: "Built a sales checkout for the platform in React on 10+ edge functions, where the prospect pays through Stripe Checkout before any account exists; 71% of quoted prospects paid, at a median of 12 minutes from quote to payment.",
            lenses: ["fde", "fullstack"],
          },
          {
            text: "Changed 2 pricing and access policies on live calls with the platform's founders, and caught a plan migration that would have cut every migrating user's AI allowance by 9% before it reached a single customer.",
            lenses: ["fde"],
          },
          {
            text: "Fixed a renewal bug on the platform that left a 24-seat paying team with 0 AI tokens, restored all 240,000 tokens the same night, and added a guard that fails loudly on any zero grant, with an RCA for the client.",
            lenses: ["fde"],
          },
          {
            text: "Merged 746 PRs across 4 repos of the platform in 4.5 months and ran its 42 production releases to 170+ paying customers, checking every database migration against the live schema before it shipped.",
            lenses: ["general"],
          },
          {
            text: "Cut a team insights query for a 100-advisor firm on the platform from 58s to 0.07s, well under its 8s database timeout, and cut each analytics page load for the firm's team admins from 7 database calls to 1.",
            lenses: ["general"],
          },
          {
            text: "Cut frozen frames in the platform's exported videos from 23.42% to 0.00% by re-encoding each upload in the browser before render, for every edited video it renders for its 170+ paying customers.",
            lenses: ["general"],
          },
          {
            text: "Built social analytics and AI coaching across 5 social networks for the client on an append-only Postgres archive with React and TanStack Query pages, and closed 32 analytics stories in 5 weeks.",
            lenses: ["fullstack"],
          },
          {
            text: "Took the platform's React and TypeScript codebase from 712 type errors to 0 across 46 PRs; CI now fails on any new error, and each PR runs only the tests its change touches, behind an 80% patch coverage gate.",
            lenses: ["fullstack"],
          },
          {
            text: "Migrated 55 live subscriptions on the platform to modular plans with a dry-run-first script and grandfather coupons built to hold each old price, and checked each of the 30 annual accounts line by line.",
            lenses: [],
          },
          {
            text: "Enabled ACH bank debit for the client's $5K+/month contracts 8 days after inheriting the codebase, with a 2-month grace period for failed payments; now live on 11 subscriptions worth ~$39K a month.",
            lenses: [],
          },
          {
            text: "Closed a privilege escalation on the platform that let any signed-in user make themselves super-admin, locked org billing columns behind triggers, and verified each fix with SQL checks across 7 roles.",
            lenses: ["fullstack"],
          },
          {
            text: "Enabled row-level security on 23 exposed tables in the platform's production Postgres within one sprint, writing per-role policies so every user, team admin, and staff role reads and writes only its own rows.",
            lenses: [],
          },
          {
            text: "Found and closed 1,167 AI generation requests stuck in processing across 139 users of the platform, and added a daily job that expires any request still processing past its timeout window.",
            lenses: [],
          },
          {
            text: "Built 30-day renewal reminder emails for every annual subscriber of the platform, replacing a one-off send to the next 30 accounts with a daily job that finds each renewal as it comes due.",
            lenses: [],
          },
          {
            text: "Fixed a nightly profile cleanup that had aborted 14 nights in a row on a single stale record; it now branches on the provider's error code and recovers per user, ending charges for lapsed social profiles.",
            lenses: [],
          },
          {
            text: "Ran 42 production releases of the platform and wrote the founders' release notes for 13 of them in 12 weeks, each tied to its ticket, plus sprint sign-off reports.",
            lenses: [],
          },
          {
            text: "Cut feature-PR CI on the platform from 48 minutes to under 5 with a sharded test suite that runs only the tests a change touches, with type checks and secret scans on every push.",
            lenses: [],
          },
        ],
      },
      {
        name: "Grading platform, US EdTech client",
        period: "Feb. 2026 -- May 2026",
        stack: "Spring Boot, React, AWS, Terraform",
        bullets: [
          {
            text: "Re-architected the client's multi-tenant grading platform on Spring Boot and Java 21, with 105 REST endpoints and tenant isolation in Postgres row-level security on 20 tables that fails closed.",
            lenses: ["general", "fullstack"],
          },
          {
            text: "Connected Moodle and self-hosted Canvas, which has no webhooks, to the platform: submissions in and grades back through 5 SQS queues with backoff retries and dead-letter queues.",
            lenses: ["fde"],
          },
          {
            text: "Load-tested the client's grading API with k6 at 151 virtual users and 100 graders at once on a single 1 vCPU, 2 GB Fargate task: grader p95 held at 1.82s under its 2s budget, with zero 5xx responses.",
            lenses: [],
          },
          {
            text: "Provisioned the client's AWS stack alone in Terraform across 3 environments and 121 resources: ECS Fargate, RDS Postgres, encrypted Redis, Cognito, 5 SQS queues with dead-letter queues, and 20 alarms.",
            lenses: ["general"],
          },
          {
            text: "Led the client's React grading frontend, 339 of 496 commits: in-browser PDF annotation burned into the file and passed back to the LMS, plus 3 admin tiers; the client called the new UI a major plus.",
            lenses: [],
          },
          {
            text: "Wrote the handover for the client's 3-repo grading platform, with every API endpoint, queue, job, and migration and its known risks, plus a 6-step Canvas guide the client's admins used to connect.",
            lenses: [],
          },
        ],
      },
      {
        name: "Internal products",
        period: "May 2026 -- Jun. 2026",
        stack: "FastAPI, LangGraph, Postgres",
        bullets: [
          {
            text: "Built a content engine alone in FastAPI and LangGraph: 26 AI agents that research, draft, and publish articles as GitHub PRs, with human review on Postgres checkpoints, and demoed it to the CEO.",
            lenses: ["fde"],
          },
          {
            text: "Built an autonomous content engine for Wednesday alone in FastAPI and LangGraph: 26 agents that research, draft, and publish articles as GitHub PRs, with human review on Postgres checkpoints, demoed to the CEO.",
            lenses: [],
          },
          {
            text: "Traced the loss of 247 of 249 indexed articles in 2 weeks to same-day batch publishing of near-identical pages, and gated the new engine on a validation score plus Python checks no model score can override.",
            lenses: [],
          },
          {
            text: "Prototyped hands-free voice mode for an offline on-device AI assistant in 1 week: 6 swappable TTS engines, sentence-by-sentence synthesis, and barge-in on hardware echo cancellation for iOS and Android.",
            lenses: [],
          },
          {
            text: "Contributed hook-enforced QA gates to the company's AI engineering toolkit across 3 merged PRs: spec-against-evidence checks, edge-case profiles, and a plugin manifest fix that unblocked installs for the team.",
            lenses: [],
          },
        ],
      },
    ],
  },
  {
    company: "Stardom",
    title: "Software Development Intern",
    location: "Remote",
    period: "Jan. 2025 -- Jun. 2025",
    lenses: [],
    engagements: [
      {
        name: "Company web platform",
        period: "Jan. 2025 -- Jun. 2025",
        stack: "Next.js, Appwrite, React Query, Netlify",
        bullets: [
          {
            text: "Built and deployed the company's first web platform with a custom CMS in 6 months, with automated Netlify deploys on every merge.",
            lenses: [],
          },
        ],
      },
    ],
  },
];

export const RESUME_PROJECTS: readonly ResumeProject[] = [
  {
    slug: "polaris",
    stack: "Claude Code, Bash, JavaScript",
    period: "May 2026 -- Present",
    lenses: ["general", "fde"],
    bullets: [
      {
        text: "Built Polaris, a Claude Code plugin that routes plain-language tasks into 27 gated flows across 29 agents, shipped over 12 releases to v1.19.0 and used daily on client work in production.",
        lenses: ["general", "fde"],
        status: "in-progress",
      },
      {
        text: "Enforced phase completion in Polaris with an on-disk ledger and artifact hashes, cut session startup from 19s to 0.4s, and raised correct routing from 8 of 21 domain prompts to 21 of 21, pinned by fixtures.",
        lenses: ["general", "fde"],
      },
    ],
  },
  {
    slug: "flockr",
    stack: "Kotlin, Jetpack Compose, Supabase",
    period: "Nov. 2025 -- Present",
    lenses: ["general", "fullstack"],
    bullets: [
      {
        text: "Built Flockr alone, an Android shared-home ledger in Kotlin and Jetpack Compose on Supabase, shipped over 22 releases to v2.0.0, with Postgres triggers that reject any unbalanced ledger write from any client.",
        lenses: ["general", "fullstack"],
      },
      {
        text: "Found 22 database functions in Flockr with no membership check and authorized each one before v2.0.0, and moved split remainders to cent allocation in 1 shared function in place of 3 copies that had drifted apart.",
        lenses: ["general"],
      },
    ],
  },
  {
    slug: "inquora",
    stack: "Next.js, TypeScript, Supabase, pgvector",
    period: "Jul. 2025 -- Present",
    lenses: ["fde", "fullstack"],
    bullets: [
      {
        text: "Built Inquora alone, a cited document Q&A app on Supabase with pgvector and full-text search fused in 1 SQL function across 35 migrations, and cut a repository index from 2,664 to 711 chunks with the same coverage.",
        lenses: ["fde", "fullstack"],
      },
      {
        text: "Took Inquora from a broken deploy to live retrieval in 1 day: the send path cut from 6 roundtrips to 1, a Postgres ingest queue that retries on crash, and CI that blocks a merge on 5 checks from lint to build.",
        lenses: ["fullstack"],
      },
    ],
  },
  {
    slug: "quickgist",
    stack: "Go, React, PostgreSQL",
    period: "Aug. 2024 -- Nov. 2024",
    lenses: [],
    bullets: [
      {
        text: "Built a Go and React paste service with authorization in Postgres row-level security across 11 migrations, server-rendered previews cached by renderer version, and 60-bit unlisted slugs, live on Render and Vercel.",
        lenses: [],
      },
    ],
  },
];

export const RESUME_ACHIEVEMENTS: readonly ResumeEntry[] = [
  {
    title: "Gen AI Exchange Hackathon by Google",
    detail: "Winner",
    note: "Network18 Track",
    period: "October 2024",
    url: "https://verifiedbycredify.vercel.app",
    lenses: ["general", "fde", "fullstack"],
    bullets: [
      {
        text: "Led a 3-person team to the Network18 track win at Google's Gen AI Exchange Hackathon with Credify, a media attribution and forgery detection system built in 1 month on Next.js and FastAPI with Gemini.",
        lenses: ["general", "fde", "fullstack"],
      },
    ],
  },
  {
    title: "How I Know When My Own Tooling Is Lying",
    detail: "Company-wide talk",
    note: "Wednesday Solutions",
    period: "Aug. 2026",
    lenses: [],
    bullets: [
      {
        text: "Gave a company-wide talk on how to verify AI-generated work, built on 4 rules (hash-checked done states, self-blocking gates, logged refutations, production dry runs), with every slide figure checked against source.",
        lenses: [],
      },
    ],
  },
  {
    title: "Tata Imagination Challenge 2024",
    detail: "National semi-finalist",
    note: "Student track",
    period: "Jan. 2025",
    lenses: [],
    bullets: [],
  },
  {
    title: "Smart India Hackathon",
    detail: "Internal round winner",
    note: "AICTE problem statement",
    period: "Sep. 2024",
    lenses: [],
    bullets: [
      {
        text: "Proposed a paperless scholarship disbursement system for PMSSS and built the prototype on Next.js parallel routes.",
        lenses: [],
      },
    ],
  },
  {
    title: "17 engineering posts",
    detail: "Production write-ups on Stripe, Remotion, LangGraph, and SQS",
    period: "2026",
    url: "https://www.abhisheksan.com/writing",
    lenses: [],
    bullets: [],
  },
  {
    title: "AODV-PROPT: an AODV-based routing protocol",
    detail: "Published in IJNRD",
    period: "2025",
    url: "http://doi.one/10.1729/Journal.40670",
    lenses: [],
    bullets: [],
  },
  {
    title: "Meta Front-End Developer certificate",
    detail: "Meta on Coursera",
    period: "Jun. 2023",
    lenses: [],
    bullets: [],
  },
];

export const RESUME_EDUCATION = {
  school: "Chandigarh College of Engineering & Technology",
  location: "Chandigarh, IN",
  degree: "Bachelor's of Engineering in Computer Science & Engineering; CGPA: 8.31",
  period: "Dec. 2021 -- Jun. 2025",
} as const;

export const RESUME_SKILLS: readonly ResumeSkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "Python", "Java", "SQL", "JavaScript", "Go", "Kotlin", "C/C++"],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "TanStack Query", "TailwindCSS", "Redux Toolkit"],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "Backend",
    items: ["Spring Boot (Java)", "FastAPI", "REST", "SSE", "Node.js", "Express.js"],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "AI & Agents",
    items: ["LangGraph", "MCP", "LiteLLM", "Gemini", "LangChain", "Pinecone"],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Supabase", "Redis", "MySQL", "MongoDB", "Neo4j"],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (ECS, SQS, RDS, Lambda, Cognito, CloudFront, CloudWatch, IAM, S3, SES)",
      "Terraform",
      "Docker",
      "CI/CD",
    ],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "Platform & Tooling",
    items: [
      "Stripe Billing",
      "k6",
      "Sentry",
      "Git",
      "Event-Driven Architecture",
      "Linux/Unix",
      "Mixpanel",
    ],
    lenses: ["general", "fde", "fullstack"],
  },
  {
    label: "Mobile",
    items: ["Jetpack Compose", "React Native"],
    lenses: ["general", "fde", "fullstack"],
  },
];
