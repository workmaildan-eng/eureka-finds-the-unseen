"use client";

import { useId } from "react";

/*
 * Side view of the J15 Max Ultra base station with docked robot.
 *
 * variant="cutaway" exposes the internals for the self-clean chapter:
 *   .dk-robot        — robot side profile group (slide in from the left)
 *   .dk-clean-level  — clean-water level rect (scaleY from bottom)
 *   .dk-dirty-level  — dirty-water level rect
 *   .dk-bag          — dust bag
 *   .dk-air          — airflow path (dust emptying)
 *   .dk-wash         — wash ripple under the robot
 *   .dk-dry          — drying air lines
 *   .dk-charge       — charging contact glow
 *   .dk-tray         — base tray highlight
 *   .dk-debris       — debris dots on the tray
 *   .dk-razor        — FlexiRazor blade strip
 *
 * variant="hero" is the closed premium composition for closing shots.
 */
export function DockScene({
  className = "",
  variant = "cutaway",
}: {
  className?: string;
  variant?: "cutaway" | "hero";
}) {
  const uid = useId().replace(/:/g, "");
  const towerG = `dkt-${uid}`;
  const robotG = `dkr-${uid}`;
  const cutaway = variant === "cutaway";

  return (
    <svg
      viewBox="0 0 360 320"
      className={className}
      role="img"
      aria-label="Eureka J15 Max Ultra base station with docked robot"
    >
      <defs>
        <linearGradient id={towerG} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#232837" />
          <stop offset="45%" stopColor="#161a26" />
          <stop offset="100%" stopColor="#0c0f18" />
        </linearGradient>
        <linearGradient id={robotG} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b3143" />
          <stop offset="100%" stopColor="#11141f" />
        </linearGradient>
      </defs>

      {/* Floor line */}
      <line x1="0" y1="296" x2="360" y2="296" stroke="rgba(246,241,234,0.12)" strokeWidth="1" />

      {/* Tower */}
      <rect x="150" y="36" width="180" height="224" rx="14" fill={`url(#${towerG})`} stroke="rgba(246,241,234,0.10)" strokeWidth="1" />
      {/* Lid seam + status light */}
      <line x1="150" y1="64" x2="330" y2="64" stroke="rgba(246,241,234,0.07)" strokeWidth="1" />
      <circle cx="168" cy="50" r="3" fill="#d8ab55" opacity="0.9" />

      {cutaway ? (
        <>
          {/* Cutaway panel */}
          <rect x="166" y="76" width="148" height="150" rx="8" fill="rgba(9,13,24,0.6)" stroke="rgba(246,241,234,0.08)" strokeWidth="1" />

          {/* Clean water tank */}
          <rect x="178" y="88" width="56" height="94" rx="6" fill="none" stroke="rgba(246,241,234,0.16)" strokeWidth="1" />
          <rect className="dk-clean-level" x="180" y="90" width="52" height="90" rx="5" fill="rgba(140,190,220,0.30)" style={{ transformOrigin: "206px 180px" }} />
          <text x="206" y="200" textAnchor="middle" fill="rgba(246,241,234,0.35)" fontSize="9" fontFamily="Inter, system-ui, sans-serif">CLEAN</text>

          {/* Dirty water tank */}
          <rect x="246" y="88" width="56" height="94" rx="6" fill="none" stroke="rgba(246,241,234,0.16)" strokeWidth="1" />
          <rect className="dk-dirty-level" x="248" y="90" width="52" height="90" rx="5" fill="rgba(150,120,80,0.30)" style={{ transformOrigin: "274px 180px" }} />
          <text x="274" y="200" textAnchor="middle" fill="rgba(246,241,234,0.35)" fontSize="9" fontFamily="Inter, system-ui, sans-serif">DIRTY</text>

          {/* Dust bag */}
          <path className="dk-bag" d="M 196 210 Q 206 202 216 210 L 214 224 Q 206 228 198 224 Z" fill="rgba(216,171,85,0.18)" stroke="rgba(216,171,85,0.45)" strokeWidth="1" />
          {/* Airflow into the bag */}
          <path className="dk-air" d="M 120 268 C 150 262 180 246 200 218" fill="none" stroke="rgba(216,171,85,0.55)" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Closed premium face */}
          <rect x="166" y="80" width="148" height="140" rx="10" fill="rgba(246,241,234,0.02)" stroke="rgba(246,241,234,0.06)" strokeWidth="1" />
          <text x="240" y="156" textAnchor="middle" fill="rgba(246,241,234,0.30)" fontSize="12" letterSpacing="5" fontFamily="Inter, system-ui, sans-serif">EUREKA</text>
        </>
      )}

      {/* Base ramp / tray */}
      <path d="M 40 296 L 150 296 L 150 260 L 330 260 L 330 296 Z" fill="#10141f" stroke="rgba(246,241,234,0.10)" strokeWidth="1" />
      <rect className="dk-tray" x="52" y="286" width="130" height="7" rx="3" fill="rgba(216,171,85,0.22)" />
      {/* Debris dots on the tray */}
      <g className="dk-debris">
        {[66, 84, 104, 126, 148].map((x, i) => (
          <circle key={x} cx={x} cy={289 + (i % 2)} r="1.6" fill="rgba(216,171,85,0.8)" />
        ))}
      </g>
      {/* FlexiRazor blade strip */}
      <g className="dk-razor">
        {[60, 74, 88, 102, 116, 130].map((x) => (
          <path key={x} d={`M ${x} 284 l 5 -6 l 5 6 Z`} fill="rgba(216,171,85,0.5)" />
        ))}
      </g>

      {/* Docked robot, side profile */}
      <g className="dk-robot">
        <path d="M 46 278 Q 46 250 84 246 L 130 246 Q 152 250 152 278 Z" fill={`url(#${robotG})`} stroke="rgba(246,241,234,0.12)" strokeWidth="1" />
        {/* LiDAR bump */}
        <rect x="86" y="234" width="30" height="14" rx="6" fill="#1a2030" stroke="rgba(216,171,85,0.4)" strokeWidth="1" />
        <circle cx="101" cy="241" r="2.5" fill="#d8ab55" />
        {/* Front light */}
        <circle cx="52" cy="264" r="2.5" fill="#d8ab55" opacity="0.85" />
        {/* Wash ripple beneath */}
        <ellipse className="dk-wash" cx="99" cy="284" rx="34" ry="5" fill="none" stroke="rgba(140,190,220,0.55)" strokeWidth="1.5" />
        {/* Drying air lines */}
        <g className="dk-dry">
          {[86, 99, 112].map((x) => (
            <path key={x} d={`M ${x} 280 q 3 -7 0 -14`} fill="none" stroke="rgba(246,241,234,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          ))}
        </g>
        {/* Charging contact */}
        <circle className="dk-charge" cx="146" cy="276" r="4" fill="rgba(216,171,85,0.9)" />
      </g>
    </svg>
  );
}
