import { portfolioData } from "@/data/portfolioData";

/**
 * Shared visual for both opengraph-image.tsx and twitter-image.tsx.
 * Uses only inline styles and system fonts — no external font fetches,
 * so image generation can't fail at build/runtime due to a network call.
 */
export function OgCard() {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px",
        backgroundColor: "#070709",
        backgroundImage:
          "radial-gradient(circle at 15% 12%, rgba(45,212,191,0.22), transparent 55%), radial-gradient(circle at 88% 85%, rgba(59,130,246,0.2), transparent 55%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "26px",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        Portfolio
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "86px",
          fontWeight: 700,
          marginTop: "26px",
          letterSpacing: "-2px",
        }}
      >
        {portfolioData.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "38px",
          fontWeight: 500,
          marginTop: "16px",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {portfolioData.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "27px",
          marginTop: "40px",
          color: "rgba(186,224,255,0.92)",
          letterSpacing: "1px",
        }}
      >
        {portfolioData.bannerTag}
      </div>
    </div>
  );
}
