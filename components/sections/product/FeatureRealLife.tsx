"use client";

import { useRef } from "react";
import type { ProductFeature } from "@/data/campaign";
import { RobotTopView } from "@/components/visuals/RobotTopView";
import { ChapterLayout, HudChip } from "./ChapterLayout";
import { useChapterScroll } from "./useChapterScroll";

/*
 * Chapter 4 — adaptive carpet + pet-area cleaning.
 * A paw-print trail crosses the carpet; the carpet zone is recognised
 * (dashed boundary draws), the robot performs a focused pass and the
 * paw prints fade behind it.
 */

const PAWS = [
  { x: 30, y: 74, r: -18 },
  { x: 40, y: 62, r: 8 },
  { x: 51, y: 55, r: -6 },
  { x: 62, y: 46, r: 14 },
  { x: 73, y: 38, r: -4 },
];

function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="15" rx="5" ry="4.2" fill="currentColor" />
      <circle cx="6" cy="9.5" r="2" fill="currentColor" />
      <circle cx="10.5" cy="7" r="2" fill="currentColor" />
      <circle cx="15.5" cy="7" r="2" fill="currentColor" />
      <circle cx="19" cy="9.5" r="2" fill="currentColor" />
    </svg>
  );
}

export function FeatureRealLife({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const rm = useChapterScroll(rootRef, (tl) => {
    // Paw prints appear one by one (the pet passes through)
    tl.fromTo(
      ".fl-paw",
      { opacity: 0, scale: 0.6 },
      { opacity: 0.85, scale: 1, duration: 0.06, stagger: 0.06, ease: "back.out(2)" },
      0.05
    )
      // Carpet zone recognised
      .fromTo(
        ".fl-zone",
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, duration: 0.28, ease: "none" },
        0.3
      )
      .fromTo(
        ".fl-chip",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.08, stagger: 0.08 },
        0.42
      )
      // Robot performs the focused pass across the carpet
      .fromTo(
        ".fl-robot",
        { xPercent: -120, yPercent: 60 },
        { xPercent: 130, yPercent: -55, duration: 0.4, ease: "power1.inOut" },
        0.5
      )
      // Paw prints fade behind the robot
      .to(".fl-paw", { opacity: 0, duration: 0.07, stagger: 0.06 }, 0.58);
  });

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#100e18] md:h-screen">
      <ChapterLayout
        index={index}
        feature={feature}
        flip
        scene={
          <div className="absolute inset-0" aria-label={feature.visualAlt} role="img">
            {/* Warm wood floor, top-down */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#221b26] via-[#1a141f] to-[#120e18]" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(246,241,234,0.05) 0 1px, transparent 1px 72px)",
              }}
            />

            {/* Carpet zone */}
            <div
              className="absolute left-[22%] top-[28%] w-[56%] h-[46%] rounded-[2rem] bg-[#2a2135]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(246,241,234,0.045) 0 3px, transparent 3px 9px)",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
              }}
            />
            {/* Recognised zone boundary */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
              <rect
                className="fl-zone"
                x="212"
                y="172"
                width="576"
                height="300"
                rx="34"
                fill="none"
                stroke="rgba(216,171,85,0.7)"
                strokeWidth="2.5"
                strokeDasharray="12 10"
                pathLength={1400}
                strokeDashoffset={rm ? 0 : 1400}
                style={{ filter: "drop-shadow(0 0 6px rgba(216,171,85,0.45))" }}
              />
            </svg>

            {/* Paw-print trail */}
            {PAWS.map((p, i) => (
              <div
                key={i}
                className={`fl-paw absolute w-6 md:w-8 text-stone-warm/70 ${rm ? "opacity-0" : "opacity-0"}`}
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `rotate(${p.r}deg)` }}
                aria-hidden="true"
              >
                <Paw className="w-full" />
              </div>
            ))}

            {/* Robot focused pass */}
            <div className="fl-robot absolute left-[34%] top-[46%] w-36 md:w-48 will-change-transform">
              <RobotTopView spinning className="w-full drop-shadow-[0_22px_28px_rgba(0,0,0,0.55)]" />
            </div>

            <HudChip label={feature.hudLabels?.[0] ?? ""} x={50} y={24} className={`fl-chip ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[1] ?? ""} x={38} y={82} className={`fl-chip ${rm ? "" : "opacity-0"}`} />
          </div>
        }
      />
    </div>
  );
}
