/** Notes from building a project: small true things that happened along the way, each linking to its post when there is one. */
import Link from "next/link";
import type { MarginNotesPropsType } from "@/lib/types/components";

const NOTE_CLASS =
  "border-t border-foreground/10 pt-4 font-serif text-lg italic leading-snug text-foreground/80";

export const MarginNotes = ({ notes }: MarginNotesPropsType) => (
  <aside aria-label="notes" className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
    {notes.map((note) => (
      <p key={note.text} className={NOTE_CLASS}>
        {note.text}
        {note.href && (
          <Link
            href={note.href}
            transitionTypes={["nav-forward"]}
            className="mt-2 block font-mono text-[11px] not-italic text-foreground/60 underline decoration-foreground/15 underline-offset-4 transition-colors duration-200 hover:text-foreground/80 hover:decoration-foreground/60"
          >
            the whole story →
          </Link>
        )}
      </p>
    ))}
  </aside>
);
