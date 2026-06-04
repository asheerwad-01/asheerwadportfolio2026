"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/constants";
import StickyNote from "@/components/ui/StickyNote";
import GhostMascot from "@/components/ui/GhostMascot";
import { usePageTransition } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  tools: string[];
  color: string;
  images?: string[];
  galleryId?: string;
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
        images: ["/Kaizen Brand Identity.png"],
      },
      {
        id: "02",
        title: "Youtube Thumbnails/Posters",
        description: "A collection of high-impact YouTube thumbnails and gaming promotional posters designed to maximize click-through rate (CTR) and engage audiences with bold composition, lighting, and typography.",
        deliverables: ["CTR Optimization", "3D Style Compositing", "Custom Branding", "Color Grading"],
        tools: ["Photoshop", "Graphic Design", "Visual Art", "Typography", "3D Lighting"],
        color: "#FF9A00",
        images: ["/Marvel Rivals Wolverine.png"],
        galleryId: "youtube-thumbnails",
      },
      {
        id: "03",
        title: "Poster Designs",
        description: "Creative poster designs combining custom illustration, digital compositing, and visual themes ranging from awareness campaigns to music events.",
        deliverables: ["Visual Composition", "Color Correction", "Print Formatting", "Custom Layout Design"],
        tools: ["Photoshop", "Illustrator", "Poster Design", "Compositing", "Typography"],
        color: "#C54DFF",
        images: ["/YUNG KAI Poster.png"],
        galleryId: "poster-designs",
      },
    ],
  },
  "web-dev": {
    title: "Full Stack Web-D",
    subtitle: "Building highly interactive, responsive, and performant web applications.",
    projects: [
      {
        id: "01",
        title: "DM Enterprises",
        description: "DM Enterprises — A modern, full-stack e-commerce web platform for rubber stamps, corporate trophies, customized gifts, and self-inking stamps. Deployed link: https://dmenterprises-eight.vercel.app/",
        deliverables: ["Product Customizer UI", "E-commerce Product Filtering", "Responsive Frontend Coding", "Backend API Setup"],
        tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "MongoDB"],
        color: "#9D03F4",
        images: ["/DM Home.png"],
        galleryId: "dm-enterprises",
      },
    ],
  },
  "motion": {
    title: "Motion Graphics / AMV",
    subtitle: "Animating static elements into energetic visual narratives and editing glitchy cinematic sequences.",
    projects: [
      {
        id: "01",
        title: "Motion Graphics & AMV Showcase",
        description: "A curated collection of Anime Music Videos (AMVs) and promotional motion graphics utilizing After Effects visual effects, beat synchronization, and custom pacing.",
        deliverables: ["Video Editing", "VFX & Compositing", "Beat Synchronization", "Sound Design"],
        tools: ["After Effects", "Premiere Pro", "VFX", "Sound Design"],
        color: "#9D03F4",
        images: ["/MILES MORALES.mp4"],
        galleryId: "motion-amv",
      },
    ],
  },
};

function ProjectGallery({
  images,
  title,
  color,
  onImageClick,
}: {
  images: string[];
  title: string;
  color: string;
  onImageClick: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const isVideo = images[currentIndex].endsWith(".mp4");

  return (
    <div className="relative w-full h-full group/gallery overflow-hidden flex items-center justify-center bg-black">
      {/* Active Image / Video */}
      <button
        onClick={() => onImageClick(currentIndex)}
        className="w-full h-full block cursor-pointer text-left focus:outline-none"
        data-cursor="pointer"
        title="Click to view fullscreen popup"
      >
        {isVideo ? (
          <video
            src={images[currentIndex]}
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={images[currentIndex]}
            alt={`${title} Screenshot ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        )}
      </button>

      {/* Navigation arrows (only if > 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
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
              e.stopPropagation();
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
                e.stopPropagation();
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
  const { navigateTo } = usePageTransition();

  const categoryData = category ? CATEGORY_PROJECTS[category] : null;

  // Lightbox overlay state
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Dynamically set page title
  useEffect(() => {
    if (categoryData) {
      document.title = `${categoryData.title} — Kaizen Edit`;
    } else {
      document.title = "Work Portfolio — Kaizen Edit";
    }
  }, [categoryData]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft" && lightboxImages.length > 1) {
        setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && lightboxImages.length > 1) {
        setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxImages]);

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
                {/* Left side: Gallery, Link Preview, or Placeholder */}
                <div
                  className="w-full lg:w-[400px] h-64 lg:h-auto relative overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-surface-light to-bg"
                  style={{
                    borderRight: "1px solid var(--color-surface-border)",
                  }}
                >
                  {project.galleryId ? (
                    <a
                      href={`/gallery/${project.galleryId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(`/gallery/${project.galleryId}`);
                      }}
                      className="w-full h-full block relative group/preview cursor-pointer"
                      data-cursor="pointer"
                    >
                      {project.images?.[0].endsWith(".mp4") ? (
                        <video
                          src={project.images?.[0]}
                          preload="metadata"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105"
                          muted
                          loop
                          autoPlay
                          playsInline
                        />
                      ) : (
                        <img
                          src={project.images?.[0]}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105"
                        />
                      )}
                      {/* Overlay text */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                        <span className="font-space text-xs text-white tracking-widest uppercase">
                          View Full Gallery
                        </span>
                        <span className="text-neon text-lg">↗</span>
                      </div>
                    </a>
                  ) : project.images && project.images.length > 0 ? (
                    <ProjectGallery
                      images={project.images}
                      title={project.title}
                      color={project.color}
                      onImageClick={(index) => {
                        setLightboxImages(project.images || []);
                        setLightboxIndex(index);
                        setLightboxOpen(true);
                      }}
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
                    <div className="flex gap-3">
                      {project.galleryId && (
                        <a
                          href={`/gallery/${project.galleryId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo(`/gallery/${project.galleryId}`);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-neon/30 hover:border-neon text-[10px] tracking-widest text-white uppercase rounded hover:bg-neon hover:text-bg transition-all duration-300 font-space font-bold"
                          data-cursor="pointer"
                        >
                          View Full Gallery
                          <span>↗</span>
                        </a>
                      )}
                      <a
                        href={getContactLink(project.title)}
                        className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase rounded transition-all duration-300 font-space font-bold ${
                          project.galleryId
                            ? "border border-surface-border hover:border-neon/30 text-text-gray hover:text-white"
                            : "border border-neon/30 hover:border-neon text-white hover:bg-neon hover:text-bg"
                        }`}
                        data-cursor="pointer"
                      >
                        Request Similar Project
                        <span>→</span>
                      </a>
                    </div>
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

      {/* ═══ LIGHTBOX POPUP MODAL ═══ */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-bg/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          style={{
            animation: "workFadeIn 0.25s ease-out",
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes workFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}} />

          {/* Close Overlay by clicking background */}
          <div
            className="absolute inset-0 cursor-default"
            onClick={() => setLightboxOpen(false)}
          />

          <div className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center justify-center z-10">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 md:right-4 w-10 h-10 flex items-center justify-center border border-surface-border bg-surface/90 hover:border-neon hover:text-neon rounded-full transition-all duration-300 text-white font-space text-sm"
              data-cursor="pointer"
              aria-label="Close popup"
            >
              ✕
            </button>

            {/* Display Image/Video Container */}
            <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden border border-surface-border bg-black select-none shadow-[0_0_60px_rgba(157,3,244,0.2)]">
              {lightboxImages[lightboxIndex].endsWith(".mp4") ? (
                <video
                  src={lightboxImages[lightboxIndex]}
                  className="max-w-full max-h-[75vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={lightboxImages[lightboxIndex]}
                  alt={`Fullscreen preview ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[75vh] object-contain transition-all duration-300"
                />
              )}

              {/* Prev Navigation Arrow */}
              {lightboxImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/85 border border-surface-border text-white flex items-center justify-center hover:border-neon hover:text-neon text-lg font-bold shadow-lg transition-all duration-200"
                  data-cursor="pointer"
                  aria-label="Previous image"
                >
                  ←
                </button>
              )}

              {/* Next Navigation Arrow */}
              {lightboxImages.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/85 border border-surface-border text-white flex items-center justify-center hover:border-neon hover:text-neon text-lg font-bold shadow-lg transition-all duration-200"
                  data-cursor="pointer"
                  aria-label="Next image"
                >
                  →
                </button>
              )}
            </div>

            {/* Status Counter */}
            <div className="mt-4 px-4 py-1.5 bg-surface/90 border border-surface-border rounded-full font-space text-[10px] text-text-gray tracking-widest uppercase">
              Item {lightboxIndex + 1} of {lightboxImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
