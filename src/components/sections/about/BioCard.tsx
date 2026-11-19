import Link from "next/link";

const inlineLink =
  "underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-foreground/85 hover:decoration-foreground/60";

/**
 * Displays a detailed biography as editorial text directly on the page background.
 */
export const BioCard = () => {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-serif text-foreground mb-8">a bit about me</h2>

      <div className="max-w-2xl space-y-6 text-foreground/65 font-light leading-relaxed">
        <p>
          i&apos;m abhishek, a forward deployed engineer at wednesday. i&apos;m from chandigarh and
          live in pune for work.
        </p>

        <p>
          the work is client platforms end to end: on calls with the founders, in their production
          systems, and through every release. i write the release notes they read.
        </p>

        <p>
          i started coding in 8th grade and studied computer science at ccet, panjab university.
          before wednesday it was hackathons: i led a team of three on{" "}
          <Link href="/projects/credify" transitionTypes={["nav-forward"]} className={inlineLink}>
            credify
          </Link>
          , built in a month, and it won the network18 track at google&apos;s gen ai exchange. at
          wednesday it began with spring boot, then grew into react and postgres, python for agents,
          and terraform when a client needed aws from nothing.
        </p>

        <p>
          on my own time i build{" "}
          <Link href="/projects/polaris" transitionTypes={["nav-forward"]} className={inlineLink}>
            polaris
          </Link>
          , a claude code plugin i use daily on client work, and{" "}
          <Link href="/projects/flockr" transitionTypes={["nav-forward"]} className={inlineLink}>
            flockr
          </Link>
          , an android app for shared homes.
        </p>

        <p className="pt-2 text-sm text-foreground/60">
          the full record is on my{" "}
          <Link href="/resume" transitionTypes={["nav-forward"]} className={inlineLink}>
            resume
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
