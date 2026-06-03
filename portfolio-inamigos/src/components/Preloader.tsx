"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"title" | "loading" | "exit">("title");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  // Generate stars
  useEffect(() => {
    if (!starsRef.current) return;
    const stars = starsRef.current;
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${Math.random() > 0.3 ? "#fff" : "#C54DFF"};
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.8 + 0.2};
        animation: pulse-glow ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      stars.appendChild(star);
    }
  }, []);

  // Generate floating pixels
  useEffect(() => {
    if (!pixelsRef.current) return;
    const container = pixelsRef.current;
    const pixelColors = ["#9D03F4", "#C54DFF", "#FFFFFF"];
    for (let i = 0; i < 20; i++) {
      const pixel = document.createElement("div");
      const size = Math.random() * 8 + 4;
      pixel.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${pixelColors[Math.floor(Math.random() * pixelColors.length)]};
        opacity: ${Math.random() * 0.5 + 0.1};
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
      `;
      container.appendChild(pixel);

      gsap.to(pixel, {
        y: `random(-50, 50)`,
        x: `random(-30, 30)`,
        opacity: `random(0.1, 0.6)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  }, []);

  // Title phase → Loading phase
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate title entrance
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll(".preloader-letter");
      tl.fromTo(
        letters,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );

      tl.to({}, { duration: 0.8 }); // hold

      // Transition to loading phase
      tl.call(() => setPhase("loading"));
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Loading phase
  useEffect(() => {
    if (phase !== "loading") return;

    const tl = gsap.timeline();

    // Animate loading text in
    if (loadingRef.current) {
      tl.fromTo(
        loadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }

    // Progress bar animation
    const progressTween = gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          const v = Math.round(this.targets()[0].val);
          setProgress(v);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${v}%`;
          }
        },
        onComplete: () => {
          setPhase("exit");
        },
      }
    );

    return () => {
      tl.kill();
      progressTween.kill();
    };
  }, [phase]);

  // Exit animation
  useEffect(() => {
    if (phase !== "exit" || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    tl.to(containerRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      duration: 0.8,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [phase, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        background: "#050505",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      {/* Stars background */}
      <div ref={starsRef} className="absolute inset-0" />

      {/* Floating pixels */}
      <div ref={pixelsRef} className="absolute inset-0" />

      {/* Neon glow spots */}
      <div
        className="absolute w-64 h-64 rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(157,3,244,0.15) 0%, transparent 70%)",
          top: "20%",
          left: "30%",
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(157,3,244,0.1) 0%, transparent 70%)",
          bottom: "30%",
          right: "25%",
          animationDelay: "1s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Phase 1: Title — PORT (normal) + FOLIO (pixel) */}
        {(phase === "title" || phase === "loading") && (
          <div ref={titleRef} className="mb-8">
            <div className="flex items-center justify-center gap-0">
              {/* PORT - smooth, clean Bebas Neue */}
              {"PORT".split("").map((char, i) => (
                <span
                  key={`port-${i}`}
                  className="preloader-letter font-bebas text-white inline-block"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 7rem)",
                    letterSpacing: "0.05em",
                    textShadow: "0 0 20px rgba(157,3,244,0.2)",
                  }}
                >
                  {char}
                </span>
              ))}
              {/* FOLIO - pixelated, blocky */}
              {"FOLIO".split("").map((char, i) => (
                <span
                  key={`folio-${i}`}
                  className="preloader-letter inline-block text-neon"
                  style={{
                    fontSize: "clamp(3rem, 10vw, 7rem)",
                    fontFamily: '"Courier New", monospace',
                    fontWeight: 900,
                    letterSpacing: "0.05em",
                    textShadow:
                      "0 0 20px rgba(157,3,244,0.5), 0 0 40px rgba(157,3,244,0.3)",
                    imageRendering: "pixelated",
                    filter: "url(#scribble-filter)",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div
              className="font-space text-text-gray text-sm tracking-[0.5em] mt-2"
              style={{ opacity: phase === "title" ? 1 : 0.5 }}
            >
              2026
            </div>
          </div>
        )}

        {/* Phase 2: Loading */}
        {phase === "loading" && (
          <div ref={loadingRef} className="mt-4">
            <div className="font-space text-text-gray text-xs tracking-[0.3em] mb-4 uppercase">
              Loading...
            </div>

            {/* Progress bar */}
            <div className="relative w-64 mx-auto">
              <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background:
                      "linear-gradient(90deg, #6602AE, #9D03F4)",
                    boxShadow: "0 0 15px rgba(157,3,244,0.4)",
                  }}
                />
              </div>

              {/* Pixel blocks above progress bar */}
              <div className="flex justify-between mt-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 transition-all duration-200"
                    style={{
                      background:
                        progress > i * 5
                          ? "#9D03F4"
                          : "rgba(255,255,255,0.1)",
                      boxShadow:
                        progress > i * 5
                          ? "0 0 6px rgba(157,3,244,0.5)"
                          : "none",
                    }}
                  />
                ))}
              </div>

              {/* Percentage */}
              <div className="font-space text-neon text-xs mt-3 tracking-widest">
                {progress}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
