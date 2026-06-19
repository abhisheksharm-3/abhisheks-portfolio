/**
 * Centralized animation configurations for consistent timing and behavior
 * across the entire application
 */

/**
 * Hero section animation configurations
 */
export const HERO_ANIMATIONS = {
  EXPERIENCE_COUNTER_DELAY: 1500,
  COUNTER_INCREMENT_INTERVAL: 300,
  MOUSE_PARALLAX_MULTIPLIER: {
    SMALL: 3,
    MEDIUM: 5,
    LARGE: 8,
    XLARGE: 15,
  },
  SCROLL_BEHAVIOR: "smooth" as const,
} as const;

/**
 * Projects section animation configurations
 */
export const PROJECT_ANIMATIONS = {
  DELAYS: {
    SECTION_HEADER: 0,
    CARD_BASE: 0.2,
    CARD_STAGGER: 0.18,
    CTA: 1.1,
  },
  DURATIONS: {
    FADE_IN: 0.8,
    HOVER_TRANSITION: 0.5,
    SCALE_TRANSITION: 0.7,
  },
} as const;

/**
 * Skills section animation configurations
 */
export const SKILLS_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
} as const;
