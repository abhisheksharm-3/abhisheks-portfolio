"use client";

import { useState, useEffect } from 'react';
import { MousePosition } from '@/lib/types';

/**
 * Normalizes the mouse coordinates to a range of -1 to 1.
 * @param {number} clientX - The raw clientX from the mouse event.
 * @param {number} clientY - The raw clientY from the mouse event.
 * @returns {MousePosition} The normalized mouse position.
 */
const normalizeMousePosition = (clientX: number, clientY: number): MousePosition => ({
  x: (clientX / window.innerWidth) * 2 - 1,
  y: (clientY / window.innerHeight) * 2 - 1,
});

/**
 * A custom React hook that tracks the normalized mouse position on the window.
 * The position is normalized to a range from -1 to 1 for both x and y axes.
 * @returns {MousePosition} The current normalized mouse position.
 */
export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedPosition = normalizeMousePosition(e.clientX, e.clientY);
      setMousePosition(normalizedPosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
};