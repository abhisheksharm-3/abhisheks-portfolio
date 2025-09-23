"use client";
import { cn } from "@/lib/utils";
import { motion, Transition, Variants } from "framer-motion";
import React, { CSSProperties } from "react";

/**
 * Defines the props for the SpinningText component.
 */
type SpinningTextProps = {
  children: string | string[];
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  radius?: number;
  zIndex?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

/**
 * A reusable component that arranges text in a circle and animates it to spin.
 * It is accessible, using aria-hidden for decorative text and providing a screen-reader-only element.
 *
 * @param {SpinningTextProps} props The component props.
 */
export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  radius = 5,
  zIndex = 50,
  transition,
  variants,
}: SpinningTextProps) {
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error(
      "SpinningText children must be a string or an array of strings",
    );
  }

  const text = Array.isArray(children) ? children.join("") : children;
  const letters = text.split("");
  letters.push(" "); // Adds a character's width of spacing

  const finalTransition: Transition = {
    repeat: Infinity,
    ease: "linear",
    duration,
    ...transition,
  };

  const containerVariants: Variants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    ...variants?.item,
  };

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        zIndex,
        ...style,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="absolute left-1/2 top-1/2 inline-block"
          style={
            {
              "--index": index,
              "--total": letters.length,
              "--radius": radius,
              transform: `
                translate(-50%, -50%)
                rotate(calc(360deg / var(--total) * var(--index)))
                translateY(calc(var(--radius, 5) * -1ch))
              `,
              transformOrigin: "center",
            } as CSSProperties
          }
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.div>
  );
}
