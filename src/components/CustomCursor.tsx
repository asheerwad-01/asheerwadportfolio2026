"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isTouch = useRef(false);
  const trailPointsRef = useRef<{ x: number; y: number; age: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    
    const points = trailPointsRef.current;
    if (points.length === 0) {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
      return;
    }

    const lastPoint = points[points.length - 1];
    const dx = e.clientX - lastPoint.x;
    const dy = e.clientY - lastPoint.y;
    
    // Only add a new point if the mouse has moved at least 4 pixels (dx^2 + dy^2 > 16)
    // to prevent point explosion on high-polling-rate gaming mice.
    if (dx * dx + dy * dy > 16) {
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });
    }
  }, []);

  useEffect(() => {
    // Check if the device is touch-only (no mouse pointer present)
    const isTouchOnly = window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) {
      isTouch.current = true;
      return;
    }

    if (!mounted) {
      setMounted(true);
      document.body.classList.add("has-custom-cursor");
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);

    // GSAP ticker for smooth cursor follow
    const ticker = () => {
      const follower = followerRef.current;
      if (!follower) return;

      // Lerp follower position (slightly faster since it is the main cursor element)
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.25;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.25;

      follower.style.transform = `translate(${followerPos.current.x - 4}px, ${followerPos.current.y - 4}px)`;
    };

    gsap.ticker.add(ticker);

    // Trail effect on canvas
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

        // Update age of points
        const points = trailPointsRef.current;
        for (let i = 0; i < points.length; i++) {
          points[i].age += 1;
        }

        // Keep points younger than 20 frames (approx 330ms) for a much faster fade
        const maxAge = 20;
        trailPointsRef.current = points.filter((p) => p.age < maxAge);

        const activePoints = trailPointsRef.current;
        if (activePoints.length > 1) {
          // Set canvas properties once outside the loop for high-performance drawing
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = "rgba(157, 3, 244, 0.5)";
          ctx.shadowBlur = 5;

          for (let i = 1; i < activePoints.length; i++) {
            const p1 = activePoints[i - 1];
            const p2 = activePoints[i];

            // Taper and fade based on point age
            const pct = 1 - p2.age / maxAge; // 1.0 (newest) to 0.0 (oldest)

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Sleeker trail thickness: starts at 3px and tapers down to 1px
            ctx.lineWidth = 2.0 * pct + 1.0; 
            
            // Fades from 0.8 down to 0.2 opacity
            ctx.strokeStyle = `rgba(197, 77, 255, ${0.2 + 0.6 * pct})`; 

            ctx.stroke();
          }
        }

        animationId = requestAnimationFrame(drawTrail);
      };

      drawTrail();

      return () => {
        document.body.classList.remove("has-custom-cursor");
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        gsap.ticker.remove(ticker);
        cancelAnimationFrame(animationId);
      };
    }

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [mounted, handleMouseMove]);

  // Hover state handlers for the follower pixel dot
  useEffect(() => {
    if (isTouch.current) return;

    const follower = followerRef.current;
    if (!follower) return;

    const handleHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-cursor='pointer']");
      if (el) {
        gsap.to(follower, {
          scale: 1.8,
          backgroundColor: "#FF007F", // Neon pink hover color
          boxShadow: "0 0 12px rgba(255, 0, 127, 0.8)",
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const handleHoverOut = () => {
      gsap.to(follower, {
        scale: 1.0,
        backgroundColor: "#9D03F4", // Original purple color
        boxShadow: "0 0 8px rgba(197, 77, 255, 0.5)",
        duration: 0.25,
        ease: "power2.out",
      });
    };

    document.addEventListener("mouseover", handleHoverIn);
    document.addEventListener("mouseout", handleHoverOut);

    return () => {
      document.removeEventListener("mouseover", handleHoverIn);
      document.removeEventListener("mouseout", handleHoverOut);
    };
  }, []);

  if (!mounted || isTouch.current) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ opacity: 1.0 }}
      />

      {/* Follower pixel square */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          background: "#9D03F4",
          boxShadow: "0 0 8px rgba(197,77,255,0.5)",
        }}
      />
    </>
  );
}
