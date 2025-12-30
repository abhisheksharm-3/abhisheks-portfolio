import { Particle } from "./particle";
import { SpatialHashGrid } from "./spatial-hash-grid";
import type { PositionType } from "@/lib/types/canvas";

/**
 * Draws connections between nearby particles with gradient lines.
 * @param ctx - Canvas rendering context
 * @param particles - Array of particles to connect
 * @param connectionDistance - Maximum distance for connections
 */
export function drawConnections(
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    connectionDistance: number
): void {
    const grid = new SpatialHashGrid(connectionDistance);
    for (const p of particles) grid.insert(p);

    for (const p of particles) {
        const nearby = grid.getNearbyParticles(p, connectionDistance);
        for (const other of nearby) {
            if (p === other) continue;

            const dist = Math.hypot(p.x - other.x, p.y - other.y);
            if (dist < connectionDistance) {
                const opacity = (1 - dist / connectionDistance) * 0.2;
                const grad = ctx.createLinearGradient(p.x, p.y, other.x, other.y);
                const c1 = p.color.replace(/[\d.]+\)$/g, `${opacity})`);
                const c2 = other.color.replace(/[\d.]+\)$/g, `${opacity})`);
                grad.addColorStop(0, c1);
                grad.addColorStop(1, c2);

                ctx.beginPath();
                ctx.strokeStyle = grad;
                ctx.lineWidth = Math.min(p.size, other.size) * 0.8;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
    }
}

/**
 * Draws a golden ratio grid system with parallax and mouse effects.
 * @param ctx - Canvas rendering context
 * @param width - Canvas width
 * @param height - Canvas height
 * @param scrollY - Current scroll position
 * @param mousePosition - Current mouse position
 * @param timestamp - Animation timestamp
 */
export function drawGridSystem(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    scrollY: number,
    mousePosition: PositionType,
    timestamp: number
): void {
    const time = timestamp * 0.0001;
    const parallaxFactor = 0.05;
    const offsetY = scrollY * parallaxFactor;
    const goldenRatio = 1.618;
    const breatheFactor = Math.sin(time) * 0.01 + 1;
    const marginX = (width / goldenRatio / 4) * breatheFactor;
    const marginY = (height / goldenRatio / 4) * breatheFactor;
    const mouseInfluenceX = (mousePosition.x - width / 2) * 0.005;
    const mouseInfluenceY = (mousePosition.y - height / 2) * 0.005;

    ctx.strokeStyle = "rgba(150, 150, 180, 0.18)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.rect(
        marginX + mouseInfluenceX,
        marginY + mouseInfluenceY - offsetY * 0.5,
        width - marginX * 2,
        height - marginY * 2
    );
    ctx.stroke();

    const goldenX =
        marginX +
        (width - marginX * 2) / goldenRatio +
        Math.sin(time * 1.5) * 2 +
        mouseInfluenceX * 1.2;

    ctx.beginPath();
    ctx.moveTo(goldenX, marginY + mouseInfluenceY - offsetY * 0.5);
    ctx.lineTo(goldenX, height - marginY + mouseInfluenceY - offsetY * 0.5);
    ctx.stroke();

    const goldenY =
        marginY +
        (height - marginY * 2) / goldenRatio +
        Math.sin(time * 1.3) * 2 +
        mouseInfluenceY * 1.2 -
        offsetY * 0.7;

    ctx.beginPath();
    ctx.moveTo(marginX + mouseInfluenceX, goldenY);
    ctx.lineTo(width - marginX + mouseInfluenceX, goldenY);
    ctx.stroke();
}
