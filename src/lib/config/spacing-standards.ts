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
    SECTION_VERTICAL: "py-32 sm:py-40", // Consistent section vertical spacing
  },

  // Header spacing
  HEADER: {
    SECTION_MARGIN_BOTTOM: "mb-16 sm:mb-20", // Consistent header bottom margin
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
    SECTION_SPACING: "mb-20", // Standard section spacing
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
 * Helper function to get consistent container classes
 */
export const getContainerClasses = () =>
  SPACING_STANDARDS.PAGE.CONTAINER_PADDING;

/**
 * Helper function to get consistent page wrapper classes
 */
export const getPageWrapperClasses = () =>
  `${SPACING_STANDARDS.PAGE.TOP_PADDING} ${SPACING_STANDARDS.PAGE.BOTTOM_PADDING} ${SPACING_STANDARDS.PAGE.CONTAINER_PADDING}`;

/**
 * Helper function to get page wrapper classes with half-screen top spacing for better UX
 * Used on pages where content should start at approximately half the screen height
 */
export const getHalfScreenPageWrapperClasses = () =>
  `pt-[15vh] sm:pt-[20vh] md:pt-[25vh] ${SPACING_STANDARDS.PAGE.BOTTOM_PADDING} ${SPACING_STANDARDS.PAGE.CONTAINER_PADDING}`;

/**
 * Helper function to get consistent section classes
 */
export const getSectionClasses = () =>
  `${SPACING_STANDARDS.PAGE.SECTION_VERTICAL} relative overflow-hidden`;

/**
 * Helper function to get consistent header classes
 */
export const getHeaderClasses = () =>
  `flex flex-col ${SPACING_STANDARDS.HEADER.SECTION_MARGIN_BOTTOM} relative z-10`;

/**
 * Helper function to get consistent grid classes
 */
export const getGridClasses = (
  size: "small" | "medium" | "large" | "extra-large" = "medium",
) => {
  const gaps = {
    small: SPACING_STANDARDS.GRID.GAP_SMALL,
    medium: SPACING_STANDARDS.GRID.GAP_MEDIUM,
    large: SPACING_STANDARDS.GRID.GAP_LARGE,
    "extra-large": SPACING_STANDARDS.GRID.GAP_EXTRA_LARGE,
  };
  return gaps[size];
};
