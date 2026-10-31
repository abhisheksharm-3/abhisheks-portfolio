/**
 * Displays a detailed biography as editorial text directly on the page background.
 */
export const BioCard = () => {
  return (
    <div className="h-full">
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-6">
        biography
      </p>

      <h2 className="text-2xl font-serif text-foreground mb-8">A bit about me</h2>

      <div className="space-y-6 text-foreground/55 font-light leading-relaxed">
        <p>
          i&apos;m abhishek, a forward deployed engineer at wednesday, based in pune. i work on
          client platforms end to end: on calls with the founders, in their production systems, and
          through every release.
        </p>

        <div className="h-px bg-primary/10" />

        <p>
          the job started with spring boot, then grew into react and postgres, python for agents,
          and terraform when a client needed aws from nothing.
        </p>

        <div>
          <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-3">
            what i work on now
          </p>
          <p>
            associate forward deployed engineer at{" "}
            <a
              href="https://wednesday.is"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/55 underline underline-offset-2 hover:text-foreground/80 transition-colors duration-200"
            >
              wednesday.is
            </a>
            . since june 2026, a us client&apos;s ai video platform at ~$200k mrr: i built its
            analytics module alone from scratch, own its stripe billing, co-built its team access,
            and run every production release. before that, a us edtech client&apos;s grading
            platform on spring boot and aws, an autonomous content engine (langgraph + fastapi +
            pgvector), and a one-week voice mode prototype for off grid.
          </p>
        </div>

        <p>
          i pick the tool the problem needs, and that is often plain sql: authorization in row-level
          security, and ledger rules in postgres triggers.
        </p>

        <div className="h-px bg-primary/10" />

        <p>
          before wednesday, hackathons: i led a team of three on credify, a media verification tool
          built in a month, and it won the network18 track at google&apos;s gen ai exchange.
        </p>

        <p>
          on my own time i build polaris, a claude code plugin i use daily on client work, and
          flockr, an android app for shared homes.
        </p>
      </div>
    </div>
  );
};
