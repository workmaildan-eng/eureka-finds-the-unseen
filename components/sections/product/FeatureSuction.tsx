"use client";

import { useRef } from "react";
import { campaignData, type ProductFeature } from "@/data/campaign";
import { ParticleCanvas } from "@/components/visuals/ParticleCanvas";
import { ChapterLayout, HudChip } from "./ChapterLayout";
import { useChapterScroll } from "./useChapterScroll";

/*
 * Chapter 2 — 22,000Pa suction (configurable in /data/campaign.ts).
 * Cross-section: floor plank with a crevice, carpet fibres beneath,
 * a particle stream rising into the robot's intake, and a scroll-linked
 * suction counter.
 */

// Deterministic fibre strands (SSR-safe).
function fibres(count: number) {
  let s = 42;
  const rand = () => ((s = (s * 16807) % 2147483647), (s - 1) / 2147483646);
  return Array.from({ length: count }, (_, i) => {
    const x = 4 + (92 / count) * i + rand() * 2;
    const h = 26 + rand() * 30;
    const sway = (rand() - 0.5) * 14;
    return { x, h, sway };
  });
}

const FIBRES = fibres(34);

export function FeatureSuction({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const { product } = campaignData;

  const target = parseInt(product.suctionPower.replace(/[^0-9]/g, ""), 10) || 0;
  const unit = product.suctionPower.replace(/[0-9,.\s]/g, "");
  const format = (v: number) => `${Math.round(v).toLocaleString("en-US")}${unit}`;

  const rm = useChapterScroll(rootRef, (tl) => {
    // Counter climbs with scroll
    const obj = { v: 0 };
    tl.to(
      obj,
      {
        v: target,
        duration: 0.7,
        ease: "power1.out",
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = format(obj.v);
        },
      },
      0.1
    )
      // Crevice glow reveals, then dust lifts out of the fibres
      .fromTo(".fsu-crevice-glow", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.15)
      .fromTo(
        ".fsu-fibre",
        { scaleY: 1 },
        { scaleY: 0.86, duration: 0.3, stagger: { each: 0.004, from: "center" }, ease: "sine.inOut" },
        0.3
      )
      .fromTo(".fsu-stream", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.25)
      .fromTo(
        ".fsu-chip",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.08, stagger: 0.06 },
        0.35
      )
      .fromTo(".fsu-intake", { opacity: 0.2 }, { opacity: 1, duration: 0.2 }, 0.3);
  });

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-[#0b0e16] md:h-screen">
      <ChapterLayout
        index={index}
        feature={feature}
        flip
        extra={
          <div>
            <span
              ref={counterRef}
              className="font-display text-5xl md:text-6xl font-semibold text-amber-gold tabular-nums"
            >
              {rm ? format(target) : format(0)}
            </span>
            <span className="block mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-warm-white/40">
              Max. suction — configurable claim
            </span>
          </div>
        }
        scene={
          <div className="absolute inset-0" aria-label={feature.visualAlt} role="img">
            {/* Room above the floor */}
            <div className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-[#10131d] to-[#0b0e16]" />

            {/* Robot silhouette above the floor (side profile) */}
            <svg className="absolute left-[14%] md:left-[30%] top-[24%] w-[54%] md:w-[36%]" viewBox="0 0 320 120" aria-hidden="true">
              <path d="M 20 104 Q 20 58 84 50 L 236 50 Q 300 58 300 104 Z" fill="#161b28" stroke="rgba(246,241,234,0.14)" strokeWidth="1.5" />
              <rect x="128" y="30" width="60" height="24" rx="10" fill="#1a2030" stroke="rgba(216,171,85,0.45)" strokeWidth="1.5" />
              <circle cx="158" cy="42" r="4" fill="#d8ab55" />
              {/* Intake glow */}
              <ellipse className="fsu-intake" cx="160" cy="104" rx="52" ry="7" fill="rgba(216,171,85,0.35)" style={{ filter: "blur(4px)" }} />
            </svg>

            {/* Floor plank with crevice */}
            <div className="absolute inset-x-0 top-[46%] h-[8%]">
              <div className="absolute inset-y-0 left-0 right-[52.5%] bg-gradient-to-b from-[#2b2536] to-[#1d1926] border-t border-warm-white/15" />
              <div className="absolute inset-y-0 left-[54.5%] right-0 bg-gradient-to-b from-[#2b2536] to-[#1d1926] border-t border-warm-white/15" />
              {/* The crevice */}
              <div className="absolute inset-y-0 left-[52.5%] w-[2%] bg-[#07090f]" />
              <div className="fsu-crevice-glow absolute -inset-y-1 left-[51.5%] w-[4%] bg-amber-gold/25 blur-md" style={{ opacity: rm ? 1 : 0 }} />
            </div>

            {/* Carpet cross-section */}
            <div className="absolute inset-x-0 top-[54%] bottom-0 bg-gradient-to-b from-[#141020] to-[#0b0912]">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
                {FIBRES.map((f, i) => (
                  <path
                    key={i}
                    className="fsu-fibre"
                    d={`M ${f.x} 60 Q ${f.x + f.sway} ${60 - f.h / 2} ${f.x + f.sway / 2} ${60 - f.h}`}
                    fill="none"
                    stroke={i % 4 === 0 ? "rgba(216,171,85,0.35)" : "rgba(120,110,140,0.4)"}
                    strokeWidth="0.55"
                    strokeLinecap="round"
                    style={{ transformOrigin: `${f.x}px 60px` }}
                  />
                ))}
              </svg>
              {/* Fine dust hiding between fibres */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
                {[[18, 48], [32, 52], [47, 45], [61, 50], [76, 47], [88, 53]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="0.8" fill="rgba(216,171,85,0.7)" />
                ))}
              </svg>
            </div>

            {/* Particle stream into the intake */}
            <div className={`fsu-stream absolute inset-0 ${rm ? "" : "opacity-0"}`}>
              <ParticleCanvas mode="stream" count={46} className="absolute inset-0 w-full h-full" targetX={0.42} targetY={0.36} />
            </div>

            <HudChip label={feature.hudLabels?.[0] ?? ""} x={53} y={42} className={`fsu-chip ${rm ? "" : "opacity-0"}`} />
            <HudChip label={feature.hudLabels?.[1] ?? ""} x={30} y={76} className={`fsu-chip ${rm ? "" : "opacity-0"}`} />
          </div>
        }
      />
    </div>
  );
}
