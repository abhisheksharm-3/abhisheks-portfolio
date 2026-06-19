/**
 * Unified spacing standards for consistent visual design across the portfolio.
 * These constants ensure uniform spacing, padding, and margins throughout all components.
 */

export const SPACING_STANDARDS = {
  // Page-level spacing
  PAGE: {
    CONTAINER_PADDING: "px-6 sm:px-8 lg:px-16", // Consistent horizontal padding
    TOP_PADDING: "pt-32", // Consistent top padding for all pages (accounting for navbar)
    BOTTOM_PADDING: "pb-24", // Consistent bottom padding
    SECTION_VERTICAL: "py-20 sm:py-28", // Consistent section vertical spacing
  },

  // Header spacing
  HEADER: {
    SECTION_MARGIN_BOTTOM: "mb-10 sm:mb-12", // Consistent header bottom margin
    TITLE_MARGIN_BOTTOM: "mb-4", // Title bottom margin
    SUBTITLE_MARGIN_TOP: "mt-6", // Subtitle top margin
    ACCENT_LINE_MARGIN: "mt-4", // Accent line top margin
  },

  // Card spacing
  CARD: {
    PADDING: "p-8", // Standard card padding
    PADDING_LARGE: "p-12", // Large card padding
    PADDING_SMALL: "p-6", // Small card padding
    MARGIN_BOTTOM: "mb-8", // Standard card bottom margin
  },

  // Grid spacing
  GRID: {
    GAP_SMALL: "gap-6", // Small grid gap
    GAP_MEDIUM: "gap-8", // Medium grid gap (standard)
    GAP_LARGE: "gap-10", // Large grid gap
    GAP_EXTRA_LARGE: "gap-12", // Extra large grid gap
  },

  // Content spacing
  CONTENT: {
    SECTION_SPACING: "mb-12", // Standard section spacing
    PARAGRAPH_SPACING: "mb-6", // Standard paragraph spacing
    LIST_SPACING: "space-y-6", // Standard list item spacing
    SMALL_SPACING: "mb-4", // Small spacing
  },

  // Animation delays for consistent staggered animations
  ANIMATION: {
    STAGGER_DELAY: 0.15, // Standard stagger delay between items
    SECTION_DELAY: 0.3, // Delay for section animations
    ITEM_DELAY: 0.6, // Delay for individual item animations
  },
} as const;

/**
 * Helper function to get consistent section classes
 */
export const getSectionClasses = () =>
  `${SPACING_STANDARDS.PAGE.SECTION_VERTICAL} relative overflow-hidden`;
