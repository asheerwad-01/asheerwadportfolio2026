"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { usePageTransition } from "@/components/PageTransition";

interface GalleryData {
  title: string;
  description: string;
  images: string[];
  link?: string;
}

const GALLERIES: Record<string, GalleryData> = {
  "youtube-thumbnails": {
    title: "Youtube Thumbnails & Posters",
    description: "A collection of high-impact YouTube thumbnails and gaming promotional posters designed to maximize click-through rate (CTR) and engage audiences with bold composition, lighting, and typography.",
    images: [
      "/Marvel Rivals SPIDERMAN.png",
      "/Marvel Rivals Wolverine.png",
      "/Commercial Poster copy.jpg",
      "/Aaru is Live BGMI.jpg",
      "/Aaru is Live.png",
      "/JJK THUMBNAIL.png",
      "/INTERSTELLAR THUMBNAIL.jpg",
      "/Kaiser Equipped JPEG.jpg",
    ],
  },
  "poster-designs": {
    title: "Creative Poster Designs",
    description: "Creative poster designs combining custom illustration, digital compositing, and visual themes ranging from awareness campaigns to music events.",
    images: [
      "/YUNG KAI Poster.png",
      "/Aaru 2.png",
      "/Mental Health Awareness.jpg",
      "/Dog Awareness.png",
      "/Metaversity Event Poster.png",
    ],
  },
  "motion-amv": {
    title: "Motion Graphics / AMV",
    description: "A showcase of high-energy Anime Music Videos (AMVs) and dynamic motion graphics. Featuring stylized video editing, beat-matching, visual effects, and cinematic pacing.",
    images: [
      "/MILES MORALES.mp4",
      "/Jujutsu Kaisen.mp4",
      "/BLUE.mp4",
      "/Avatar.mp4",
      "/GOAT.mp4",
      "/I WANT TO EAT YOUR PANCREAS.mp4",
      "/Optimus Prime.mp4",
      "/One Piece.mp4",
      "/Spiderman Final.mp4",
      "/Scarlet Witch.mp4",
      "/Interstellar Final.mp4",
      "/Mustang GT Reveal.mp4",
    ],
  },
  "dm-enterprises": {
    title: "DM Enterprises E-Commerce",
    description: "A modern, full-stack e-commerce web platform for rubber stamps, trophies, customized gifts, and corporate items. Features dynamic product filtering, seamless checkout, and custom product configuration.",
    link: "https://dmenterprises-eight.vercel.app/",
    images: [
      "/DM Home.png",
      "/DM Shop.png",
      "/DM Trophies.png",
      "/DM Rubber Stamps.png",
      "/DM Customized Gifts.png",
      "/DM About Us.png",
      "/DM Contact.png",
    ],
  },
};

const VideoGridItem = ({
  src,
  title,
  onClick,
}: {
  src: string;
  title: string;
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="grid-item card-surface overflow-hidden group cursor-pointer hover:border-neon/30 hover:shadow-[0_0_30px_rgba(157,3,244,0.15)] transition-all duration-500 relative aspect-video bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="pointer"
    >
      <video
        ref={videoRef}
        src={src}
        preload="none"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        muted
        loop
        playsInline
      />
      {/* Play Icon / Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/10 transition-colors">
        <div className="w-12 h-12 rounded-full border border-white/30 bg-bg/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:border-neon group-hover:text-neon transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Dark overlay with title & icon on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <span className="font-space text-[10px] text-neon tracking-widest uppercase mb-1">
          Click to Play
        </span>
        <h3 className="font-bebas text-xl text-white tracking-wide uppercase">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default function GalleryPage() {
  const { id } = useParams<{ id: string }>();
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();

  const gallery = id ? GALLERIES[id] : null;

  // Lightbox overlay state
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Dynamically set page title
  useEffect(() => {
    if (gallery) {
      document.title = `${gallery.title} — Kaizen Edit`;
    } else {
      document.title = "Gallery — Kaizen Edit";
    }
  }, [gallery]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen || !gallery) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft" && gallery.images.length > 1) {
        setLightboxIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && gallery.images.length > 1) {
        setLightboxIndex((prev) => (prev === gallery.images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, gallery]);

  // Heading Entrance Animation
  useEffect(() => {
    if (!headingRef.current || !gallery) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const chars = headingRef.current.querySelectorAll(".gallery-char");

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(
          chars,
          { y: 30, opacity: 0 },
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
          { y: 80, opacity: 0, rotateX: -90 },
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
  }, [gallery]);

  // Grid Items Animation
  useEffect(() => {
    if (!gridRef.current || !gallery) return;
    const items = gridRef.current.querySelectorAll(".grid-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    });

    return () => ctx.revert();
  }, [gallery]);

  if (!gallery) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <div className="text-center">
          <div className="font-bebas text-8xl text-neon mb-4">404</div>
          <h2 className="font-space text-lg text-white mb-6 uppercase tracking-wider">
            Gallery Not Found__
          </h2>
          <a href="/" className="btn-primary" data-cursor="pointer">
            ← Return Home
          </a>
        </div>
      </div>
    );
  }

  const titleWords = gallery.title.split(" ");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* ═══ HERO SECTION ═══ */}
      <section className="px-6 md:px-10 mb-16 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 grid grid-cols-2 gap-px animate-pulse-glow">
              <div className="bg-neon w-full h-full" />
              <div className="bg-neon/40 w-full h-full" />
              <div className="bg-neon/40 w-full h-full" />
              <div className="bg-neon w-full h-full" />
            </div>
            <span className="font-space text-xs tracking-[0.2em] text-text-gray uppercase">
              Visual Gallery_
            </span>
          </div>

          <div ref={headingRef} style={{ perspective: "600px" }}>
            <h1 className="section-heading">
              {titleWords.map((word, wordIndex) => (
                <div key={wordIndex} className="overflow-hidden inline-block mr-4">
                  {word.split("").map((c, i) => (
                    <span
                      key={i}
                      className={`gallery-char inline-block ${
                        wordIndex === titleWords.length - 1 ? "text-neon" : "text-white"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ))}
              <span className="gallery-char inline-block text-neon">_</span>
            </h1>
          </div>

          <p className="font-space text-sm text-text-gray leading-relaxed mt-6 max-w-2xl">
            {gallery.description}
          </p>
        </div>
      </section>

      {/* ═══ IMAGES/VIDEOS GRID ═══ */}
      <section className="px-6 md:px-10 mb-16">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gallery.images.map((imgUrl, index) => {
            const fileName = imgUrl.split("/").pop()?.split(".")[0] || "";
            const isVideo = imgUrl.endsWith(".mp4");
            const displayName = fileName.replace(/%20/g, " ");

            if (isVideo) {
              return (
                <VideoGridItem
                  key={index}
                  src={imgUrl}
                  title={displayName}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                />
              );
            }

            return (
              <div
                key={index}
                className="grid-item card-surface overflow-hidden group cursor-pointer hover:border-neon/30 hover:shadow-[0_0_30px_rgba(157,3,244,0.15)] transition-all duration-500 relative aspect-video bg-black"
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                data-cursor="pointer"
              >
                <img
                  src={imgUrl}
                  alt={displayName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark overlay with title & icon on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="font-space text-[10px] text-neon tracking-widest uppercase mb-1">
                    Click to Expand
                  </span>
                  <h3 className="font-bebas text-xl text-white tracking-wide uppercase">
                    {displayName}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Navigation Back */}
      <section className="px-6 md:px-10 text-center flex flex-wrap items-center justify-center gap-4">
        {gallery.link && (
          <a
            href={gallery.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-cursor="pointer"
          >
            Visit Site ↗
          </a>
        )}
        <button
          onClick={() => window.close()}
          className="inline-flex items-center gap-2 px-6 py-3.5 border border-surface-border bg-surface text-xs tracking-[0.15em] text-text-gray hover:text-white uppercase rounded transition-all duration-300 font-space cursor-pointer"
          data-cursor="pointer"
        >
          ✕ Close Tab
        </button>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("/");
          }}
          className="inline-flex items-center gap-2 px-6 py-3.5 border border-surface-border bg-surface text-xs tracking-[0.15em] text-text-gray hover:text-white uppercase rounded transition-all duration-300 font-space"
          data-cursor="pointer"
        >
          ← Go to Homepage
        </a>
      </section>

      {/* ═══ LIGHTBOX POPUP MODAL ═══ */}
      {lightboxOpen && gallery.images.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-bg/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          style={{
            animation: "galleryFadeIn 0.25s ease-out",
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes galleryFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}} />

          {/* Close Overlay */}
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

            {/* Display Container */}
            <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden border border-surface-border bg-black select-none shadow-[0_0_60px_rgba(157,3,244,0.2)]">
              {gallery.images[lightboxIndex].endsWith(".mp4") ? (
                <video
                  src={gallery.images[lightboxIndex]}
                  className="max-w-full max-h-[75vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={gallery.images[lightboxIndex]}
                  alt={`Expanded view ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[75vh] object-contain"
                />
              )}

              {/* Prev Navigation Arrow */}
              {gallery.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/85 border border-surface-border text-white flex items-center justify-center hover:border-neon hover:text-neon text-lg font-bold shadow-lg transition-all duration-200"
                  data-cursor="pointer"
                  aria-label="Previous item"
                >
                  ←
                </button>
              )}

              {/* Next Navigation Arrow */}
              {gallery.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === gallery.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/85 border border-surface-border text-white flex items-center justify-center hover:border-neon hover:text-neon text-lg font-bold shadow-lg transition-all duration-200"
                  data-cursor="pointer"
                  aria-label="Next item"
                >
                  →
                </button>
              )}
            </div>

            {/* Status Counter & Filename */}
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <div className="px-4 py-1.5 bg-surface/90 border border-surface-border rounded-full font-space text-[10px] text-text-gray tracking-widest uppercase">
                Item {lightboxIndex + 1} of {gallery.images.length}
              </div>
              <span className="font-space text-[11px] text-text-dim uppercase tracking-wider">
                {gallery.images[lightboxIndex].split("/").pop()?.split(".")[0].replace(/%20/g, " ")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
