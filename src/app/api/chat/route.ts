import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolioData";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

// Free-tier Gemini models (ordered fastest/highest-volume first)
const FREE_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.8-flash",
];

// Simple in-memory per-IP daily limiter to protect your free quota
const DAILY_LIMIT_PER_IP = 30;
const usageMap = new Map<string, { count: number; day: string }>();

function checkIpLimit(ip: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const entry = usageMap.get(ip);
  if (!entry || entry.day !== today) {
    usageMap.set(ip, { count: 1, day: today });
    return true;
  }
  if (entry.count >= DAILY_LIMIT_PER_IP) return false;
  entry.count += 1;
  return true;
}

function buildSystemPrompt(): string {
  const projects = portfolioData.projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}, ${p.role}): ${p.summary}. ${p.description} Stack: ${p.tags.join(", ")}.`,
    )
    .join("\n");

  const experience = portfolioData.experience
    .map((e) => `- ${e.title} at ${e.org} (${e.range}): ${e.description}`)
    .join("\n");

  const skills = portfolioData.techStack
    .map((g) => `- ${g.title}: ${g.tags.join(", ")}`)
    .join("\n");

  return `You are the portfolio AI assistant for ${portfolioData.name} (${portfolioData.role}).
Answer visitors' questions concisely, warmly, and accurately in 2–4 sentences unless they ask for detail.
Only state facts supported by the profile below. If asked something not covered, say you aren't sure and invite them to email ${portfolioData.email}.

Current Role: ${portfolioData.meta.position} at ${portfolioData.meta.company} (${portfolioData.meta.location})
Email: ${portfolioData.email}
GitHub: ${portfolioData.githubUrl}

Skills:
${skills}

Projects:
${projects}

Experience:
${experience}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant isn't configured yet (missing GEMINI_API_KEY)." },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!checkIpLimit(ip)) {
    return NextResponse.json(
      {
        error:
          "Daily message limit reached. Please try again tomorrow or reach out via email.",
      },
      { status: 429 },
    );
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json(
      { error: "No message provided." },
      { status: 400 },
    );
  }

  // Keep only the last 10 turns and trim long inputs to stay light on tokens
  const contents = messages.slice(-10).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content || "").slice(0, 600) }],
  }));

  const payload = {
    system_instruction: { parts: [{ text: buildSystemPrompt() }] },
    contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 350,
    },
  };

  let lastStatus = 500;
  for (const model of FREE_MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify(payload),
        },
      );

      lastStatus = res.status;
      if (res.status === 429 || res.status === 404 || res.status >= 500) {
        continue; // try next free model
      }

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim();

      if (reply) {
        return NextResponse.json({ reply });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    {
      error:
        lastStatus === 429
          ? "The assistant is a bit busy right now—please try again in a minute."
          : "Couldn't get a response right now. Please try again shortly.",
    },
    { status: lastStatus === 429 ? 429 : 502 },
  );
}
