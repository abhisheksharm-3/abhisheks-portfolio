/**
 * Scan lines overlay for retro CRT effect.
 */
export const ScanLines = () => (
    <div className="absolute inset-0 size-full pointer-events-none overflow-hidden opacity-5">
        <div
            className="absolute inset-0"
            style={{
                background:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 1px, rgba(150, 150, 180, 0.05) 1px, rgba(150, 150, 180, 0.05) 2px)",
            }}
        />
    </div>
);
