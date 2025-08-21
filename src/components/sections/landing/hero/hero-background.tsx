"use client";

import { motion, useTransform } from 'framer-motion';
import { MousePosition } from '@/lib/types';
import { ANIMATION_CONFIG } from '@/data/hero';

/**
 * Renders a subtle SVG noise filter as a background layer.
 */
export const NoiseBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 z-0 mix-blend-overlay">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  </div>
);

/**
 * Renders a faint, asymmetrical grid based on golden ratio-inspired intervals.
 */
export const AsymmetricalGrid: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-5">
      {/* Vertical grid lines */}
      {[
        { left: '13%', opacity: 'bg-primary/30' },
        { left: '28%', opacity: 'bg-primary/10' },
        { left: '67%', opacity: 'bg-primary/20' },
        { left: '89%', opacity: 'bg-primary/15' },
      ].map((line, index) => (
        <div
          key={`vertical-${index}`}
          className={`absolute top-0 bottom-0 w-[1px] ${line.opacity}`}
          style={{ left: line.left }}
        />
      ))}

      {/* Horizontal grid lines */}
      {[
        { top: '22%', opacity: 'bg-primary/25' },
        { top: '58%', opacity: 'bg-primary/10' },
        { top: '81%', opacity: 'bg-primary/20' },
      ].map((line, index) => (
        <div
          key={`horizontal-${index}`}
          className={`absolute left-0 right-0 h-[1px] ${line.opacity}`}
          style={{ top: line.top }}
        />
      ))}
    </div>
  </div>
);

/**
 * Renders abstract, blurred shapes that provide ambient lighting and mouse-interactive parallax effects.
 * @param {object} props - The component props.
 * @param {MousePosition} props.mousePosition - Normalized mouse coordinates.
 */
export const AbstractShapes: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => (
  <>
    {/* Primary ambient lighting effect */}
    <motion.div
      className="absolute -left-[10%] top-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-primary/5 via-primary/2 to-transparent blur-[120px]"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />

    {/* Interactive secondary lighting that follows mouse */}
    <motion.div
      className="absolute right-[10%] bottom-[20%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-tl from-primary/4 via-primary/2 to-transparent blur-[80px]"
      style={{
        x: useTransform(() => mousePosition.x * -ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.XLARGE),
        y: useTransform(() => mousePosition.y * -ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.XLARGE),
      }}
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />

    {/* Geometric accent shapes with subtle mouse interaction */}
    <motion.div
      className="absolute top-[25%] right-[15%] w-32 h-32 border-l border-t border-primary/20 rounded-tl-3xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      style={{
        x: useTransform(() => mousePosition.x * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.MEDIUM),
        y: useTransform(() => mousePosition.y * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.MEDIUM),
      }}
    />

    <motion.div
      className="absolute bottom-[20%] left-[20%] w-20 h-20 border-r border-b border-primary/15 rounded-br-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5, delay: 1.2 }}
      style={{
        x: useTransform(() => mousePosition.x * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE),
        y: useTransform(() => mousePosition.y * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE),
      }}
    />
  </>
);

/**
 * Renders decorative SVG paths that animate as if being drawn.
 */
export const AnimatedPaths: React.FC = () => (
  <>
    <motion.svg
      className="absolute left-[5%] top-[40%] w-[30%] text-primary/10"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <motion.path
        d="M10,30 C20,50 40,10 50,40 S80,20 90,40"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.svg>

    <motion.svg
      className="absolute right-[10%] top-[30%] w-[25%] text-primary/8"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.8 }}
    >
      <motion.path
        d="M10,50 Q40,20 50,50 T90,30"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.3 }}
      />
    </motion.svg>
  </>
);


/**
 * Renders an asymmetrical decorative shape with a subtle mouse parallax effect.
 * @param {object} props - The component props.
 * @param {MousePosition} props.mousePosition - Normalized mouse coordinates.
 */
export const AsymmetricalDecoration: React.FC<{ mousePosition: MousePosition }> = ({ mousePosition }) => (
  <motion.div
    className="absolute top-[10%] right-[20%] hidden md:block"
    style={{
      x: useTransform(() => mousePosition.x * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.SMALL),
      y: useTransform(() => mousePosition.y * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.SMALL),
    }}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="relative"
    >
      <div className="w-24 h-24 border-r border-t border-primary/15 rounded-tr-3xl" />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border border-primary/30 rounded-full" />
    </motion.div>
  </motion.div>
);