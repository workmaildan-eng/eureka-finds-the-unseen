"use client";

import { useId } from "react";

/*
 * Pure CSS/SVG scene components — the site renders fully without any
 * external image assets. Swap these for brand photography later by
 * replacing the component markup at the call site.
 */

/* Deterministic pseudo-random generator (SSR-safe, no hydration mismatch). */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Top-down robot vacuum drawn entirely in SVG. */
export function RobotSVG({
  className = "",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const bodyId = `rb-${uid}`;
  const sheenId = `rs-${uid}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Eureka J15 Max Ultra robot vacuum"
    >
      <defs>
        <radialGradient id={bodyId} cx="42%" cy="36%" r="78%">
          <stop offset="0%" stopColor="#2e3342" />
          <stop offset="55%" stopColor="#1a1e2b" />
          <stop offset="100%" stopColor="#0c0f18" />
        </radialGradient>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(246,241,234,0.32)" />
          <stop offset="45%" stopColor="rgba(246,241,234,0.05)" />
          <stop offset="100%" stopColor="rgba(246,241,234,0)" />
        </linearGradient>
      </defs>

      {glow && (
        <circle
          cx="100"
          cy="100"
          r="97"
          fill="none"
          stroke="rgba(122,46,192,0.28)"
          strokeWidth="1.5"
        />
      )}

      {/* Body */}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill={`url(#${bodyId})`}
        stroke="rgba(246,241,234,0.08)"
        strokeWidth="1"
      />

      {/* Top sheen */}
      <ellipse cx="84" cy="70" rx="52" ry="34" fill={`url(#${sheenId})`} />

      {/* LiDAR turret */}
      <circle
        cx="100"
        cy="78"
        r="22"
        fill="#101420"
        stroke="rgba(122,46,192,0.45)"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="78" r="8" fill="#1c2233" />
      <circle cx="100" cy="78" r="3" fill="#7A2EC0" opacity="0.9" />

      {/* Brand mark */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fill="rgba(246,241,234,0.35)"
        fontSize="11"
        letterSpacing="4"
        fontFamily="Inter, system-ui, sans-serif"
      >
        EUREKA
      </text>

      {/* Front sensor bar */}
      <path
        d="M 62 158 A 86 86 0 0 0 138 158"
        fill="none"
        stroke="rgba(122,46,192,0.5)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A stylised home interior built from layered gradients — no photo needed. */
export function SunlitRoom({ mood = "day" }: { mood?: "day" | "dusk" }) {
  const dusk = mood === "dusk";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Wall */}
      <div
        className={`absolute inset-0 ${
          dusk
            ? "bg-gradient-to-b from-[#2b2438] via-[#382f44] to-[#251f2e]"
            : "bg-gradient-to-b from-[#f5ecdb] via-[#efe2cb] to-[#e2d2b6]"
        }`}
      />

      {/* Window light */}
      <div
        className={`absolute top-0 right-[12%] w-[26%] h-[54%] blur-md ${
          dusk
            ? "bg-gradient-to-b from-eureka-purple/25 to-transparent"
            : "bg-gradient-to-b from-[#fff8e8] to-transparent"
        }`}
      />

      {/* Light beams */}
      <div className="absolute top-0 right-[8%] w-[40%] h-full origin-top rotate-[18deg] bg-gradient-to-b from-eureka-purple/[0.12] to-transparent blur-sm" />
      <div className="absolute top-0 right-[26%] w-[22%] h-full origin-top rotate-[24deg] bg-gradient-to-b from-warm-white/10 to-transparent blur-md" />

      {/* Floor */}
      <div
        className={`absolute bottom-0 inset-x-0 h-[34%] ${
          dusk
            ? "bg-gradient-to-b from-[#1c1727] to-[#110e1a]"
            : "bg-gradient-to-b from-[#d9c4a3] to-[#bfa27b]"
        }`}
      />
      <div className="absolute bottom-[34%] inset-x-0 h-px bg-black/15" />

      {/* Sofa silhouette */}
      <div
        className={`absolute bottom-[30%] left-[8%] w-[34%] h-[15%] rounded-t-3xl ${
          dusk ? "bg-[#181320]" : "bg-[#c9b393]"
        }`}
      />
      <div
        className={`absolute bottom-[26%] left-[6%] w-[6%] h-[6%] rounded-t-xl ${
          dusk ? "bg-[#181320]" : "bg-[#c9b393]"
        }`}
      />
      <div
        className={`absolute bottom-[26%] left-[38%] w-[6%] h-[6%] rounded-t-xl ${
          dusk ? "bg-[#181320]" : "bg-[#c9b393]"
        }`}
      />

      {/* Rug */}
      <div
        className={`absolute bottom-[5%] left-[30%] w-[44%] h-[13%] rounded-[50%] opacity-80 ${
          dusk ? "bg-[#251e32]" : "bg-[#ddc9ab]"
        }`}
      />

      {/* Plant */}
      <svg
        className="absolute bottom-[32%] right-[6%] w-[9%] opacity-70"
        viewBox="0 0 60 120"
        fill="none"
      >
        <path
          d="M30 118 C28 80 10 60 14 30 C26 44 30 70 30 90 C30 70 34 44 46 30 C50 60 32 80 30 118 Z"
          fill={dusk ? "#1e2938" : "#7d8b5e"}
        />
        <rect
          x="22"
          y="106"
          width="16"
          height="12"
          rx="2"
          fill={dusk ? "#141020" : "#b3946f"}
        />
      </svg>
    </div>
  );
}

/** A deterministic cluster of floating dust particles. */
export function DustCluster({
  seed = 1,
  count = 16,
  glow = false,
  className = "",
}: {
  seed?: number;
  count?: number;
  glow?: boolean;
  className?: string;
}) {
  const rand = seeded(seed);
  const dots = Array.from({ length: count }, (_, i) => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 1.5 + rand() * 2.5,
    delay: i * 0.28,
    dur: 3.5 + rand() * 4,
  }));

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-float ${
            glow ? "bg-eureka-purple/70 shadow-[0_0_8px_rgba(122,46,192,0.8)]" : "bg-eureka-purple/40"
          }`}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Abstract editorial illustration for the three care stories. */
export function StoryArt({
  variant,
  className = "",
}: {
  variant: "home" | "hand" | "share";
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-stone-warm via-stone-light to-[#ddcfb8] ${className}`}
      aria-hidden="true"
    >
      {/* Soft sun */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-eureka-purple/20 blur-2xl" />

      {variant === "home" && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full">
          {/* Sofa line */}
          <rect x="30" y="62" width="140" height="26" rx="10" fill="#b39b74" />
          <rect x="24" y="76" width="12" height="18" rx="5" fill="#b39b74" />
          <rect x="164" y="76" width="12" height="18" rx="5" fill="#b39b74" />
          {/* Sweeping arc */}
          <path
            d="M 40 100 Q 100 60 165 96"
            fill="none"
            stroke="#7A2EC0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1 7"
          />
          <circle cx="165" cy="96" r="4" fill="#7A2EC0" />
        </svg>
      )}

      {variant === "hand" && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full">
          {/* Two figures, one helping the other */}
          <circle cx="78" cy="48" r="13" fill="#8f7a56" />
          <path d="M 60 100 Q 78 62 96 100 Z" fill="#8f7a56" />
          <circle cx="126" cy="42" r="13" fill="#b39b74" />
          <path d="M 108 100 Q 126 56 144 100 Z" fill="#b39b74" />
          {/* Helping arc between them */}
          <path
            d="M 92 66 Q 102 56 112 62"
            fill="none"
            stroke="#7A2EC0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="102" cy="58" r="3.5" fill="#7A2EC0" />
        </svg>
      )}

      {variant === "share" && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full">
          {/* Radiating rings of shared care */}
          <circle cx="100" cy="62" r="5" fill="#7A2EC0" />
          <circle cx="100" cy="62" r="16" fill="none" stroke="#7A2EC0" strokeOpacity="0.55" strokeWidth="1.5" />
          <circle cx="100" cy="62" r="28" fill="none" stroke="#7A2EC0" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="100" cy="62" r="42" fill="none" stroke="#7A2EC0" strokeOpacity="0.18" strokeWidth="1.5" />
          <circle cx="152" cy="34" r="3" fill="#b39b74" />
          <circle cx="52" cy="88" r="3" fill="#b39b74" />
        </svg>
      )}
    </div>
  );
}

/** Gradient panel used in place of photo thumbnails. */
export function GradientThumb({
  label,
  index = 0,
  dark = true,
  className = "",
}: {
  label: string;
  index?: number;
  dark?: boolean;
  className?: string;
}) {
  const palettes = dark
    ? [
        "from-[#1a2138] via-[#131a2c] to-[#0c101c]",
        "from-[#241d31] via-[#1a1626] to-[#100d18]",
        "from-[#1c2530] via-[#151c26] to-[#0d1119]",
      ]
    : [
        "from-[#ead9bd] via-[#e2d0b0] to-[#d3bd95]",
        "from-[#e6dcc8] via-[#dccfae] to-[#cbb488]",
        "from-[#efe4cd] via-[#e5d6b6] to-[#d6c096]",
      ];
  const palette = palettes[index % palettes.length];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${palette} ${className}`}
      aria-hidden="true"
    >
      {/* Concentric arcs */}
      <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full opacity-40">
        <circle cx="160" cy="100" r="30" fill="none" stroke={dark ? "rgba(122,46,192,0.35)" : "rgba(122,46,192,0.4)"} strokeWidth="1" />
        <circle cx="160" cy="100" r="48" fill="none" stroke={dark ? "rgba(122,46,192,0.2)" : "rgba(122,46,192,0.25)"} strokeWidth="1" />
        <circle cx="160" cy="100" r="68" fill="none" stroke={dark ? "rgba(122,46,192,0.12)" : "rgba(122,46,192,0.15)"} strokeWidth="1" />
      </svg>
      <span
        className={`absolute bottom-3 left-4 font-sans text-lg md:text-xl italic ${
          dark ? "text-warm-white/50" : "text-[#6b5a3e]/70"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/** Initials avatar used in place of creator photos. */
export function AvatarMark({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const initials =
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "E";

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-eureka-purple/80 via-[#9B4ED4] to-navy-deep text-warm-white font-sans font-semibold ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
