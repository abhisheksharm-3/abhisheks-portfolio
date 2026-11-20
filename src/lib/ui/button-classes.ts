const BASE =
  "inline-flex cursor-pointer items-center gap-2 border px-5 py-2.5 font-mono text-xs transition-[opacity,transform,border-color] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default disabled:opacity-60 motion-reduce:active:scale-100";

/** The one solid action on a page: filled with the text colour, dimming on hover, pressing in on click. */
export const PRIMARY_BUTTON = `${BASE} border-foreground bg-foreground text-background hover:opacity-85`;

/** A second action beside the primary: a bordered button whose border darkens on hover. */
export const SECONDARY_BUTTON = `${BASE} border-foreground/30 text-foreground hover:border-foreground`;
