"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPointsRef = useRef<{ x: number; y: number; age: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    // Check if the device is touch-only (no mouse pointer present)
    const isTouchOnly = window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) {
      return;
    }

    if (!mounted) {
      setMounted(true);
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);

    const canvas = trailCanvasRef.current;
    let animationId: number;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      const handleResize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform matrix
          ctx.scale(dpr, dpr); // Scale coordinate space to match device pixels
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      const drawTrail = () => {
        if (!ctx) return;

        // Clear canvas using logical dimensions
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Add the current mouse position as a new trail point on this frame
        // (only if the mouse is on the screen/has moved from initial state)
        if (mousePos.current.x !== -100) {
          trailPointsRef.current.push({
            x: mousePos.current.x,
            y: mousePos.current.y,
            age: 0,
          });
        }

        // Update age of points
        const points = trailPointsRef.current;
        for (let i = 0; i < points.length; i++) {
          points[i].age += 1;
        }

        // Keep points younger than 16 frames (approx 260ms at 60fps) for a smooth, fast-decaying trail
        const maxAge = 16;
        trailPointsRef.current = points.filter((p) => p.age < maxAge);

        const activePoints = trailPointsRef.current;
        if (activePoints.length > 1) {
          // Set canvas properties once outside the loop for high-performance drawing
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = "rgba(157, 3, 244, 0.5)";
          ctx.shadowBlur = 6;

          for (let i = 1; i < activePoints.length; i++) {
            const p1 = activePoints[i - 1];
            const p2 = activePoints[i];

            // Taper and fade based on the position in the trail array
            // Oldest points are at index 0 (thin & faded), newest point at index length-1 (thick & bright)
            const pct = i / (activePoints.length - 1);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Sleek trail width: starts at 0.5px and tapers up to 3.5px at the cursor
            ctx.lineWidth = 3.0 * pct + 0.5;

            // Fades from 0.05 opacity at the tail to 0.8 opacity at the cursor
            ctx.strokeStyle = `rgba(197, 77, 255, ${0.05 + 0.75 * pct})`;

            ctx.stroke();
          }
        }

        animationId = requestAnimationFrame(drawTrail);
      };

      drawTrail();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
      };
    }
  }, [mounted, handleMouseMove]);

  if (!mounted) {
    return null;
  }

  return (
    <canvas
      ref={trailCanvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
      style={{ opacity: 1.0 }}
    />
  );
}
