import { StatePage } from "@/components/shared/StatePage";

/** Route-level loading state. A thin line, not a spinner. */
const Loading = () => (
  <StatePage as="p" eyebrow="loading" title="one moment">
    <div className="h-px w-full max-w-sm bg-foreground/8 overflow-hidden">
      <div className="h-full w-1/3 bg-primary/40 animate-[loading-sweep_1.4s_ease-in-out_infinite]" />
    </div>
  </StatePage>
);

export default Loading;
