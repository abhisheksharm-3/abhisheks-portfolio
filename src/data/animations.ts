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
 * Philosophy section animation configurations
 */
export const PHILOSOPHY_ANIMATIONS = {
  section: { duration: 1 },
  header: { duration: 0.8, delay: 0.4 },
  quote: { duration: 0.8, delay: 0.2 },
  decorative: { duration: 0.7, delay: 0.5 },
  description: { duration: 0.7, delay: 0.7 },
  pathAnimation: { duration: 2, delay: 0.5 },
} as const;

/**
 * Contact section animation configurations
 */
export const CONTACT_ANIMATIONS = {
  section: { duration: 1 },
  header: { duration: 0.8, delay: 0.4 },
  content: { duration: 0.8, delay: 0.3 },
  buttons: { duration: 0.5, delay: 0.6 },
  contactInfo: { duration: 0.8, delay: 0.9 },
  channels: { duration: 0.8, delay: 1 },
  channelItem: { duration: 0.5, baseDelay: 1.1, stagger: 0.1 },
  pathAnimation: { duration: 2, delay: 0.5 },
  hoverTransition: { duration: 0.8 },
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

/**
 * Global animation defaults for consistency
 */
export const GLOBAL_ANIMATIONS = {
  STAGGER_DELAY: 0.15,
  SECTION_DELAY: 0.3,
  ITEM_DELAY: 0.6,
  DEFAULT_DURATION: 0.8,
  DEFAULT_EASE: "easeOut" as const,
} as const;
