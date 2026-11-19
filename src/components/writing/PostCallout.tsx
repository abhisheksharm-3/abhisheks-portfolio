import { cn } from "@/lib/utils";

type PostCalloutProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * A point worth pausing on, set like the margin notes on project pages: Basteleur
 * italic at body size behind a `]` hairline bracket, with no fill.
 */
export function PostCallout({ children, className }: PostCalloutProps) {
  return (
    <div
      className={cn(
        "relative my-8 pl-6 font-serif text-base font-normal italic leading-relaxed text-foreground/80 before:absolute before:top-1 before:bottom-1 before:left-0 before:w-2 before:border-y before:border-r before:border-foreground/20 [&>:last-child]:mb-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
