"use client";

import { useEffect, useRef } from "react";

const SNIPPETS = [
  "const engineer = Praneet.init();  // full-stack + AI",
  "engineer.stack = ['TypeScript', 'Next.js', 'Go', 'Node.js', 'LLMs'];",
  "export async function build(idea: Idea) { const spec = await design(idea); return ship(spec); }",
  "const pipeline = createAgent({ model: 'gemini-3.5-flash-lite', temperature: 0.3 });",
  "function deploy(app: App) { return edge.push(app, { zeroDowntime: true }); }",
  "const api = createRoute('/api/chat', withRateLimit(handler));",
  "interface Project { title: string; stack: string[]; shipped: boolean; }",
  "git commit -m 'feat: full-screen code glow + animated footer crowd'",
  "$ npm run build && npm run deploy --prod",
  "for (const task of backlog) await resolve(task);",
  "SELECT id, title, impact FROM projects WHERE shipped = true ORDER BY year DESC;",
  "docker compose up -d --build && curl -sf https://praneet.dev/health",
  "const metrics = await trackFunnel({ source: 'portfolio', interactive: true });",
  "export const config = { runtime: 'nodejs', maxDuration: 30 };",
];

// Long horizontal lines so every row spans across ultrawide screens
const ROWS = Array.from({ length: 56 }, (_, rowIdx) => {
  const a = SNIPPETS[rowIdx % SNIPPETS.length];
  const b = SNIPPETS[(rowIdx + 5) % SNIPPETS.length];
  const c = SNIPPETS[(rowIdx + 11) % SNIPPETS.length];
  return `${a}    ${b}    ${c}`;
});

export function CodeTexture() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        el.style.opacity = "0";
        return;
      }

      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      el.style.opacity = "1";
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const content = ROWS.map((line, i) => (
    <p key={i} className="whitespace-nowrap">
      {line}
    </p>
  ));

  return (
    <>
      {/* Ambient faint code across the full landing screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden px-4 py-3 font-mono text-[11px] leading-[1.95] tracking-tight text-white/[0.045]"
      >
        {content}
      </div>

      {/* Cursor-illuminated spotlight layer */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          opacity: 0,
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 72%)",
          maskImage:
            "radial-gradient(220px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 72%)",
        }}
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden px-4 py-3 font-mono text-[11px] leading-[1.95] tracking-tight text-white/50 transition-opacity duration-300"
      >
        {content}
      </div>
    </>
  );
}
