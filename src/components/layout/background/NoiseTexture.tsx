"use client";

import { motion } from "framer-motion";

/**
 * SVG noise texture overlay for adding grain effect to background.
 */
export const NoiseTexture = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 size-full pointer-events-none"
    >
        <svg
            className="absolute inset-0 size-full opacity-20"
            style={{ filter: "contrast(135%) brightness(105%)" }}
        >
            <filter id="noise">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                    seed="5"
                />
                <feComponentTransfer>
                    <feFuncR type="linear" slope="1.2" intercept="-0.1" />
                    <feFuncG type="linear" slope="1.2" intercept="-0.1" />
                    <feFuncB type="linear" slope="1.2" intercept="-0.1" />
                </feComponentTransfer>
                <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.14 0"
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
    </motion.div>
);
