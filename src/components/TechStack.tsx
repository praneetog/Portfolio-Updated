import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/hooks/useReveal";

export function TechStack() {
  return (
    <section id="skills" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:py-32">
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

      <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
        {portfolioData.techStack.map((g, i) => (
          <Reveal key={g.title} delay={i * 90}>
            <div
              className="border-t border-white/25 pt-5"
              style={{ marginTop: `clamp(0px, ${i * 3.2}vw, ${i * 56}px)` }}
            >
              <h3 className="text-[clamp(20px,1.9vw,30px)] font-semibold leading-tight tracking-tight">
                {g.title}
              </h3>
              <p className="mt-2 max-w-[34ch] text-xs text-mute">{g.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.tags.map((t) => (
                  <li
                    key={t}
                    className="cursor-default rounded-md border border-white/12 bg-[#151517] px-3 py-1.5 text-[12px] text-white/85 transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black"
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
