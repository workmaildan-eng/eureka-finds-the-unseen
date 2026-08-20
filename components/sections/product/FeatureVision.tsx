"use client";

import { useRef } from "react";
import type { ProductFeature } from "@/data/campaign";
import { RobotTopView } from "@/components/visuals/RobotTopView";
import { ChapterLayout, HudChip } from "./ChapterLayout";
import { useChapterScroll } from "./useChapterScroll";

/*
 * Chapter 3 — IntelliView AI 2.0.
 * Elegant sensing interface: dual vision cones sweep the floor, obstacles
 * are recognised one by one, a planned path draws around them, and when the
 * liquid spill is reached the roller lifts and mopping takes priority
 * (the spill fades as it is mopped).
 */
export function FeatureVision({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const rm = useChapterScroll(rootRef, (tl) => {
    tl.fromTo(".fv-cone", { opacity: 0 }, { opacity: 1, duration: 0.15, stagger: 0.05 }, 0.05)
      // Obstacles recognised in sequence
      .fromTo(
        ".fv-obstacle",
        { opacity: 0.25 },
        { opacity: 1, duration: 0.08, stagger: 0.08 },
        0.18
      )
      .fromTo(
        ".fv-chip-obstacle",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.08, stagger: 0.08 },
        0.2
      )
      // Planned path draws around the obstacles
      .fromTo(
        ".fv-path",
        { strokeDashoffset: 1200 },
        { strokeDashoffset: 0, duration: 0.34, ease: "none" },
        0.36
      )
      // Robot follows the path
      .to(
        ".fv-robot",
        {
          keyframes: [
            { xPercent: 60, yPercent: -46, rotation: 12, duration: 0.12 },
            { xPercent: 150, yPercent: 18, rotation: -8, duration: 0.12 },
            { xPercent: 235, yPercent: -10, rotation: 4, duration: 0.12 },
          ],
          ease: "none",
        },
        0.38
      )
      // Spill reached: roller lifts, mopping priority
      .fromTo(
        ".fv-chip-spill",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.76
      )
      .to(".fv-spill", { scale: 0.4, opacity: 0.25, duration: 0.16, ease: "power1.in" }, 0.82);
  });

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-navy-deep md:h-screen">
      <ChapterLayout
        index={index}
        feature={feature}
        scene={
          <div className="absolute inset-0" aria-label={feature.visualAlt} role="img">
            {/* Deep-navy sensing floor */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e1526] via-[#0b111f] to-[#0d1526]" />
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {[15, 30, 45, 60, 75, 90].map((v) => (
                <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="rgba(216,171,85,0.12)" strokeWidth="0.12" />
              ))}
              {[15, 30, 45, 60, 75, 90].map((v) => (
                <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke="rgba(216,171,85,0.10)" strokeWidth="0.12" />
              ))}
            </svg>

            {/* Vision cones + path + obstacles (shared coordinate space) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              {/* Dual vision cones from the robot's start position */}
              <path className="fv-cone" d="M 250 380 L 620 180 L 660 420 Z" fill="rgba(150,155,205,0.10)" style={{ opacity: rm ? 1 : 0 }} />
              <path className="fv-cone" d="M 250 380 L 560 250 L 590 400 Z" fill="rgba(216,171,85,0.13)" style={{ opacity: rm ? 1 : 0 }} />

              {/* Obstacle: chair leg */}
              <g className="fv-obstacle" style={{ opacity: rm ? 1 : 0.25 }}>
                <circle cx="520" cy="250" r="20" fill="#141b2e" stroke="rgba(216,171,85,0.55)" strokeWidth="1.5" />
                <circle cx="520" cy="250" r="30" fill="none" stroke="rgba(216,171,85,0.25)" strokeWidth="1" strokeDasharray="4 6" />
              </g>
              {/* Obstacle: cable */}
              <g className="fv-obstacle" style={{ opacity: rm ? 1 : 0.25 }}>
                <path d="M 460 430 q 40 -26 80 0 t 80 0" fill="none" stroke="rgba(150,155,205,0.7)" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="540" cy="428" rx="66" ry="24" fill="none" stroke="rgba(216,171,85,0.25)" strokeWidth="1" strokeDasharray="4 6" />
              </g>
              {/* Liquid spill */}
              <g className="fv-spill svg-origin-center">
                <path
                  d="M 760 330 q 26 -20 52 -2 q 24 14 8 34 q -12 18 -38 12 q -30 -4 -30 -24 q 0 -12 8 -20 Z"
                  fill="rgba(140,190,220,0.28)"
                  stroke="rgba(140,190,220,0.5)"
                  strokeWidth="1"
                />
                <ellipse cx="782" cy="340" rx="10" ry="4" fill="rgba(246,241,234,0.35)" />
              </g>

              {/* Planned path weaving around obstacles to the spill */}
              <path
                className="fv-path"
                d="M 250 380 C 360 320 430 300 480 300 C 540 300 540 360 520 396 C 500 440 600 470 660 430 C 710 400 720 360 780 345"
                fill="none"
                stroke="rgba(216,171,85,0.75)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="10 8"
                pathLength={1200}
                strokeDashoffset={rm ? 0 : 1200}
                style={{ filter: "drop-shadow(0 0 5px rgba(216,171,85,0.5))" }}
              />
            </svg>

            {/* Robot */}
            <div className="fv-robot absolute left-[18%] top-[50%] w-32 md:w-40 will-change-transform" style={{ transform: "rotate(64deg)" }}>
              <RobotTopView spinning className="w-full drop-shadow-[0_20px_26px_rgba(0,0,0,0.55)]" />
            </div>

            {/* HUD chips */}
            <HudChip label={feature.hudLabels?.[0] ?? ""} x={52} y={30} className={`fv-chip-obstacle ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[1] ?? ""} x={54} y={74} className={`fv-chip-obstacle ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[2] ?? ""} x={78} y={44} className={`fv-chip-obstacle ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[3] ?? ""} x={74} y={62} className={`fv-chip-spill ${rm ? "" : "opacity-0"}`} />
          </div>
        }
      />
    </div>
  );
}
