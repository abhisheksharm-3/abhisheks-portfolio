"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Helper components are defined outside the main component to prevent re-declaration on every render.
const NoiseTexture = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute inset-0 w-full h-full pointer-events-none"
  >
    <svg className="absolute inset-0 w-full h-full opacity-20" style={{ filter: 'contrast(135%) brightness(105%)' }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" seed="5" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.2" intercept="-0.1" />
          <feFuncG type="linear" slope="1.2" intercept="-0.1" />
          <feFuncB type="linear" slope="1.2" intercept="-0.1" />
        </feComponentTransfer>
        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.14 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </motion.div>
);

const ScanLines = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
    <div className="absolute inset-0 scanlines"></div>
    <style jsx>{`
      .scanlines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          to bottom,
          transparent 0px,
          transparent 1px,
          rgba(150, 150, 180, 0.05) 1px,
          rgba(150, 150, 180, 0.05) 2px
        );
      }
    `}</style>
  </div>
);

const InteractiveElement = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
  <div
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{
      backgroundImage: `radial-gradient(
        circle at ${mousePosition.x}px ${mousePosition.y}px,
        rgba(255, 255, 255, 0.03) 0%,
        rgba(255, 255, 255, 0) 30%
      )`,
      mixBlendMode: "screen",
      transition: "background 0.1s ease-out"
    }}
  />
);

export const Background: React.FC = () => {
  // State for declarative UI elements that need to trigger re-renders
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Refs for canvases and high-frequency values to avoid re-rendering the component
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveringRef = useRef(false);
  const scrollYRef = useRef(0);
  const hoveringTimeoutRef = useRef<number>(0);

  // Single effect for setting up all event listeners. Runs only once.
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize(); // Set initial size

    setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      isHoveringRef.current = true;
      clearTimeout(hoveringTimeoutRef.current);
      hoveringTimeoutRef.current = window.setTimeout(() => {
        isHoveringRef.current = false;
      }, 2000);
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(hoveringTimeoutRef.current);
    };
  }, []);

  // Combined animation effect for both canvases. Re-initializes only on resize.
  useEffect(() => {
    const particleCanvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    if (!particleCanvas || !gridCanvas || windowSize.width === 0) return;

    const pCtx = particleCanvas.getContext("2d", { alpha: true });
    const gCtx = gridCanvas.getContext("2d");
    if (!pCtx || !gCtx) return;

    const { width, height } = windowSize;
    particleCanvas.width = width;
    particleCanvas.height = height;
    gridCanvas.width = width;
    gridCanvas.height = height;

    // --- PARTICLE SYSTEM LOGIC ---
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(width * height / 22000, 12), 35);
    const connectionDistance = Math.min(width, height) / 6;

    class Particle {
        x: number; y: number; size: number; baseSize: number; speedX: number; speedY: number; opacity: number; baseOpacity: number; color: string; hue: number; targetX: number; targetY: number; angle: number; velocity: number; mouseInfluence: number; uniqueOffset: number;
        constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.baseSize = Math.random() * 1.5 + 0.5; this.size = this.baseSize; this.speedX = 0; this.speedY = 0; this.baseOpacity = Math.random() * 0.3 + 0.1; this.opacity = this.baseOpacity; this.uniqueOffset = Math.random() * Math.PI * 2; this.targetX = this.x; this.targetY = this.y; this.angle = Math.random() * Math.PI * 2; this.velocity = Math.random() * 0.05 + 0.02; this.mouseInfluence = Math.random() * 0.15 + 0.05; this.hue = Math.random() * 60 + 180; this.color = this.calculateColor(); this.setNewTarget(); }
        calculateColor(): string { const saturation = Math.floor(Math.random() * 20 + 60); const lightness = Math.floor(Math.random() * 20 + 70); return `hsla(${this.hue}, ${saturation}%, ${lightness}%, ${this.opacity})`; }
        updateColor() { this.color = this.calculateColor(); }
        setNewTarget() { this.targetX = this.x + (Math.random() - 0.5) * width * 0.3; this.targetY = this.y + (Math.random() - 0.5) * height * 0.3; this.targetX = Math.max(0, Math.min(width, this.targetX)); this.targetY = Math.max(0, Math.min(height, this.targetY)); this.hue += Math.random() * 10 - 5; if (this.hue < 180) this.hue = 180; if (this.hue > 270) this.hue = 270; this.updateColor(); setTimeout(() => this.setNewTarget(), Math.random() * 8000 + 4000); }
        update(mouseX: number, mouseY: number, deltaTime: number, isHovering: boolean) { const dx = mouseX - this.x; const dy = mouseY - this.y; const distanceToMouse = Math.sqrt(dx * dx + dy * dy); const mouseRadius = width / 3.5; if (distanceToMouse < mouseRadius && isHovering) { const intensity = 1 - distanceToMouse / mouseRadius; const attractionStrength = 0.01 + (isHovering ? 0.02 : 0); this.targetX += dx * intensity * this.mouseInfluence * attractionStrength; this.targetY += dy * intensity * this.mouseInfluence * attractionStrength; this.size = this.baseSize * (1 + intensity * 2); this.opacity = this.baseOpacity * (1 + intensity * 0.8); } else { this.size = this.size * 0.92 + this.baseSize * 0.08; this.opacity = this.opacity * 0.92 + this.baseOpacity * 0.08; } this.updateColor(); const targetDx = this.targetX - this.x; const targetDy = this.targetY - this.y; this.speedX = this.speedX * 0.92 + targetDx * 0.0004 * deltaTime; this.speedY = this.speedY * 0.92 + targetDy * 0.0004 * deltaTime; this.angle += this.velocity * 0.01 * deltaTime; const time = Date.now() * 0.001; const waveX = Math.sin(time * 0.3 + this.uniqueOffset) * 0.08; const waveY = Math.cos(time * 0.2 + this.uniqueOffset) * 0.08; this.x += this.speedX + Math.cos(this.angle) * 0.05 + waveX; this.y += this.speedY + Math.sin(this.angle) * 0.05 + waveY; if (this.x < 0 || this.x > width) { this.speedX *= -0.5; this.targetX = width / 2; } if (this.y < 0 || this.y > height) { this.speedY *= -0.5; this.targetY = height / 2; } this.x = Math.max(0, Math.min(width, this.x)); this.y = Math.max(0, Math.min(height, this.y)); }
        draw() { if (!pCtx) return; const gradient = pCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6); const baseColor = this.color; const transparentColor = baseColor.replace(/[\d.]+\)$/g, "0)"); gradient.addColorStop(0, baseColor); gradient.addColorStop(0.6, baseColor.replace(/[\d.]+\)$/g, "0.08)")); gradient.addColorStop(1, transparentColor); pCtx.fillStyle = gradient; pCtx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2); pCtx.fill(); pCtx.beginPath(); pCtx.fillStyle = baseColor.replace(/[\d.]+\)$/g, "0.5)"); pCtx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2); pCtx.fill(); }
    }
    
    class SpatialHashGrid {
        cellSize: number; grid: Map<string, Particle[]>;
        constructor(cellSize: number) { this.cellSize = cellSize; this.grid = new Map(); }
        getKey(x: number, y: number): string { const gridX = Math.floor(x / this.cellSize); const gridY = Math.floor(y / this.cellSize); return `${gridX},${gridY}`; }
        insert(particle: Particle) { const key = this.getKey(particle.x, particle.y); if (!this.grid.has(key)) { this.grid.set(key, []); } this.grid.get(key)!.push(particle); }
        getNearbyParticles(particle: Particle, radius: number): Particle[] { const nearbyParticles: Particle[] = []; const x = particle.x; const y = particle.y; const minGridX = Math.floor((x - radius) / this.cellSize); const maxGridX = Math.floor((x + radius) / this.cellSize); const minGridY = Math.floor((y - radius) / this.cellSize); const maxGridY = Math.floor((y + radius) / this.cellSize); for (let gridX = minGridX; gridX <= maxGridX; gridX++) { for (let gridY = minGridY; gridY <= maxGridY; gridY++) { const key = `${gridX},${gridY}`; const cell = this.grid.get(key); if (cell) { nearbyParticles.push(...cell); } } } return nearbyParticles; }
        clear() { this.grid.clear(); }
    }

    const drawConnections = () => {
        if (!pCtx) return;
        const grid = new SpatialHashGrid(connectionDistance);
        for (const particle of particles) { grid.insert(particle); }
        for (const particle of particles) {
            const nearbyParticles = grid.getNearbyParticles(particle, connectionDistance);
            for (const otherParticle of nearbyParticles) {
                if (particle === otherParticle) continue;
                const dx = particle.x - otherParticle.x; const dy = particle.y - otherParticle.y; const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2;
                    const gradient = pCtx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y);
                    const color1 = particle.color.replace(/[\d.]+\)$/g, `${opacity})`); const color2 = otherParticle.color.replace(/[\d.]+\)$/g, `${opacity})`);
                    gradient.addColorStop(0, color1); gradient.addColorStop(1, color2);
                    pCtx.beginPath(); pCtx.strokeStyle = gradient; pCtx.lineWidth = Math.min(particle.size, otherParticle.size) * 0.8; pCtx.moveTo(particle.x, particle.y); pCtx.lineTo(otherParticle.x, otherParticle.y); pCtx.stroke();
                    if (particle.size > 1 || otherParticle.size > 1) { pCtx.lineWidth = Math.min(particle.size, otherParticle.size) * 2; pCtx.globalAlpha = 0.05; pCtx.stroke(); pCtx.globalAlpha = 1; }
                }
            }
        }
    };
    
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    // --- GRID SYSTEM LOGIC ---
    const drawGridSystem = (ctx: CanvasRenderingContext2D, timestamp: number, currentMousePos: { x: number; y: number }, currentScrollY: number) => {
        const time = timestamp * 0.0001;
        const parallaxFactor = 0.05;
        const offsetY = currentScrollY * parallaxFactor;
        const goldenRatio = 1.618;
        const breatheFactor = Math.sin(time) * 0.01 + 1;
        const marginX = (width / goldenRatio / 4) * breatheFactor;
        const marginY = (height / goldenRatio / 4) * breatheFactor;
        const mouseInfluenceX = (currentMousePos.x - width/2) * 0.005;
        const mouseInfluenceY = (currentMousePos.y - height/2) * 0.005;
        ctx.strokeStyle = "rgba(150, 150, 180, 0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(marginX + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.5, width - marginX * 2, height - marginY * 2);
        ctx.stroke();
        const goldenX = marginX + (width - marginX * 2) / goldenRatio + Math.sin(time * 1.5) * 2 + mouseInfluenceX * 1.2;
        ctx.beginPath();
        ctx.moveTo(goldenX, marginY + mouseInfluenceY - offsetY * 0.5);
        ctx.lineTo(goldenX, height - marginY + mouseInfluenceY - offsetY * 0.5);
        ctx.stroke();
        const goldenY = marginY + (height - marginY * 2) / goldenRatio + Math.sin(time * 1.3) * 2 + mouseInfluenceY * 1.2 - offsetY * 0.7;
        ctx.beginPath();
        ctx.moveTo(marginX + mouseInfluenceX, goldenY);
        ctx.lineTo(width - marginX + mouseInfluenceX, goldenY);
        ctx.stroke();
        const drawDecorativeElement = (x: number, y: number, angleOffset: number = 0) => {
            const animatedSize = 8 * (1 + Math.sin(time * 2 + angleOffset) * 0.15);
            const rotation = time * 0.2 + angleOffset;
            ctx.strokeStyle = "rgba(150, 150, 180, 0.22)";
            ctx.lineWidth = 0.75;
            ctx.save(); ctx.translate(x, y); ctx.rotate(rotation);
            ctx.beginPath(); ctx.moveTo(0, -animatedSize); ctx.lineTo(animatedSize, 0); ctx.lineTo(0, animatedSize); ctx.lineTo(-animatedSize, 0); ctx.closePath(); ctx.stroke();
            const pulseSize = animatedSize * (0.5 + Math.sin(time * 3 + angleOffset) * 0.15);
            ctx.beginPath(); ctx.arc(0, 0, pulseSize, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = `rgba(150, 150, 180, ${0.25 + Math.sin(time * 4) * 0.1})`;
            ctx.beginPath(); ctx.arc(0, 0, 1.2, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        };
        const cornerPositions = [ { x: marginX + mouseInfluenceX, y: marginY + mouseInfluenceY - offsetY * 0.5, angle: 0 }, { x: width - marginX + mouseInfluenceX, y: marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 0.5 }, { x: marginX + mouseInfluenceX, y: height - marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 1.5 }, { x: width - marginX + mouseInfluenceX, y: height - marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI }, { x: goldenX, y: marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 0.25 }, { x: goldenX, y: height - marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 1.75 }, { x: marginX + mouseInfluenceX, y: goldenY, angle: Math.PI * 1.25 }, { x: width - marginX + mouseInfluenceX, y: goldenY, angle: Math.PI * 0.75 } ];
        cornerPositions.forEach(pos => { drawDecorativeElement(pos.x, pos.y, pos.angle); });
        const columnWidth = (width - 2 * marginX) / 12;
        ctx.strokeStyle = "rgba(150, 150, 180, 0.09)";
        ctx.setLineDash([4, 6]);
        for (let i = 1; i < 12; i++) { if (Math.abs(marginX + i * columnWidth - goldenX) < columnWidth / 2) continue; const offsetX = Math.sin(time * 1.5 + i * 0.5) * 1.5; ctx.beginPath(); ctx.moveTo(marginX + i * columnWidth + offsetX + mouseInfluenceX * (i/6), marginY + mouseInfluenceY - offsetY * 0.6); ctx.lineTo(marginX + i * columnWidth + offsetX + mouseInfluenceX * (i/6), height - marginY + mouseInfluenceY - offsetY * 0.6); ctx.stroke(); }
        const rowHeight = (height - 2 * marginY) / 8;
        for (let i = 1; i < 8; i++) { if (Math.abs(marginY + i * rowHeight - goldenY) < rowHeight / 2) continue; const rowOffsetY = Math.sin(time * 1.2 + i * 0.5) * 1.5; const scrollOffset = currentScrollY * parallaxFactor * (1 - i/8); ctx.beginPath(); ctx.moveTo(marginX + mouseInfluenceX, marginY + i * rowHeight + rowOffsetY + mouseInfluenceY * (i/4) - scrollOffset); ctx.lineTo(width - marginX + mouseInfluenceX, marginY + i * rowHeight + rowOffsetY + mouseInfluenceY * (i/4) - scrollOffset); ctx.stroke(); }
        ctx.setLineDash([]);
        const cropMarkLength = 24 + Math.sin(time * 1.8) * 2;
        ctx.strokeStyle = "rgba(150, 150, 180, 0.22)";
        ctx.lineWidth = 0.75;
        ctx.beginPath(); ctx.moveTo(marginX + mouseInfluenceX, marginY - cropMarkLength + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(marginX + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(marginX - cropMarkLength + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(width - marginX + mouseInfluenceX, marginY - cropMarkLength + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(width - marginX + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(width - marginX + cropMarkLength + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(marginX + mouseInfluenceX, height - marginY + cropMarkLength + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(marginX + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(marginX - cropMarkLength + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(width - marginX + mouseInfluenceX, height - marginY + cropMarkLength + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(width - marginX + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4); ctx.lineTo(width - marginX + cropMarkLength + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4); ctx.stroke();
        const drawAlignmentDots = (x: number, y: number) => { const spacing = 7 + Math.sin(time * 2) * 0.5; const dotOpacity = 0.2 + Math.sin(time * 3 + x * 0.01) * 0.05; ctx.fillStyle = `rgba(150, 150, 180, ${dotOpacity})`; for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) { if (i === 1 && j === 1) continue; const offsetX = Math.sin(time * 2 + i * Math.PI) * 0.5; const offsetY = Math.cos(time * 2 + j * Math.PI) * 0.5; ctx.beginPath(); ctx.arc(x + (j - 1) * spacing + offsetX, y + (i - 1) * spacing + offsetY, 1.2, 0, Math.PI * 2); ctx.fill(); } } ctx.fillStyle = `rgba(150, 150, 180, ${0.3 + Math.sin(time * 4) * 0.1})`; ctx.beginPath(); ctx.arc(x + Math.sin(time * 3) * 1.5, y + Math.cos(time * 3) * 1.5, 2 + Math.sin(time * 5) * 0.5, 0, Math.PI * 2); ctx.fill(); };
        const cornerOffset = offsetY * 0.2;
        drawAlignmentDots(marginX / 2 + mouseInfluenceX * 0.7, marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
        drawAlignmentDots(width - marginX / 2 + mouseInfluenceX * 0.7, marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
        drawAlignmentDots(marginX / 2 + mouseInfluenceX * 0.7, height - marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
        drawAlignmentDots(width - marginX / 2 + mouseInfluenceX * 0.7, height - marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
    };

    // --- SINGLE ANIMATION LOOP ---
    let animationFrameId: number;
    let lastTime = 0;
    const animateAll = (timestamp: number) => {
      const deltaTime = timestamp - lastTime || 16.67;
      lastTime = timestamp;

      // Particle Animation
      pCtx.clearRect(0, 0, width, height);
      const gradient = pCtx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.8);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.04)");
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, width, height);
      drawConnections();
      particles.forEach(p => {
        p.update(mousePosition.x, mousePosition.y, deltaTime, isHoveringRef.current);
        p.draw();
      });

      // Grid Animation
      gCtx.clearRect(0, 0, width, height);
      drawGridSystem(gCtx, timestamp, mousePosition, scrollYRef.current);

      animationFrameId = requestAnimationFrame(animateAll);
    };

    animateAll(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize.width, windowSize.height, mousePosition]); // Rerun effect on resize and use mousePosition for updates

  // Calculate angle for light beams on each render
  const lightBeamAngle = windowSize.width > 0 ? Math.atan2(
    mousePosition.y - windowSize.height / 2,
    mousePosition.x - windowSize.width / 2
  ) * (180 / Math.PI) : 0;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background via-background to-background/90 opacity-80"></div>

      {/* Color Blobs */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3, ease: "easeOut" }} className="absolute top-[5%] left-[15%] w-[35vw] h-[30vw] bg-primary/3 rounded-full blur-[130px]" style={{ transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 70}px)`, transition: "transform 3s ease-out" }} />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3.5, delay: 0.5, ease: "easeOut" }} className="absolute bottom-[10%] right-[12%] w-[32vw] h-[28vw] bg-primary/3 rounded-full blur-[150px]" style={{ transform: `translate(${-mousePosition.x / 60}px, ${-mousePosition.y / 80}px)`, transition: "transform 3.5s ease-out" }} />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 4, delay: 1, ease: "easeOut" }} className="absolute top-[38%] right-[30%] w-[18vw] h-[18vw] bg-secondary/3 rounded-full blur-[120px]" style={{ transform: `translate(${-mousePosition.x / 40}px, ${mousePosition.y / 60}px)`, transition: "transform 2.5s ease-out" }} />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 4.5, delay: 1.5, ease: "easeOut" }} className="absolute top-[65%] left-[25%] w-[22vw] h-[20vw] bg-secondary/2 rounded-full blur-[140px]" style={{ transform: `translate(${mousePosition.x / 55}px, ${-mousePosition.y / 75}px)`, transition: "transform 4s ease-out" }} />

      <NoiseTexture />
      <ScanLines />

      <canvas ref={gridCanvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'normal' }} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" style={{ mixBlendMode: 'screen' }} />

      <InteractiveElement mousePosition={mousePosition} />

      {/* Light Beams */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: `linear-gradient(${lightBeamAngle + 90}deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 60%)`, backgroundSize: "200% 200%", animation: "gradientMove 15s ease infinite" }} />

      <style jsx global>{`
          @keyframes gradientMove {
              0% { background-position: 0% 50% }
              50% { background-position: 100% 50% }
              100% { background-position: 0% 50% }
          }
      `}</style>
    </div>
  );
};