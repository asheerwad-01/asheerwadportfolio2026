"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Helper to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const particleColors = ["#9D03F4", "#C54DFF", "#FFFFFF"];

    // Floating pixel particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacityDir: number;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        opacityDir: Math.random() > 0.5 ? 0.002 : -0.002,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    // Glow spots
    const glowSpots = [
      { x: 0.2, y: 0.3, radius: 200, opacity: 0.04, phase: 0 },
      { x: 0.8, y: 0.6, radius: 150, opacity: 0.03, phase: Math.PI },
      { x: 0.5, y: 0.8, radius: 180, opacity: 0.025, phase: Math.PI / 2 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glow spots
      glowSpots.forEach((spot) => {
        spot.phase += 0.005;
        const currentOpacity =
          spot.opacity + Math.sin(spot.phase) * spot.opacity * 0.5;
        const gradient = ctx.createRadialGradient(
          spot.x * canvas.width,
          spot.y * canvas.height,
          0,
          spot.x * canvas.width,
          spot.y * canvas.height,
          spot.radius
        );
        gradient.addColorStop(0, `rgba(157, 3, 244, ${currentOpacity})`);
        gradient.addColorStop(1, "rgba(157, 3, 244, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDir;

        if (p.opacity > 0.4 || p.opacity < 0.03) {
          p.opacityDir *= -1;
        }

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.fillStyle = hexToRgba(p.color, p.opacity);
        ctx.fillRect(
          Math.floor(p.x),
          Math.floor(p.y),
          p.size,
          p.size
        );
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
