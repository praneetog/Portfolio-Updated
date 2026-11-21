"use client";

export type SpriteIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface CrowdSpriteProps {
  variant: SpriteIndex;
  className?: string;
}

/**
 * 10 wider editorial ink-line characters (220x260) with solid white interior
 * fills so overlapping groups cleanly occlude each other and the character behind.
 * Drawn facing slightly RIGHT; mirror with scaleX(-1) for LEFT-moving walkers.
 */
export function CrowdSprite({ variant, className = "" }: CrowdSpriteProps) {
  const common = {
    viewBox: "0 0 220 260",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true as const,
  };

  switch (variant) {
    // 0: Broad-shouldered guy with glasses & hoodie
    case 0:
      return (
        <svg {...common}>
          <path
            d="M16 268 L26 154 C30 126 58 112 108 112 C158 112 188 128 194 158 L206 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M72 116 C88 140 132 140 144 116"
            stroke="#111111"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M98 134 L96 184 M118 134 L120 180"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Backpack straps */}
          <path
            d="M58 120 C52 168 54 218 62 268 M72 118 C66 168 68 218 76 268"
            stroke="#111111"
            strokeWidth="3"
          />
          <path
            d="M168 164 C174 202 180 232 184 268"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M92 92 L92 120 C102 127 118 127 126 120 L126 92 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="112"
            cy="64"
            rx="28"
            ry="33"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M84 60 C75 60 75 76 85 78"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M82 62 C76 36 94 18 120 20 C140 22 148 36 142 52 C132 40 114 38 98 46 C90 50 88 58 86 66 Z"
            fill="#111111"
          />
          <path
            d="M98 31 C112 27 126 29 135 36"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect
            x="102"
            y="54"
            width="18"
            height="14"
            rx="3.5"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3"
          />
          <rect
            x="124"
            y="54"
            width="16"
            height="14"
            rx="3.5"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3"
          />
          <path
            d="M120 60 L124 60 M84 59 L102 60"
            stroke="#111111"
            strokeWidth="2.8"
          />
          <circle cx="112" cy="61" r="2.4" fill="#111111" />
          <circle cx="132" cy="61" r="2.4" fill="#111111" />
          <path
            d="M123 67 L126 75 L120 76"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M108 82 C116 87 125 87 130 81"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 1: Woman with full wavy hair & wide relaxed top
    case 1:
      return (
        <svg {...common}>
          <path
            d="M54 162 C44 114 52 50 74 30 C98 10 138 18 148 50 C156 80 146 124 156 164 Z"
            fill="#111111"
          />
          <path
            d="M28 268 L38 156 C44 130 70 116 110 116 C150 116 176 130 182 158 L194 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M88 118 L112 150 L132 118"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M64 176 L58 268 M158 172 L166 268"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M90 198 C108 204 126 202 140 196"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M94 92 L94 122 C102 128 118 128 124 122 L124 92 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="113"
            cy="64"
            rx="26"
            ry="31"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M84 64 C84 36 104 22 126 27 C138 30 144 40 142 54 C130 42 112 42 98 52 C92 56 88 70 86 86 Z"
            fill="#111111"
          />
          <path
            d="M92 37 C106 30 122 30 134 38"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="111" cy="62" r="2.5" fill="#111111" />
          <circle cx="130" cy="62" r="2.5" fill="#111111" />
          <path
            d="M105 54 Q111 50 117 54 M125 54 Q131 50 136 54"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M123 65 L126 73 L120 74"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M109 80 C116 86 126 85 131 79"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 2: Bearded guy in wide button-up overshirt
    case 2:
      return (
        <svg {...common}>
          <path
            d="M12 268 L22 150 C28 122 58 110 110 110 C162 110 192 126 198 156 L210 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M84 112 L102 140 L114 124 L128 138 L138 112"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M114 124 L116 268" stroke="#111111" strokeWidth="2.8" />
          <circle cx="122" cy="156" r="2.5" fill="#111111" />
          <circle cx="122" cy="188" r="2.5" fill="#111111" />
          <circle cx="122" cy="220" r="2.5" fill="#111111" />
          <rect
            x="134"
            y="156"
            width="24"
            height="24"
            rx="2.5"
            stroke="#111111"
            strokeWidth="2.6"
          />
          <path
            d="M54 166 L48 268 M168 168 L174 268"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M92 92 L92 120 C102 127 120 127 128 120 L128 92 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="112"
            cy="63"
            rx="28"
            ry="33"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M84 59 C75 59 75 75 85 77"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M83 60 C78 34 94 18 122 18 C140 18 148 32 144 48 C132 36 112 34 96 44 C90 48 88 56 87 64 Z"
            fill="#111111"
          />
          <path
            d="M100 29 C114 25 128 27 137 34"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M87 72 C87 94 102 103 118 102 C133 101 141 90 141 72 C135 81 128 85 117 85 C103 85 94 81 87 72 Z"
            fill="#111111"
          />
          <path
            d="M110 83 C117 86 124 86 129 82"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="111" cy="60" r="2.5" fill="#111111" />
          <circle cx="130" cy="60" r="2.5" fill="#111111" />
          <path
            d="M104 52 L117 52 M124 52 L136 53"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M122 63 L126 72 L119 73"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 3: Woman with voluminous curly hair, round glasses & striped knit
    case 3:
      return (
        <svg {...common}>
          <path
            d="M54 98 C40 82 44 54 58 40 C66 20 92 10 118 14 C144 18 158 38 152 62 C160 82 152 106 134 114 L68 114 C58 108 54 102 54 98 Z"
            fill="#111111"
          />
          <path
            d="M24 268 L34 156 C40 130 66 116 110 116 C154 116 180 130 186 158 L198 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M36 164 L184 164 M32 192 L188 192 M28 220 L192 220 M26 248 L195 248"
            stroke="#111111"
            strokeWidth="2.4"
          />
          <path
            d="M88 120 C100 134 122 134 134 120"
            stroke="#111111"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M94 94 L94 122 C102 128 118 128 124 122 L124 94 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="113"
            cy="67"
            rx="26"
            ry="30"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M86 58 C94 40 114 36 134 45 C130 52 116 50 105 54 C96 56 91 62 86 67 Z"
            fill="#111111"
          />
          <path
            d="M72 44 C80 34 94 28 106 28"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle
            cx="109"
            cy="65"
            r="9.5"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3"
          />
          <circle
            cx="131"
            cy="65"
            r="9"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3"
          />
          <path
            d="M118.5 65 L122 65 M86 63 L99.5 65"
            stroke="#111111"
            strokeWidth="2.8"
          />
          <circle cx="110" cy="65" r="2.3" fill="#111111" />
          <circle cx="132" cy="65" r="2.3" fill="#111111" />
          <path
            d="M122 72 L125 77 L120 78"
            stroke="#111111"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M108 83 C116 89 126 88 131 82"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 4: Guy with headphones around neck & wide open jacket
    case 4:
      return (
        <svg {...common}>
          <path
            d="M14 268 L24 152 C30 124 58 112 110 112 C160 112 190 128 196 156 L208 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M88 118 L96 268 M136 118 L142 268"
            stroke="#111111"
            strokeWidth="3.2"
          />
          <path
            d="M52 172 L46 268 M172 172 L178 268"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="78" y="120" width="16" height="24" rx="7" fill="#111111" />
          <rect x="128" y="120" width="16" height="24" rx="7" fill="#111111" />
          <path
            d="M86 122 C98 108 124 108 136 122"
            stroke="#111111"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M94 92 L94 118 C102 125 118 125 124 118 L124 92 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="112"
            cy="64"
            rx="27"
            ry="32"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M85 60 C76 60 76 76 86 78"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M82 60 C76 38 90 20 116 18 C134 16 150 30 148 46 C136 38 122 38 106 43 C94 47 89 56 87 64 Z"
            fill="#111111"
          />
          <path
            d="M96 31 C110 26 124 27 136 33"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="112" cy="62" r="2.5" fill="#111111" />
          <circle cx="131" cy="62" r="2.5" fill="#111111" />
          <path
            d="M105 54 L117 53 M125 53 L137 54"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M123 64 L127 73 L120 74"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M110 81 C117 85 126 85 131 80"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 5: Woman with draped dupatta/headscarf
    case 5:
      return (
        <svg {...common}>
          <path
            d="M22 268 L32 154 C38 126 66 114 110 114 C154 114 182 128 188 158 L198 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M66 164 C58 128 60 64 74 40 C88 20 126 18 140 38 C150 52 148 88 140 112 C136 130 150 156 156 182 C128 196 86 194 66 164 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <ellipse
            cx="115"
            cy="66"
            rx="23"
            ry="28"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
          />
          <path
            d="M76 114 C96 128 122 126 138 114 M74 140 C98 156 126 154 146 144"
            stroke="#111111"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M112 186 L112 246 M102 208 L122 208 M102 228 L122 228"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="114" cy="64" r="2.5" fill="#111111" />
          <circle cx="131" cy="64" r="2.5" fill="#111111" />
          <path
            d="M107 56 Q114 52 120 56 M126 56 Q132 52 137 56"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M124 67 L126 74 L121 75"
            stroke="#111111"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M112 82 C118 87 126 86 131 81"
            stroke="#111111"
            strokeWidth="2.7"
            strokeLinecap="round"
          />
        </svg>
      );

    // 6: Guy with curly hair & crossbody sling bag
    case 6:
      return (
        <svg {...common}>
          <path
            d="M18 268 L28 154 C34 126 62 114 110 114 C158 114 186 128 192 158 L204 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M86 116 C98 134 124 134 134 116"
            stroke="#111111"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M58 168 L52 268 M164 170 L170 268"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M64 122 L156 238 M78 118 L168 230"
            stroke="#111111"
            strokeWidth="3.2"
          />
          <path
            d="M94 92 L94 120 C102 127 118 127 124 120 L124 92 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="112"
            cy="64"
            rx="27"
            ry="32"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M85 60 C76 60 76 76 86 78"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M80 60 C70 44 78 26 94 20 C106 10 130 12 140 24 C154 28 154 48 142 54 C132 42 110 40 96 49 C89 54 86 60 86 66 Z"
            fill="#111111"
          />
          <path
            d="M94 31 C104 24 118 24 128 31"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="112" cy="62" r="2.5" fill="#111111" />
          <circle cx="131" cy="62" r="2.5" fill="#111111" />
          <path
            d="M105 54 L118 54 M125 54 L137 54"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M123 65 L127 74 L120 75"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M110 82 C117 88 127 87 132 80"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 7: Woman with high bun, hoops & cardigan
    case 7:
      return (
        <svg {...common}>
          <circle cx="90" cy="20" r="18" fill="#111111" />
          <path
            d="M82 15 C89 11 96 13 100 19"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 268 L34 154 C40 128 66 116 110 116 C154 116 180 130 186 158 L198 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M88 118 L98 268 M132 118 L138 268"
            stroke="#111111"
            strokeWidth="3"
          />
          <path
            d="M94 144 C106 152 122 152 134 144"
            stroke="#111111"
            strokeWidth="2.8"
          />
          <path
            d="M94 94 L94 122 C102 128 118 128 124 122 L124 94 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="113"
            cy="65"
            rx="26"
            ry="31"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M87 61 C79 61 79 75 88 77"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="83" cy="83" r="5" stroke="#111111" strokeWidth="2.4" />
          <path
            d="M85 64 C83 36 102 22 126 26 C138 29 144 39 142 52 C130 42 112 42 98 51 C91 55 89 62 88 68 Z"
            fill="#111111"
          />
          <circle cx="113" cy="63" r="2.5" fill="#111111" />
          <circle cx="131" cy="63" r="2.5" fill="#111111" />
          <path
            d="M106 55 Q113 51 119 55 M126 55 Q132 51 137 55"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M123 65 L126 73 L120 74"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M111 81 C118 86 126 86 131 80"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 8: Guy with cap & layered sweater
    case 8:
      return (
        <svg {...common}>
          <path
            d="M14 268 L24 152 C30 124 60 112 110 112 C160 112 190 126 196 156 L208 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          <path
            d="M84 114 L110 144 L136 114"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M54 166 L48 268 M168 168 L174 268"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M94 92 L94 120 C102 127 118 127 126 120 L126 92 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="112"
            cy="66"
            rx="27"
            ry="31"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M85 62 C76 62 76 77 86 79"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Cap dome & visor */}
          <path
            d="M82 52 C82 24 102 16 122 18 C138 20 146 32 146 48 Z"
            fill="#111111"
          />
          <path d="M112 46 L168 48 C164 54 148 56 122 54 Z" fill="#111111" />
          <path
            d="M96 30 C110 26 124 27 134 34"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="112" cy="65" r="2.5" fill="#111111" />
          <circle cx="131" cy="65" r="2.5" fill="#111111" />
          <path
            d="M123 68 L126 76 L120 77"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M110 84 C118 89 127 88 132 82"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 9: Woman with shoulder-length bob & scarf
    case 9:
    default:
      return (
        <svg {...common}>
          <path
            d="M64 114 C56 84 60 36 84 22 C108 10 142 18 148 48 C154 74 148 100 142 114 Z"
            fill="#111111"
          />
          <path
            d="M24 268 L34 156 C40 128 68 116 110 116 C152 116 180 128 186 158 L198 268 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
            strokeLinejoin="round"
          />
          {/* Cozy scarf wrap */}
          <path
            d="M72 122 C96 144 134 144 152 122 C156 136 148 152 134 156 L136 218 L108 214 L110 156 C86 154 70 142 72 122 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M94 94 L94 122 C102 128 118 128 124 122 L124 94 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.4"
          />
          <ellipse
            cx="113"
            cy="65"
            rx="25"
            ry="30"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="3.8"
          />
          <path
            d="M84 62 C86 34 106 22 128 28 C140 32 146 44 142 56 C130 44 110 44 96 54 C90 58 88 70 86 82 Z"
            fill="#111111"
          />
          <circle cx="112" cy="64" r="2.5" fill="#111111" />
          <circle cx="130" cy="64" r="2.5" fill="#111111" />
          <path
            d="M105 56 Q112 52 118 56 M125 56 Q131 52 136 56"
            stroke="#111111"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M123 67 L126 74 L120 75"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M111 82 C117 87 126 86 130 81"
            stroke="#111111"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
