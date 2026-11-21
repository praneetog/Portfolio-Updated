"use client";

import { portfolioData } from "@/data/portfolioData";

interface ClusterItem {
  src: string;
  /** Clear gap (in em) after this cluster before the next group arrives */
  gapAfterEm: number;
  /** Subtle scale variation between clusters */
  scale: number;
  /** Walking bob speed (seconds) */
  bobDuration: number;
  /** Negative delay so clusters don't bob in sync */
  bobDelay: number;
}

// Mid-ground layer (z-20): Faces RIGHT as-is, moves LEFT -> RIGHT in front of Praneet
const RIGHT_MOVING_CLUSTERS: ClusterItem[] = [
  {
    src: "/footer/cluster_back_1.png",
    gapAfterEm: 11,
    scale: 1.0,
    bobDuration: 0.92,
    bobDelay: -0.1,
  },
  {
    src: "/footer/cluster_back_2.png",
    gapAfterEm: 15,
    scale: 0.98,
    bobDuration: 0.86,
    bobDelay: -0.45,
  },
  {
    src: "/footer/cluster_back_3.png",
    gapAfterEm: 12,
    scale: 1.01,
    bobDuration: 0.95,
    bobDelay: -0.25,
  },
];

// Foreground layer (z-30): Mirrored to face LEFT, moves RIGHT -> LEFT closest to viewer
const LEFT_MOVING_CLUSTERS: ClusterItem[] = [
  {
    src: "/footer/cluster_back_4.png",
    gapAfterEm: 13,
    scale: 1.0,
    bobDuration: 0.82,
    bobDelay: -0.2,
  },
  {
    src: "/footer/cluster_back_5.png",
    gapAfterEm: 17,
    scale: 1.02,
    bobDuration: 0.88,
    bobDelay: -0.55,
  },
  {
    src: "/footer/cluster_back_6.png",
    gapAfterEm: 12,
    scale: 0.99,
    bobDuration: 0.8,
    bobDelay: -0.35,
  },
];

function CrowdImageTrack({
  clusters,
  direction,
  imageHeightClass,
}: {
  clusters: ClusterItem[];
  direction: "right" | "left";
  imageHeightClass: string;
}) {
  const mirrorLeft = direction === "left";

  const renderHalf = (copyKey: string) => (
    <div key={copyKey} className="flex shrink-0 items-end">
      {clusters.map((item, idx) => (
        <div
          key={`${copyKey}-${idx}`}
          className={`shrink-0 ${imageHeightClass}`}
          style={{ marginRight: `${item.gapAfterEm}em` }}
        >
          <div
            className="walker-bob h-full"
            style={{
              animationDuration: `${item.bobDuration}s`,
              animationDelay: `${item.bobDelay}s`,
            }}
          >
            <img
              src={item.src}
              alt=""
              aria-hidden
              draggable={false}
              className="h-full w-auto max-w-none select-none object-contain object-bottom"
              style={{
                transformOrigin: "center bottom",
                transform: `${mirrorLeft ? "scaleX(-1) " : ""}scale(${item.scale})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`flex w-max text-[clamp(10px,1.25vw,18px)] will-change-transform ${
        direction === "right" ? "crowd-move-right" : "crowd-move-left"
      }`}
    >
      {renderHalf("a")}
      {renderHalf("b")}
    </div>
  );
}

export function FooterCrowdScene() {
  return (
    <div className="relative h-[clamp(280px,34vw,470px)] w-full overflow-hidden bg-white">
      {/* Layer 0: Oversized PRANEET background wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[2%] z-0 select-none text-center font-display text-[clamp(86px,22vw,380px)] font-extrabold uppercase leading-[0.84] tracking-[-0.04em] text-[#e6e3ea]"
      >
        {portfolioData.footer.bigName}
      </div>

      {/* Layer 1 (z-10): Praneet — standing slightly back behind both crowd layers */}
      <figure className="pointer-events-none absolute bottom-[3%] left-1/2 z-10 h-[86%] -translate-x-1/2">
        <img
          src="/footer/praneet-main.png"
          alt={`${portfolioData.name}, standing in the crowd`}
          draggable={false}
          className="main-character-idle h-full w-auto select-none object-contain"
        />
      </figure>

      {/* Layer 2 (z-20): Clusters 1–3 facing right & moving left -> right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-6%] z-20"
      >
        <CrowdImageTrack
          clusters={RIGHT_MOVING_CLUSTERS}
          direction="right"
          imageHeightClass="h-[clamp(210px,26vw,360px)]"
        />
      </div>

      {/* Layer 3 (z-30): Clusters 4–6 mirrored to face left & moving right -> left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-16%] z-30"
      >
        <CrowdImageTrack
          clusters={LEFT_MOVING_CLUSTERS}
          direction="left"
          imageHeightClass="h-[clamp(230px,28.5vw,395px)]"
        />
      </div>
    </div>
  );
}
