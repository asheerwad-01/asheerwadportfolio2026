"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE, WORK_ITEMS, STATS } from "@/lib/constants";
import GhostMascot from "@/components/ui/GhostMascot";
import StickyNote from "@/components/ui/StickyNote";
import { usePageTransition } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();

  // Hero name animation
  useEffect(() => {
    if (!nameRef.current) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = nameRef.current.querySelectorAll(".hero-char");

    if (!isMobile) {
      // Text scramble effect - Desktop only
      chars.forEach((char) => {
        const original = char.textContent || "";
        const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

        // Initial scramble
        let scrambleCount = 0;
        const scrambleInterval = setInterval(() => {
          if (scrambleCount > 6) {
            clearInterval(scrambleInterval);
            char.textContent = original;
            return;
          }
          char.textContent =
            scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          scrambleCount++;
        }, 50);
      });
    }

    // GSAP entrance animation
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: 2D character stagger, smooth and lively, replays always
        gsap.fromTo(
          chars,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: nameRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else {
        // Desktop: High-end character stagger, replayable on scroll
        gsap.fromTo(
          chars,
          {
            y: 80,
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: nameRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Hero image parallax
  useEffect(() => {
    if (!heroImageRef.current) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { y: isMobile ? 30 : 50, scale: isMobile ? 1 : 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.7 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Work cards animation
  useEffect(() => {
    if (!workRef.current) return;

    const cards = workRef.current.querySelectorAll(".work-card");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: 2D stagger, lively but smooth, replays always
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: workRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else {
        // Desktop: Staggered entrance, replayable
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: workRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (!statsRef.current) return;

    const statItems = statsRef.current.querySelectorAll(".stat-value");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(
          statsRef.current!.querySelectorAll(".stat-card"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else {
        gsap.fromTo(
          statsRef.current!.querySelectorAll(".stat-card"),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Counter animation
      statItems.forEach((item) => {
        const text = item.textContent || "";
        const numMatch = text.match(/(\d+)/);
        if (numMatch) {
          const target = parseInt(numMatch[1]);
          const suffix = text.replace(numMatch[1], "");

          ScrollTrigger.create({
            trigger: item,
            start: isMobile ? "top 95%" : "top 85%",
            end: isMobile ? "bottom 5%" : "bottom 15%",
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: isMobile ? 1.2 : 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  item.textContent = Math.round(obj.val) + suffix;
                },
              });
            },
            onLeaveBack: () => {
              item.textContent = "0" + suffix;
            },
            onEnterBack: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: isMobile ? 1.2 : 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  item.textContent = Math.round(obj.val) + suffix;
                },
              });
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-10"
        id="hero"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="relative z-10">
            {/* Subtitle */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 grid grid-cols-2 gap-px">
                <div className="bg-neon w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon w-full h-full" />
              </div>
              <span className="font-space text-xs tracking-[0.2em] text-neon uppercase">
                UI/UX & Graphics Designer
              </span>
            </div>

            {/* Giant Name */}
            <div ref={nameRef} className="mb-8">
              <h1 className="section-heading" style={{ perspective: "600px" }}>
                <div className="overflow-hidden">
                  {"ASHEERWAD".split("").map((char, i) => (
                    <span
                      key={`a-${i}`}
                      className="hero-char inline-block text-white"
                      style={{ transformOrigin: "bottom center" }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="overflow-hidden flex items-center gap-4">
                  {"MEHER".split("").map((char, i) => (
                    <span
                      key={`m-${i}`}
                      className="hero-char inline-block text-white"
                      style={{ transformOrigin: "bottom center" }}
                    >
                      {char}
                    </span>
                  ))}
                  {/* Pixel sparkle */}
                  <span className="inline-block">
                    <div className="w-5 h-5 grid grid-cols-2 gap-px animate-pulse-glow">
                      <div className="bg-neon" />
                      <div className="bg-neon/40" />
                      <div className="bg-neon/40" />
                      <div className="bg-neon" />
                    </div>
                  </span>
                </div>
              </h1>
            </div>

            {/* Description */}
            <p className="font-space text-sm text-text-gray leading-relaxed max-w-md mb-8">
              {SITE.tagline}
            </p>

            {/* CTA */}
            <button
              onClick={() => navigateTo("/about")}
              className="btn-primary"
              data-cursor="pointer"
            >
              Explore Work
              <span className="text-neon">→</span>
            </button>
          </div>

          {/* Right: Portrait + Decorations */}
          <div ref={heroImageRef} className="relative flex justify-center lg:justify-end">
            {/* Neon glow behind portrait */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(157,3,244,0.15) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />

            {/* Portrait Photo in Hero */}
            <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl overflow-hidden border border-surface-border bg-gradient-to-br from-surface-light to-surface group">
              <img
                src="/Asheerwad Portrait.png"
                alt="Asheerwad Meher"
                className="w-full h-full object-cover filter drop-shadow-[0_0_20px_rgba(157,3,244,0.3)] transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating circles */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 border border-neon/30 rounded-full animate-float"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 border border-neon/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Sticky Note */}
            <div className="absolute -top-2 right-0 lg:right-[-20px]">
              <StickyNote rotation={3}>
                <p className="font-space text-[11px] tracking-wider text-white uppercase leading-relaxed">
                  Based in<br />
                  <span className="text-neon font-bold">Odisha,</span><br />
                  India 📍
                </p>
              </StickyNote>
            </div>

            {/* Ghost Mascot */}
            <div className="absolute bottom-12 -left-8 lg:-left-16">
              <GhostMascot />
            </div>

            {/* Note tag */}
            <div
              className="absolute -bottom-4 right-4 animate-float-slow px-4 py-2 bg-surface/90 backdrop-blur border border-surface-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              style={{
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
                color: "#C54DFF",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transform: "rotate(-3deg)",
              }}
            >
              Let&apos;s create something cool!
            </div>

            {/* Pixel decorations */}
            <div className="absolute top-10 -left-10 w-4 h-4 bg-neon/30 animate-pulse-glow" />
            <div
              className="absolute bottom-20 right-[-30px] w-3 h-3 bg-neon/20 animate-pulse-glow"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </div>
      </section>

      {/* ═══ SELECTED WORK SECTION ═══ */}
      <section ref={workRef} className="py-20 px-6 md:px-10" id="work">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="section-heading">
                Selected<br />
                <span className="accent">Work_</span>
              </h2>
              <p className="font-space text-xs text-text-gray mt-4 max-w-xs">
                Crafting experiences across design and motion.
              </p>
            </div>
            <button
              onClick={() => navigateTo("/lab")}
              className="hidden md:flex items-center gap-2 font-space text-xs text-text-gray hover:text-neon transition-colors tracking-wider uppercase"
              data-cursor="pointer"
            >
              View All Projects
              <span className="text-neon">→</span>
            </button>
          </div>

          {/* Work Grid - Cinematic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORK_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`/work/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/work/${item.slug}`);
                }}
                className="work-card group relative overflow-hidden rounded-xl border border-surface-border bg-surface transition-all duration-500 hover:border-neon/30 hover:shadow-[0_0_30px_rgba(157,3,244,0.1)] block"
                data-cursor="pointer"
              >
                 {/* Project Image - Creative Typography Layout */}
                <div className="relative h-56 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-surface-light to-bg transition-transform duration-700 group-hover:scale-105 flex items-center justify-center relative">
                    {/* Glowing grid background effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(157,3,244,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(157,3,244,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />

                    {/* Huge outline background typography */}
                    <span 
                      className="font-bebas text-7xl md:text-8xl absolute select-none tracking-widest uppercase transition-all duration-700 opacity-20 group-hover:opacity-40 group-hover:scale-110"
                      style={{
                        WebkitTextStroke: "1px rgba(197, 77, 255, 0.4)",
                        color: "transparent",
                      }}
                    >
                      {item.slug === "ui-ux" ? "UI/UX" : item.slug === "graphics" ? "ART" : item.slug === "web-dev" ? "CODE" : "AMV"}
                    </span>

                    {/* Centered big glowing number */}
                    <span className="font-bebas text-5xl md:text-6xl text-white/95 group-hover:text-neon transition-colors duration-500 z-10 drop-shadow-[0_0_10px_rgba(157,3,244,0.5)]">
                      {item.id}
                    </span>

                    {/* Tiny cyberpunk tech code tag */}
                    <span className="absolute bottom-4 font-space text-[9px] tracking-[0.3em] text-text-dim uppercase z-10 group-hover:text-white transition-colors duration-300">
                      {item.slug === "ui-ux" ? "SYS_INTERFACE" : item.slug === "graphics" ? "VISUAL_IDENT" : item.slug === "web-dev" ? "FULLSTACK_APP" : "MOTION_GRAPHICS"}
                    </span>
                  </div>

                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Number */}
                  <span className="font-bebas text-4xl text-neon/30 group-hover:text-neon/60 transition-colors">
                    {item.id}
                  </span>

                  {/* Category */}
                  <h3 className="font-bebas text-xl text-white mt-1 tracking-wide">
                    {item.category}
                  </h3>

                  {/* Subcategories */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {item.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="font-space text-[10px] text-text-gray"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent w-0 group-hover:w-full transition-all duration-700 mx-auto" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT PREVIEW + STATS ═══ */}
      <section className="py-20 px-6 md:px-10" id="about-preview">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* About Me Card */}
            <div className="card-surface p-6 md:p-8">
              <h3 className="font-space text-xs tracking-[0.2em] text-neon uppercase mb-4">
                About Me_
              </h3>
              <p className="font-space text-sm text-text-gray leading-relaxed mb-6">
                A creative designer who loves turning ideas into visuals that
                solve problems and inspire people.
              </p>
              <div
                className="font-space text-neon text-lg italic"
                style={{
                  fontFamily: "var(--font-reenie)",
                  fontSize: "28px",
                }}
              >
                Asheerwad
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="stat-card card-surface p-5 text-center group hover:border-neon/30 transition-all duration-300"
                  >
                    {/* Icon placeholder */}
                    <div className="w-10 h-10 mx-auto mb-3 border border-surface-border rounded-lg flex items-center justify-center group-hover:border-neon/30 transition-colors">
                      <div className="w-4 h-4 bg-neon/20 group-hover:bg-neon/40 transition-colors" />
                    </div>
                    <div className="stat-value font-bebas text-3xl text-white">
                      {stat.value}
                    </div>
                    <div className="font-space text-[10px] text-text-gray uppercase tracking-wider mt-1 whitespace-pre-line">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="card-surface p-6 mt-4">
                <div className="font-bebas text-3xl text-text-dim mb-2">
                  &ldquo;
                </div>
                <p className="font-space text-sm text-text-gray leading-relaxed">
                  Keep improving. Every edit. Every day.
                  <br />
                  That&apos;s Kaizen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
