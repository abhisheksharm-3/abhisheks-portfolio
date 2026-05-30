/**
 * Displays a detailed biography as editorial text directly on the page background.
 */
export const BioCard = () => {
  return (
    <div className="h-full">
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-6">
        biography
      </p>

      <h2 className="text-2xl font-serif italic text-foreground mb-8">
        A bit about me
      </h2>

      <div className="space-y-6 text-foreground/65 font-light leading-relaxed">
        <p>
          hey, i&apos;m abhishek. a dev who turns ideas into working products.
          started curious about how apps worked, and that curiosity snowballed
          into cs and shipping things constantly.
        </p>

        <p className="text-foreground/75 italic">
          &quot;clever code makes you feel smart. simple code helps you sleep
          better.&quot;
        </p>

        <div className="h-px bg-primary/10" />

        <p>
          most of what i do sits somewhere between frontend, backend, and
          mobile. i enjoy shipping stuff that actually feels good to use, not
          just works. that balance between technical detail and user experience
          is what keeps me hooked.
        </p>

        <div>
          <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-3">
            what i&apos;m into right now
          </p>
          <p>
            currently at wednesday: building an autonomous ai content pipeline
            (langgraph + fastapi + pgvector), an offline ai chat app in react
            native with on-device tts, and a multi-tenant lms with full aws
            infra. when i&apos;m not doing that, i&apos;m tinkering on side projects.
          </p>
        </div>

        <div className="h-px bg-primary/10" />

        <p>
          hackathons shaped a lot of how i work. building a media verification
          tool in a day, shipping under pressure, learning that a working v1 is
          worth more than a perfect v0. those sprints are in my muscle memory.
        </p>

        <p>
          full-time at wednesday, still finding time to tinker. side projects,
          new tools, things that seemed interesting at midnight. that&apos;s where
          most of the actual growth happens anyway.
        </p>
      </div>
    </div>
  );
};
