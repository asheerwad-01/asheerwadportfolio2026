"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isTouch = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    setMounted(true);
    // Check for touch device
    if ("ontouchstart" in window) {
      isTouch.current = true;
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);

    // GSAP ticker for smooth cursor follow
    const ticker = () => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      if (!cursor || !follower) return;

      // Lerp cursor position
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

      // Lerp follower position (slower)
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.08;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.08;

      cursor.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px)`;
      follower.style.transform = `translate(${followerPos.current.x - 4}px, ${followerPos.current.y - 4}px)`;
    };

    gsap.ticker.add(ticker);

    // Trail effect on canvas
    const canvas = trailCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);

      let trailPoints: { x: number; y: number; alpha: number }[] = [];

      const drawTrail = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        trailPoints.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          alpha: 1.0,
        });

        // Keep max 25 trail points for a longer trail
        if (trailPoints.length > 25) {
          trailPoints = trailPoints.slice(-25);
        }

        // Draw continuous line segments with glowing purple stroke
        if (trailPoints.length > 1) {
          for (let i = 1; i < trailPoints.length; i++) {
            const p1 = trailPoints[i - 1];
            const p2 = trailPoints[i];
            p1.alpha *= 0.94; // Age the point

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const ratio = i / trailPoints.length;
            ctx.lineWidth = 1.5 + ratio * 4.5;
            
            // Add a soft glow behind the line
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(197, 77, 255, 0.5)";

            ctx.strokeStyle = `rgba(157, 3, 244, ${p1.alpha * ratio})`;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          }
          trailPoints[trailPoints.length - 1].alpha *= 0.94;
        }

        trailPoints = trailPoints.filter((p) => p.alpha > 0.01);
        requestAnimationFrame(drawTrail);
      };

      drawTrail();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        gsap.ticker.remove(ticker);
      };
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [handleMouseMove]);

  // Hover state handlers
  useEffect(() => {
    if (isTouch.current) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-cursor='pointer']");
      if (el) {
        gsap.to(cursor, {
          width: 60,
          height: 60,
          borderWidth: 2,
          duration: 0.3,
          ease: "power2.out",
        });
        cursor.style.mixBlendMode = "difference";
      }
    };

    const handleHoverOut = () => {
      gsap.to(cursor, {
        width: 40,
        height: 40,
        borderWidth: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
      cursor.style.mixBlendMode = "normal";
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
        style={{ opacity: 0.6 }}
      />

      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 40,
          height: 40,
          border: "1.5px solid #9D03F4",
          borderRadius: "50%",
          transition: "width 0.15s, height 0.15s",
          boxShadow: "0 0 10px rgba(157,3,244,0.2)",
        }}
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
