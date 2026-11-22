"use client";

import { portfolioData } from "@/data/portfolioData";
import { FooterCrowdScene } from "./FooterCrowdScene";
import { ArrowUp, ArrowUpRight } from "./Icons";

export function Footer() {
  const row = (n: 1 | 2) => portfolioData.navLinks.filter((l) => l.row === n);

  return (
    <footer className="relative z-10 bg-transparent">
      {/* Frosted dark glass top section — ribbon glows softly behind it */}
      <div className="border-t border-white/[0.08] bg-gradient-to-b from-[#070709]/45 via-[#070709]/65 to-[#070709]/85 backdrop-blur-[8px]">
        <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
          <div className="grid gap-10 text-[13px] md:grid-cols-[1fr_1.3fr_1fr]">
            <div>
              <p className="text-lg font-semibold tracking-tight">
                {portfolioData.brand}
              </p>
              <p className="mt-2 max-w-[16ch] text-xs leading-snug text-mute">
                {portfolioData.tagline}
              </p>
            </div>
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <ul key={n} className="flex flex-wrap gap-x-5 gap-y-2">
                  {row(n as 1 | 2).map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-white/85 transition hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="md:justify-self-end">
              <a
                href={`mailto:${portfolioData.email}`}
                className="inline-flex items-center gap-1 text-white/90 transition hover:text-white"
              >
                {portfolioData.email} <ArrowUpRight />
              </a>
              <p className="mt-2 text-xs text-mute">
                © {portfolioData.year} {portfolioData.name}
              </p>
            </div>
          </div>

          {/* Real UI elements — not baked into the illustration below */}
          <div className="mt-16 flex items-end justify-between gap-4 pb-5">
            <p className="font-display text-[clamp(28px,3.2vw,48px)] font-semibold tracking-tight">
              {portfolioData.footer.kicker}
            </p>
            <BackToTop />
          </div>
        </div>
      </div>

      {/* White crowd section stays solid and untouched */}
      <FooterCrowdScene />

      {/* Full-width solid dark bottom caption bar */}
      <div className="w-full bg-ink">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center px-5 sm:px-8">
          <p className="text-[11px] text-white/45">
            {portfolioData.crowdCaption}
          </p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-1.5 pb-1 text-xs text-white/80 transition hover:text-white"
    >
      Back to top{" "}
      <ArrowUp className="transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
