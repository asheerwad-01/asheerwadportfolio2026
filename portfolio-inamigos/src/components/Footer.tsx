"use client";

import { SITE, SOCIAL_LINKS } from "@/lib/constants";

import React from "react";

function SocialIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><path d="M17.5 6.5h.01" />
      </svg>
    ),
    behance: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 11c1.4 0 2.5-.6 2.5-2.2 0-1.5-1-2.3-2.4-2.3H3v9h4.8c1.5 0 2.7-.9 2.7-2.5 0-1.4-1-2-2.5-2zm-2.8-3h2c.7 0 1.3.3 1.3 1.1 0 .7-.5 1.1-1.2 1.1h-2.1V8zm2.2 6.5H4.7v-2.4h2.3c.8 0 1.4.4 1.4 1.2 0 .8-.6 1.2-1.5 1.2zM15 7.5c-3 0-4.5 2-4.5 4.5s1.6 4.5 4.5 4.5c2.2 0 3.5-1 4.1-3h-2c-.3.7-1 1.1-2 1.1-1.4 0-2.3-.8-2.4-2.2h6.5c.1-2.7-1.2-4.9-4.2-4.9zm-2.3 3.6c.2-1.2 1-1.9 2.2-1.9 1.3 0 1.9.8 2 1.9h-4.2zM14 5h5v1.5h-5z"/>
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    discord: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.9312 19.9312 0 005.9932 3.0336.0764.0764 0 00.0827-.0272c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.1073 13.1073 0 01-1.872-.8923.0766.0766 0 01-.0077-.127 10.2332 10.2332 0 00.3722-.2917.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095 10.2 10.2 0 00.3732.2927.0765.0765 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0282 19.9002 19.9002 0 006.0015-3.0327.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z"/>
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  };

  return icons[icon] || null;
}

const BARCODE_BARS = [
  { width: 2, opacity: 0.8 },
  { width: 1, opacity: 0.6 },
  { width: 2, opacity: 0.9 },
  { width: 1, opacity: 0.5 },
  { width: 1, opacity: 0.7 },
  { width: 2, opacity: 0.6 },
  { width: 2, opacity: 0.8 },
  { width: 1, opacity: 0.5 },
  { width: 2, opacity: 0.7 },
  { width: 1, opacity: 0.9 },
  { width: 1, opacity: 0.6 },
  { width: 2, opacity: 0.5 },
  { width: 2, opacity: 0.8 },
  { width: 1, opacity: 0.7 },
  { width: 1, opacity: 0.9 },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-surface-border mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + copyright */}
        <div className="flex items-center gap-4">
          <div className="font-bebas text-2xl text-neon">AM</div>
          <div>
            <div className="font-space text-[10px] tracking-[0.15em] text-white uppercase">
              {SITE.name}
            </div>
            <div className="font-space text-[9px] text-text-dim">
              © {SITE.year} All Rights Reserved.
            </div>
          </div>
        </div>

        {/* Center: Barcode decoration */}
        <div className="flex items-center gap-1 opacity-30">
          {BARCODE_BARS.map((bar, i) => (
            <div
              key={i}
              className="bg-white"
              style={{
                width: bar.width,
                height: 20,
                opacity: bar.opacity,
              }}
            />
          ))}
        </div>

        {/* Center text */}
        <div className="font-space text-[9px] tracking-[0.15em] text-text-dim uppercase hidden md:block">
          Design is our daily <span className="text-neon">game</span>.
        </div>

        {/* Right: Social links */}
        <div className="flex items-center gap-2">
          <span className="font-space text-[9px] tracking-[0.15em] text-text-dim uppercase mr-3 hidden lg:block">
            Let&apos;s Connect
          </span>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-surface-border rounded-lg text-text-gray hover:text-neon hover:border-neon/30 transition-all duration-300"
              data-cursor="pointer"
              aria-label={link.label}
            >
              <SocialIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
