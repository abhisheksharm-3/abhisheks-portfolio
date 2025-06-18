"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refined particle animation with smaller, smoother particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Creating floating elements - refined for subtlety
    const particles: Particle[] = [];
    const particleCount = 18; // More particles but much smaller
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      targetX: number;
      targetY: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // Much smaller particles
        
        // Very slow movement for smoothness
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = Math.random() * 0.3 + 0.1;
        
        // Target-based smooth movement
        this.targetX = this.x;
        this.targetY = this.y;
        this.setNewTarget();
        
        // Softer, more subtle colors
        const colors = [
          "rgba(125, 211, 252, 0.18)",  // light blue
          "rgba(167, 139, 250, 0.15)",  // light purple
          "rgba(190, 190, 255, 0.12)",  // lavender
          "rgba(249, 168, 212, 0.14)",  // light pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      setNewTarget() {
        // Set a new target within a reasonable distance
        this.targetX = this.x + (Math.random() - 0.5) * width * 0.3;
        this.targetY = this.y + (Math.random() - 0.5) * height * 0.3;
        
        // Keep targets within bounds
        this.targetX = Math.max(0, Math.min(width, this.targetX));
        this.targetY = Math.max(0, Math.min(height, this.targetY));
        
        // Schedule next target change
        setTimeout(() => this.setNewTarget(), Math.random() * 8000 + 5000); // 5-13 seconds
      }
      
      update() {
        // Smooth movement toward target (easing)
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        
        // Gradual speed adjustment for very smooth movement
        this.speedX = this.speedX * 0.95 + dx * 0.0003;
        this.speedY = this.speedY * 0.95 + dy * 0.0003;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Subtle boundary checking
        if (this.x < 0 || this.x > width) {
          this.targetX = width / 2;
        }
        if (this.y < 0 || this.y > height) {
          this.targetY = height / 2;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.size * 5 // Smaller blur radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.8, this.color.replace(/[\d.]+\)$/g, "0.05)"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw soft vignette
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.8
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.03)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Enhanced grid system with improved visibility
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const drawGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Define golden ratio
      const goldenRatio = 1.618;
      
      // Main margins based on golden ratio
      const marginX = width / goldenRatio / 4;
      const marginY = height / goldenRatio / 4;
      
      // Draw outer frame (margin guides) - increased opacity
      ctx.strokeStyle = "rgba(150, 150, 180, 0.2)"; // More visible with slight color
      ctx.lineWidth = 1;
      
      // Outer frame
      ctx.beginPath();
      ctx.rect(marginX, marginY, width - marginX * 2, height - marginY * 2);
      ctx.stroke();
      
      // Main vertical division lines (using golden ratio) - improved visibility
      const goldenX = marginX + (width - marginX * 2) / goldenRatio;
      
      ctx.beginPath();
      ctx.moveTo(goldenX, marginY);
      ctx.lineTo(goldenX, height - marginY);
      ctx.stroke();
      
      // Main horizontal division line (using golden ratio) - improved visibility
      const goldenY = marginY + (height - marginY * 2) / goldenRatio;
      
      ctx.beginPath();
      ctx.moveTo(marginX, goldenY);
      ctx.lineTo(width - marginX, goldenY);
      ctx.stroke();
      
      // Draw decorative elements at key intersections - refined
      const drawDecorativeElement = (x: number, y: number, size: number = 8) => {
        ctx.strokeStyle = "rgba(150, 150, 180, 0.25)"; // More visible
        ctx.lineWidth = 0.75;
        
        // Diamond
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.stroke();
        
        // Circle
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add a dot in the center for emphasis
        ctx.fillStyle = "rgba(150, 150, 180, 0.25)";
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      };
      
      // Draw decorative elements at key points
      drawDecorativeElement(marginX, marginY);
      drawDecorativeElement(width - marginX, marginY);
      drawDecorativeElement(marginX, height - marginY);
      drawDecorativeElement(width - marginX, height - marginY);
      drawDecorativeElement(goldenX, marginY);
      drawDecorativeElement(goldenX, height - marginY);
      drawDecorativeElement(marginX, goldenY);
      drawDecorativeElement(width - marginX, goldenY);
      
      // Grid columns - finer divisions with better visibility
      const columnWidth = (width - 2 * marginX) / 12;
      ctx.strokeStyle = "rgba(150, 150, 180, 0.1)"; // More visible
      ctx.setLineDash([4, 6]); // More elegant dash pattern
      
      for (let i = 1; i < 12; i++) {
        if (Math.abs(marginX + i * columnWidth - goldenX) < columnWidth / 2) continue;
        
        ctx.beginPath();
        ctx.moveTo(marginX + i * columnWidth, marginY);
        ctx.lineTo(marginX + i * columnWidth, height - marginY);
        ctx.stroke();
      }
      
      // Grid rows - finer divisions with better visibility
      const rowHeight = (height - 2 * marginY) / 8;
      
      for (let i = 1; i < 8; i++) {
        if (Math.abs(marginY + i * rowHeight - goldenY) < rowHeight / 2) continue;
        
        ctx.beginPath();
        ctx.moveTo(marginX, marginY + i * rowHeight);
        ctx.lineTo(width - marginX, marginY + i * rowHeight);
        ctx.stroke();
      }
      
      // Reset line dash
      ctx.setLineDash([]);
      
      // Add page corner crop marks - more visible
      const cropMarkLength = 24; // Slightly longer
      ctx.strokeStyle = "rgba(150, 150, 180, 0.25)"; // More visible
      ctx.lineWidth = 0.75;
      
      // Top-left crop marks
      ctx.beginPath();
      ctx.moveTo(marginX, marginY - cropMarkLength);
      ctx.lineTo(marginX, marginY);
      ctx.lineTo(marginX - cropMarkLength, marginY);
      ctx.stroke();
      
      // Top-right crop marks
      ctx.beginPath();
      ctx.moveTo(width - marginX, marginY - cropMarkLength);
      ctx.lineTo(width - marginX, marginY);
      ctx.lineTo(width - marginX + cropMarkLength, marginY);
      ctx.stroke();
      
      // Bottom-left crop marks
      ctx.beginPath();
      ctx.moveTo(marginX, height - marginY + cropMarkLength);
      ctx.lineTo(marginX, height - marginY);
      ctx.lineTo(marginX - cropMarkLength, height - marginY);
      ctx.stroke();
      
      // Bottom-right crop marks
      ctx.beginPath();
      ctx.moveTo(width - marginX, height - marginY + cropMarkLength);
      ctx.lineTo(width - marginX, height - marginY);
      ctx.lineTo(width - marginX + cropMarkLength, height - marginY);
      ctx.stroke();
      
      // Add alignment dot pattern in corners - more refined
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const drawAlignmentDots = (x: number, y: number, size: number = 30) => {
        const spacing = 7; // Larger spacing
        ctx.fillStyle = "rgba(150, 150, 180, 0.2)"; // More visible
        
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            // Skip the center dot
            if (i === 1 && j === 1) continue;
            
            ctx.beginPath();
            ctx.arc(x + (j - 1) * spacing, y + (i - 1) * spacing, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Add an extra accent dot
        ctx.fillStyle = "rgba(150, 150, 180, 0.3)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      };
      
      // Add alignment dots at corners
      drawAlignmentDots(marginX / 2, marginY / 2);
      drawAlignmentDots(width - marginX / 2, marginY / 2);
      drawAlignmentDots(marginX / 2, height - marginY / 2);
      drawAlignmentDots(width - marginX / 2, height - marginY / 2);
      
      // Add some subtle accents to make the grid more interesting
      ctx.strokeStyle = "rgba(150, 150, 180, 0.15)";
      ctx.lineWidth = 0.5;
      
      // Draw a few subtle accent lines
      const drawAccentLine = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };
      
      // Draw diagonal accents in the corners
      const accentLength = Math.min(width, height) / 20;
      drawAccentLine(marginX, marginY, marginX + accentLength, marginY + accentLength);
      drawAccentLine(width - marginX, marginY, width - marginX - accentLength, marginY + accentLength);
      drawAccentLine(marginX, height - marginY, marginX + accentLength, height - marginY - accentLength);
      drawAccentLine(width - marginX, height - marginY, width - marginX - accentLength, height - marginY - accentLength);
    };
    
    drawGrid();
    window.addEventListener("resize", drawGrid);
    
    return () => {
      window.removeEventListener("resize", drawGrid);
    };
  }, []);

  // Add noise texture directly with SVG - slightly adjusted contrast
  const NoiseTexture = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ filter: 'contrast(130%)' }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.12 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient base first to allow proper layering */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background via-background to-background/95 opacity-70"></div>
      
      {/* Accent color blobs - refined positions and intensity */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute top-[8%] left-[12%] w-[30vw] h-[28vw] bg-primary/3 rounded-full blur-[130px]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5 }}
        className="absolute bottom-[15%] right-[10%] w-[28vw] h-[25vw] bg-primary/3 rounded-full blur-[150px]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 1 }}
        className="absolute top-[35%] right-[32%] w-[15vw] h-[15vw] bg-secondary/3 rounded-full blur-[100px]"
      />
      
      {/* Noise texture */}
      <NoiseTexture />
      
      {/* Decorative margin grid with golden ratio - now appears above other layers */}
      <canvas
        ref={gridCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'normal' }}
      />
      
      {/* Canvas for animated particles - on top of grid */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
        style={{ mixBlendMode: 'normal' }}
      />
    </div>
  );
}