import { motion } from "framer-motion";

/**
 * Props for AbstractPath component
 */
interface AbstractPathProps {
  className?: string;
  pathD?: string;
}

/**
 * AbstractPath - Reusable animated SVG path component
 * Renders an animated SVG path with customizable stroke path and styling.
 * Used for decorative elements throughout the application.
 *
 * @param className - Optional CSS classes for styling
 * @param pathD - SVG path data string (defaults to a curve if not provided)
 * @returns JSX.Element representing an animated SVG path
 */
export const AbstractPath = ({ className, pathD }: AbstractPathProps) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <motion.path
        d={pathD || "M30,20 Q50,10 70,30 T90,50"}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  );
};
