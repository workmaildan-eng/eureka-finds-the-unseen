"use client";

import { useRef } from "react";
import type { ProductFeature } from "@/data/campaign";
import { RobotTopView } from "@/components/visuals/RobotTopView";
import { ChapterLayout, HudChip } from "./ChapterLayout";
import { useChapterScroll } from "./useChapterScroll";

/*
 * Chapter 1 — SweepExtend / ScrubExtend.
 * Top-down corner scene: the robot approaches the corner, the side brush
 * arm and mop pads extend, and an amber coverage line draws along both walls.
 */
export function FeatureReach({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const rm = useChapterScroll(rootRef, (tl) => {
    tl.fromTo(
      ".fr-robot",
      { xPercent: -170, yPercent: 130 },
      { xPercent: 0, yPercent: 0, duration: 0.45, ease: "power1.inOut" },
      0.05
    )
      .fromTo(
        ".fr-chip-corner",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.08 },
        0.3
      )
      // Arm + mops extend once the corner is detected
      .to(".fr-robot .rtv-arm", { x: 16, y: -13, duration: 0.12, ease: "back.out(2)" }, 0.42)
      .to(".fr-robot .rtv-mop-l", { x: -13, duration: 0.12, ease: "back.out(2)" }, 0.44)
      .to(".fr-robot .rtv-mop-r", { x: 13, duration: 0.12, ease: "back.out(2)" }, 0.44)
      .fromTo(
        ".fr-chip-extend",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.08, stagger: 0.05 },
        0.5
      )
      // Coverage line draws along both walls
      .fromTo(
        ".fr-arc",
        { strokeDashoffset: 900 },
        { strokeDashoffset: 0, duration: 0.34, ease: "none" },
        0.52
      )
      // Corner dust extinguishes as coverage arrives
      .to(".fr-dust circle", { opacity: 0, duration: 0.1, stagger: 0.02 }, 0.7);
  });

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-midnight md:h-screen">
      <ChapterLayout
        index={index}
        feature={feature}
        scene={
          <div className="absolute inset-0" aria-label={feature.visualAlt} role="img">
            {/* Top-down floor */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#171b28] via-[#12151f] to-[#0c0f17]" />
            {/* Floor board seams */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(246,241,234,0.05) 0 1px, transparent 1px 90px)",
              }}
            />
            {/* Walls forming the corner (top + right) */}
            <div className="absolute top-0 inset-x-0 h-[9%] bg-gradient-to-b from-[#232939] to-[#191e2c] border-b border-warm-white/10" />
            <div className="absolute right-0 inset-y-0 w-[7%] bg-gradient-to-l from-[#232939] to-[#191e2c] border-l border-warm-white/10" />
            {/* Table leg */}
            <div className="absolute right-[24%] top-[34%] w-9 h-9 rounded-full bg-[#242b3d] border border-warm-white/15 shadow-[0_0_18px_rgba(0,0,0,0.6)]" />

            {/* Corner dust */}
            <svg className="fr-dust absolute right-[6%] top-[8%] w-[26%] h-[34%]" viewBox="0 0 100 100" aria-hidden="true">
              {[
                [82, 12, 2.4], [90, 26, 1.8], [74, 20, 1.5], [86, 42, 2.1],
                [92, 58, 1.6], [78, 34, 1.3], [88, 74, 1.9], [70, 10, 1.4],
              ].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill="rgba(216,171,85,0.85)" opacity={rm ? 0 : 1} />
              ))}
            </svg>

            {/* Coverage line along both walls */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="fr-arc"
                d="M 330 78 L 918 78 L 918 560"
                fill="none"
                stroke="rgba(216,171,85,0.8)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="900"
                strokeDashoffset={rm ? 0 : 900}
                style={{ filter: "drop-shadow(0 0 6px rgba(216,171,85,0.6))" }}
              />
            </svg>

            {/* Robot approaching the corner */}
            <div
              className="fr-robot absolute right-[16%] top-[16%] w-40 md:w-56 will-change-transform"
              style={{ transform: "rotate(38deg)" }}
            >
              <RobotTopView spinning className="w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)]" />
            </div>

            {/* HUD chips */}
            <HudChip label={feature.hudLabels?.[0] ?? ""} x={78} y={14} className={`fr-chip-corner ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[1] ?? ""} x={56} y={44} className={`fr-chip-extend ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[2] ?? ""} x={60} y={58} className={`fr-chip-extend ${rm ? "" : "opacity-0"}`} />
          </div>
        }
      />
    </div>
  );
}
