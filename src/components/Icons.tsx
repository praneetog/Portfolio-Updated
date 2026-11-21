import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

export const Chevron = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Copy = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);

export const Mail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Chat = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </svg>
);

export const FileIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4" />
  </svg>
);

export const LinkedIn = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4 0 4.77 2.55 4.77 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.3-1.96 2.6v5.05h-4v-11Z" />
  </svg>
);

export const GitHub = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

export const Instagram = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} width="1em" height="1em" aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
  </svg>
);

export const Peerlist = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm-1.5 5h3.2c2 0 3.3 1.2 3.3 3s-1.3 3-3.3 3H12.5v3h-2V7Zm2 1.8v2.4h1c.9 0 1.4-.5 1.4-1.2S14.4 8.8 13.5 8.8h-1Z" />
  </svg>
);

export const socialIcon = {
  linkedin: LinkedIn,
  github: GitHub,
  instagram: Instagram,
  peerlist: Peerlist,
};
