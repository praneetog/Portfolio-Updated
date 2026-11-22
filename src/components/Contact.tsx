"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/hooks/useReveal";
import { ArrowUpRight, Check, Copy, Mail, socialIcon } from "./Icons";

const field =
  "mt-2 w-full border-0 border-b border-white/20 bg-transparent pb-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
    } catch {
      // clipboard may be unavailable; fail silently
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name || "your portfolio"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1440px] bg-transparent px-5 pb-24 pt-8 sm:px-8 lg:pb-32"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-[clamp(44px,6.5vw,96px)] font-semibold leading-none tracking-[-0.03em]">
            {portfolioData.contact.heading}
          </h2>
          <p className="mt-6 max-w-[34ch] text-sm text-mute">
            {portfolioData.contact.copy}
          </p>

          <div className="mt-8 flex max-w-md items-center justify-between gap-3 border-b border-white/20 pb-3">
            <a
              href={`mailto:${portfolioData.email}`}
              className="group inline-flex min-w-0 items-center gap-2 truncate text-[clamp(15px,1.4vw,20px)] font-semibold"
            >
              <span className="truncate">{portfolioData.email}</span>
              <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={copy}
              aria-label="Copy email address"
              className="flex items-center gap-1.5 text-sm text-mute transition hover:text-white"
            >
              {copied ? (
                <>
                  <Check /> <span className="text-xs text-white">Copied</span>
                </>
              ) : (
                <Copy />
              )}
            </button>
          </div>

          <ul className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {portfolioData.socials.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#0d0d11]/55 px-4 py-3.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] transition hover:border-white/35 hover:bg-[#17171d]/70"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="text-base" />
                      {s.label}
                    </span>
                    <ArrowUpRight className="text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={send}
            className="rounded-2xl border border-white/[0.09] bg-[#0d0d11]/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] sm:p-8"
          >
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block text-xs text-mute">
                Your name
                <input
                  className={field}
                  placeholder={portfolioData.contact.fields.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="block text-xs text-mute">
                Email address
                <input
                  type="email"
                  className={field}
                  placeholder={portfolioData.contact.fields.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
            </div>
            <label className="mt-8 block text-xs text-mute">
              What do you have in mind?
              <textarea
                rows={3}
                className={`${field} resize-none`}
                placeholder={portfolioData.contact.fields.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <hr className="my-8 border-white/12" />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[#f4f2ee] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white active:scale-[.98]"
            >
              <Mail /> {portfolioData.contact.submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}