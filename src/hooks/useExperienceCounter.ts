"use client";

import { HERO_ANIMATIONS as ANIMATION_CONFIG } from "@/data/animations";
import { useState, useEffect } from "react";

/**
 * A custom React hook that animates a counter from "00" up to a target value.
 * The animation starts after a specified delay.
 * @returns {string} The current value of the counter, padded with a leading zero.
 */
export const useExperienceCounter = (targetCount: number = 1): string => {
  const [counter, setCounter] = useState("00");

  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setCounter(count.toString().padStart(2, "0"));
        if (count >= targetCount) clearInterval(interval);
      }, ANIMATION_CONFIG.COUNTER_INCREMENT_INTERVAL);

      return () => clearInterval(interval);
    }, ANIMATION_CONFIG.EXPERIENCE_COUNTER_DELAY);

    return () => clearTimeout(timer);
  }, [targetCount]);

  return counter;
};
