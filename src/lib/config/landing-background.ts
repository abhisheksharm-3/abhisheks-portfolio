/**
 * Defines the positions for the asymmetrical background grid used across the site.
 */
export const SHARED_GRID_CONFIG = {
  vertical: [
    { left: '13%', className: 'bg-primary/30' },
    { left: '28%', className: 'bg-primary/10' },
    { left: '67%', className: 'bg-primary/20' },
    { left: '89%', className: 'bg-primary/15' },
  ],
  horizontal: [
    { top: '22%', className: 'bg-primary/25' },
    { top: '58%', className: 'bg-primary/10' },
    { top: '81%', className: 'bg-primary/20' },
  ],
} as const;

/**
 * A collection of predefined SVG path data for decorative elements.
 */
export const SHARED_SVG_PATHS = {
  flowing: "M10,30 C20,50 40,10 50,40 S80,20 90,40",
  curved: "M10,50 Q40,20 50,50 T90,30",
  default: "M30,20 Q50,10 70,30 T90,50"
} as const;