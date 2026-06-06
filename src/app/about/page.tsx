"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE, STATS, SKILLS, TOOLS } from "@/lib/constants";
import GhostMascot from "@/components/ui/GhostMascot";
import StickyNote from "@/components/ui/StickyNote";

gsap.registerPlugin(ScrollTrigger);

function ToolLogo({ name }: { name: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 20, y: y * -20 }); // Max 20 degrees tilt
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  if (name === "Figma") {
    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full aspect-square rounded-xl bg-[#1E1E1E]/50 border border-surface-border flex items-center justify-center transition-all duration-200"
        style={{
          transform: hovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.08)` : "none",
          borderColor: hovered ? "#A259FF" : "var(--color-surface-border)",
          boxShadow: hovered ? "0 0 25px rgba(162, 89, 255, 0.4)" : "none",
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300"
          style={{ transform: hovered ? "translateZ(15px)" : "none" }}
          viewBox="0 0 38 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5C0 14.75 4.25 19 9.5 19H19V0Z" fill="#F24E1E"/>
          <path d="M38 9.5C38 4.25 33.75 0 28.5 0H19V19H28.5C33.75 19 38 14.75 38 9.5Z" fill="#FF7262"/>
          <path d="M19 19H9.5C4.25 19 0 23.25 0 28.5C0 33.75 4.25 38 9.5 38H19V19Z" fill="#A259FF"/>
          <path d="M38 28.5C38 23.25 33.75 19 28.5 19H19V38H28.5C33.75 38 38 33.75 38 28.5Z" fill="#1ABCFE"/>
          <path d="M19 38H9.5C4.25 38 0 42.25 0 47.5C0 52.75 4.25 57 9.5 57C14.75 57 19 52.75 19 47.5V38Z" fill="#0ACF83"/>
        </svg>
      </div>
    );
  }

  const adobeData: Record<
    string,
    { bgStart: string; bgEnd: string; border: string; text: string; letters: string }
  > = {
    Photoshop: { bgStart: "#001C3A", bgEnd: "#000B18", border: "#31A8FF", text: "#31A8FF", letters: "Ps" },
    Illustrator: { bgStart: "#261300", bgEnd: "#140A00", border: "#FF9A00", text: "#FF9A00", letters: "Ai" },
    "After Effects": { bgStart: "#1F0038", bgEnd: "#0F001D", border: "#D1A7FF", text: "#D1A7FF", letters: "Ae" },
    "Premiere Pro": { bgStart: "#1E002B", bgEnd: "#0E0016", border: "#EA77FF", text: "#EA77FF", letters: "Pr" },
    "Adobe XD": { bgStart: "#2C001E", bgEnd: "#170010", border: "#FF61F6", text: "#FF61F6", letters: "Xd" },
  };

  const app = adobeData[name];
  if (!app) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200"
      style={{
        transform: hovered ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.08)` : "none",
        background: `linear-gradient(135deg, ${app.bgStart} 0%, ${app.bgEnd} 100%)`,
        borderColor: hovered ? app.border : "var(--color-surface-border)",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: hovered ? `0 0 25px ${app.border}50` : "none",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center w-[85%] h-[85%] rounded-lg border transition-colors duration-200"
        style={{
          borderColor: hovered ? `${app.border}60` : `${app.border}20`,
        }}
      >
        <span
          className="font-inter text-2xl font-black tracking-tighter transition-all duration-200"
          style={{
            color: app.text,
            textShadow: hovered ? `0 0 12px ${app.border}` : `0 0 5px ${app.border}40`,
            transform: hovered ? "translateZ(10px)" : "none",
          }}
        >
          {app.letters}
        </span>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  // Heading animation
  useEffect(() => {
    if (!headingRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = headingRef.current.querySelectorAll(".about-char");

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

  // Stats counter animation (replayable)
  useEffect(() => {
    if (!statsRef.current) return;
    const statCards = statsRef.current.querySelectorAll(".stat-card");
    const statValues = statsRef.current.querySelectorAll(".stat-value");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(
          statCards,
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
          statCards,
          { y: 50, opacity: 0 },
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

      statValues.forEach((item) => {
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

  // Skills progress bars animation (replayable)
  useEffect(() => {
    if (!skillsRef.current) return;
    const bars = skillsRef.current.querySelectorAll(".skill-fill");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      bars.forEach((bar) => {
        const target = bar.getAttribute("data-level") || "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${target}%`,
            duration: isMobile ? 0.8 : 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: isMobile ? "top 95%" : "top 90%",
              end: isMobile ? "bottom 5%" : "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Story & tools animation
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { y: isMobile ? 30 : 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.6 : 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: isMobile ? "top 90%" : "top 85%",
              end: isMobile ? "bottom 10%" : "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (toolsRef.current) {
        const tools = toolsRef.current.querySelectorAll(".tool-icon");
        gsap.fromTo(
          tools,
          { y: isMobile ? 20 : 30, opacity: 0, rotateY: isMobile ? 0 : -30 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            stagger: isMobile ? 0.04 : 0.08,
            duration: isMobile ? 0.4 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: toolsRef.current,
              start: isMobile ? "top 90%" : "top 85%",
              end: isMobile ? "bottom 10%" : "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* ═══ HERO ═══ */}
      <section className="min-h-[70vh] flex items-center px-6 md:px-10 mb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Heading */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 grid grid-cols-2 gap-px">
                <div className="bg-neon w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon w-full h-full" />
              </div>
              <span className="font-space text-xs tracking-[0.2em] text-text-gray uppercase">
                About Me_
              </span>
            </div>

            <div ref={headingRef} style={{ perspective: "600px" }}>
              <h1 className="section-heading">
                <div className="overflow-hidden">
                  {"ABOUT".split("").map((c, i) => (
                    <span key={i} className="about-char inline-block text-white">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="overflow-hidden">
                  {"ME_".split("").map((c, i) => (
                    <span
                      key={i}
                      className={`about-char inline-block ${
                        c === "_" ? "text-neon" : "text-neon"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </h1>
            </div>

            <p className="font-space text-sm text-text-gray leading-relaxed mt-6 max-w-lg">
              I&apos;m Asheerwad Meher, a UI/UX & Graphics Designer who loves
              turning ideas into visuals that connect, communicate and create
              impact.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="/Asheerwad_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-cursor="pointer"
              >
                View CV
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <a
                href="/Asheerwad_CV.pdf"
                download="Asheerwad_CV.pdf"
                className="btn-primary"
                data-cursor="pointer"
              >
                Download CV
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Portrait + decorations */}
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(157,3,244,0.12) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative w-72 h-96 rounded-2xl overflow-hidden border border-surface-border bg-gradient-to-br from-surface-light to-surface group">
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

            <div className="absolute bottom-8 -right-4">
              <GhostMascot />
            </div>

            <div
              className="absolute bottom-4 -left-6 animate-float-slow px-4 py-2 bg-surface/90 backdrop-blur border border-surface-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              style={{
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif",
                color: "#C54DFF",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transform: "rotate(-3deg)",
                lineHeight: "1.6",
              }}
            >
              Gaming • Anime<br />Coffee • Editing
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="px-6 md:px-10 mb-16">
        <div ref={statsRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="stat-card card-surface p-6 text-center group hover:border-neon/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 border border-surface-border rounded-lg flex items-center justify-center group-hover:border-neon/30 transition-colors">
                  <div className="w-5 h-5 bg-neon/20 group-hover:bg-neon/40 transition-colors" />
                </div>
                <div className="stat-value font-bebas text-4xl text-white">
                  {stat.value}
                </div>
                <div className="font-space text-[10px] text-text-gray uppercase tracking-wider mt-2 whitespace-pre-line">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MY STORY + SKILLS ═══ */}
      <section className="px-6 md:px-10 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Story */}
          <div ref={storyRef} className="card-surface p-8">
            <h3 className="font-space text-xs tracking-[0.2em] text-neon uppercase mb-6">
              My Story_
            </h3>
            <div className="space-y-4 font-space text-sm text-text-gray leading-relaxed">
              <p>
                I started as a curious kid who loved editing videos and designing
                for fun. Over time, that curiosity turned into a passion and a
                purpose.
              </p>
              <p>
                Today, I help brands and creators bring their ideas to life
                through meaningful design and smooth digital experiences.
              </p>
              <p>
                Every project I take on is a new challenge to learn, create and
                make something better than before.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div
                className="text-neon text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-reenie)",
                  textShadow: "0 0 10px rgba(157,3,244,0.3)",
                }}
              >
                Asheerwad
              </div>
              <div className="w-5 h-5 grid grid-cols-2 gap-px">
                <div className="bg-neon/40" />
                <div className="bg-neon" />
                <div className="bg-neon" />
                <div className="bg-neon/40" />
              </div>
            </div>
          </div>

          {/* Skills + Tools */}
          <div className="space-y-6">
            {/* What I Do Best */}
            <div ref={skillsRef} className="card-surface p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-space text-xs tracking-[0.2em] text-neon uppercase">
                  What I Do Best_
                </h3>
                <div className="w-5 h-5 grid grid-cols-2 gap-px">
                  <div className="bg-neon" />
                  <div className="bg-neon/40" />
                  <div className="bg-neon/40" />
                  <div className="bg-neon" />
                </div>
              </div>

              <div className="space-y-5">
                {SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-space text-xs text-white uppercase tracking-wider">
                        {skill.name}
                      </span>
                      <span className="font-space text-xs text-neon">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="progress-bar-track">
                      <div
                        className="skill-fill progress-bar-fill"
                        data-level={skill.level}
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div ref={toolsRef} className="card-surface p-8">
              <h3 className="font-space text-xs tracking-[0.2em] text-neon uppercase mb-6">
                Tools I Use_
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="tool-icon group relative"
                    data-cursor="pointer"
                    style={{ perspective: "200px" }}
                  >
                    <ToolLogo name={tool.name} />
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface text-[9px] font-space text-text-gray rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-surface-border">
                      {tool.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
