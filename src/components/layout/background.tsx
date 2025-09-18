"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// =================================================================================================
// #region CONFIGURATION & CONSTANTS
// =================================================================================================

const PARTICLE_CONFIG = { DENSITY_FACTOR: 22000, MAX_PARTICLES: 40, MIN_PARTICLES: 15, CONNECTION_DISTANCE_SCALE: 1 / 6 };
const GRID_CONFIG = { GOLDEN_RATIO: 1.618 };
const STAR_CONFIG = { COUNT: 100, PARALLAX_FACTOR: 0.02 };
const GRAVITY_WELL_STRENGTH = 80;

// #endregion

// =================================================================================================
// #region ANIMATION LOGIC & CLASSES
// =================================================================================================

class Star {
  x: number; y: number; z: number; size: number;
  constructor(width: number, height: number) { this.x = Math.random() * width; this.y = Math.random() * height; this.z = Math.random() * width; this.size = Math.random() * 1.5 + 0.5; }
  draw(ctx: CanvasRenderingContext2D, width: number, height: number, mouse: { x: number; y: number }, scrollY: number) {
    const parallaxX = (mouse.x - width / 2) * (this.z / width) * STAR_CONFIG.PARALLAX_FACTOR;
    const parallaxY = (mouse.y - height / 2) * (this.z / height) * STAR_CONFIG.PARALLAX_FACTOR;
    const scrollParallax = scrollY * STAR_CONFIG.PARALLAX_FACTOR * (this.z / width);
    const screenX = (this.x - parallaxX) % width;
    const screenY = (this.y - parallaxY - scrollParallax) % height;
    ctx.beginPath();
    ctx.arc(screenX < 0 ? screenX + width : screenX, screenY < 0 ? screenY + height : screenY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 180, 200, ${this.z / width})`;
    ctx.fill();
  }
}

class Particle {
  x: number; y: number; size: number; baseSize: number; speedX: number; speedY: number; opacity: number; baseOpacity: number; color: string; hue: number; targetX: number; targetY: number; uniqueOffset: number; mouseInfluence: number; width: number; height: number;
  constructor(width: number, height: number) { this.width = width; this.height = height; this.x = Math.random() * width; this.y = Math.random() * height; this.baseSize = Math.random() * 1.5 + 0.5; this.size = this.baseSize; this.speedX = 0; this.speedY = 0; this.baseOpacity = Math.random() * 0.3 + 0.1; this.opacity = this.baseOpacity; this.uniqueOffset = Math.random() * Math.PI * 2; this.targetX = this.x; this.targetY = this.y; this.mouseInfluence = Math.random() * 0.15 + 0.05; this.hue = 225; this.color = ""; }
  calculateColor(): string { return `hsla(${this.hue}, 70%, 70%, ${this.opacity})`; }
  update(mouse: { x: number; y: number }, isHovering: boolean, isMouseDown: boolean, deltaTime: number) { if (isMouseDown) { const dx = this.width / 2 - this.x; const dy = this.height / 2 - this.y; const distance = Math.hypot(dx, dy); const force = Math.min(GRAVITY_WELL_STRENGTH / (distance * distance), 0.5); this.speedX += dx * force * 0.1; this.speedY += dy * force * 0.1; } else { const targetDx = this.targetX - this.x; const targetDy = this.targetY - this.y; this.speedX += targetDx * 0.0004 * deltaTime; this.speedY += targetDy * 0.0004 * deltaTime; } const dxMouse = mouse.x - this.x; const dyMouse = mouse.y - this.y; const distMouse = Math.hypot(dxMouse, dyMouse); const mouseRadius = this.width / 3.5; if (distMouse < mouseRadius && isHovering) { const intensity = 1 - distMouse / mouseRadius; this.speedX -= dxMouse * intensity * 0.01; this.speedY -= dyMouse * intensity * 0.01; this.size = this.baseSize * (1 + intensity * 2); this.opacity = this.baseOpacity * (1 + intensity * 0.8); } else { this.size += (this.baseSize - this.size) * 0.08; this.opacity += (this.baseOpacity - this.opacity) * 0.08; } this.hue = 180 + (mouse.x / this.width) * 90; this.speedX *= 0.92; this.speedY *= 0.92; this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > this.width) this.speedX *= -0.5; if (this.y < 0 || this.y > this.height) this.speedY *= -0.5; }
  draw(ctx: CanvasRenderingContext2D) { this.color = this.calculateColor(); const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6); gradient.addColorStop(0, this.color); gradient.addColorStop(1, this.color.replace(/, [\d.]+\)$/g, ", 0)")); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2); ctx.fill(); }
}

function drawConnections(ctx: CanvasRenderingContext2D, particles: Particle[], connectionDistance: number) { for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const p1 = particles[i]; const p2 = particles[j]; const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y); if (distance < connectionDistance) { const opacity = (1 - distance / connectionDistance) * 0.2; ctx.strokeStyle = `rgba(150, 150, 180, ${opacity})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); } } } }
function drawGridSystem(ctx: CanvasRenderingContext2D, viewport: { width: number; height: number; mouse: { x: number; y: number }; }, timestamp: number) {
  const { width, height, mouse } = viewport;
  const time = timestamp * 0.0001;
  
  const breatheFactor = Math.sin(time) * 0.01 + 1;
  const marginX = (width / GRID_CONFIG.GOLDEN_RATIO / 4) * breatheFactor;
  const marginY = (height / GRID_CONFIG.GOLDEN_RATIO / 4) * breatheFactor;
  
  ctx.strokeStyle = "rgba(150, 150, 180, 0.1)";
  ctx.lineWidth = 1;

  const warpStrength = 100;
  const warpRadius = 200;
  const segments = 20;

  const drawWarpedLine = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;
      const dist = Math.hypot(px - mouse.x, py - mouse.y);
      let warpX = 0;
      let warpY = 0;
      if (dist < warpRadius) {
        const angle = Math.atan2(py - mouse.y, px - mouse.x);
        const force = (1 - dist / warpRadius) * warpStrength;
        warpX = Math.cos(angle) * force;
        warpY = Math.sin(angle) * force;
      }
      ctx.lineTo(px + warpX, py + warpY);
    }
    ctx.stroke();
  };

  const cols = 12;
  const rows = 8;
  const colWidth = (width - marginX * 2) / cols;
  const rowHeight = (height - marginY * 2) / rows;
  for (let i = 0; i <= cols; i++) { drawWarpedLine(marginX + i * colWidth, marginY, marginX + i * colWidth, height - marginY); }
  for (let i = 0; i <= rows; i++) { drawWarpedLine(marginX, marginY + i * rowHeight, width - marginX, marginY + i * rowHeight); }
}

// #endregion

// =================================================================================================
// #region CUSTOM HOOKS
// =================================================================================================

function useViewport() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const viewportRef = useRef({ mouse: { x: 0, y: 0 }, scrollY: 0, isHovering: false, isMouseDown: false });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    viewportRef.current.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const hoveringTimeoutRef = { current: 0 };
    const handleMouseMove = (e: MouseEvent) => { viewportRef.current.mouse = { x: e.clientX, y: e.clientY }; viewportRef.current.isHovering = true; clearTimeout(hoveringTimeoutRef.current); hoveringTimeoutRef.current = window.setTimeout(() => { viewportRef.current.isHovering = false; }, 2000); };
    const handleScroll = () => { viewportRef.current.scrollY = window.scrollY; };
    const handleMouseDown = () => { viewportRef.current.isMouseDown = true; };
    const handleMouseUp = () => { viewportRef.current.isMouseDown = false; };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(hoveringTimeoutRef.current);
    };
  }, []);

  return { ...size, viewportRef };
}

const useCanvasAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>, draw: (ctx: CanvasRenderingContext2D, timestamp: number) => void) => {
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let animationFrameId: number;
    const animate = (timestamp: number) => { drawRef.current(ctx, timestamp); animationFrameId = requestAnimationFrame(animate); };
    animate(0);
    return () => cancelAnimationFrame(animationFrameId);
  }, [canvasRef]);
};

// #endregion

// =================================================================================================
// #region HELPER COMPONENTS
// =================================================================================================

const NoiseTexture = () => (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 size-full pointer-events-none"><svg className="absolute inset-0 size-full opacity-20"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noise)" /></svg></motion.div>);
const ColorBlobs = ({ mouse }: { mouse: { x: number; y: number } }) => (<><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="absolute top-[5%] left-[15%] w-[35vw] h-[30vw] bg-primary/20 rounded-full blur-[130px]" style={{ transform: `translate(${mouse.x / 50}px, ${mouse.y / 70}px)`, transition: "transform 3s ease-out" }} /><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3.5, delay: 0.5 }} className="absolute bottom-[10%] right-[12%] w-[32vw] h-[28vw] bg-primary/20 rounded-full blur-[150px]" style={{ transform: `translate(${-mouse.x / 60}px, ${-mouse.y / 80}px)`, transition: "transform 3.5s ease-out" }} /></>);

// #endregion

// =================================================================================================
// #region MAIN COMPONENT
// =================================================================================================

export function Background() {
  const { width, height, viewportRef } = useViewport();
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const starfieldCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (width > 0 && height > 0) {
      const particleCount = Math.min(Math.max(width * height / PARTICLE_CONFIG.DENSITY_FACTOR, PARTICLE_CONFIG.MIN_PARTICLES), PARTICLE_CONFIG.MAX_PARTICLES);
      setParticles(Array.from({ length: particleCount }, () => new Particle(width, height)));
      setStars(Array.from({ length: STAR_CONFIG.COUNT }, () => new Star(width, height)));
      if (mousePosition.x === 0) setMousePosition({ x: width / 2, y: height / 2 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  useEffect(() => {
    const updateMouse = () => { setMousePosition(viewportRef.current.mouse); requestAnimationFrame(updateMouse); };
    const frameId = requestAnimationFrame(updateMouse);
    return () => cancelAnimationFrame(frameId);
  }, [viewportRef]);

  const drawParticles = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    const { mouse, isHovering, isMouseDown } = viewportRef.current;
    const connectionDistance = Math.min(width, height) * PARTICLE_CONFIG.CONNECTION_DISTANCE_SCALE;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => p.update(mouse, isHovering, isMouseDown, timestamp));
    drawConnections(ctx, particles, connectionDistance);
    particles.forEach(p => p.draw(ctx));
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, timestamp: number) => {
    ctx.clearRect(0, 0, width, height);
    if (width > 0) { drawGridSystem(ctx, { width, height, mouse: viewportRef.current.mouse }, timestamp); }
  };
  
  const drawStarfield = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, width, height);
      if (width > 0) { stars.forEach(s => s.draw(ctx, width, height, viewportRef.current.mouse, viewportRef.current.scrollY)); }
  };

  useEffect(() => {
    const canvases = [particleCanvasRef.current, gridCanvasRef.current, starfieldCanvasRef.current];
    canvases.forEach(canvas => { if (canvas) { canvas.width = width; canvas.height = height; } });
  }, [width, height]);

  useCanvasAnimation(particleCanvasRef, drawParticles);
  useCanvasAnimation(gridCanvasRef, drawGrid);
  useCanvasAnimation(starfieldCanvasRef, drawStarfield);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <canvas ref={starfieldCanvasRef} className="absolute inset-0 size-full opacity-70" />
      <ColorBlobs mouse={mousePosition} />
      <NoiseTexture />
      <canvas ref={gridCanvasRef} className="absolute inset-0 size-full" style={{ mixBlendMode: 'soft-light' }} />
      <canvas ref={particleCanvasRef} className="absolute inset-0 size-full" style={{ mixBlendMode: 'screen' }} />
    </div>
  );
}

// #endregion