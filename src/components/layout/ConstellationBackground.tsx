"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// =================================================================================================
// #region ANIMATION LOGIC & CLASSES (Preserved from original)
// =================================================================================================

class Particle {
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
  updateColor() {
    this.color = this.calculateColor();
  }
  setNewTarget() {
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
    isHovering: boolean,
  ) {
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
  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) return;
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 6,
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
class SpatialHashGrid {
  cellSize: number;
  grid: Map<string, Particle[]>;
  constructor(cellSize: number) {
    this.cellSize = cellSize;
    this.grid = new Map();
  }
  getKey(x: number, y: number): string {
    return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
  }
  insert(particle: Particle) {
    const key = this.getKey(particle.x, particle.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(particle);
  }
  getNearbyParticles(particle: Particle, radius: number): Particle[] {
    const nearby: Particle[] = [];
    const { x, y } = particle;
    const minGridX = Math.floor((x - radius) / this.cellSize);
    const maxGridX = Math.floor((x + radius) / this.cellSize);
    const minGridY = Math.floor((y - radius) / this.cellSize);
    const maxGridY = Math.floor((y + radius) / this.cellSize);
    for (let gridX = minGridX; gridX <= maxGridX; gridX++) {
      for (let gridY = minGridY; gridY <= maxGridY; gridY++) {
        const cell = this.grid.get(`${gridX},${gridY}`);
        if (cell) nearby.push(...cell);
      }
    }
    return nearby;
  }
  clear() {
    this.grid.clear();
  }
}
function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  connectionDistance: number,
) {
  if (!ctx) return;
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
function drawGridSystem(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scrollY: number,
  mousePosition: { x: number; y: number },
  timestamp: number,
) {
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
    height - marginY * 2,
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

// #endregion

// =================================================================================================
// #region HELPER COMPONENTS (Declarative Layers)
// =================================================================================================

const NoiseTexture = () => (
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
const ScanLines = () => (
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
const InteractiveElement = ({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) => (
  <div
    className="absolute inset-0 size-full pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03) 0%, transparent 30%)`,
      mixBlendMode: "screen",
      transition: "background 0.1s ease-out",
    }}
  />
);
const ColorBlobs = ({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) => (
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
const LightBeams = ({
  mousePosition,
  windowSize,
}: {
  mousePosition: { x: number; y: number };
  windowSize: { width: number; height: number };
}) => {
  const angle =
    windowSize.width > 0
      ? Math.atan2(
          mousePosition.y - windowSize.height / 2,
          mousePosition.x - windowSize.width / 2,
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

// #endregion

// =================================================================================================
// #region MAIN COMPONENT
// =================================================================================================

export function ConstellationBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const isHoveringRef = useRef(false);

  /** Sets up all window event listeners once on component mount. */
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const hoveringTimeoutRef = { current: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      isHoveringRef.current = true;
      clearTimeout(hoveringTimeoutRef.current);
      hoveringTimeoutRef.current = window.setTimeout(() => {
        isHoveringRef.current = false;
      }, 2000);
    };

    // Set initial position
    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hoveringTimeoutRef.current);
    };
  }, []);

  /** Manages the animation loops for both canvases, re-initializing only on resize. */
  useEffect(() => {
    const particleCanvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    if (!particleCanvas || !gridCanvas || windowSize.width === 0) return;

    const pCtx = particleCanvas.getContext("2d", { alpha: true });
    const gCtx = gridCanvas.getContext("2d");
    if (!pCtx || !gCtx) return;

    particleCanvas.width = windowSize.width;
    particleCanvas.height = windowSize.height;
    gridCanvas.width = windowSize.width;
    gridCanvas.height = windowSize.height;

    const particleCount = Math.min(
      Math.max((windowSize.width * windowSize.height) / 22000, 12),
      35,
    );
    const connectionDistance =
      Math.min(windowSize.width, windowSize.height) / 6;
    const particles = Array.from(
      { length: particleCount },
      () => new Particle(windowSize.width, windowSize.height),
    );

    let animationFrameId: number;
    let lastTime = 0;
    const animateAll = (timestamp: number) => {
      const deltaTime = timestamp - lastTime || 16.67;
      lastTime = timestamp;

      // Particle Animation
      pCtx.clearRect(0, 0, windowSize.width, windowSize.height);
      drawConnections(pCtx, particles, connectionDistance);
      particles.forEach((p) => {
        p.update(
          mousePosition.x,
          mousePosition.y,
          deltaTime,
          isHoveringRef.current,
        );
        p.draw(pCtx);
      });

      // Grid Animation
      gCtx.clearRect(0, 0, windowSize.width, windowSize.height);
      drawGridSystem(
        gCtx,
        windowSize.width,
        windowSize.height,
        scrollYRef.current,
        mousePosition,
        timestamp,
      );

      animationFrameId = requestAnimationFrame(animateAll);
    };

    animateAll(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize, mousePosition.x, mousePosition.y]); // Kept mouse dependencies as requested

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background via-background to-background/90 opacity-80" />
      <ColorBlobs mousePosition={mousePosition} />
      <NoiseTexture />
      <ScanLines />
      <canvas
        ref={gridCanvasRef}
        className="absolute inset-0 size-full"
        style={{ mixBlendMode: "normal" }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full opacity-90"
        style={{ mixBlendMode: "screen" }}
      />
      <InteractiveElement mousePosition={mousePosition} />
      <LightBeams mousePosition={mousePosition} windowSize={windowSize} />
    </div>
  );
}

// #endregion
