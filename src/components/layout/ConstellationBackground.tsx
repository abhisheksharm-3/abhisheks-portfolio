"use client";

import React, { useEffect, useRef, useState } from "react";
import { Particle, drawConnections, drawGridSystem } from "@/lib/canvas";
import type { PositionType, WindowSizeType } from "@/lib/types/canvas";
import {
  NoiseTexture,
  ScanLines,
  InteractiveElement,
  ColorBlobs,
  LightBeams,
} from "./background";

const HOVER_TIMEOUT_MS = 2000;

/**
 * Animated constellation background with particles, grid, and visual effects.
 * Responds to mouse movement and scroll position.
 */
export const ConstellationBackground: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<PositionType>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const isHoveringRef = useRef(false);

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
      }, HOVER_TIMEOUT_MS);
    };

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
      35
    );
    const connectionDistance = Math.min(windowSize.width, windowSize.height) / 6;
    const particles = Array.from(
      { length: particleCount },
      () => new Particle(windowSize.width, windowSize.height)
    );

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime || 16.67;
      lastTime = timestamp;

      pCtx.clearRect(0, 0, windowSize.width, windowSize.height);
      drawConnections(pCtx, particles, connectionDistance);
      particles.forEach((p) => {
        p.update(mousePosition.x, mousePosition.y, deltaTime, isHoveringRef.current);
        p.draw(pCtx);
      });

      gCtx.clearRect(0, 0, windowSize.width, windowSize.height);
      drawGridSystem(
        gCtx,
        windowSize.width,
        windowSize.height,
        scrollYRef.current,
        mousePosition,
        timestamp
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize, mousePosition.x, mousePosition.y]);

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
};
