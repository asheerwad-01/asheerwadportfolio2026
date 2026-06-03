"use client";

import React, { createContext, useContext, useRef, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionContextType {
  navigateTo: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);

  const navigateTo = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (isTransitioningRef.current) return; // Prevent double-triggering

      if (!overlayRef.current) {
        router.push(href);
        return;
      }

      isTransitioningRef.current = true;
      const overlay = overlayRef.current;
      const panels = overlay.querySelectorAll(".panel-bar");

      // Stop any active animations, display overlay, block pointer events
      gsap.killTweensOf(panels);
      gsap.set(overlay, { display: "flex", pointerEvents: "auto" });
      gsap.set(panels, { xPercent: -100 });

      // Sweep in from the left
      gsap.to(panels, {
        xPercent: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.inOut",
        onComplete: () => {
          // Trigger route change inside Next.js
          router.push(href);
        },
      });
    },
    [router, pathname]
  );

  // Trigger the exit/reverse transition when the pathname changes (new page mounted)
  useEffect(() => {
    if (isTransitioningRef.current && overlayRef.current) {
      const overlay = overlayRef.current;
      const panels = overlay.querySelectorAll(".panel-bar");

      // Give a tiny tick delay for the new page layout to render/mount cleanly
      const delayTimer = setTimeout(() => {
        gsap.to(panels, {
          xPercent: -100, // Slide back out to the left (reversing back)
          duration: 0.55,
          stagger: {
            each: 0.05,
            from: "end", // Reverse the stagger order so bottom panel slides first
          },
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(overlay, { display: "none", pointerEvents: "none" });
            isTransitioningRef.current = false;
          },
        });
      }, 50);

      return () => clearTimeout(delayTimer);
    }
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ navigateTo }}>
      {children}
      <PageTransitionOverlay overlayRef={overlayRef} />
    </PageTransitionContext.Provider>
  );
}

function PageTransitionOverlay({
  overlayRef,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>;
}) {
  const panelColors = ["#9D03F4", "#C54DFF", "#6602AE", "#9D03F4"];
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
      style={{ display: "none" }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="panel-bar flex-1 w-full"
          style={{
            backgroundColor: panelColors[i],
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
