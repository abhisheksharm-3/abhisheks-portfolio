import type { MouseWindowPropsType } from "@/lib/types/canvas";

/**
 * Animated light beams that rotate based on mouse position.
 */
export const LightBeams = ({ mousePosition, windowSize }: MouseWindowPropsType) => {
    const angle =
        windowSize.width > 0
            ? Math.atan2(
                mousePosition.y - windowSize.height / 2,
                mousePosition.x - windowSize.width / 2
            ) *
            (180 / Math.PI)
            : 0;

    return (
        <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(${angle + 90}deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)`,
                backgroundSize: "200% 200%",
                animation: "gradientMove 15s ease infinite",
            }}
        >
            <style>{`@keyframes gradientMove { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }`}</style>
        </div>
    );
};
