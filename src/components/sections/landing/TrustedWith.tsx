import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { projects } from "@/data/projects";
import { SITE_MEDIA } from "@/data/site-media";

const caseProject = projects.find((project) => project.caseFile);

/**
 * What the client platform trusts me with, written as a till receipt because billing is the part i
 * own: each line a thing i own or a number that runs through it, dotted to its value. Beside it,
 * the hackathon photo. The figures behind the receipt are in the case file on /about.
 */
export const TrustedWith = () => {
  const receipt = caseProject?.caseFile?.receipt;
  if (!receipt) return null;
  const { hackathon } = SITE_MEDIA;

  return (
    <ContentBlock label="what i’m trusted with">
      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-between gap-6 border border-dashed border-foreground/20 p-6 font-mono text-[13px] sm:p-8 sm:text-sm md:mb-7">
          <div className="space-y-2">
            <p className="text-foreground/60">on my desk</p>
            <p className="text-foreground">an ai video platform, for a us client</p>
          </div>
          <dl className="space-y-3 border-y border-dashed border-foreground/20 py-5">
            {receipt.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="shrink-0 text-foreground/60">{label}</dt>
                <span
                  aria-hidden="true"
                  className="flex-1 translate-y-[-3px] border-b border-dotted border-foreground/20"
                />
                <dd className="shrink-0 text-right text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/about#work"
            transitionTypes={["nav-forward"]}
            className="group text-foreground/80 transition-colors duration-200 hover:text-foreground"
          >
            the whole case file is on /about{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
        <figure className="flex flex-col gap-2">
          <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10">
            <Image
              src={hackathon.src}
              alt={hackathon.alt}
              fill
              sizes="(min-width: 768px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="font-mono text-[11px] text-foreground/60">
            {hackathon.caption}
          </figcaption>
        </figure>
      </div>
    </ContentBlock>
  );
};
