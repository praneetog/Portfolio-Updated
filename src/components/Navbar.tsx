"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const NAV_LINKS = [
  { label: "Top", href: "#top" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [spinCount, setSpinCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Periodic 360-degree brand spin every 3 seconds
  useEffect(() => {
    const id = window.setInterval(() => {
      setSpinCount((c) => c + 1);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  // Subtle background/border tightening after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close quick-nav menu on Escape or click outside
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const openAI = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event("open-ask-ai"));
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex flex-col items-center px-4 sm:top-5">
      <div
        ref={containerRef}
        className="flex w-full max-w-[380px] flex-col items-center"
      >
        <motion.nav
          aria-label="Primary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full border py-1.5 pl-5 pr-1.5 backdrop-blur-xl transition-colors duration-300 ${
            scrolled
              ? "border-white/15 bg-black/75 shadow-[0_10px_34px_rgba(0,0,0,0.6)]"
              : "border-white/10 bg-black/50 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Spinning brand mark */}
          <a
            href="#top"
            onMouseEnter={() => setSpinCount((c) => c + 1)}
            className="inline-block text-[15px] font-semibold tracking-tight text-white"
          >
            <motion.span
              className="inline-block origin-center transform-gpu"
              animate={{ rotate: spinCount * 360 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {portfolioData.brand}
            </motion.span>
          </a>

          {/* Right controls: quick-nav toggle + AI trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle quick navigation"
              aria-expanded={menuOpen}
              className="grid h-7 w-7 place-items-center rounded-md border border-white/15 bg-[#17171a] transition hover:border-white/40 hover:bg-[#222226]"
            >
              <motion.span
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  scale: menuOpen ? 1.15 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="h-2 w-2 rounded-[2px] bg-white/80"
              />
            </button>

            <button
              type="button"
              onClick={openAI}
              className="rounded-full bg-[#f4f2ee] px-4 py-1.5 text-[13px] font-semibold text-black transition hover:scale-[1.03] hover:bg-white active:scale-[0.98]"
            >
              {portfolioData.navBadge.label}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto mt-2 flex flex-wrap justify-center gap-1 rounded-2xl border border-white/10 bg-[#111113]/95 p-1.5 shadow-2xl backdrop-blur-xl"
            >
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
