import type { MousePositionPropsType } from "@/lib/types/canvas";

/**
 * Interactive radial gradient that follows mouse cursor.
 */
export const InteractiveElement = ({ mousePosition }: MousePositionPropsType) => (
    <div
        className="absolute inset-0 size-full pointer-events-none"
        style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03) 0%, transparent 30%)`,
            mixBlendMode: "screen",
            transition: "background 0.1s ease-out",
        }}
    />
);
