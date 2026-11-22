"use client";

import { useEffect, useRef } from "react";

const ACTIVE_THEME: "green-blue" | "silver-red" = "green-blue";

const THEMES = {
  "green-blue": {
    veil: "rgba(132, 204, 22, 0.026)",
    mistA: "rgba(163, 230, 53, 0.045)",
    mistB: "rgba(56, 189, 248, 0.036)",
    strandA: [190, 242, 100] as const,
    strandB: [56, 189, 248] as const,
    streamCore: [250, 255, 232] as const,
    bendGlow: "rgba(190, 242, 100, 0.13)",
    bendMid: "rgba(236, 252, 203, 0.34)",
    bendHot: "rgba(255, 255, 245, 0.9)",
    flareCore: "rgba(255, 255, 238, 0.44)",
    flareMid: "rgba(190, 242, 100, 0.16)",
    flareOuter: "rgba(56, 189, 248, 0.025)",
    particleA: "rgba(217, 249, 157, ",
    particleB: "rgba(125, 211, 252, ",
  },
  "silver-red": {
    veil: "rgba(220, 38, 38, 0.026)",
    mistA: "rgba(239, 68, 68, 0.045)",
    mistB: "rgba(203, 213, 225, 0.038)",
    strandA: [248, 113, 113] as const,
    strandB: [226, 232, 240] as const,
    streamCore: [255, 246, 246] as const,
    bendGlow: "rgba(248, 113, 113, 0.13)",
    bendMid: "rgba(254, 226, 226, 0.34)",
    bendHot: "rgba(255, 250, 250, 0.9)",
    flareCore: "rgba(255, 246, 246, 0.42)",
    flareMid: "rgba(239, 68, 68, 0.16)",
    flareOuter: "rgba(203, 213, 225, 0.025)",
    particleA: "rgba(252, 165, 165, ",
    particleB: "rgba(241, 245, 249, ",
  },
};

interface StrandDef {
  ratio: number;
  wobbleAmp: number;
  wobbleFreq: number;
  phase: number;
  strokeStyle: string;
  width: number;
  r: number;
  g: number;
  b: number;
}

interface FlowStream {
  strandIdx: number;
  head: number;
  length: number;
  speed: number;
  outerStyle: string;
  coreStyle: string;
  outerWidth: number;
  coreWidth: number;
}

interface DustParticle {
  t: number;
  spread: number;
  speed: number;
  size: number;
  alpha: number;
  phase: number;
  colorPrefix: string;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Pre-bakes a crisp 256x256 radial caustic sprite once on mount */
function createFlareSprite(
  core: string,
  mid: string,
  outer: string,
): HTMLCanvasElement {
  const size = 256;
  const half = size / 2;
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;
  const octx = off.getContext("2d");
  if (octx) {
    const grad = octx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, core);
    grad.addColorStop(0.22, mid);
    grad.addColorStop(0.62, outer);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    octx.fillStyle = grad;
    octx.fillRect(0, 0, size, size);
  }
  return off;
}

export function SilverFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const theme = THEMES[ACTIVE_THEME];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const flareSprite = createFlareSprite(
      theme.flareCore,
      theme.flareMid,
      theme.flareOuter,
    );

    const STEPS = 60;
    const POINTS = STEPS + 1;
    const STRAND_COUNT = 24;

    // Pre-allocated typed arrays (zero per-frame heap allocations)
    const spineX = new Float32Array(POINTS);
    const spineY = new Float32Array(POINTS);
    const spineWorldY = new Float32Array(POINTS);
    const spineNx = new Float32Array(POINTS);
    const spineNy = new Float32Array(POINTS);
    const spineHalfW = new Float32Array(POINTS);
    const spineTurn = new Float32Array(POINTS);
    const spineOpen = new Float32Array(POINTS);
    const strandX = new Float32Array(STRAND_COUNT * POINTS);
    const strandY = new Float32Array(STRAND_COUNT * POINTS);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    let isHidden = document.hidden;

    let scrollY = window.scrollY;
    let lastTimestamp = performance.now();
    let flowTime = 0;

    const INTRO_DURATION_SEC = 1.55;
    let introElapsed = prefersReducedMotion ? INTRO_DURATION_SEC : 0;

    // 24 razor-sharp organically clustered silk filaments
    const strands: StrandDef[] = Array.from(
      { length: STRAND_COUNT },
      (_, i) => {
        const linear = (i / (STRAND_COUNT - 1)) * 2 - 1;
        const clustered =
          Math.sign(linear) * Math.pow(Math.abs(linear), 1.22) +
          Math.sin(i * 2.1) * 0.032;
        const ratio = Math.max(-1, Math.min(1, clustered));
        const colorMix = Math.max(0, Math.min(1, (ratio + 1) * 0.5));
        const coreWeight = 1 - Math.abs(ratio);
        const r = Math.round(
          lerp(theme.strandA[0], theme.strandB[0], colorMix),
        );
        const g = Math.round(
          lerp(theme.strandA[1], theme.strandB[1], colorMix),
        );
        const b = Math.round(
          lerp(theme.strandA[2], theme.strandB[2], colorMix),
        );
        const alpha = 0.05 + coreWeight * 0.09 + (i % 5 === 0 ? 0.035 : 0);

        return {
          ratio,
          wobbleAmp: 3.5 + (i % 5) * 3,
          wobbleFreq: 0.0022 + (i % 4) * 0.0005,
          phase: i * 1.15,
          strokeStyle: `rgba(${r},${g},${b},${alpha.toFixed(3)})`,
          width: 0.6 + coreWeight * 0.65,
          r,
          g,
          b,
        };
      },
    );

    // 38 crisp continuous flowing light streams (zero gradient allocations)
    const streams: FlowStream[] = Array.from({ length: 38 }, (_, i) => {
      const strandIdx = i % STRAND_COUNT;
      const st = strands[strandIdx];
      const coreWeight = 1 - Math.abs(st.ratio);
      const length = 0.21 + (i % 5) * 0.045;
      const intensity = 0.22 + coreWeight * 0.34;

      const cr = Math.round(lerp(st.r, theme.streamCore[0], 0.55));
      const cg = Math.round(lerp(st.g, theme.streamCore[1], 0.55));
      const cb = Math.round(lerp(st.b, theme.streamCore[2], 0.55));

      return {
        strandIdx,
        head: (i * 0.217) % (1 + length),
        length,
        speed: 0.25 + (i % 7) * 0.045 + coreWeight * 0.08,
        outerStyle: `rgba(${st.r},${st.g},${st.b},${(intensity * 0.36).toFixed(3)})`,
        coreStyle: `rgba(${cr},${cg},${cb},${(intensity * 0.85).toFixed(3)})`,
        outerWidth: 1.25 + coreWeight * 0.9,
        coreWidth: 0.75 + coreWeight * 0.6,
      };
    });

    // 30 sharp glowing dust pinpoints
    const particles: DustParticle[] = Array.from({ length: 30 }, (_, i) => ({
      t: (i / 30 + Math.random() * 0.03) % 1,
      spread: (Math.random() - 0.5) * 2.05,
      speed: 0.055 + Math.random() * 0.075,
      size: 0.65 + Math.random() * 1.05,
      alpha: 0.22 + Math.random() * 0.38,
      phase: Math.random() * Math.PI * 2,
      colorPrefix: i % 3 === 0 ? theme.particleB : theme.particleA,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Native crisp DPR (up to 2x Retina) — zero upscaling blur
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden && !prefersReducedMotion) {
        lastTimestamp = performance.now();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(render);
      }
    };

    const strokeSubSegment = (sIdx: number, tStart: number, tEnd: number) => {
      const base = sIdx * POINTS;
      const f0 = tStart * STEPS;
      const i0 = Math.floor(f0);
      const frac0 = f0 - i0;
      const i0Next = i0 < STEPS ? i0 + 1 : STEPS;
      const sx = lerp(strandX[base + i0], strandX[base + i0Next], frac0);
      const sy = lerp(strandY[base + i0], strandY[base + i0Next], frac0);

      const f1 = tEnd * STEPS;
      const i1 = Math.floor(f1);
      const frac1 = f1 - i1;
      const i1Next = i1 < STEPS ? i1 + 1 : STEPS;
      const ex = lerp(strandX[base + i1], strandX[base + i1Next], frac1);
      const ey = lerp(strandY[base + i1], strandY[base + i1Next], frac1);

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      for (let i = i0 + 1; i <= i1; i++) {
        ctx.lineTo(strandX[base + i], strandY[base + i]);
      }
      ctx.lineTo(ex, ey);
      ctx.stroke();
    };

    const strokeSpineRange = (
      from: number,
      to: number,
      lw: number,
      style: string,
    ) => {
      if (to - from < 1) return;
      ctx.beginPath();
      ctx.moveTo(spineX[from], spineY[from]);
      for (let k = from + 1; k <= to; k++) {
        ctx.lineTo(spineX[k], spineY[k]);
      }
      ctx.strokeStyle = style;
      ctx.lineWidth = lw;
      ctx.stroke();
    };

    const drawFrame = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion && introElapsed < INTRO_DURATION_SEC) {
        introElapsed = Math.min(INTRO_DURATION_SEC, introElapsed + dt);
      }
      const revealT = prefersReducedMotion
        ? 1
        : easeOutCubic(introElapsed / INTRO_DURATION_SEC);
      if (revealT <= 0.002) return;

      const revealFloat = revealT * STEPS;
      const revealMaxIdx = Math.floor(revealFloat);
      const revealFrac = revealFloat - revealMaxIdx;

      const yPad = 90;
      const maxHalfWidth = Math.min(width * 0.19, 225);
      const halfPeriod = Math.max(height * 0.88, 680);
      const heroSpan = height * 1.45;
      const scrollOffset = scrollY * 0.85;

      for (let i = 0; i <= STEPS; i++) {
        const y = -yPad + (i / STEPS) * (height + yPad * 2);
        const worldY = y + scrollOffset;
        const u = (worldY / halfPeriod) * Math.PI + 0.22 * Math.PI;
        const cosU = Math.cos(u);
        const xWave = (cosU + 0.14 * Math.cos(3 * u)) / 1.14;

        const heroBlend =
          worldY < heroSpan ? Math.max(0, 1 - worldY / heroSpan) : 0;
        const centerX = width * (0.5 + 0.1 * heroBlend);
        const amp = width * (0.31 - 0.09 * heroBlend);

        const turn = Math.pow(Math.abs(cosU), 2.2);
        const open = Math.pow(Math.max(0, 1 - turn), 0.85);

        spineX[i] = centerX + xWave * amp;
        spineY[i] = y;
        spineWorldY[i] = worldY;
        spineTurn[i] = turn;
        spineOpen[i] = open;
        spineHalfW[i] = 4.5 + open * maxHalfWidth;
      }

      for (let i = 0; i <= STEPS; i++) {
        const prev = i > 0 ? i - 1 : 0;
        const next = i < STEPS ? i + 1 : STEPS;
        const dx = spineX[next] - spineX[prev];
        const dy = spineY[next] - spineY[prev];
        const invLen = 1 / (Math.hypot(dx, dy) || 1);
        spineNx[i] = dy * invLen;
        spineNy[i] = -dx * invLen;
      }

      for (let s = 0; s < STRAND_COUNT; s++) {
        const st = strands[s];
        const base = s * POINTS;
        for (let i = 0; i <= STEPS; i++) {
          const wobble =
            Math.sin(spineWorldY[i] * st.wobbleFreq + st.phase) *
            st.wobbleAmp *
            spineOpen[i];
          const dist = st.ratio * spineHalfW[i] + wobble;
          strandX[base + i] = spineX[i] + spineNx[i] * dist;
          strandY[base + i] = spineY[i] + spineNy[i] * dist;
        }
      }

      const t0 = revealMaxIdx < STEPS ? revealMaxIdx : STEPS;
      const t1 = t0 < STEPS ? t0 + 1 : STEPS;
      const tipX = lerp(spineX[t0], spineX[t1], revealFrac);
      const tipY = lerp(spineY[t0], spineY[t1], revealFrac);
      const tipNx = lerp(spineNx[t0], spineNx[t1], revealFrac);
      const tipNy = lerp(spineNy[t0], spineNy[t1], revealFrac);
      const tipHalfW = lerp(spineHalfW[t0], spineHalfW[t1], revealFrac);
      const tipOpen = lerp(spineOpen[t0], spineOpen[t1], revealFrac);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Pass 1: Subtle ribbon veil + tight volumetric mist
      if (revealMaxIdx >= 1) {
        ctx.beginPath();
        for (let i = 0; i <= revealMaxIdx; i++) {
          const x = spineX[i] - spineNx[i] * spineHalfW[i] * 0.92;
          const y = spineY[i] - spineNy[i] * spineHalfW[i] * 0.92;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(
          tipX - tipNx * tipHalfW * 0.92,
          tipY - tipNy * tipHalfW * 0.92,
        );
        ctx.lineTo(
          tipX + tipNx * tipHalfW * 0.92,
          tipY + tipNy * tipHalfW * 0.92,
        );
        for (let i = revealMaxIdx; i >= 0; i--) {
          ctx.lineTo(
            spineX[i] + spineNx[i] * spineHalfW[i] * 0.92,
            spineY[i] + spineNy[i] * spineHalfW[i] * 0.92,
          );
        }
        ctx.closePath();
        ctx.fillStyle = theme.veil;
        ctx.fill();

        const drawMist = (shift: number, color: string, lw: number) => {
          ctx.beginPath();
          for (let i = 0; i <= revealMaxIdx; i++) {
            const x = spineX[i] + spineNx[i] * shift * spineOpen[i];
            const y = spineY[i] + spineNy[i] * shift * spineOpen[i];
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.lineTo(
            tipX + tipNx * shift * tipOpen,
            tipY + tipNy * shift * tipOpen,
          );
          ctx.strokeStyle = color;
          ctx.lineWidth = lw;
          ctx.stroke();
        };
        drawMist(-28, theme.mistA, 74);
        drawMist(32, theme.mistB, 66);
      }

      // Pass 2: Crisp base silk filaments
      for (let s = 0; s < STRAND_COUNT; s++) {
        const st = strands[s];
        const base = s * POINTS;
        const endX = lerp(strandX[base + t0], strandX[base + t1], revealFrac);
        const endY = lerp(strandY[base + t0], strandY[base + t1], revealFrac);

        ctx.beginPath();
        ctx.moveTo(strandX[base], strandY[base]);
        for (let i = 1; i <= revealMaxIdx; i++) {
          ctx.lineTo(strandX[base + i], strandY[base + i]);
        }
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = st.strokeStyle;
        ctx.lineWidth = st.width;
        ctx.stroke();
      }

      // Pass 3: Continuous crisp flowing light streams
      if (!prefersReducedMotion) {
        for (let k = 0; k < streams.length; k++) {
          const sk = streams[k];
          sk.head += sk.speed * dt;
          const wrapLimit = 1 + sk.length;
          if (sk.head > wrapLimit) sk.head -= wrapLimit;

          const tStart = sk.head > sk.length ? sk.head - sk.length : 0;
          const tEnd = sk.head < revealT ? sk.head : revealT;
          const span = tEnd - tStart;
          if (span < 0.015) continue;

          ctx.strokeStyle = sk.outerStyle;
          ctx.lineWidth = sk.outerWidth;
          strokeSubSegment(sk.strandIdx, tStart, tEnd);

          const coreStart = tStart + span * 0.25;
          const coreEnd = tEnd - span * 0.1;
          if (coreEnd - coreStart > 0.01) {
            ctx.strokeStyle = sk.coreStyle;
            ctx.lineWidth = sk.coreWidth;
            strokeSubSegment(sk.strandIdx, coreStart, coreEnd);
          }
        }
      }

      // Pass 4: Pinched corner caustic highlight (smooth tapered arcs + crisp 256px sprite)
      const causticBreath = 0.92 + 0.08 * Math.sin(flowTime * 2.8);
      let segStart = -1;
      for (let i = 0; i <= STEPS; i++) {
        const isHot = i < STEPS && spineTurn[i] > 0.62;
        if (isHot && segStart === -1) {
          segStart = i;
        } else if (!isHot && segStart !== -1) {
          const segEnd = i - 1;
          const segLen = segEnd - segStart;
          if (segLen >= 2) {
            let apexIdx = segStart;
            for (let k = segStart; k <= segEnd; k++) {
              if (spineTurn[k] > spineTurn[apexIdx]) apexIdx = k;
            }
            const apexT = apexIdx / STEPS;
            const arrival = Math.max(
              0,
              Math.min(1, (revealT - (apexT - 0.12)) / 0.18),
            );

            if (arrival > 0.01) {
              ctx.save();
              ctx.globalAlpha = arrival * causticBreath;

              const midInset = Math.max(1, Math.round(segLen * 0.2));
              const hotRadius = Math.max(1, Math.round(segLen * 0.18));

              strokeSpineRange(segStart, segEnd, 20, theme.bendGlow);
              strokeSpineRange(
                Math.min(apexIdx, segStart + midInset),
                Math.max(apexIdx, segEnd - midInset),
                8,
                theme.bendMid,
              );
              strokeSpineRange(
                Math.max(segStart, apexIdx - hotRadius),
                Math.min(segEnd, apexIdx + hotRadius),
                2.6,
                theme.bendHot,
              );

              const r = Math.min(width, height) * 0.21;
              ctx.drawImage(
                flareSprite,
                spineX[apexIdx] - r,
                spineY[apexIdx] - r,
                r * 2,
                r * 2,
              );
              ctx.restore();
            }
          }
          segStart = -1;
        }
      }

      // Pass 4b: Leading glow head during top-to-bottom intro
      if (revealT < 0.995) {
        const fadeOut = Math.min(1, (1 - revealT) * 5);
        const r = Math.max(90, tipHalfW * 1.15);
        ctx.save();
        ctx.globalAlpha = fadeOut * 0.85;
        ctx.drawImage(flareSprite, tipX - r, tipY - r, r * 2, r * 2);
        ctx.restore();
      }

      // Pass 5: Crisp drifting dust pinpoints
      for (let k = 0; k < particles.length; k++) {
        const p = particles[k];
        if (!prefersReducedMotion) {
          p.t = (p.t + p.speed * dt) % 1;
        }
        if (p.t > revealT) continue;

        const f = p.t * STEPS;
        const i0 = Math.min(STEPS - 1, Math.floor(f));
        const i1 = i0 + 1;
        const frac = f - i0;
        const bx = lerp(spineX[i0], spineX[i1], frac);
        const by = lerp(spineY[i0], spineY[i1], frac);
        const bnx = lerp(spineNx[i0], spineNx[i1], frac);
        const bny = lerp(spineNy[i0], spineNy[i1], frac);
        const bw = lerp(spineHalfW[i0], spineHalfW[i1], frac);

        const dist = p.spread * (bw + 20);
        const px = bx + bnx * dist;
        const py = by + bny * dist;
        const twinkle = 0.55 + 0.45 * Math.sin(flowTime * 2.4 + p.phase);

        ctx.fillStyle = `${p.colorPrefix}${(p.alpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = (now: number) => {
      if (isHidden) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
      lastTimestamp = now;
      flowTime += dt;
      drawFrame(dt);
      rafId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      lastTimestamp = performance.now();
      rafId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full will-change-transform [transform:translateZ(0)]"
    />
  );
}
