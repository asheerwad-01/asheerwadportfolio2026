"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { usePageTransition } from "./PageTransition";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navigateTo } = usePageTransition();

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href === pathname) return;
    navigateTo(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 lg:left-16 right-0 z-[1000] px-6 md:px-10 py-4 bg-bg/80 backdrop-blur-md border-b border-surface-border transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("/")}
          className="flex items-center gap-3 group"
          data-cursor="pointer"
        >
          {/* Brand Logo Image */}
          <div className="relative flex items-center justify-center">
            <img
              src="/KaizenEdit.png"
              alt="Kaizen Edit Logo"
              className="h-8 w-auto object-contain brightness-100 filter drop-shadow-[0_0_8px_rgba(157,3,244,0.5)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-bebas text-xl tracking-wider text-white uppercase leading-none">
              Kaizen
            </div>
            <div className="font-space text-[9px] tracking-[0.2em] text-neon uppercase leading-none mt-0.5">
              Edit
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`font-space text-xs tracking-[0.15em] uppercase transition-colors duration-300 scribble-underline ${
                pathname === link.href
                  ? "text-neon"
                  : "text-text-gray hover:text-white"
              }`}
              data-cursor="pointer"
            >
              {link.label}
            </button>
          ))}

          {/* Pixel sparkle icon */}
          <div className="w-6 h-6 grid grid-cols-2 gap-0.5 opacity-60">
            <div className="w-full h-full bg-neon" />
            <div className="w-full h-full bg-neon opacity-40" />
            <div className="w-full h-full bg-neon opacity-40" />
            <div className="w-full h-full bg-neon" />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-[1001] flex flex-col gap-1.5 p-2"
          data-cursor="pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <div
      className={`fixed inset-0 bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center p-8 transition-all duration-500 md:hidden overflow-y-auto ${
        mobileOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ top: 0, zIndex: 999 }}
    >
      <div className="flex flex-col items-center gap-8">
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className={`font-bebas text-5xl tracking-wide transition-all duration-300 ${
              pathname === link.href
                ? "text-neon"
                : "text-white hover:text-neon"
            }`}
            style={{
              transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
              transform: mobileOpen
                ? "translateY(0)"
                : "translateY(30px)",
              opacity: mobileOpen ? 1 : 0,
            }}
            data-cursor="pointer"
          >
            {link.label}
          </button>
        ))}

        {/* Mobile social + info */}
        <div
          className="mt-8 text-center transition-all duration-500"
          style={{
            transitionDelay: mobileOpen ? "400ms" : "0ms",
            opacity: mobileOpen ? 1 : 0,
          }}
        >
          <p className="font-space text-xs text-text-gray tracking-wider">
            {SITE.email}
          </p>
          <p className="font-space text-xs text-text-dim mt-1">
            {SITE.location}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
