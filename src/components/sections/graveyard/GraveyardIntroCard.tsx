/**
 * An introductory section for the Graveyard page, explaining its purpose.
 * Rendered as editorial paragraph text — no card chrome.
 * @returns {JSX.Element} The GraveyardIntroCard component.
 */
export const GraveyardIntroCard = () => {
  return (
    <div className="mb-16 max-w-2xl">
      <p className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-5">
        projects i started and stopped. some hit a technical wall, some lost a dependency, and some
        i stopped working on.
      </p>

      <p className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8">
        each one lists why it stopped and what i do differently now.
      </p>

      <div className="h-px bg-primary/10" />

      <p className="mt-4 text-xs text-foreground/30 font-light leading-relaxed">
        these projects are abandoned and unmaintained. some links may be broken, features may not
        work, and databases may be empty.
      </p>
    </div>
  );
};
