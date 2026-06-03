"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ArcadePanel from "@/components/ArcadePanel";

import { PageTransitionProvider } from "@/components/PageTransition";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Check if preloader has been shown this session
    const shown = sessionStorage.getItem("preloaderShown");
    if (shown) {
      setShowPreloader(false);
      setLoaded(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setLoaded(true);
    setShowPreloader(false);
    sessionStorage.setItem("preloaderShown", "true");
  };

  return (
    <PageTransitionProvider>
      {/* Preloader - only on first visit per session */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Background effects */}
      <BackgroundEffects />

      {/* Floating arcade beat synth */}
      <ArcadePanel />

      {/* Main content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <SmoothScroll>
          <Navbar />
          <Sidebar />

          <main className="relative z-10 pl-0 lg:pl-16">
            {children}
          </main>

          <Footer />
        </SmoothScroll>
      </div>
    </PageTransitionProvider>
  );
}
