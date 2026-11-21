"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { ArrowUpRight } from "./Icons";
import { CodeTexture } from "./CodeTexture";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Manual scroll-progress tracking (0 -> 1 across the 250vh section) via a
  // single native scroll listener with a correct, idempotent cleanup. This
  // avoids relying on a library's internal scroll subscription, which can
  // misbehave across React 19 Strict Mode's mount/cleanup/mount cycle in dev.
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      scrollYProgress.set(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollYProgress]);

  // p runs 0 -> 1 across the 250vh sticky section.
  // The banner fully fades out BEFORE the hero content starts fading in —
  // these ranges must never overlap, or both are partially visible at once.
  const bannerOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const bannerShiftRaw = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const bannerShift = useTransform(bannerShiftRaw, (v) => `${v * -9}vh`);
  const heroOpacity = useTransform(scrollYProgress, [0.48, 0.78], [0, 1]);
  const heroShift = useTransform(heroOpacity, (v) => `${(1 - v) * 24}px`);
  const bannerPointerEvents = useTransform(bannerOpacity, (v) =>
    v < 0.05 ? "none" : "auto",
  );
  const heroPointerEvents = useTransform(heroOpacity, (v) =>
    v < 0.4 ? "none" : "auto",
  );

  // Cursor-reactive code background: track pointer position across the whole
  // sticky stage so the highlight still tracks even once the hero content
  // layer is painted on top of the banner.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      el.style.setProperty("--glow-opacity", "1");
    };
    const onLeave = () => {
      el.style.setProperty("--glow-opacity", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  const t = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const portraitY = useTransform(t, (v) => `calc(-50% + ${(1 - v) * 36}vh)`);
  const portraitScale = useTransform(t, (v) => 0.5 + 0.5 * v);
  const portraitRadius = useTransform(t, (v) => `${4 + v * 14}px`);

  const [l1, ...rest] = portfolioData.bannerTitle.split(" ");
  const l2 = rest.join(" ");

  return (
    <section
      ref={root}
      id="top"
      aria-label="Introduction"
      className="relative lg:h-[250vh]"
    >
      <div
        ref={stage}
        className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden"
      >
        {/* < SOFTWARE ENGINEER /> banner */}
        <motion.div
          style={{ opacity: bannerOpacity, pointerEvents: bannerPointerEvents }}
          className="banner-texture relative flex h-[78svh] min-h-[480px] flex-col justify-between overflow-hidden px-5 pb-6 pt-24 sm:px-8 lg:absolute lg:inset-0 lg:h-auto lg:pb-8"
        >
          <CodeTexture />
          <motion.h2
            style={{ y: bannerShift }}
            className="font-display text-[clamp(44px,13vw,64px)] font-bold uppercase leading-[0.9] tracking-[-0.03em] sm:text-[clamp(60px,12vw,120px)] lg:mt-[9vh] lg:text-[clamp(72px,10.5vw,190px)]"
          >
            <span className="block lg:ml-[6vw]">
              <span className="mr-[0.12em] font-light">&lt;</span>
              {l1}
            </span>
            <span className="block pl-[0.5em] lg:pl-[1.2em]">
              {l2}
              <span className="ml-[0.12em] font-light italic">/&gt;</span>
            </span>
          </motion.h2>
          <div className="flex items-end justify-between gap-4 pr-24 font-display sm:pr-32">
            <span className="text-[clamp(20px,2.4vw,40px)] font-semibold tracking-tight">
              ©{portfolioData.year}
            </span>
            <span className="text-[11px] font-medium tracking-wide sm:text-[13px]">
              {`{ ${portfolioData.bannerTag} }`}
            </span>
          </div>
        </motion.div>

        {/* Central portrait anchor */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden w-[clamp(220px,24vw,380px)] lg:block"
          style={{
            translateX: "-50%",
            translateY: portraitY,
            scale: portraitScale,
            transformOrigin: "50% 50%",
          }}
        >
          <motion.img
            src={portfolioData.portrait}
            alt={`Portrait of ${portfolioData.name}`}
            className="aspect-[3/4] w-full object-cover grayscale"
            style={{ borderRadius: portraitRadius }}
            draggable={false}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, pointerEvents: heroPointerEvents }}
          className="relative grid gap-8 px-5 py-14 sm:px-8 lg:absolute lg:inset-0 lg:grid-cols-[1fr_clamp(220px,24vw,380px)_1fr] lg:items-center lg:gap-[clamp(24px,4vw,72px)] lg:py-0"
        >
          <motion.div style={{ y: heroShift }}>
            <h1 className="font-display text-[clamp(44px,12vw,64px)] font-bold leading-[0.95] tracking-[-0.035em] lg:text-[clamp(44px,5.6vw,96px)]">
              Hi, I&rsquo;m
              <br />
              {portfolioData.name.split(" ")[0]}.
            </h1>
            <p className="mt-4 max-w-[12ch] text-[clamp(18px,1.6vw,26px)] font-semibold leading-tight">
              {portfolioData.role}
            </p>
            <dl className="mt-8 max-w-[260px] border-t border-white/15 pt-4 text-[13px]">
              <dt className="text-mute">Currently at</dt>
              <dd className="mt-2 font-semibold">
                {portfolioData.meta.company}
              </dd>
              <dd className="text-white/80">{portfolioData.meta.position}</dd>
              <dd className="text-mute">{portfolioData.meta.location}</dd>
            </dl>
          </motion.div>

          <img
            src={portfolioData.portrait}
            alt={`Portrait of ${portfolioData.name}`}
            className="aspect-[3/4] w-full max-w-sm rounded-2xl object-cover grayscale lg:hidden"
          />
          <div className="hidden lg:block" aria-hidden />

          <motion.div
            style={{ y: heroShift }}
            className="lg:self-end lg:pb-[14vh]"
          >
            <p className="max-w-[26ch] text-[clamp(15px,1.25vw,20px)] leading-snug text-white/80">
              {portfolioData.valueProp.map((s, i) =>
                s.bold ? (
                  <strong key={i} className="font-semibold text-white">
                    {s.text}
                  </strong>
                ) : (
                  <span key={i}>{s.text}</span>
                ),
              )}
            </p>
            <a
              href="#projects"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#141416] px-4 py-2.5 text-[13px] font-semibold transition hover:border-white/40 hover:bg-[#1c1c1f]"
            >
              Explore projects
              <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
