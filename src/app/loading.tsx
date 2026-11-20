import { AppShell } from "@/components/layout/AppShell";
import { LoopVideo } from "@/components/shared/LoopVideo";
import { SITE_MEDIA } from "@/data/site-media";

/**
 * Route-level loading state: a thin strip of dharamshala's lights at night instead of a spinner.
 * It fades in only after 300ms, so a fast navigation never flashes it.
 */
const Loading = () => {
  const { loading } = SITE_MEDIA;
  return (
    <AppShell>
      <div className="flex min-h-[70vh] items-center justify-center px-6 pt-36 pb-20">
        <figure
          role="status"
          className="flex w-full max-w-2xl flex-col gap-3 animate-in fade-in fill-mode-both delay-300 duration-500 motion-reduce:animate-none"
        >
          <div className="relative aspect-[1920/620] overflow-hidden border border-foreground/10">
            <LoopVideo video={loading.video} poster={loading.src} alt={loading.alt} />
          </div>
          <figcaption className="text-center font-mono text-[11px] text-foreground/60">
            loading · {loading.caption}
          </figcaption>
        </figure>
      </div>
    </AppShell>
  );
};

export default Loading;
