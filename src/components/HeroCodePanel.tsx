"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LAST_RUNS = [
  { time: "09:41:08", name: "swoovo-api · go", metric: "24 ms" },
  { time: "09:41:02", name: "mytravaly · next.js", metric: "2.0x" },
  { time: "09:38:57", name: "parsey-ai · langchain", metric: "ready" },
];

export function HeroCodePanel() {
  const rawRotateX = useMotionValue(5);
  const rawRotateY = useMotionValue(-11);
  const [glare, setGlare] = useState({ x: 50, y: 50, active: false });

  const rotateX = useSpring(rawRotateX, {
    stiffness: 260,
    damping: 18,
    mass: 0.6,
  });
  const rotateY = useSpring(rawRotateY, {
    stiffness: 260,
    damping: 18,
    mass: 0.6,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const nx = px - 0.5; // -0.5..0.5
    const ny = py - 0.5;

    // High-sensitivity 3D tilt
    rawRotateY.set(-6 + nx * 32);
    rawRotateX.set(2 - ny * 28);
    setGlare({ x: px * 100, y: py * 100, active: true });
  };

  const handlePointerLeave = () => {
    rawRotateX.set(5);
    rawRotateY.set(-11);
    setGlare((g) => ({ ...g, active: false }));
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto w-full max-w-[520px] py-4 [perspective:1000px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl border border-white/[0.12] bg-[#0b0d10]/60 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[8px] will-change-transform"
      >
        {/* Interactive specular sheen that tracks the cursor */}
        <div
          aria-hidden
          style={{
            opacity: glare.active ? 1 : 0,
            background: `radial-gradient(320px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.11), transparent 65%)`,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        />

        {/* Overhanging 3D floating depth badge — positioned clear of the code text */}
        <div
          style={{ transform: "translateZ(46px)" }}
          className="pointer-events-none absolute -left-24 top-1/2 hidden -translate-y-1/2 items-center xl:flex"
        >
          <div className="rounded-xl border border-white/[0.16] bg-[#101317]/90 px-3.5 py-2.5 shadow-[0_18px_38px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[8px]">
            <p className="text-[11px] font-semibold tracking-tight text-white">
              Edge API
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-lime-200/75">
              200 OK · go/ts
            </p>
          </div>
          <span className="h-[1px] w-5 bg-gradient-to-r from-white/40 to-white/10" />
          <span className="h-1.5 w-1.5 rounded-full bg-lime-200/90 shadow-[0_0_8px_rgba(190,242,100,0.7)]" />
        </div>

        {/* Panel top header */}
        <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-[11px]">
          <div className="flex items-center gap-3 text-white/60">
            <span className="font-medium text-white/90">praneet.config.ts</span>
            <span className="hidden text-white/35 sm:inline">
              3 modules / 1 stack
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-lime-200/90">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300 shadow-[0_0_8px_rgba(190,242,100,0.9)]" />
            <span>shipping</span>
          </div>
        </div>

        {/* Recessed inner code window */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative mt-4 rounded-xl border border-white/[0.08] bg-black/55 p-4 font-mono text-[11.5px] leading-[1.75] text-slate-300/90 shadow-inner"
        >
          <p>
            <span className="text-slate-500">export const</span>{" "}
            <span className="text-white">engineer</span>{" "}
            <span className="text-slate-500">=</span>{" "}
            <span className="text-slate-400">{"{"}</span>
          </p>
          <p className="pl-4">
            <span className="text-slate-400">role:</span>{" "}
            <span className="text-slate-100">
              &apos;Full-Stack Software Engineer&apos;
            </span>
            ,
          </p>
          <p className="pl-4">
            <span className="text-slate-400">stack:</span>{" "}
            <span className="text-lime-200/90">
              [&apos;Next.js&apos;, &apos;TypeScript&apos;, &apos;Go&apos;,
              &apos;AI&apos;]
            </span>
            ,
          </p>
          <p className="pl-4">
            <span className="text-slate-400">production:</span>{" "}
            <span className="text-sky-200/90">
              [&apos;Swoovo&apos;, &apos;MyTravaly&apos;]
            </span>
            ,
          </p>
          <p className="pl-4">
            <span className="text-slate-400">focus:</span>{" "}
            <span className="text-slate-100">
              &apos;low-latency APIs &amp; fast SEO&apos;
            </span>
            ,
          </p>
          <p>
            <span className="text-slate-400">{"}"}</span>{" "}
            <span className="text-slate-500">as const;</span>
          </p>
        </div>

        {/* Bottom execution log strip */}
        <div className="relative mt-4 border-t border-white/[0.07] pt-3 font-mono text-[10.5px]">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-white/35">
            Last runs
          </p>
          <ul className="space-y-1.5">
            {LAST_RUNS.map((run) => (
              <li
                key={run.name}
                className="flex items-center justify-between gap-2 text-white/60"
              >
                <span className="flex min-w-0 items-center gap-2 truncate">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-lime-300/80" />
                  <span className="text-white/35">{run.time}</span>
                  <span className="truncate text-white/80">{run.name}</span>
                </span>
                <span className="shrink-0 text-white/45">{run.metric}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
