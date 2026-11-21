"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData, type ExperienceEntry } from "@/data/portfolioData";
import { Reveal } from "@/hooks/useReveal";

function wave(pts: [number, number][]) {
  let path = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i - 1];
    const [x2, y2] = pts[i];
    const mx = (x1 + x2) / 2;
    path += ` C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  }
  return path;
}

/**
 * Draws the wavy connector line left-to-right as it scrolls into view, and
 * places the dots to match.
 *
 * The geometry is built in the track's REAL pixel dimensions (measured via
 * ResizeObserver), not an abstract small viewBox stretched non-uniformly
 * into a wide container. That distortion (e.g. a 100x12 viewBox forced to
 * fill a ~1536x80 box with preserveAspectRatio="none") combined with
 * non-scaling-stroke creates a degenerate stroke-outline right at each
 * curve segment's vertical-tangent inflection point — a visible gap at
 * every midpoint between dots. Building the path in true 1:1 pixel space
 * avoids the distortion (and the bug) entirely.
 */
function WaveLine({ n }: { n: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState({ w: 1200, h: 80 });
  const [length, setLength] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const padY = size.h * 0.22;
  const topY = padY;
  const bottomY = size.h - padY;
  const pts: [number, number][] = Array.from({ length: n }, (_, i) => [
    (i / n) * size.w,
    i % 2 === 0 ? topY : bottomY,
  ]);
  const tail: [number, number] = [size.w, pts[n - 1][1] === topY ? bottomY : topY];
  const path = wave([...pts, tail]);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, [path]);

  return (
    <div ref={wrapRef} className="relative mx-[6px] h-20">
      <svg
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        {length === null ? (
          <path ref={pathRef} d={path} fill="none" stroke="transparent" strokeWidth="1.2" />
        ) : (
          <motion.path
            d={path}
            fill="none"
            stroke="rgba(255,255,255,.35)"
            strokeWidth="1.2"
            strokeDasharray={length}
            initial={{ strokeDashoffset: length }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </svg>
      {pts.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,.08)]"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.3, delay: 0.15 + (i / Math.max(n - 1, 1)) * 1.3 }}
        />
      ))}
    </div>
  );
}

function ExperienceItem({ e }: { e: ExperienceEntry }) {
  return (
    <div className="text-[13px]">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {e.current && (
          <span className="rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-black">
            Current
          </span>
        )}
        {e.badge && (
          <span className="rounded border border-white/25 bg-white/10 px-2 py-0.5 text-[11px] font-medium">
            {e.badge}
          </span>
        )}
      </div>
      <p className="text-xs text-mute">{e.range}</p>
      <h3 className="mt-2 text-[clamp(17px,1.5vw,22px)] font-semibold leading-tight tracking-tight">
        {e.title}
      </h3>
      <p className="mt-2 font-medium text-white/85">{e.org}</p>
      <p className="mt-2 text-xs leading-relaxed text-mute">{e.description}</p>
    </div>
  );
}

export function Experience() {
  const n = portfolioData.experience.length;

  return (
    <section id="experience" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <div className="flex items-start justify-between gap-6">
          <h2 className="font-display text-[clamp(40px,6vw,88px)] font-semibold leading-none tracking-[-0.03em]">
            {portfolioData.experienceHeading.title}
          </h2>
          <p className="pt-2 text-right text-sm text-mute">
            {portfolioData.experienceHeading.aside.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </Reveal>

      {/* Desktop: curved line + dots */}
      <div className="relative mt-16 hidden lg:block">
        <WaveLine n={n} />
        <div
          className="mt-4 grid gap-8"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}
        >
          {portfolioData.experience.map((e, i) => (
            <Reveal key={e.title} delay={i * 80}>
              <ExperienceItem e={e} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile: vertical list */}
      <ol className="relative mt-12 space-y-10 border-l border-white/25 pl-7 lg:hidden">
        {portfolioData.experience.map((e) => (
          <li key={e.title} className="relative">
            <span className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-white" />
            <ExperienceItem e={e} />
          </li>
        ))}
      </ol>
    </section>
  );
}
