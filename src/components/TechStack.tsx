import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/hooks/useReveal";

export function TechStack() {
  return (
    <section
      id="skills"
      className="relative z-10 mx-auto max-w-[1440px] bg-transparent px-5 py-24 sm:px-8 lg:py-32"
    >
      <Reveal>
        <div className="flex items-start justify-between gap-6">
          <h2 className="font-display text-[clamp(40px,6vw,88px)] font-semibold leading-none tracking-[-0.03em]">
            {portfolioData.techStackHeading.title}
          </h2>
          <p className="max-w-[12ch] pt-2 text-right text-[13px] text-mute sm:max-w-none sm:text-sm">
            {portfolioData.techStackHeading.aside}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {portfolioData.techStack.map((g, i) => (
          <Reveal key={g.title} delay={i * 90}>
            <div
              className="rounded-2xl border border-white/[0.09] bg-[#0d0d11]/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] transition-colors duration-300 hover:border-white/[0.16]"
              style={{ marginTop: `clamp(0px, ${i * 3.2}vw, ${i * 56}px)` }}
            >
              <h3 className="text-[clamp(20px,1.9vw,30px)] font-semibold leading-tight tracking-tight">
                {g.title}
              </h3>
              <p className="mt-2 max-w-[34ch] text-xs text-mute">
                {g.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.tags.map((t) => (
                  <li
                    key={t}
                    className="cursor-default rounded-md border border-white/12 bg-black/40 px-3 py-1.5 text-[12px] text-white/85 backdrop-blur-[8px] transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
