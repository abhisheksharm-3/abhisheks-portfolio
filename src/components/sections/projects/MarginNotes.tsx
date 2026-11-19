/** Asides written in the margin of a project page: small true things that happened while building it. */
import Link from "next/link";
import type { MarginNotesPropsType } from "@/lib/types/components";

const NOTE_CLASS =
  "relative pl-6 font-serif text-[15px] italic leading-snug text-foreground/60 before:absolute before:top-1 before:bottom-1 before:left-0 before:w-2 before:border-y before:border-r before:border-foreground/20";

export const MarginNotes = ({ notes }: MarginNotesPropsType) => (
  <aside aria-label="margin notes" className="flex flex-col gap-7">
    {notes.map((note) => (
      <p key={note.text} className={NOTE_CLASS}>
        {note.text}
        {note.href && (
          <>
            {" "}
            <Link
              href={note.href}
              transitionTypes={["nav-forward"]}
              className="whitespace-nowrap font-sans text-xs not-italic text-foreground/40 underline decoration-foreground/15 underline-offset-4 transition-colors duration-200 hover:text-foreground/80 hover:decoration-foreground/60"
            >
              the whole story →
            </Link>
          </>
        )}
      </p>
    ))}
  </aside>
);
