/**
 * Displays a detailed biography as editorial text directly on the page background.
 */
export const BioCard = () => {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-serif text-foreground mb-8">a bit about me</h2>

      <div className="space-y-6 text-foreground/65 font-light leading-relaxed">
        <p>
          i&apos;m abhishek, a forward deployed engineer at wednesday. i&apos;m from chandigarh and
          live in pune for work. i work on client platforms end to end: on calls with the founders,
          in their production systems, and through every release.
        </p>

        <div className="h-px bg-primary/10" />

        <p>
          the job started with spring boot, then grew into react and postgres, python for agents,
          and terraform when a client needed aws from nothing.
        </p>

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
