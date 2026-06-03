"use client";

export default function StickyNote({
  children,
  rotation = -2,
  className = "",
}: {
  children: React.ReactNode;
  rotation?: number;
  className?: string;
}) {
  return (
    <div
      className={`sticky-note animate-float-slow ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}
