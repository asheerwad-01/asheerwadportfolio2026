"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import GhostMascot from "@/components/ui/GhostMascot";
import StickyNote from "@/components/ui/StickyNote";
import { usePageTransition } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();

  // Heading animation
  useEffect(() => {
    if (!headingRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = headingRef.current.querySelectorAll(".svc-char");

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
              trigger: headingRef.current,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      } else {
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: headingRef.current,
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

  // Timeline cards animation
  useEffect(() => {
    if (!timelineRef.current) return;
    const cards = timelineRef.current.querySelectorAll(".timeline-card");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (isMobile) {
          // Mobile: Fade and slide up slightly, no horizontal translation, replayable always
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        } else {
          // Desktop: Slide in from left/right, replayable on scroll
          gsap.fromTo(
            card,
            { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // CTA animation
  useEffect(() => {
    if (!ctaRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { y: isMobile ? 25 : 40, opacity: 0, scale: isMobile ? 1 : 0.95 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.5 : 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: isMobile ? "top 95%" : "top 90%",
            end: isMobile ? "bottom 5%" : "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
      <div className="pt-24 pb-16">
        {/* ═══ HERO ═══ */}
        <section className="min-h-[60vh] flex items-center px-6 md:px-10 mb-16">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 grid grid-cols-2 gap-px">
                  <div className="bg-neon w-full h-full" />
                  <div className="bg-neon/40 w-full h-full" />
                  <div className="bg-neon/40 w-full h-full" />
                  <div className="bg-neon w-full h-full" />
                </div>
                <span className="font-space text-xs tracking-[0.2em] text-text-gray uppercase">
                  Services_
                </span>
              </div>

              <div ref={headingRef} style={{ perspective: "600px" }}>
                <h1 className="section-heading">
                  <div className="overflow-hidden">
                    {"SERVICES".split("").map((c, i) => (
                      <span key={i} className="svc-char inline-block text-neon">
                        {c}
                      </span>
                    ))}
                    <span className="svc-char inline-block text-neon">_</span>
                  </div>
                </h1>
              </div>

              <p className="font-space text-sm text-text-gray leading-relaxed mt-6 max-w-lg">
                I help brands and businesses stand out with creative UI/UX and
                visual solutions that are user-focused and results-driven.
              </p>

              <button
                onClick={() => navigateTo("/contact")}
                className="btn-primary mt-8"
                data-cursor="pointer"
              >
                Let&apos;s Work Together
                <span className="text-neon">↗</span>
              </button>
            </div>

            {/* Right: Portrait + decorations */}
            <div className="relative flex justify-center">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(157,3,244,0.1) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
              />

              <div className="relative w-64 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-surface-light to-surface border border-surface-border group">
                <img
                  src="/Asheerwad Portrait.png"
                  alt="Asheerwad Meher"
                  className="w-full h-full object-cover filter drop-shadow-[0_0_20px_rgba(157,3,244,0.3)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute -top-2 right-0">
                <StickyNote rotation={2}>
                  <p className="font-space text-[10px] tracking-wider text-white uppercase leading-relaxed">
                    Based in<br />
                    <span className="text-neon font-bold">Odisha,</span><br />
                    India 📍
                  </p>
                </StickyNote>
              </div>

              <div className="absolute bottom-4 -right-4">
                <GhostMascot />
              </div>

              <div
                className="absolute bottom-8 -left-8 animate-float-slow px-4 py-2 bg-surface/90 backdrop-blur border border-surface-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                style={{
                  fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
                  color: "#C54DFF",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  transform: "rotate(-5deg)",
                  lineHeight: "1.6",
                }}
              >
                Design • Code<br />Create • Repeat
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES TIMELINE ═══ */}
        <section className="px-6 md:px-10 mb-16">
          <div ref={timelineRef} className="max-w-4xl mx-auto relative">
            {/* Vertical dotted line */}
            <div className="timeline-line hidden md:block" style={{ left: "30px" }} />

            <div className="space-y-8">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="timeline-card relative flex gap-8 group"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center pt-6 flex-shrink-0" style={{ width: "60px" }}>
                    <div className="timeline-dot" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 card-surface p-6 md:p-8 group-hover:border-neon/30 transition-all duration-500">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left: Number + Icon + Title + Description */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-bebas text-5xl text-neon/30 group-hover:text-neon/60 transition-colors">
                            {service.id}
                          </span>

                          {/* Animated icon cluster */}
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="w-6 h-6 border border-neon/20 rounded flex items-center justify-center group-hover:border-neon/40 transition-all duration-300"
                                style={{ transitionDelay: `${j * 50}ms` }}
                              >
                                <div className="w-2 h-2 bg-neon/20 group-hover:bg-neon/50 transition-colors" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">
                          {service.title}
                        </h3>
                        <p className="font-space text-xs text-text-gray leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Right: Service items */}
                      <div className="flex-1">
                        <ul className="space-y-2">
                          {service.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 font-space text-xs text-text-gray"
                            >
                              <div className="w-1.5 h-1.5 bg-neon flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Hover scribble outline effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-neon/0 group-hover:border-neon/20 transition-all duration-500 pointer-events-none" style={{ filter: "url(#scribble-filter)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA BANNER ═══ */}
        <section className="px-6 md:px-10">
          <div
            ref={ctaRef}
            className="max-w-4xl mx-auto card-surface p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              {/* Globe icon */}
              <div className="w-14 h-14 rounded-full border border-neon/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-neon/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-neon text-sm">♡</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bebas text-2xl text-white">
                  Have a{" "}
                  <span className="text-neon">Project</span> in Mind?
                </h3>
                <p className="font-space text-xs text-text-gray mt-1">
                  Let&apos;s collaborate and create something amazing together.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo("/contact")}
              className="btn-primary flex-shrink-0"
              data-cursor="pointer"
            >
              Contact Me
              <span className="text-neon">↗</span>
            </button>
          </div>
        </section>
      </div>
  );
}
