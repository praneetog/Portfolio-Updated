import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolioData";
import { OgCard } from "@/lib/ogImage";

export const runtime = "edge";
export const alt = `${portfolioData.name} — ${portfolioData.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard />, { ...size });
}
