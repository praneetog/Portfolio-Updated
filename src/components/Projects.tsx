"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioData, type Project } from "@/data/portfolioData";
import { Reveal } from "@/hooks/useReveal";
import { ArrowUpRight, Chevron, Close, FileIcon } from "./Icons";

function Folder({ title, onOpen }: { title: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${title}`}
      className="folder group relative block aspect-[1.3/1] w-full overflow-visible text-left"
    >
      {/* folder body */}
      <span className="absolute inset-x-0 bottom-0 top-[13%] rounded-2xl border border-white/10 bg-[#1a1a1d]/90" />
      {/* stepped top tabs */}
      <span className="absolute left-0 top-[5%] h-[12%] w-[34%] rounded-t-xl border border-b-0 border-white/10 bg-[#1a1a1d]/90" />
      <span className="absolute left-[30%] top-[8%] h-[9%] w-[22%] rounded-t-lg border border-b-0 border-white/10 bg-[#202023]/90" />

      {/* four tucked, loosely-fanned sheets — each lifts further on hover */}
      <span
        className="sheet absolute inset-x-[12%] top-[22%] h-[60%] rounded-md border border-black/10 bg-[#2a2a2e] shadow-md"
        style={{ "--rot": "6deg", "--lift": "-30%" } as CSSProperties}
      />
      <span
        className="sheet absolute inset-x-[10%] top-[20%] h-[61%] rounded-md border border-black/10 bg-[#d9d6cf] shadow-md"
        style={{ "--rot": "-5deg", "--lift": "-23%" } as CSSProperties}
      />
      <span
        className="sheet absolute inset-x-[8%] top-[19%] h-[62%] rounded-md border border-black/10 bg-[#e8e5df] shadow-md"
        style={{ "--rot": "3deg", "--lift": "-16%" } as CSSProperties}
      />
      <span
        className="sheet absolute inset-x-[6%] top-[18%] h-[62%] rounded-md bg-paper p-[5%] shadow-lg"
        style={{ "--rot": "-1.5deg", "--lift": "-9%" } as CSSProperties}
      >
        <FileIcon className="text-[13px] text-black/50" />
        <span className="mt-2 block h-1 w-2/3 rounded bg-black/15" />
        <span className="mt-1.5 block h-1 w-1/2 rounded bg-black/10" />
        <span className="mt-1.5 block h-1 w-3/5 rounded bg-black/10" />
      </span>

      {/* front dark pocket */}
      <span className="absolute inset-x-0 bottom-0 top-[44%] flex items-end justify-between rounded-2xl border border-white/12 bg-gradient-to-b from-[#26262a] to-[#151517] p-[6%] shadow-[0_-6px_18px_rgba(0,0,0,.45)]">
        <span className="max-w-[70%] text-[clamp(14px,1.25vw,19px)] font-semibold leading-tight tracking-tight">
          {title}
        </span>
        <span className="arrow-btn grid h-8 w-8 place-items-center rounded-full bg-[#f4f2ee] text-[15px] text-black sm:h-9 sm:w-9">
          <ArrowUpRight />
        </span>
      </span>
    </button>
  );
}

function Modal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-[8px] sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/[0.12] bg-[#0e0e12]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[8px] sm:rounded-3xl sm:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-mute">
              {project.year} · {project.role}
            </p>
            <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-lg transition hover:bg-white hover:text-black"
          >
            <Close />
          </button>
        </div>

        {project.media && (
          <img
            src={project.media}
            alt={`${project.title} preview`}
            className="mt-6 w-full rounded-xl border border-white/10 object-cover"
          />
        )}

        <p className="mt-6 leading-relaxed text-white/80">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-white/12 bg-black/45 px-3 py-1.5 text-xs text-white/85"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f2ee] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white"
            >
              {l.label} <ArrowUpRight />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-[1440px] bg-transparent px-5 py-24 sm:px-8 lg:py-32"
    >
      <Reveal>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-[clamp(40px,6vw,88px)] font-semibold leading-[0.98] tracking-[-0.03em]">
              {portfolioData.projectsHeading.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-sm text-mute">
              {portfolioData.projectsHeading.subtitle}
            </p>
          </div>
          <a
            href={portfolioData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-2 inline-flex shrink-0 items-center gap-1 text-sm text-white/80 transition hover:text-white"
          >
            All work{" "}
            <Chevron className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioData.projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0d0d11]/50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] transition-colors duration-300 hover:border-white/[0.16]">
              <Folder title={p.title} onOpen={() => setOpen(p)} />
              <div className="mt-4 flex flex-1 flex-col px-1">
                <h3 className="text-base font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-mute">{p.summary}</p>
                <button
                  onClick={() => setOpen(p)}
                  className="group mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-white"
                >
                  View project{" "}
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && <Modal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
