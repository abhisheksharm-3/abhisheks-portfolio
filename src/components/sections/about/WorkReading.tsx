import Image from "next/image";
import Link from "next/link";
import { GitHubActivity } from "@/components/sections/about/GitHubActivity";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { ProjectVisual } from "@/components/shared/ProjectVisual";
import { HOW_I_WORK, PATH, SHIPPED_IN, STACK } from "@/data/about";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/content/loader";
import { toSince } from "@/lib/project-dates";
import type { ProjectType } from "@/lib/types/components";

const caseProject = projects.find((project) => project.caseFile);
const current = projects.filter((project) => project.isBuilding && !project.caseFile);
const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

/**
 * The one client project told in full: what i own on it, row by row, each beside the figure that
 * came from that work, then what the client's side said. The client is never named.
 */
const CaseFile = ({ project }: { project: ProjectType }) => {
  if (!project.caseFile) return null;
  return (
    <div className="border border-foreground/10 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Link
          href={`/projects/${project.slug}`}
          transitionTypes={["nav-forward"]}
          className="font-serif text-4xl leading-tight text-foreground transition-colors duration-200 hover:text-foreground/80 sm:text-5xl"
        >
          an {project.title.toLowerCase()}
        </Link>
        <span className="font-mono text-[11px] text-foreground/60">
          {toSince(project.duration)} · {project.caseFile.scale}
        </span>
      </div>
      <dl className="mt-6 divide-y divide-primary/10 border-t border-primary/10">
        {project.caseFile.rows.map(({ did, detail, figure, figureLabel }) => (
          <div
            key={did}
            className="grid grid-cols-1 gap-4 py-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10"
          >
            <dt>
              <span className="block font-serif text-2xl leading-snug text-foreground/90">
                {did}
              </span>
              <span className="mt-2 block max-w-[52ch] text-sm font-light leading-relaxed text-foreground/65">
                {detail}
              </span>
            </dt>
            <dd>
              <span className="block font-serif text-5xl leading-none text-foreground sm:text-6xl">
                {figure}
              </span>
              <span className="mt-2 block font-mono text-[11px] leading-relaxed text-foreground/60">
                {figureLabel}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {project.caseFile.quotes && (
        <ul className="grid grid-cols-1 gap-8 border-t border-primary/10 pt-8 md:grid-cols-3 md:gap-10">
          {project.caseFile.quotes.map(({ text, who, when }) => (
            <li key={text}>
              <figure>
                <blockquote className="font-serif text-xl italic leading-snug text-foreground/90">
                  &ldquo;{text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] text-foreground/60">
                  {who} · {when}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/** What's running now beside the case file, picture first like the album covers. */
const NowTiles = () => (
  <ol className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-3">
    {current.map((project) => (
      <li key={project.slug}>
        <Link
          href={`/projects/${project.slug}`}
          transitionTypes={["nav-forward"]}
          className="group block"
        >
          <ProjectVisual project={project} />
          <span className="mt-4 flex items-baseline justify-between gap-3">
            <span className="font-serif text-2xl text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
              {project.title.toLowerCase()}
            </span>
            <span className="shrink-0 font-mono text-[11px] text-foreground/60">
              {toSince(project.duration)}
            </span>
          </span>
          <span className="mt-1.5 block text-sm font-light leading-relaxed text-foreground/65">
            {project.description}
          </span>
        </Link>
      </li>
    ))}
  </ol>
);

/** The habits in one row: an icon, the habit in italic serif, its sentence and the page that shows it. */
const Habits = () => (
  <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
    {HOW_I_WORK.map(({ term, icon: Icon, sentence, link }) => (
      <li key={term} className="flex flex-col">
        <Icon aria-hidden className="size-5 text-foreground/70" />
        <h3 className="mt-4 font-serif text-2xl italic text-foreground/90">{term}</h3>
        <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-foreground/65">
          {sentence}
        </p>
        <Link
          href={link.href}
          transitionTypes={["nav-forward"]}
          className="group mt-4 font-mono text-[11px] text-foreground/60 transition-colors duration-200 hover:text-foreground"
        >
          {link.label}{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </li>
    ))}
  </ol>
);

/** The path by year: the year, what happened, and the projects built that year as thumbnails. */
const PathYears = () => (
  <ol className="divide-y divide-primary/10">
    {PATH.map(({ year, what, slugs }) => (
      <li
        key={year}
        className="grid grid-cols-1 gap-5 py-7 first:pt-0 md:grid-cols-[9.5rem_minmax(0,2fr)_minmax(0,3fr)] md:gap-8"
      >
        <p className="font-serif text-4xl leading-none text-foreground sm:text-5xl">{year}</p>
        <p className="font-serif text-xl leading-snug text-foreground/85">{what}</p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {slugs.map((slug) => {
            const project = projectBySlug.get(slug);
            if (!project?.imageSrc) return null;
            return (
              <li key={slug}>
                <Link
                  href={`/projects/${slug}`}
                  transitionTypes={["nav-forward"]}
                  className="group block"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden border border-foreground/10 transition-colors duration-200 group-hover:border-foreground/30">
                    <Image
                      src={project.imageSrc}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(min-width: 768px) 10vw, 45vw"
                      className="object-cover object-top"
                    />
                  </span>
                  <span className="mt-1.5 block truncate font-mono text-[10px] text-foreground/60 transition-colors duration-200 group-hover:text-foreground">
                    {project.title.toLowerCase()}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    ))}
  </ol>
);

/** The stack as one wall across the page: each layer's name, then its tools as chips. */
const StackWall = () => (
  <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
    {STACK.map(({ layer, tools }) => (
      <li key={layer} className="flex flex-wrap items-center gap-2.5">
        <span className="mr-1.5 font-serif text-3xl text-foreground/90">{layer}</span>
        {tools.map((tool) => {
          const Icon = "icon" in tool ? tool.icon : null;
          return (
            <span
              key={tool.name}
              className="flex items-center gap-2 border border-foreground/10 px-3.5 py-2 text-sm text-foreground/80"
            >
              {Icon && <Icon aria-hidden className="size-4 text-foreground/70" />}
              {tool.name}
            </span>
          );
        })}
      </li>
    ))}
  </ul>
);

/**
 * The work reading of the about page: the client project as a case file of what i own, what's
 * running now, a year of commits, the post behind each area, how i work, the path by year, and the
 * stack. Project facts come from projects.ts and post titles from the posts themselves.
 */
export const WorkReading = async () => {
  const posts = await getAllPosts();
  const postBySlug = new Map(posts.map((post) => [post.slug, post.frontmatter]));
  const writtenUp = SHIPPED_IN.flatMap(({ area, slug }) => {
    const post = postBySlug.get(slug);
    return post ? [{ area, slug, title: post.title }] : [];
  });

  return (
    <div className="space-y-20 sm:space-y-28">
      <p className="max-w-[36ch] font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
        the work is client platforms end to end: on calls with the founders, in their production
        systems, and through every release.
      </p>

      {caseProject && (
        <ContentBlock label="the case file" note={caseProject.client}>
          <CaseFile project={caseProject} />
        </ContentBlock>
      )}

      <ContentBlock label="on it now">
        <NowTiles />
      </ContentBlock>

      <ContentBlock label="a year of commits">
        <GitHubActivity />
      </ContentBlock>

      <ContentBlock label="written up" note="the post behind each area">
        <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {writtenUp.map(({ area, slug, title }) => (
            <li key={slug} className="border-b border-primary/10">
              <Link
                href={`/writing/${slug}`}
                transitionTypes={["nav-forward"]}
                className="group grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-4 py-3.5"
              >
                <span className="font-mono text-[11px] text-foreground/60">{area}</span>
                <span className="font-serif text-lg leading-snug text-foreground/85 transition-colors duration-200 group-hover:text-foreground">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </ContentBlock>

      <ContentBlock label="how i work" id="how-i-work">
        <Habits />
      </ContentBlock>

      <ContentBlock label="the path" note="first code in 8th grade · what each year built">
        <PathYears />
      </ContentBlock>

      <ContentBlock label="stack">
        <StackWall />
      </ContentBlock>
    </div>
  );
};
