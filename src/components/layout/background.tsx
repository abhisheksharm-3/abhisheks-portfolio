"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  // Reference to store timeout ID for TypeScript error fix
  const hoveringTimeoutRef = useRef<number>(2000);
  
  // Initialize window size on mount
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);
  
  // Track mouse position and scroll for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Set hovering state based on mouse movement velocity
      setIsHovering(true);
      clearTimeout(hoveringTimeoutRef.current);
      hoveringTimeoutRef.current = window.setTimeout(() => setIsHovering(false), 2000);
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Initial position in center if no movement yet
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(hoveringTimeoutRef.current);
    };
  }, [mousePosition.x, mousePosition.y]);

  // Advanced particle system with interactive elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let lastTime = 0;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Enhanced particle system with connections and mouse interactivity
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.max(width * height / 22000, 12), 35); // Responsive count based on screen size
    const connectionDistance = Math.min(width, height) / 6;
    
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
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.size = this.baseSize;
        this.speedX = 0;
        this.speedY = 0;
        this.baseOpacity = Math.random() * 0.3 + 0.1;
        this.opacity = this.baseOpacity;
        this.uniqueOffset = Math.random() * Math.PI * 2;
        
        // Target-based smooth movement with slight random motion
        this.targetX = this.x;
        this.targetY = this.y;
        
        // Add slight circular motion
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.05 + 0.02;
        
        // Mouse influence factor (varies by particle)
        this.mouseInfluence = Math.random() * 0.15 + 0.05;
        
        // Dynamic colors with hue value for transitions
        this.hue = Math.random() * 60 + 180; // Blue to purple spectrum
        
        // Initialize color
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
        // Set a new target within a reasonable distance
        this.targetX = this.x + (Math.random() - 0.5) * width * 0.3;
        this.targetY = this.y + (Math.random() - 0.5) * height * 0.3;
        
        // Keep targets within bounds
        this.targetX = Math.max(0, Math.min(width, this.targetX));
        this.targetY = Math.max(0, Math.min(height, this.targetY));
        
        // Gradually shift hue for color transitions
        this.hue += Math.random() * 10 - 5;
        if (this.hue < 180) this.hue = 180;
        if (this.hue > 270) this.hue = 270;
        this.updateColor();
        
        // Schedule next target change with variable timing
        setTimeout(() => this.setNewTarget(), Math.random() * 8000 + 4000);
      }
      
      update(mouseX: number, mouseY: number, deltaTime: number, isHovering: boolean) {
        // Calculate distance to mouse for interactive effects
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = width / 3.5; // Area of influence
        
        if (distanceToMouse < mouseRadius && isHovering) {
          // Enhanced attraction to mouse position when actively moving
          const intensity = 1 - distanceToMouse / mouseRadius;
          const attractionStrength = 0.01 + (isHovering ? 0.02 : 0);
          
          this.targetX += dx * intensity * this.mouseInfluence * attractionStrength;
          this.targetY += dy * intensity * this.mouseInfluence * attractionStrength;
          
          // Temporarily increase size and opacity when near mouse
          this.size = this.baseSize * (1 + intensity * 2);
          this.opacity = this.baseOpacity * (1 + intensity * 0.8);
        } else {
          // Return to base values when away from mouse
          this.size = this.size * 0.92 + this.baseSize * 0.08;
          this.opacity = this.opacity * 0.92 + this.baseOpacity * 0.08;
        }
        
        // Update color based on opacity changes
        this.updateColor();
        
        // Smooth movement toward target with easing
        const targetDx = this.targetX - this.x;
        const targetDy = this.targetY - this.y;
        
        // Gradual speed adjustment for very smooth movement
        this.speedX = this.speedX * 0.92 + targetDx * 0.0004 * deltaTime;
        this.speedY = this.speedY * 0.92 + targetDy * 0.0004 * deltaTime;
        
        // Add slight circular motion for more organic movement
        this.angle += this.velocity * 0.01 * deltaTime;
        
        // Time-based motion with unique offsets for more varied movement
        const time = Date.now() * 0.001;
        const waveX = Math.sin(time * 0.3 + this.uniqueOffset) * 0.08;
        const waveY = Math.cos(time * 0.2 + this.uniqueOffset) * 0.08;
        
        this.x += this.speedX + Math.cos(this.angle) * 0.05 + waveX;
        this.y += this.speedY + Math.sin(this.angle) * 0.05 + waveY;
        
        // Subtle boundary checking with soft bounce
        if (this.x < 0 || this.x > width) {
          this.speedX *= -0.5;
          this.targetX = width / 2;
        }
        if (this.y < 0 || this.y > height) {
          this.speedY *= -0.5;
          this.targetY = height / 2;
        }
        
        // Keep particles within bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }
      
      draw() {
        if (!ctx) return;
        
        // Enhanced glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.size * 6
        );
        const baseColor = this.color;
        const transparentColor = baseColor.replace(/[\d.]+\)$/g, "0)");
        
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.6, baseColor.replace(/[\d.]+\)$/g, "0.08)"));
        gradient.addColorStop(1, transparentColor);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Add small core for more definition
        ctx.beginPath();
        ctx.fillStyle = baseColor.replace(/[\d.]+\)$/g, "0.5)");
        ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Optimized connection drawing with spatial hash grid
    class SpatialHashGrid {
      cellSize: number;
      grid: Map<string, Particle[]>;
      
      constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.grid = new Map();
      }
      
      getKey(x: number, y: number): string {
        const gridX = Math.floor(x / this.cellSize);
        const gridY = Math.floor(y / this.cellSize);
        return `${gridX},${gridY}`;
      }
      
      insert(particle: Particle) {
        const key = this.getKey(particle.x, particle.y);
        if (!this.grid.has(key)) {
          this.grid.set(key, []);
        }
        this.grid.get(key)!.push(particle);
      }
      
      getNearbyParticles(particle: Particle, radius: number): Particle[] {
        const nearbyParticles: Particle[] = [];
        const x = particle.x;
        const y = particle.y;
        
        // Get cells that could contain particles within radius
        const minGridX = Math.floor((x - radius) / this.cellSize);
        const maxGridX = Math.floor((x + radius) / this.cellSize);
        const minGridY = Math.floor((y - radius) / this.cellSize);
        const maxGridY = Math.floor((y + radius) / this.cellSize);
        
        for (let gridX = minGridX; gridX <= maxGridX; gridX++) {
          for (let gridY = minGridY; gridY <= maxGridY; gridY++) {
            const key = `${gridX},${gridY}`;
            const cell = this.grid.get(key);
            
            if (cell) {
              nearbyParticles.push(...cell);
            }
          }
        }
        
        return nearbyParticles;
      }
      
      clear() {
        this.grid.clear();
      }
    }
    
    // Draw connections between nearby particles with spatial optimization
    const drawConnections = () => {
      if (!ctx) return;
      
      // Use spatial hash grid for efficient neighbor finding
      const grid = new SpatialHashGrid(connectionDistance);
      
      // Insert particles into grid
      for (const particle of particles) {
        grid.insert(particle);
      }
      
      // Check connections with nearby particles only
      for (const particle of particles) {
        const nearbyParticles = grid.getNearbyParticles(particle, connectionDistance);
        
        for (const otherParticle of nearbyParticles) {
          // Skip same particle
          if (particle === otherParticle) continue;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Enhanced connection visuals
            const opacity = (1 - distance / connectionDistance) * 0.2;
            
            // Create gradient line between particles
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            
            // Extract color information from both particles
            const color1 = particle.color.replace(/[\d.]+\)$/g, `${opacity})`);
            const color2 = otherParticle.color.replace(/[\d.]+\)$/g, `${opacity})`);
            
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(particle.size, otherParticle.size) * 0.8;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            
            // Add subtle glow to connections for certain particles
            if (particle.size > 1 || otherParticle.size > 1) {
              ctx.lineWidth = Math.min(particle.size, otherParticle.size) * 2;
              ctx.globalAlpha = 0.05;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }
    };
    
    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime || 16;
      lastTime = timestamp;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw soft vignette
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.8
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.04)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw connections between particles
      drawConnections();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(mousePosition.x, mousePosition.y, deltaTime, isHovering);
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isHovering]);

  // Enhanced grid system with animation and parallax effects
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let time = 0;
    
    const drawGrid = (timestamp: number) => {
      time = timestamp * 0.0001; // Slow time factor for subtle animation
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Calculate parallax offset based on scroll position
      const parallaxFactor = 0.05;
      const offsetY = scrollY * parallaxFactor;
      
      // Define golden ratio
      const goldenRatio = 1.618;
      
      // Main margins based on golden ratio with breathing effect
      const breatheFactor = Math.sin(time) * 0.01 + 1;
      const marginX = (width / goldenRatio / 4) * breatheFactor;
      const marginY = (height / goldenRatio / 4) * breatheFactor;
      
      // Apply subtle mouse influence
      const mouseInfluenceX = (mousePosition.x - width/2) * 0.005;
      const mouseInfluenceY = (mousePosition.y - height/2) * 0.005;
      
      // Draw outer frame (margin guides) - with improved aesthetics
      ctx.strokeStyle = "rgba(150, 150, 180, 0.18)";
      ctx.lineWidth = 1;
      
      // Outer frame with subtle distortion
      ctx.beginPath();
      ctx.rect(
        marginX + mouseInfluenceX, 
        marginY + mouseInfluenceY - offsetY * 0.5, 
        width - marginX * 2, 
        height - marginY * 2
      );
      ctx.stroke();
      
      // Main vertical division lines with animation
      const goldenX = marginX + (width - marginX * 2) / goldenRatio + 
                     Math.sin(time * 1.5) * 2 + mouseInfluenceX * 1.2;
      
      ctx.beginPath();
      ctx.moveTo(goldenX, marginY + mouseInfluenceY - offsetY * 0.5);
      ctx.lineTo(goldenX, height - marginY + mouseInfluenceY - offsetY * 0.5);
      ctx.stroke();
      
      // Main horizontal division line with animation
      const goldenY = marginY + (height - marginY * 2) / goldenRatio + 
                     Math.sin(time * 1.3) * 2 + mouseInfluenceY * 1.2 - offsetY * 0.7;
      
      ctx.beginPath();
      ctx.moveTo(marginX + mouseInfluenceX, goldenY);
      ctx.lineTo(width - marginX + mouseInfluenceX, goldenY);
      ctx.stroke();
      
      // Enhanced decorative elements with animation
      const drawDecorativeElement = (
        x: number, 
        y: number, 
        angleOffset: number = 0
      ) => {
        // Calculate animated size and rotation
        const animatedSize = 8 * (1 + Math.sin(time * 2 + angleOffset) * 0.15);
        const rotation = time * 0.2 + angleOffset;
        
        ctx.strokeStyle = "rgba(150, 150, 180, 0.22)";
        ctx.lineWidth = 0.75;
        
        // Save context for rotation
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Diamond
        ctx.beginPath();
        ctx.moveTo(0, -animatedSize);
        ctx.lineTo(animatedSize, 0);
        ctx.lineTo(0, animatedSize);
        ctx.lineTo(-animatedSize, 0);
        ctx.closePath();
        ctx.stroke();
        
        // Circle with pulsing effect
        const pulseSize = animatedSize * (0.5 + Math.sin(time * 3 + angleOffset) * 0.15);
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add a dot in the center with subtle animation
        ctx.fillStyle = `rgba(150, 150, 180, ${0.25 + Math.sin(time * 4) * 0.1})`;
        ctx.beginPath();
        ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Restore context
        ctx.restore();
      };
      
      // Draw decorative elements at key points with offset and animation
      const cornerPositions = [
        { x: marginX + mouseInfluenceX, y: marginY + mouseInfluenceY - offsetY * 0.5, angle: 0 },
        { x: width - marginX + mouseInfluenceX, y: marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 0.5 },
        { x: marginX + mouseInfluenceX, y: height - marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 1.5 },
        { x: width - marginX + mouseInfluenceX, y: height - marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI },
        { x: goldenX, y: marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 0.25 },
        { x: goldenX, y: height - marginY + mouseInfluenceY - offsetY * 0.5, angle: Math.PI * 1.75 },
        { x: marginX + mouseInfluenceX, y: goldenY, angle: Math.PI * 1.25 },
        { x: width - marginX + mouseInfluenceX, y: goldenY, angle: Math.PI * 0.75 }
      ];
      
      cornerPositions.forEach(pos => {
        drawDecorativeElement(pos.x, pos.y, pos.angle);
      });
      
      // Grid columns with parallax effect
      const columnWidth = (width - 2 * marginX) / 12;
      ctx.strokeStyle = "rgba(150, 150, 180, 0.09)";
      ctx.setLineDash([4, 6]);
      
      for (let i = 1; i < 12; i++) {
        if (Math.abs(marginX + i * columnWidth - goldenX) < columnWidth / 2) continue;
        
        const offsetX = Math.sin(time * 1.5 + i * 0.5) * 1.5;
        
        ctx.beginPath();
        ctx.moveTo(
          marginX + i * columnWidth + offsetX + mouseInfluenceX * (i/6), 
          marginY + mouseInfluenceY - offsetY * 0.6
        );
        ctx.lineTo(
          marginX + i * columnWidth + offsetX + mouseInfluenceX * (i/6), 
          height - marginY + mouseInfluenceY - offsetY * 0.6
        );
        ctx.stroke();
      }
      
      // Grid rows with parallax effect
      const rowHeight = (height - 2 * marginY) / 8;
      
      for (let i = 1; i < 8; i++) {
        if (Math.abs(marginY + i * rowHeight - goldenY) < rowHeight / 2) continue;
        
        const offsetY = Math.sin(time * 1.2 + i * 0.5) * 1.5;
        const scrollOffset = scrollY * parallaxFactor * (1 - i/8);
        
        ctx.beginPath();
        ctx.moveTo(
          marginX + mouseInfluenceX, 
          marginY + i * rowHeight + offsetY + mouseInfluenceY * (i/4) - scrollOffset
        );
        ctx.lineTo(
          width - marginX + mouseInfluenceX, 
          marginY + i * rowHeight + offsetY + mouseInfluenceY * (i/4) - scrollOffset
        );
        ctx.stroke();
      }
      
      // Reset line dash
      ctx.setLineDash([]);
      
      // Add page corner crop marks with subtle animation
      const cropMarkLength = 24 + Math.sin(time * 1.8) * 2;
      ctx.strokeStyle = "rgba(150, 150, 180, 0.22)";
      ctx.lineWidth = 0.75;
      
      // Top-left crop marks
      ctx.beginPath();
      ctx.moveTo(marginX + mouseInfluenceX, marginY - cropMarkLength + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(marginX + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(marginX - cropMarkLength + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.stroke();
      
      // Top-right crop marks
      ctx.beginPath();
      ctx.moveTo(width - marginX + mouseInfluenceX, marginY - cropMarkLength + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(width - marginX + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(width - marginX + cropMarkLength + mouseInfluenceX, marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.stroke();
      
      // Bottom-left crop marks
      ctx.beginPath();
      ctx.moveTo(marginX + mouseInfluenceX, height - marginY + cropMarkLength + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(marginX + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(marginX - cropMarkLength + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.stroke();
      
      // Bottom-right crop marks
      ctx.beginPath();
      ctx.moveTo(width - marginX + mouseInfluenceX, height - marginY + cropMarkLength + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(width - marginX + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.lineTo(width - marginX + cropMarkLength + mouseInfluenceX, height - marginY + mouseInfluenceY - offsetY * 0.4);
      ctx.stroke();
      
      // Add enhanced alignment dot patterns in corners
      const drawAlignmentDots = (x: number, y: number) => {
        const spacing = 7 + Math.sin(time * 2) * 0.5;
        const dotOpacity = 0.2 + Math.sin(time * 3 + x * 0.01) * 0.05;
        ctx.fillStyle = `rgba(150, 150, 180, ${dotOpacity})`;
        
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Skip the center dot
            if (i === 1 && j === 1) continue;
            
            const offsetX = Math.sin(time * 2 + i * Math.PI) * 0.5;
            const offsetY = Math.cos(time * 2 + j * Math.PI) * 0.5;
            
            ctx.beginPath();
            ctx.arc(
              x + (j - 1) * spacing + offsetX, 
              y + (i - 1) * spacing + offsetY, 
              1.2, 
              0, 
              Math.PI * 2
            );
            ctx.fill();
          }
        }
        
        // Add an animated accent dot
        ctx.fillStyle = `rgba(150, 150, 180, ${0.3 + Math.sin(time * 4) * 0.1})`;
        ctx.beginPath();
        ctx.arc(
          x + Math.sin(time * 3) * 1.5, 
          y + Math.cos(time * 3) * 1.5, 
          2 + Math.sin(time * 5) * 0.5, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      };
      
      // Add alignment dots at corners with animation
      const cornerOffset = offsetY * 0.2;
      drawAlignmentDots(marginX / 2 + mouseInfluenceX * 0.7, marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
      drawAlignmentDots(width - marginX / 2 + mouseInfluenceX * 0.7, marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
      drawAlignmentDots(marginX / 2 + mouseInfluenceX * 0.7, height - marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
      drawAlignmentDots(width - marginX / 2 + mouseInfluenceX * 0.7, height - marginY / 2 + mouseInfluenceY * 0.7 - cornerOffset);
      
      // Continue the animation loop
      animationFrameId = requestAnimationFrame(drawGrid);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(drawGrid);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, scrollY]);

  // Memoized color blobs for better performance
  const ColorBlobs = useMemo(() => {
    return (
      <>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute top-[5%] left-[15%] w-[35vw] h-[30vw] bg-primary/3 rounded-full blur-[130px]"
          style={{
            transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 70}px)`,
            transition: "transform 3s ease-out"
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3.5, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-[10%] right-[12%] w-[32vw] h-[28vw] bg-primary/3 rounded-full blur-[150px]"
          style={{
            transform: `translate(${-mousePosition.x / 60}px, ${-mousePosition.y / 80}px)`,
            transition: "transform 3.5s ease-out"
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeOut" }}
          className="absolute top-[38%] right-[30%] w-[18vw] h-[18vw] bg-secondary/3 rounded-full blur-[120px]"
          style={{
            transform: `translate(${-mousePosition.x / 40}px, ${mousePosition.y / 60}px)`,
            transition: "transform 2.5s ease-out"
          }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 4.5, delay: 1.5, ease: "easeOut" }}
          className="absolute top-[65%] left-[25%] w-[22vw] h-[20vw] bg-secondary/2 rounded-full blur-[140px]"
          style={{
            transform: `translate(${mousePosition.x / 55}px, ${-mousePosition.y / 75}px)`,
            transition: "transform 4s ease-out"
          }}
        />
      </>
    );
  }, [mousePosition.x, mousePosition.y]);

  // Advanced noise texture with improved contrast and animation
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

  // Interactive foreground element that responds to mouse movement
  const InteractiveElement = () => (
    <div 
      ref={interactionRef}
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

  // Dynamic light beams based on mouse movement
  const LightBeams = useMemo(() => {
    const angle = Math.atan2(
      mousePosition.y - windowSize.height / 2,
      mousePosition.x - windowSize.width / 2
    ) * (180 / Math.PI);
    
    return (
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(
            ${angle + 90}deg,
            rgba(255,255,255,0) 40%,
            rgba(255,255,255,0.03) 50%,
            rgba(255,255,255,0) 60%
          )`,
          backgroundSize: "200% 200%",
          animation: "gradientMove 15s ease infinite"
        }}
      />
    );
  }, [mousePosition.x, mousePosition.y, windowSize]);

  // Add an animated scan line effect
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

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced gradient base with better transitions */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background via-background to-background/90 opacity-80"></div>
      
      {/* Animated accent color blobs with improved positioning */}
      {ColorBlobs}
      
      {/* Enhanced noise texture */}
      <NoiseTexture />
      
      {/* Scan lines for subtle texture */}
      <ScanLines />
      
      {/* Animated grid canvas */}
      <canvas
        ref={gridCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'normal' }}
      />
      
      {/* Animated particle canvas with interactivity */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Interactive hover element */}
      <InteractiveElement />
      
      {/* Dynamic light beams */}
      {LightBeams}
      
      {/* Add global animation for gradient movement */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </div>
  );
}