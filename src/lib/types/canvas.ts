/** Position with x and y coordinates */
export interface PositionType {
    x: number;
    y: number;
}

/** Window dimensions */
export interface WindowSizeType {
    width: number;
    height: number;
}

/** Props for mouse-aware components */
export interface MousePositionPropsType {
    mousePosition: PositionType;
}

/** Props for components needing both mouse and window size */
export interface MouseWindowPropsType {
    mousePosition: PositionType;
    windowSize: WindowSizeType;
}

/** Particle interface for canvas animation */
export interface ParticleType {
    x: number;
    y: number;
    size: number;
    baseSize: number;
    speedX: number;
    speedY: number;
    opacity: number;
    baseOpacity: number;
    color: string;
    hue: number;
    targetX: number;
    targetY: number;
    angle: number;
    velocity: number;
    mouseInfluence: number;
    uniqueOffset: number;
    width: number;
    height: number;
    calculateColor(): string;
    updateColor(): void;
    setNewTarget(): void;
    update(mouseX: number, mouseY: number, deltaTime: number, isHovering: boolean): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
