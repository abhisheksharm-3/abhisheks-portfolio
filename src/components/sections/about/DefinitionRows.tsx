import type { DefinitionRowsPropsType } from "@/lib/types/components";

/**
 * A hairline definition list shared by the about page sections: a short term, then its detail.
 */
export const DefinitionRows = ({ rows }: DefinitionRowsPropsType) => (
  <dl className="divide-y divide-primary/10">
    {rows.map(({ term, detail }) => (
      <div key={term} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-10">
        <dt className="text-sm text-foreground/85">{term}</dt>
        <dd className="max-w-2xl text-sm font-light leading-relaxed text-foreground/65">
          {detail}
        </dd>
      </div>
    ))}
  </dl>
);
