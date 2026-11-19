"use client";

/** Text that changes by morphing: letters shared by the old and new string glide into place, the rest fade. */
import { AnimatePresence, motion } from "framer-motion";
import type { TextMorphPropsType } from "@/lib/types/components";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Keys each character by itself plus how many times it has appeared so far, so "send" and "sent"
 * share the keys s0, e0, n0 and only the last letter enters and leaves.
 */
const toLetters = (text: string) => {
  const seen = new Map<string, number>();
  return [...text].map((char) => {
    const count = seen.get(char) ?? 0;
    seen.set(char, count + 1);
    return { char, key: `${char}${count}` };
  });
};

/**
 * Screen readers get the whole string once through the visually hidden copy; the animated letters
 * are hidden from them so a change is never read out letter by letter.
 */
export const TextMorph = ({ children, className }: TextMorphPropsType) => (
  <span className={className}>
    <span className="sr-only">{children}</span>
    <span aria-hidden="true" className="inline-flex whitespace-pre">
      <AnimatePresence mode="popLayout" initial={false}>
        {toLetters(children).map(({ char, key }) => (
          <motion.span
            key={key}
            layout="position"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  </span>
);
