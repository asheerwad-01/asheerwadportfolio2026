"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LAB_EXPERIMENTS } from "@/lib/constants";
import GhostMascot from "@/components/ui/GhostMascot";
import StickyNote from "@/components/ui/StickyNote";
import { usePageTransition } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function LabPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const experimentsRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();

  // Heading animation
  useEffect(() => {
    if (!headingRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = headingRef.current.querySelectorAll(".lab-char");

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
            stagger: 0.05,
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

  // Experiment cards animation
  useEffect(() => {
    if (!experimentsRef.current) return;
    const cards = experimentsRef.current.querySelectorAll(".experiment-card");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (isMobile) {
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
          gsap.fromTo(
            card,
            {
              y: 80,
              opacity: 0,
              x: i % 2 === 0 ? -30 : 30,
            },
            {
              y: 0,
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "bottom 12%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
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
                Lab_
              </span>
            </div>

            <div ref={headingRef} style={{ perspective: "600px" }}>
              <h1 className="section-heading">
                <div className="overflow-hidden">
                  {"THE".split("").map((c, i) => (
                    <span key={i} className="lab-char inline-block text-white">
                      {c}
                    </span>
                  ))}
                  <span className="lab-char inline-block text-white">&nbsp;</span>
                  {"LAB".split("").map((c, i) => (
                    <span key={`l-${i}`} className="lab-char inline-block text-neon">
                      {c}
                    </span>
                  ))}
                  <span className="lab-char inline-block text-neon">_</span>
                </div>
              </h1>
            </div>

            <p className="font-space text-xs tracking-[0.25em] text-neon uppercase mt-4 mb-6">
              Experiment. Learn. Create.
            </p>

            <p className="font-space text-sm text-text-gray leading-relaxed max-w-lg">
              A space where I explore ideas, experiment with new tools and push
              creative boundaries. Some ideas stay here. Some become something
              more.
            </p>
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

            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-surface-border bg-gradient-to-br from-surface-light to-surface group">
              <img
                src="/Asheerwad Portrait.png"
                alt="Asheerwad Meher"
                className="w-full h-full object-cover filter drop-shadow-[0_0_20px_rgba(157,3,244,0.3)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute -top-2 right-0">
              <StickyNote rotation={3}>
                <p className="font-space text-[10px] tracking-wider text-white uppercase leading-relaxed">
                  Ideas today,<br />
                  Impact<br />
                  <span className="text-neon font-bold">Tomorrow.</span>
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
              Curious • Always • Creating
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIMENTS LABEL ═══ */}
      <section className="px-6 md:px-10 mb-8">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <span className="font-space text-xs tracking-[0.2em] text-neon uppercase">
            Latest Experiments
          </span>
          <span className="text-neon">↗</span>
        </div>
      </section>

      {/* ═══ EXPERIMENTS TIMELINE ═══ */}
      <section className="px-6 md:px-10 mb-16">
        <div ref={experimentsRef} className="max-w-4xl mx-auto relative">
          {/* Vertical dotted line */}
          <div className="timeline-line hidden md:block" style={{ left: "30px" }} />

          <div className="space-y-8">
            {LAB_EXPERIMENTS.map((exp) => {
              const expId = exp.id;
              return (
                <a
                  key={expId}
                  href={exp.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(exp.href);
                  }}
                  className="experiment-card relative flex gap-8 group cursor-pointer no-underline text-left"
                  data-cursor="pointer"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center pt-8 flex-shrink-0" style={{ width: "60px" }}>
                    <div className="timeline-dot" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 card-surface overflow-hidden group-hover:border-neon/30 transition-all duration-500">
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Content */}
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-4">
                          {/* Big number */}
                          <span className="font-bebas text-5xl text-neon/30 group-hover:text-neon/60 transition-colors">
                            {expId}
                          </span>

                          {/* Category badge */}
                          <span className="px-3 py-1 border border-neon/30 rounded font-space text-[10px] tracking-wider text-neon uppercase group-hover:bg-neon/10 transition-colors">
                            {exp.category}
                          </span>
                        </div>

                        <h3 className="font-bebas text-xl text-white tracking-wide mb-2 uppercase">
                          {exp.title}
                        </h3>
                        <p className="font-space text-xs text-text-gray leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Tools */}
                        <div className="flex items-center gap-2">
                          {exp.tools.map((tool, j) => (
                            <span
                              key={tool}
                              className="font-space text-[10px] text-text-dim uppercase tracking-wider"
                            >
                              {tool}
                              {j < exp.tools.length - 1 && (
                                <span className="ml-2 text-neon/30">•</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Thumbnail */}
                      <div className="w-full md:w-64 h-40 md:h-auto relative overflow-hidden flex-shrink-0 bg-gradient-to-br from-surface-light to-bg">
                        {exp.image ? (
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-bebas text-3xl text-neon/10 group-hover:text-neon/20 transition-colors">
                              {expId}
                            </span>
                          </div>
                        )}
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
