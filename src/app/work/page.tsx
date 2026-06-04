"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/constants";
import StickyNote from "@/components/ui/StickyNote";
import GhostMascot from "@/components/ui/GhostMascot";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tools: string[];
  color: string;
  images?: string[];
}

const CATEGORY_PROJECTS: Record<string, { title: string; subtitle: string; projects: Project[] }> = {
  "ui-ux": {
    title: "UI/UX Design",
    subtitle: "Designing intuitive, engaging digital products that prioritize user experience.",
    projects: [
      {
        id: "01",
        title: "Chapter Genesis",
        description: "Chapter Genesis — A gamified reading platform that makes reading engaging through streaks, challenges, and book discovery.",
        deliverables: ["User Research", "Wireframing & Prototyping", "Design System", "Interactive Dashboard Mockups"],
        tools: ["Figma", "React", "Tailwind CSS", "JavaScript", "Node.js", "MongoDB"],
        color: "#9D03F4",
        images: ["/Chapter Genesis Dark Theme.jpg", "/Chapter Genesis Light Theme.jpg"],
      },
      {
        id: "02",
        title: "Feelora",
        description: "A sleek music streaming app focused on mood-based discovery, personalized playlists, and immersive listening experiences.",
        deliverables: ["User Journey Mapping", "Mobile UI Design", "Interaction Micro-Animations", "Prototyping"],
        tools: ["Photoshop", "UI/UX Design", "Visual Design", "Prototyping", "Responsive Design"],
        color: "#FF61F6",
        images: ["/Dark Theme Music Player App.png", "/Light Theme Music Player App.png"],
      },
      {
        id: "03",
        title: "Aether UI",
        description: "A futuristic portfolio concept combining bold typography, immersive visuals, and interactive design to showcase creative work, skills, and professional achievements.",
        deliverables: ["Spatial UI Design", "AR Component Library", "Visual Assets", "Usability Testing"],
        tools: ["Figma", "UI/UX Design", "After Effects", "Prototyping", "Design Systems", "Responsive Design"],
        color: "#C54DFF",
        images: ["/Home page.png", "/Work page.png", "/About page.png", "/Skills page.png", "/Contact page.png"],
      },
    ],
  },
  "graphics": {
    title: "Graphics Design",
    subtitle: "Crafting distinct visual identities and marketing assets that elevate brand messaging.",
    projects: [
      {
        id: "01",
        title: "Kaizen Brand Identity",
        description: "A complete visual brand identity system for Kaizen Edit, comprising logo design, custom typography guidelines, and social media assets.",
        deliverables: ["Logo Design", "Style Guide", "Typography System", "Marketing Materials"],
        tools: ["Illustrator", "Photoshop"],
        color: "#9D03F4",
      },
      {
        id: "02",
        title: "Cyber City Posters",
        description: "A dystopian poster series blending street photography with retro-futuristic styling, neon accents, and heavy typography layouts.",
        deliverables: ["Visual Composition", "Color Correction", "Print Formatting", "Custom Layout Design"],
        tools: ["Photoshop", "Illustrator"],
        color: "#FF9A00",
      },
      {
        id: "03",
        title: "Synthwave Album Cover",
        description: "Album artwork featuring custom 3D wireframe grids and hand-crafted liquid gradients for a retro synthwave music project.",
        deliverables: ["Graphic Art", "Texturing & Lighting", "Asset Creation", "Packaging Design"],
        tools: ["Photoshop", "Illustrator"],
        color: "#C54DFF",
      },
    ],
  },
  "web-dev": {
    title: "Full Stack Web-D",
    subtitle: "Building highly interactive, responsive, and performant web applications.",
    projects: [
      {
        id: "01",
        title: "Creative Developer Portfolio",
        description: "This portfolio itself! An immersive showcase utilizing React, Vite, and GSAP ScrollTrigger to build fluid animations and transitions.",
        deliverables: ["Frontend Architecture", "ScrollTrigger Animation", "Custom Cursor Implementation", "Responsive Coding"],
        tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
        color: "#9D03F4",
      },
      {
        id: "02",
        title: "DevSpace Community Portal",
        description: "A forum application facilitating real-time messaging, post creation, markdown rendering, and notification dispatch.",
        deliverables: ["Database Schema Design", "REST API Development", "Socket.io Chat Flow", "State Management"],
        tools: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
        color: "#31A8FF",
      },
      {
        id: "03",
        title: "Pixel Asset Store",
        description: "A digital asset marketplace integrated with Stripe payment gateways, download distribution systems, and seller dashboards.",
        deliverables: ["Stripe Checkout Webhooks", "Asset Hosting Setup", "User Dashboards", "Transaction Reporting"],
        tools: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Stripe"],
        color: "#A259FF",
      },
    ],
  },
  "motion": {
    title: "Motion Graphics",
    subtitle: "Animating static elements into energetic visual narratives and glitchy sequences.",
    projects: [
      {
        id: "01",
        title: "Glitch Logo Intro 2026",
        description: "A high-octane 5-second logo reveal featuring audio sync, heavy glitch keyframes, and custom displacement mapping.",
        deliverables: ["Sound Design Integration", "Glitch Effect Setup", "Keyframe Animation", "Color Grading"],
        tools: ["After Effects", "Premiere Pro"],
        color: "#9D03F4",
      },
      {
        id: "02",
        title: "Crypton Explainer Video",
        description: "A clean explain-style motion piece outlining blockchain operations with kinetic typography and vector animations.",
        deliverables: ["Storyboard Drafting", "Asset Rigging", "Motion Path Animation", "Voiceover Editing"],
        tools: ["After Effects", "Illustrator"],
        color: "#FF61F6",
      },
      {
        id: "03",
        title: "Neon Portal Loop",
        description: "A seamless 10-second background video loop showcasing a rotating 3D cyberpunk stargate surrounded by particle streams.",
        deliverables: ["3D Camera Tracking", "Particle Simulation", "Looping Animation", "Post-processing Glows"],
        tools: ["After Effects", "Premiere Pro"],
        color: "#C54DFF",
      },
    ],
  },
};

function ProjectGallery({
  images,
  title,
  color,
}: {
  images: string[];
  title: string;
  color: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group/gallery overflow-hidden flex items-center justify-center bg-black">
      {/* Active Image - click to view in separate window */}
      <a
        href={images[currentIndex]}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block cursor-pointer"
        data-cursor="pointer"
        title="View full resolution image in separate window"
      >
        <img
          src={images[currentIndex]}
          alt={`${title} Screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </a>

      {/* Navigation arrows (only if > 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/85 border border-surface-border text-white flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:border-neon text-xs font-bold shadow-lg"
            data-cursor="pointer"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/85 border border-surface-border text-white flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:border-neon text-xs font-bold shadow-lg"
            data-cursor="pointer"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-bg/60 backdrop-blur-sm px-2 py-1 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(idx);
              }}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                backgroundColor: idx === currentIndex ? color : "rgba(255, 255, 255, 0.3)",
                transform: idx === currentIndex ? "scale(1.2)" : "scale(1)",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const categoryData = category ? CATEGORY_PROJECTS[category] : null;

  // Dynamically set page title
  useEffect(() => {
    if (categoryData) {
      document.title = `${categoryData.title} — Kaizen Edit`;
    } else {
      document.title = "Work Portfolio — Kaizen Edit";
    }
  }, [categoryData]);

  // Heading Animation
  useEffect(() => {
    if (!headingRef.current || !categoryData) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = headingRef.current.querySelectorAll(".work-char");

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(
          chars,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.6,
            ease: "power2.out",
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
          }
        );
      }
    });

    return () => ctx.revert();
  }, [categoryData]);

  // Project Cards Animation
  useEffect(() => {
    if (!projectsRef.current || !categoryData) return;
    const cards = projectsRef.current.querySelectorAll(".project-showcase-card");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: isMobile ? 40 : 80,
            opacity: 0,
            scale: isMobile ? 1 : 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [categoryData]);

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <div className="text-center">
          <div className="font-bebas text-8xl text-neon mb-4">404</div>
          <h2 className="font-space text-lg text-white mb-6 uppercase tracking-wider">
            Category Not Found__
          </h2>
          <a
            href="/"
            className="btn-primary"
            data-cursor="pointer"
          >
            ← Return Home
          </a>
        </div>
      </div>
    );
  }

  // Helper to construct contact link with custom template message
  const getContactLink = (projectTitle: string) => {
    const subject = encodeURIComponent(`Inquiry regarding ${projectTitle}`);
    const message = encodeURIComponent(
      `Hi Kaizen Edit,\n\nI was browsing your "${categoryData.title}" portfolio and got inspired by the "${projectTitle}" project. I would love to discuss a similar project with you!`
    );
    return `/contact?subject=${subject}&message=${message}`;
  };

  const titleWords = categoryData.title.split(" ");

  return (
    <div className="pt-24 pb-20">
      {/* ═══ HERO SECTION ═══ */}
      <section className="min-h-[45vh] flex items-center px-6 md:px-10 mb-16 relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 grid grid-cols-2 gap-px animate-pulse-glow">
                <div className="bg-neon w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon/40 w-full h-full" />
                <div className="bg-neon w-full h-full" />
              </div>
              <span className="font-space text-xs tracking-[0.2em] text-text-gray uppercase">
                Portfolio Category_
              </span>
            </div>

            <div ref={headingRef} style={{ perspective: "600px" }}>
              <h1 className="section-heading">
                {titleWords.map((word, wordIndex) => (
                  <div key={wordIndex} className="overflow-hidden inline-block mr-4">
                    {word.split("").map((c, i) => (
                      <span
                        key={i}
                        className={`work-char inline-block ${
                          wordIndex === titleWords.length - 1 ? "text-neon" : "text-white"
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ))}
                <span className="work-char inline-block text-neon">_</span>
              </h1>
            </div>

            <p className="font-space text-sm text-text-gray leading-relaxed mt-6 max-w-lg">
              {categoryData.subtitle}
            </p>
          </div>

          {/* Right Decoration / Mascot */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(157,3,244,0.1) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            <div className="relative w-56 h-56 flex items-center justify-center">
              <GhostMascot />
              <div className="absolute top-0 right-0">
                <StickyNote rotation={-4}>
                  <p className="font-space text-[10px] tracking-wider text-white uppercase leading-relaxed text-center">
                    Check out<br />
                    My Best<br />
                    <span className="text-neon font-bold">Creations!</span>
                  </p>
                </StickyNote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECT LISTING ═══ */}
      <section className="px-6 md:px-10">
        <div ref={projectsRef} className="max-w-7xl mx-auto space-y-12">
          {categoryData.projects.map((project) => (
            <div
              key={project.id}
              className="project-showcase-card card-surface overflow-hidden relative group hover:border-neon/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(157,3,244,0.06)]"
            >
              <div className="flex flex-col lg:flex-row min-h-[360px]">
                {/* Left side: Gallery or Placeholder */}
                <div
                  className="w-full lg:w-[400px] h-64 lg:h-auto relative overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-surface-light to-bg"
                  style={{
                    borderRight: "1px solid var(--color-surface-border)",
                  }}
                >
                  {project.images && project.images.length > 0 ? (
                    <ProjectGallery
                      images={project.images}
                      title={project.title}
                      color={project.color}
                    />
                  ) : (
                    <>
                      {/* Huge background ID */}
                      <span
                        className="font-bebas text-9xl absolute select-none pointer-events-none transition-all duration-700 group-hover:scale-110 opacity-15"
                        style={{ color: project.color }}
                      >
                        {project.id}
                      </span>

                      {/* Corner Accent Sparkle */}
                      <div
                        className="absolute top-4 left-4 w-4 h-4 grid grid-cols-2 gap-px opacity-30 group-hover:opacity-80 transition-opacity"
                      >
                        <div style={{ backgroundColor: project.color }} className="w-full h-full" />
                        <div className="bg-transparent w-full h-full" />
                        <div className="bg-transparent w-full h-full" />
                        <div style={{ backgroundColor: project.color }} className="w-full h-full" />
                      </div>
                    </>
                  )}
                </div>

                {/* Right side: Details */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-wide uppercase">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-0.5 border border-surface-border bg-surface-light rounded font-space text-[9px] tracking-wider text-text-gray uppercase"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="font-space text-xs md:text-sm text-text-gray leading-relaxed mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Deliverables section */}
                    <div className="mb-6">
                      <h4
                        className="font-space text-[10px] tracking-[0.2em] uppercase mb-3"
                        style={{ color: project.color }}
                      >
                        Deliverables & Scope__
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {project.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="font-space text-[11px] text-text-gray flex items-center gap-2"
                          >
                            <span
                              className="w-1.5 h-1.5 flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-surface-border flex items-center justify-between flex-wrap gap-4">
                    <span className="font-space text-[10px] text-text-dim">
                      ID: {SITE.initials}-{project.id} // 2026_PROJECT
                    </span>
                    <a
                      href={getContactLink(project.title)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-neon/30 hover:border-neon text-[10px] tracking-widest text-white uppercase rounded hover:bg-neon hover:text-bg transition-all duration-300 font-space font-bold"
                      data-cursor="pointer"
                    >
                      Request Similar Project
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation Back */}
      <section className="mt-16 px-6 md:px-10 text-center">
        <a
          href="/"
          className="btn-primary"
          data-cursor="pointer"
        >
          ← Back to Homepage
        </a>
      </section>
    </div>
  );
}
