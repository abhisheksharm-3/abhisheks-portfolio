import { ChevronDown } from "lucide-react";
import type { PostFaqPropsType } from "@/lib/types/components";

/** Anchor of the FAQ section, shared with the table of contents. */
export const FAQ_ID = "frequently-asked-questions";

/**
 * A post's frequently asked questions as a list of closed rows. The question is the summary and
 * the answer shows on open, so a reader sees the questions first and reads only the answers they
 * want. The full text stays in the page and in its FAQ JSON-LD either way.
 */
export function PostFaq({ faqs }: PostFaqPropsType) {
  return (
    <section aria-labelledby={`${FAQ_ID}-heading`} className="scroll-mt-24" id={FAQ_ID}>
      <h2 className="mb-6 font-serif text-xl italic text-foreground/85" id={`${FAQ_ID}-heading`}>
        frequently asked questions
      </h2>
      <div className="divide-y divide-primary/10 border-y border-primary/10">
        {faqs.map((faq) => (
          <details key={faq.question} className="faq-row group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-foreground/85 transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 [&::-webkit-details-marker]:hidden">
              <span className="font-serif text-lg font-normal italic leading-snug">
                {faq.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className="mt-1.5 h-4 w-4 shrink-0 text-foreground/60 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="pb-6 pr-10 font-light leading-[1.8] text-foreground/70">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
