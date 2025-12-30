"use client";

import { motion } from "framer-motion";
import type { MousePositionPropsType } from "@/lib/types/canvas";

/**
 * Animated color blobs that respond to mouse movement.
 */
export const ColorBlobs = ({ mousePosition }: MousePositionPropsType) => (
    <>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute top-[5%] left-[15%] w-[35vw] h-[30vw] bg-primary/3 rounded-full blur-[130px]"
            style={{
                transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 70}px)`,
                transition: "transform 3s ease-out",
            }}
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3.5, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-[10%] right-[12%] w-[32vw] h-[28vw] bg-primary/3 rounded-full blur-[150px]"
            style={{
                transform: `translate(${-mousePosition.x / 60}px, ${-mousePosition.y / 80}px)`,
                transition: "transform 3.5s ease-out",
            }}
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 4, delay: 1, ease: "easeOut" }}
            className="absolute top-[38%] right-[30%] w-[18vw] h-[18vw] bg-secondary/3 rounded-full blur-[120px]"
            style={{
                transform: `translate(${-mousePosition.x / 40}px, ${mousePosition.y / 60}px)`,
                transition: "transform 2.5s ease-out",
            }}
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 4.5, delay: 1.5, ease: "easeOut" }}
            className="absolute top-[65%] left-[25%] w-[22vw] h-[20vw] bg-secondary/2 rounded-full blur-[140px]"
            style={{
                transform: `translate(${mousePosition.x / 55}px, ${-mousePosition.y / 75}px)`,
                transition: "transform 4s ease-out",
            }}
        />
    </>
);
