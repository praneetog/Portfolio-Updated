"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth-scroll in-page anchor links (#skills, #projects, etc.) via Lenis
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0 });
      }
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
