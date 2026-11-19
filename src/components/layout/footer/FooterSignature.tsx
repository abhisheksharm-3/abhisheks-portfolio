"use client";

/** The footer signature: writes itself at pen speed once in view, then its last point joins a constellation. */
import { useEffect, useRef } from "react";
import { SIGNATURE } from "./signature-path";

type PointType = readonly [number, number];

const PEN_SPEED_PX_PER_MS = 1.15;
const PEN_LIFT_MS = 110;
const PEN_LIFT_MIN_GAP = 14;
const LINK_STAGGER_MS = 220;
const LINK_DELAY_MS = 350;
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const endPoint = (d: string): PointType => {
  const numbers = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [0, 0];
  return [numbers[numbers.length - 2], numbers[numbers.length - 1]];
};

/** Where the pen leaves the page: the rightmost stroke end, the tip of the k's flourish. */
const PEN_LIFT_POINT = SIGNATURE.strokes
  .map(endPoint)
  .reduce((rightmost, point) => (point[0] > rightmost[0] ? point : rightmost));

const fromPen = (dx: number, dy: number): PointType => [
  PEN_LIFT_POINT[0] + dx,
  PEN_LIFT_POINT[1] + dy,
];

/** A dipper whose handle starts at the pen's last point. Hidden on small screens, where there is no sky beside the signature. */
const DIPPER = [
  { at: fromPen(40, -60), r: 2.4 },
  { at: fromPen(95, -110), r: 2.8 },
  { at: fromPen(165, -125), r: 3.2 },
  { at: fromPen(180, -185), r: 2.6 },
  { at: fromPen(245, -178), r: 3 },
  { at: fromPen(240, -122), r: 2.4 },
];

const LOOSE_STARS = [
  { at: fromPen(135, -30) },
  { at: fromPen(290, -70) },
  { at: fromPen(70, -175) },
  { at: fromPen(285, -205) },
];

const LINKS = [
  { from: PEN_LIFT_POINT, to: DIPPER[0].at },
  { from: DIPPER[0].at, to: DIPPER[1].at },
  { from: DIPPER[1].at, to: DIPPER[2].at },
  { from: DIPPER[2].at, to: DIPPER[3].at },
  { from: DIPPER[3].at, to: DIPPER[4].at },
  { from: DIPPER[4].at, to: DIPPER[5].at },
  { from: DIPPER[5].at, to: DIPPER[2].at },
];

/**
 * Builds the replayable writing animation over the rendered mask strokes. Returns the function that
 * plays it and a cleanup. Lengths are measured from the DOM, so this runs after mount.
 */
const createSigning = (svg: SVGSVGElement) => {
  const strokes = [...svg.querySelectorAll<SVGPathElement>("[data-stroke]")].map((path) => ({
    path,
    length: path.getTotalLength(),
  }));
  const links = [...svg.querySelectorAll<SVGPathElement>("[data-link]")].map((path) => ({
    path,
    length: path.getTotalLength(),
  }));
  const nib = svg.querySelector<SVGCircleElement>("[data-nib]");

  let elapsed = 0;
  let previousEnd: DOMPoint | null = null;
  const timeline = strokes.map(({ path, length }) => {
    const start = path.getPointAtLength(0);
    const isLifted =
      previousEnd !== null &&
      Math.hypot(start.x - previousEnd.x, start.y - previousEnd.y) > PEN_LIFT_MIN_GAP;
    if (isLifted) elapsed += PEN_LIFT_MS;
    const from = elapsed;
    elapsed += length / PEN_SPEED_PX_PER_MS;
    previousEnd = path.getPointAtLength(length);
    return { path, length, from, to: elapsed };
  });
  const totalMs = elapsed;

  for (const { path, length } of [...strokes, ...links]) {
    path.style.strokeDasharray = `${length} ${length + 1}`;
  }

  let frame = 0;
  let timers: number[] = [];

  const placeNib = (x: number, y: number) => {
    nib?.setAttribute("cx", String(x));
    nib?.setAttribute("cy", String(y));
  };

  const revealLinks = () => {
    links.forEach(({ path }, index) => {
      const timer = window.setTimeout(
        () => {
          path.style.transition = `stroke-dashoffset 1.1s ${EASE_OUT}`;
          path.style.strokeDashoffset = "0";
        },
        LINK_DELAY_MS + index * LINK_STAGGER_MS,
      );
      timers.push(timer);
    });
  };

  const finish = () => {
    for (const { path } of strokes) path.style.strokeDashoffset = "0";
    placeNib(...PEN_LIFT_POINT);
    svg.dataset.state = "dry";
    revealLinks();
  };

  const play = () => {
    cancelAnimationFrame(frame);
    timers.forEach(clearTimeout);
    timers = [];
    svg.dataset.state = "wet";
    for (const { path, length } of strokes) path.style.strokeDashoffset = String(length);
    for (const { path, length } of links) {
      path.style.transition = "none";
      path.style.strokeDashoffset = String(length);
    }

    const startedAt = performance.now();
    const draw = (now: number) => {
      const time = now - startedAt;
      for (const step of timeline) {
        const progress = Math.min(1, Math.max(0, (time - step.from) / (step.to - step.from)));
        step.path.style.strokeDashoffset = String(step.length * (1 - progress));
        if (progress > 0 && progress < 1) {
          const tip = step.path.getPointAtLength(step.length * progress);
          placeNib(tip.x, tip.y);
        }
      }
      if (time < totalMs) frame = requestAnimationFrame(draw);
      else finish();
    };
    frame = requestAnimationFrame(draw);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    timers.forEach(clearTimeout);
  };

  return { play, stop };
};

export const FooterSignature = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const playRef = useRef<() => void>(() => {});

  useEffect(() => {
    const svg = svgRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!svg || prefersReducedMotion) return;

    const signing = createSigning(svg);
    playRef.current = signing.play;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        signing.play();
        observer.disconnect();
      },
      { threshold: 0.7 },
    );
    observer.observe(svg);

    return () => {
      observer.disconnect();
      signing.stop();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => playRef.current()}
      aria-label="Abhishek's signature. Activate to watch it being written again."
      className="relative z-10 ml-[22px] block w-[92%] cursor-pointer md:w-[min(520px,72%)] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIGNATURE.width} ${SIGNATURE.height}`}
        data-state="dry"
        aria-hidden="true"
        className="group block h-auto w-full overflow-visible"
      >
        <defs>
          <mask
            id="footer-signature-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={SIGNATURE.width}
            height={SIGNATURE.height}
          >
            <g
              fill="none"
              stroke="#fff"
              strokeWidth={SIGNATURE.maskWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {SIGNATURE.strokes.map((d) => (
                <path key={d} d={d} data-stroke="" />
              ))}
            </g>
          </mask>
        </defs>

        <path
          d={SIGNATURE.outline}
          fillRule="evenodd"
          mask="url(#footer-signature-mask)"
          className="fill-foreground opacity-[0.86] transition-opacity duration-[1400ms] ease-out group-data-[state=wet]:opacity-100 group-data-[state=wet]:transition-none"
        />

        <g className="fill-none stroke-foreground/30 max-md:hidden">
          {LINKS.map(({ from, to }) => (
            <path
              key={`${from}-${to}`}
              d={`M${from}L${to}`}
              data-link=""
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g className="max-md:hidden [&>circle]:origin-center [&>circle]:[transform-box:fill-box] [&>circle]:transition-[opacity,transform] [&>circle]:duration-500 group-data-[state=wet]:[&>circle]:scale-[0.2] group-data-[state=wet]:[&>circle]:opacity-0 group-data-[state=wet]:[&>circle]:transition-none group-data-[state=wet]:[&>circle]:animate-none">
          {DIPPER.map(({ at, r }, index) => (
            <circle
              key={`${at}`}
              cx={at[0]}
              cy={at[1]}
              r={r}
              className={`fill-foreground motion-safe:animate-[twinkle_5s_ease-in-out_infinite] ${index % 2 ? "[animation-delay:-2.2s]" : ""}`}
            />
          ))}
          {LOOSE_STARS.map(({ at }) => (
            <circle key={`${at}`} cx={at[0]} cy={at[1]} r={1.6} className="fill-foreground/40" />
          ))}
        </g>

        <circle
          data-nib=""
          cx={PEN_LIFT_POINT[0]}
          cy={PEN_LIFT_POINT[1]}
          r={4.5}
          className="fill-foreground origin-center [transform-box:fill-box] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=wet]:scale-150 group-data-[state=wet]:transition-none"
        />
      </svg>
    </button>
  );
};
