/**
 * Configuration for animation timings and behaviors throughout the application.
 */
export const ANIMATION_CONFIG = {
  EXPERIENCE_COUNTER_DELAY: 1500,
  COUNTER_INCREMENT_INTERVAL: 300,
  MOUSE_PARALLAX_MULTIPLIER: {
    SMALL: 3,
    MEDIUM: 5,
    LARGE: 8,
    XLARGE: 15,
  },
  SCROLL_BEHAVIOR: "smooth" as const,
};

/**
 * A constant array of skills to be displayed in the Hero section.
 * Using 'as const' provides stricter type-checking.
 */
export const SKILLS = [
  "Frontend Engineering (React & Next.js)",
  "Backend & APIs (Node.js, Go, FastAPI)",
  "Cloud & DevOps (AWS, Docker, Firebase)",
  "Mobile Development (Jetpack Compose, React Native)",
] as const;
