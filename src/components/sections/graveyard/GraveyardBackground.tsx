"use client";

/**
 * Renders the subtle background for the Graveyard page.
 * Minimal noise texture only — no moving elements.
 * @returns {JSX.Element} The GraveyardBackground component.
 */
export const GraveyardBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="graveyardNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#graveyardNoise)" />
      </svg>
    </div>
  );
};
