/**
 * Animation variants for Framer Motion, configured for the Skills section.
 * Defines staggered transitions for container and item elements.
 */
export const SKILLS_ANIMATION_CONFIG = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }
};