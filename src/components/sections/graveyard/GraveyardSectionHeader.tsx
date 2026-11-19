import { PageHeader } from "@/components/shared/PageHeader";

/**
 * Renders the header of the Graveyard page: one sentence on what the page is, and the notice that
 * what it lists is no longer maintained.
 */
export const GraveyardSectionHeader = () => {
  return (
    <PageHeader
      eyebrow="R.I.P"
      title="the project graveyard"
      intro="projects i started and stopped, with why each one stopped and what i do differently now."
    >
      <p className="mt-5 max-w-2xl text-xs font-light leading-relaxed text-foreground/60">
        these projects are abandoned and unmaintained. some links may be broken, features may not
        work, and databases may be empty.
      </p>
    </PageHeader>
  );
};
