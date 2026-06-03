"use client";

export default function GhostMascot({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-float inline-block ${className}`}>
      <svg
        width="60"
        height="70"
        viewBox="0 0 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Ghost body */}
        <rect x="16" y="4" width="28" height="4" fill="var(--color-neon)" />
        <rect x="12" y="8" width="4" height="4" fill="var(--color-neon)" />
        <rect x="44" y="8" width="4" height="4" fill="var(--color-neon)" />
        <rect x="8" y="12" width="4" height="4" fill="var(--color-neon)" />
        <rect x="48" y="12" width="4" height="4" fill="var(--color-neon)" />
        <rect x="8" y="16" width="44" height="4" fill="var(--color-neon)" opacity="0.2" />
        <rect x="8" y="20" width="44" height="4" fill="var(--color-neon)" opacity="0.15" />
        <rect x="8" y="24" width="44" height="4" fill="var(--color-neon)" opacity="0.15" />
        <rect x="8" y="28" width="44" height="4" fill="var(--color-neon)" opacity="0.15" />
        <rect x="8" y="32" width="44" height="4" fill="var(--color-neon)" opacity="0.15" />
        <rect x="8" y="36" width="44" height="4" fill="var(--color-neon)" opacity="0.15" />
        <rect x="8" y="40" width="44" height="4" fill="var(--color-neon)" opacity="0.15" />
        {/* Fill body */}
        <rect x="12" y="12" width="36" height="32" fill="var(--color-neon)" opacity="0.2" />
        {/* Eyes */}
        <rect x="18" y="20" width="8" height="8" fill="var(--color-neon)" />
        <rect x="34" y="20" width="8" height="8" fill="var(--color-neon)" />
        {/* Eye pupils */}
        <rect x="22" y="24" width="4" height="4" fill="#050505" />
        <rect x="38" y="24" width="4" height="4" fill="#050505" />
        {/* Mouth */}
        <rect x="24" y="32" width="12" height="4" fill="var(--color-neon)" opacity="0.5" />
        {/* Bottom tentacles */}
        <rect x="8" y="44" width="8" height="8" fill="var(--color-neon)" opacity="0.15" />
        <rect x="20" y="44" width="8" height="12" fill="var(--color-neon)" opacity="0.15" />
        <rect x="32" y="44" width="8" height="8" fill="var(--color-neon)" opacity="0.15" />
        <rect x="44" y="44" width="8" height="12" fill="var(--color-neon)" opacity="0.15" />
        {/* Outline bottom */}
        <rect x="8" y="44" width="4" height="8" fill="var(--color-neon)" />
        <rect x="8" y="52" width="12" height="4" fill="var(--color-neon)" />
        <rect x="20" y="44" width="4" height="4" fill="var(--color-neon)" />
        <rect x="20" y="56" width="8" height="4" fill="var(--color-neon)" />
        <rect x="28" y="44" width="4" height="4" fill="var(--color-neon)" />
        <rect x="32" y="44" width="4" height="8" fill="var(--color-neon)" />
        <rect x="32" y="52" width="12" height="4" fill="var(--color-neon)" />
        <rect x="44" y="44" width="4" height="4" fill="var(--color-neon)" />
        <rect x="44" y="56" width="8" height="4" fill="var(--color-neon)" />
        <rect x="48" y="44" width="4" height="12" fill="var(--color-neon)" />
      </svg>
    </div>
  );
}
