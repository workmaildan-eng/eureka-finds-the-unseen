"use client";

import { useId } from "react";

/*
 * Detailed top-down J15 Max Ultra illustration.
 * Front of the robot faces UP (small y). Rotate via a wrapper.
 *
 * Animatable hooks (target with GSAP or CSS from a scoped parent):
 *   .rtv-lidar-ring  — LiDAR tick ring (spin around own centre)
 *   .rtv-arm         — side-brush arm group (translate outward to extend)
 *   .rtv-brush       — brush disc (spin around own centre)
 *   .rtv-mop-l/.rtv-mop-r — rear mop pads (translate outward to extend)
 *   .rtv-scan        — outer sensing pulse ring
 */
export function RobotTopView({
  className = "",
  spinning = false,
}: {
  className?: string;
  /** Adds continuous CSS spin to brush + LiDAR (killed by prefers-reduced-motion). */
  spinning?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const body = `rtvb-${uid}`;
  const sheen = `rtvs-${uid}`;
  const turret = `rtvt-${uid}`;

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="Eureka J15 Max Ultra robot vacuum, top view"
    >
      <defs>
        <radialGradient id={body} cx="40%" cy="34%" r="80%">
          <stop offset="0%" stopColor="#333a4c" />
          <stop offset="52%" stopColor="#1b2030" />
          <stop offset="100%" stopColor="#0b0e17" />
        </radialGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(246,241,234,0.30)" />
          <stop offset="50%" stopColor="rgba(246,241,234,0.04)" />
          <stop offset="100%" stopColor="rgba(246,241,234,0)" />
        </linearGradient>
        <radialGradient id={turret} cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#232a3d" />
          <stop offset="100%" stopColor="#0d1019" />
        </radialGradient>
      </defs>

      {/* Sensing pulse ring */}
      <circle
        className="rtv-scan svg-origin-center"
        cx="120"
        cy="120"
        r="112"
        fill="none"
        stroke="rgba(216,171,85,0.35)"
        strokeWidth="1.5"
      />

      {/* Rear mop pads (peek out beneath the body) */}
      <g className="rtv-mop-l">
        <circle cx="88" cy="196" r="26" fill="#141824" stroke="rgba(216,171,85,0.35)" strokeWidth="1" />
        <circle cx="88" cy="196" r="18" fill="none" stroke="rgba(246,241,234,0.08)" strokeWidth="4" strokeDasharray="2 5" />
      </g>
      <g className="rtv-mop-r">
        <circle cx="152" cy="196" r="26" fill="#141824" stroke="rgba(216,171,85,0.35)" strokeWidth="1" />
        <circle cx="152" cy="196" r="18" fill="none" stroke="rgba(246,241,234,0.08)" strokeWidth="4" strokeDasharray="2 5" />
      </g>

      {/* Side-brush arm (front-right), extends outward */}
      <g className="rtv-arm">
        <rect x="168" y="52" width="34" height="8" rx="4" fill="#1d2330" stroke="rgba(246,241,234,0.10)" strokeWidth="0.75" transform="rotate(32 172 56)" />
        <g className={`rtv-brush svg-origin-center ${spinning ? "animate-spin-slow" : ""}`}>
          <circle cx="196" cy="74" r="5" fill="#2a3145" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line
              key={a}
              x1="196"
              y1="74"
              x2={196 + 22 * Math.cos((a * Math.PI) / 180)}
              y2={74 + 22 * Math.sin((a * Math.PI) / 180)}
              stroke="rgba(216,171,85,0.75)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>

      {/* Main body */}
      <circle cx="120" cy="120" r="100" fill={`url(#${body})`} stroke="rgba(246,241,234,0.10)" strokeWidth="1" />
      {/* Machined ring details */}
      <circle cx="120" cy="120" r="92" fill="none" stroke="rgba(246,241,234,0.05)" strokeWidth="1" />
      <circle cx="120" cy="120" r="72" fill="none" stroke="rgba(246,241,234,0.04)" strokeWidth="8" />
      {/* Top sheen */}
      <ellipse cx="100" cy="84" rx="58" ry="38" fill={`url(#${sheen})`} />

      {/* Front bumper */}
      <path
        d="M 46 78 A 100 100 0 0 1 194 78"
        fill="none"
        stroke="rgba(246,241,234,0.14)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Front sensor window */}
      <path
        d="M 78 40 A 100 100 0 0 1 162 40"
        fill="none"
        stroke="rgba(216,171,85,0.55)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* LiDAR turret */}
      <circle cx="120" cy="96" r="27" fill={`url(#${turret})`} stroke="rgba(216,171,85,0.4)" strokeWidth="1.5" />
      <g className={`rtv-lidar-ring svg-origin-center ${spinning ? "animate-spin-slower" : ""}`}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={120 + 19 * Math.cos(a)}
              y1={96 + 19 * Math.sin(a)}
              x2={120 + 24 * Math.cos(a)}
              y2={96 + 24 * Math.sin(a)}
              stroke="rgba(216,171,85,0.5)"
              strokeWidth="1.5"
            />
          );
        })}
      </g>
      <circle cx="120" cy="96" r="9" fill="#1a2133" />
      <circle cx="120" cy="96" r="3.5" fill="#d8ab55" opacity="0.95" />

      {/* Brand mark */}
      <text
        x="120"
        y="168"
        textAnchor="middle"
        fill="rgba(246,241,234,0.32)"
        fontSize="12"
        letterSpacing="5"
        fontFamily="Inter, system-ui, sans-serif"
      >
        EUREKA
      </text>
    </svg>
  );
}
