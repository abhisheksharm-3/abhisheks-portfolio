import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";
import type { SectionHeaderPropsType } from "@/lib/types/components";
import { cn } from "@/lib/utils";

/**
 * A reusable header for different sections of the landing page.
 *
 * @param {SectionHeaderPropsType} props The component props.
 */
export const SectionHeader = ({ subtitle, children, className }: SectionHeaderPropsType) => (
  <div
    className={cn(
      `flex flex-col ${SPACING_STANDARDS.HEADER.SECTION_MARGIN_BOTTOM} relative z-10`,
      className,
    )}
  >
    <p
      className={`text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light ${SPACING_STANDARDS.HEADER.TITLE_MARGIN_BOTTOM}`}
    >
      {subtitle}
    </p>
    <div className="overflow-hidden">
      <h2 className="text-4xl sm:text-5xl md:text-6xl leading-none">{children}</h2>
    </div>
    <div className={`h-[1px] w-20 bg-primary/10 ${SPACING_STANDARDS.HEADER.ACCENT_LINE_MARGIN}`} />
  </div>
);
