"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const NOTES = [
  261.63, 293.66, 329.63, 349.23, // C4, D4, E4, F4
  392.00, 440.00, 493.88, 523.25, // G4, A4, B4, C5
  587.33, 659.25, 698.46, 783.99, // D5, E5, F5, G5
  880.00, 987.77, 1046.50, 1174.66 // A5, B5, C6, D6
];

const NOTE_NAMES = [
  "C4", "D4", "E4", "F4",
  "G4", "A4", "B4", "C5",
  "D5", "E5", "F5", "G5",
  "A5", "B5", "C6", "D6"
];

export default function ArcadePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [oscType, setOscType] = useState<OscillatorType>("triangle");
  const [activePad, setActivePad] = useState<number | null>(null);
  
  const panelRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Dragging state
  const [position, setPosition] = useState({ x: 24, y: 100 }); // from bottom right
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 24, y: 100 });

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playTone = (freq: number, index: number) => {
    setActivePad(index);
    setTimeout(() => setActivePad(null), 150);

    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Cyberpunk sweep effect
      osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.error("Audio API error:", e);
    }
  };

  // Dragging logic
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag by header
    if (!(e.target as HTMLElement).closest(".drag-header")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    positionStart.current = { ...position };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: Math.max(12, positionStart.current.x - dx),
      y: Math.max(12, positionStart.current.y - dy)
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // GSAP animation for panel open/close
  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[999] flex items-center justify-center w-12 h-12 rounded-full border border-neon/30 bg-surface text-neon hover:border-neon transition-all duration-300 hover:shadow-[0_0_15px_rgba(157,3,244,0.4)]"
        style={{
          bottom: position.y - 60,
          right: position.x,
          display: isOpen ? "none" : "flex",
        }}
        data-cursor="pointer"
        title="Open Interactive Beat Synth"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      </button>

      {/* Interactive Arcade Synth Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed z-[999] w-72 bg-surface/95 backdrop-blur-md border border-surface-border rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.6)] touch-none select-none overflow-hidden"
          style={{
            bottom: position.y,
            right: position.x,
            boxShadow: "0 0 25px rgba(157, 3, 244, 0.15)",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Draggable Header */}
          <div className="drag-header flex items-center justify-between px-4 py-2.5 bg-surface-light border-b border-surface-border cursor-grab active:cursor-grabbing text-white">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 grid grid-cols-2 gap-0.5">
                <div className="bg-neon" />
                <div className="bg-neon/40" />
                <div className="bg-neon/40" />
                <div className="bg-neon" />
              </div>
              <span className="font-bebas text-sm tracking-wider text-white">KAIZEN SYNTH</span>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-gray hover:text-neon text-xs transition-colors p-1"
              data-cursor="pointer"
            >
              ✕
            </button>
          </div>

          {/* Synth Panel Content */}
          <div className="p-4">
            {/* Mode Selectors */}
            <div className="flex justify-between items-center gap-1.5 mb-4">
              <span className="font-space text-[9px] text-text-dim uppercase tracking-wider">WAVE:</span>
              <div className="flex gap-1">
                {(["sine", "triangle", "sawtooth", "square"] as OscillatorType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOscType(t)}
                    className={`px-2 py-0.5 font-space text-[8px] tracking-wide rounded border transition-all uppercase ${
                      oscType === t
                        ? "bg-neon/15 border-neon text-neon shadow-[0_0_8px_rgba(157,3,244,0.3)]"
                        : "border-surface-border text-text-gray hover:text-white"
                    }`}
                    data-cursor="pointer"
                  >
                    {t.substring(0, 4)}
                  </button>
                ))}
              </div>
            </div>

            {/* 4x4 Beatpad Grid */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {NOTES.map((freq, index) => {
                const isActive = activePad === index;
                return (
                  <button
                    key={index}
                    onPointerDown={() => playTone(freq, index)}
                    className={`aspect-square rounded-lg border text-[10px] font-space font-bold transition-all duration-100 flex flex-col items-center justify-center relative ${
                      isActive
                        ? "bg-neon border-white text-bg scale-95 shadow-[0_0_20px_#C54DFF]"
                        : "bg-surface-light border-surface-border text-text-dim hover:border-neon/30 hover:text-white"
                    }`}
                    data-cursor="pointer"
                  >
                    {/* Glowing pulse ring on pad play */}
                    {isActive && (
                      <span className="absolute inset-0 border-2 border-neon rounded-lg animate-ping opacity-60 pointer-events-none" />
                    )}
                    <span className="text-[7px] text-text-dim block opacity-60 uppercase">{NOTE_NAMES[index]}</span>
                  </button>
                );
              })}
            </div>

            {/* Instruction Footer */}
            <div className="font-space text-[8px] text-text-dim text-center uppercase tracking-wider py-1 border-t border-surface-border/50">
              Drag header to move • Tap pads to play
            </div>
          </div>
        </div>
      )}
    </>
  );
}
