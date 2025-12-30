import type { ParticleType } from "@/lib/types/canvas";

/**
 * Particle class for constellation background animation.
 * Handles position, movement, mouse interaction, and rendering.
 */
export class Particle implements ParticleType {
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

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.size = this.baseSize;
        this.speedX = 0;
        this.speedY = 0;
        this.baseOpacity = Math.random() * 0.3 + 0.1;
        this.opacity = this.baseOpacity;
        this.uniqueOffset = Math.random() * Math.PI * 2;
        this.targetX = this.x;
        this.targetY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.05 + 0.02;
        this.mouseInfluence = Math.random() * 0.15 + 0.05;
        this.hue = Math.random() * 60 + 180;
        this.color = this.calculateColor();
        this.setNewTarget();
    }

    calculateColor(): string {
        const saturation = Math.floor(Math.random() * 20 + 60);
        const lightness = Math.floor(Math.random() * 20 + 70);
        return `hsla(${this.hue}, ${saturation}%, ${lightness}%, ${this.opacity})`;
    }

    updateColor(): void {
        this.color = this.calculateColor();
    }

    setNewTarget(): void {
        this.targetX = this.x + (Math.random() - 0.5) * this.width * 0.3;
        this.targetY = this.y + (Math.random() - 0.5) * this.height * 0.3;
        this.targetX = Math.max(0, Math.min(this.width, this.targetX));
        this.targetY = Math.max(0, Math.min(this.height, this.targetY));
        this.hue += Math.random() * 10 - 5;
        if (this.hue < 180) this.hue = 180;
        if (this.hue > 270) this.hue = 270;
        this.updateColor();
        setTimeout(() => this.setNewTarget(), Math.random() * 8000 + 4000);
    }

    update(
        mouseX: number,
        mouseY: number,
        deltaTime: number,
        isHovering: boolean
    ): void {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = this.width / 3.5;

        if (distanceToMouse < mouseRadius && isHovering) {
            const intensity = 1 - distanceToMouse / mouseRadius;
            const attractionStrength = 0.01 + (isHovering ? 0.02 : 0);
            this.targetX += dx * intensity * this.mouseInfluence * attractionStrength;
            this.targetY += dy * intensity * this.mouseInfluence * attractionStrength;
            this.size = this.baseSize * (1 + intensity * 2);
            this.opacity = this.baseOpacity * (1 + intensity * 0.8);
        } else {
            this.size = this.size * 0.92 + this.baseSize * 0.08;
            this.opacity = this.opacity * 0.92 + this.baseOpacity * 0.08;
        }

        this.updateColor();

        const targetDx = this.targetX - this.x;
        const targetDy = this.targetY - this.y;
        this.speedX = this.speedX * 0.92 + targetDx * 0.0004 * deltaTime;
        this.speedY = this.speedY * 0.92 + targetDy * 0.0004 * deltaTime;

        const time = Date.now() * 0.001;
        const waveX = Math.sin(time * 0.3 + this.uniqueOffset) * 0.08;
        const waveY = Math.cos(time * 0.2 + this.uniqueOffset) * 0.08;

        this.angle += this.velocity * 0.01 * deltaTime;
        this.x += this.speedX + Math.cos(this.angle) * 0.05 + waveX;
        this.y += this.speedY + Math.sin(this.angle) * 0.05 + waveY;

        if (this.x < 0 || this.x > this.width) {
            this.speedX *= -0.5;
            this.targetX = this.width / 2;
        }
        if (this.y < 0 || this.y > this.height) {
            this.speedY *= -0.5;
            this.targetY = this.height / 2;
        }

        this.x = Math.max(0, Math.min(this.width, this.x));
        this.y = Math.max(0, Math.min(this.height, this.y));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size * 6
        );

        const baseColor = this.color;
        const transparentColor = baseColor.replace(/[\d.]+\)$/g, "0)");

        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.6, baseColor.replace(/[\d.]+\)$/g, "0.08)"));
        gradient.addColorStop(1, transparentColor);

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = baseColor.replace(/[\d.]+\)$/g, "0.5)");
        ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}
