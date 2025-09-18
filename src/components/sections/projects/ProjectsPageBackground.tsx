import { AbstractPath } from "@/components/shared/AbstractPath";

/**
 * Renders the decorative background elements for the projects page.
 * @returns {JSX.Element}
 */
export const ProjectsPageBackground = () => (
  <div className="absolute inset-0 pointer-events-none -z-10">
    <div className="absolute inset-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
        <filter id="projectsNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#projectsNoiseFilter)" />
      </svg>
    </div>
    <AbstractPath
      className="absolute left-[5%] top-[15%] text-primary/8"
      pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40"
    />
    <AbstractPath
      className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
      pathD="M10,50 Q40,20 50,50 T90,30"
    />
  </div>
);
