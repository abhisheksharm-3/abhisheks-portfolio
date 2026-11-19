import { PageHeader } from "@/components/shared/PageHeader";

/**
 * Renders the main header for the Graveyard page.
 * @param {object} props - The component props.
 * @param {string} props.quote - The inspirational quote to display.
 * @returns {JSX.Element} The GraveyardSectionHeader component.
 */
export const GraveyardSectionHeader = ({ quote }: { quote: string }) => {
  return (
    <PageHeader
      eyebrow="R.I.P"
      title="the project graveyard"
      intro="projects i stopped, with the reason for each and what it changed in how i work."
    >
      <p className="mt-5 max-w-2xl text-xs text-foreground/30 italic font-light leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </PageHeader>
  );
};
