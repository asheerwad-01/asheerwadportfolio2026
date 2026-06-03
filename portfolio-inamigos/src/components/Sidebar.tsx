"use client";

import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Sidebar() {
  const pathname = usePathname();

  const currentIndex = NAV_LINKS.findIndex((l) => l.href === pathname);
  const sectionNumber = String(currentIndex + 1).padStart(2, "0");

  return (
    <div className="fixed left-6 top-0 bottom-0 z-50 hidden lg:flex flex-col justify-between py-24 items-center">
      {/* Top: PORTFOLIO_2026 rotated text */}
      <div
        className="font-space text-[10px] tracking-[0.3em] uppercase flex items-center gap-0"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        <span className="text-white">PORT</span>
        <span className="font-mono font-black text-neon" style={{ filter: "url(#scribble-filter)" }}>FOLIO</span>
        <span className="text-text-dim">_{SITE.year}</span>
      </div>

      {/* Center: Section dots */}
      <div className="flex flex-col gap-3 items-center">
        {NAV_LINKS.map((link, i) => (
          <div
            key={link.href}
            className={`w-2 h-2 rounded-full border border-neon transition-all duration-300 ${
              i === currentIndex
                ? "bg-neon shadow-[0_0_10px_rgba(157,3,244,0.5)] scale-125"
                : "bg-transparent hover:bg-neon/30"
            }`}
            title={link.label}
          />
        ))}

        {/* Current section number */}
        <div className="font-space text-neon text-xs mt-3 tracking-wider">
          {sectionNumber}
        </div>
      </div>

      {/* Bottom: SCROLL TO EXPLORE */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="font-space text-[9px] tracking-[0.2em] text-text-dim uppercase"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          Scroll to Explore
        </div>
        {/* Animated arrow */}
        <div className="w-px h-8 bg-gradient-to-b from-neon to-transparent animate-pulse-glow" />
      </div>
    </div>
  );
}
