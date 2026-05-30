/**
 * Renders subtle decorative background for the projects pages.
 * Minimal noise texture only — no abstract paths or gradient blobs.
 */
export const ProjectsPageBackground = () => (
  <div className="absolute inset-0 pointer-events-none -z-10">
    <div className="absolute inset-0 opacity-[0.03]">
      <svg className="w-full h-full" viewBox="0 0 200 200">
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
  </div>
);
