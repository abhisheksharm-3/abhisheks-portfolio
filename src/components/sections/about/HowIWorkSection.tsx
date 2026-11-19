import Link from "next/link";
import { DefinitionRows } from "@/components/sections/about/DefinitionRows";
import { HOW_I_WORK } from "@/data/about";

const rows = HOW_I_WORK.map(({ term, sentence, link }) => ({
  term,
  detail: (
    <>
      {sentence}{" "}
      <Link
        href={link.href}
        transitionTypes={["nav-forward"]}
        className="underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-foreground/85 hover:decoration-foreground/60"
      >
        {link.label}
      </Link>
    </>
  ),
}));

/**
 * The habits behind the work, one plain sentence each. The home page links here by id.
 */
export const HowIWorkSection = () => (
  <section id="how-i-work" className="scroll-mt-32">
    <h2 className="text-2xl font-serif text-foreground mb-8">how i work</h2>
    <div className="h-px bg-primary/10 mb-2" />
    <DefinitionRows rows={rows} />
  </section>
);
