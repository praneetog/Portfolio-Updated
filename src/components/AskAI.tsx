"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { ArrowUp, Chat, Close } from "./Icons";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function AskAI() {
  const [open, setOpen] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open chat when clicking the AI button inside Navbar.tsx
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-ask-ai", onOpen);
    return () => window.removeEventListener("open-ask-ai", onOpen);
  }, []);

  // Show bottom-right floating button after scrolling past the initial banner
  useEffect(() => {
    const onScroll = () => {
      setShowFloatingBtn(window.scrollY > window.innerHeight * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, busy]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: ChatMessage[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await r.json().catch(() => ({}));
      setMsgs([
        ...next,
        {
          role: "assistant",
          content:
            r.ok && data.reply
              ? data.reply
              : data.error || "Something went wrong. Please try again.",
        },
      ]);
    } catch {
      setMsgs([
        ...next,
        {
          role: "assistant",
          content: "I couldn't reach the server. Please try again in a moment.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const started = msgs.length > 0;

  return (
    <>
      <AnimatePresence>
        {!open && showFloatingBtn && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f2ee] px-4 py-2.5 text-[13px] font-semibold text-black shadow-lg transition hover:scale-[1.04] hover:bg-white sm:bottom-6 sm:right-6"
          >
            <Chat /> Ask AI
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={portfolioData.ai.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-3 right-3 z-50 flex h-[min(540px,calc(100svh-24px))] w-[min(380px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#121214] shadow-[0_20px_60px_rgba(0,0,0,.6)] sm:bottom-6 sm:right-6"
          >
            <header className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-black">
                {portfolioData.name[0]}.
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[13px] font-semibold">
                  {portfolioData.ai.title}
                </p>
                <p className="text-[11px] text-mute">
                  {portfolioData.ai.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="grid h-7 w-7 place-items-center rounded-full text-base text-mute transition hover:bg-white/10 hover:text-white"
              >
                <Close />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {!started ? (
                <div className="flex h-full flex-col justify-end gap-5">
                  <h3 className="font-display text-[28px] font-semibold leading-tight tracking-tight">
                    {portfolioData.ai.heading}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.ai.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-xs text-white/85 transition hover:border-white hover:bg-white hover:text-black"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-[13px] leading-relaxed">
                  <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/[.06] px-3.5 py-2.5 text-white/90">
                    {portfolioData.ai.greeting}
                  </p>
                  {msgs.map((m, i) => (
                    <p
                      key={i}
                      className={
                        m.role === "user"
                          ? "ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#f4f2ee] px-3.5 py-2.5 text-black"
                          : "max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-white/[.06] px-3.5 py-2.5 text-white/90"
                      }
                    >
                      {m.content}
                    </p>
                  ))}
                  {busy && (
                    <p
                      className="flex w-14 gap-1 rounded-2xl rounded-bl-md bg-white/[.06] px-3.5 py-3"
                      aria-label="Thinking"
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-white"
                          style={{
                            animation: `dot 1.2s ${i * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </p>
                  )}
                  <div ref={endRef} />
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="px-3 pb-2 pt-1"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 py-1.5 pl-3.5 pr-1.5 transition focus-within:border-white/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder={portfolioData.ai.placeholder}
                  aria-label="Message"
                  className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition enabled:hover:scale-105 disabled:bg-white/20 disabled:text-white/40"
                >
                  <ArrowUp />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-white/35">
                {portfolioData.ai.disclaimer}
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
