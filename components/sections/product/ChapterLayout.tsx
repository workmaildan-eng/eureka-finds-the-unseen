"use client";

import type { ReactNode } from "react";
import type { ProductFeature } from "@/data/campaign";

/*
 * Shared layout for a product feature chapter.
 * Desktop: full-viewport scene with the copy block overlaid on one side.
 * Mobile: scene block stacked above the copy.
 *
 * Copy elements carry `.ch-copy-item` so chapter timelines can stagger them.
 */
export function ChapterLayout({
  index,
  feature,
  scene,
  flip = false,
  extra,
  sceneClassName = "",
}: {
  index: number;
  feature: ProductFeature;
  scene: ReactNode;
  /** Place the copy on the right instead of the left. */
  flip?: boolean;
  /** Optional node rendered below the description (e.g. suction counter). */
  extra?: ReactNode;
  sceneClassName?: string;
}) {
  return (
    <>
      {/* Scene */}
      <div
        className={`relative h-[56svh] md:absolute md:inset-0 md:h-full ${sceneClassName}`}
      >
        {scene}
        {/* Legibility scrim behind the copy side (desktop) */}
        <div
          className={`hidden md:block absolute inset-y-0 w-[46%] pointer-events-none ${
            flip
              ? "right-0 bg-gradient-to-l from-midnight/85 via-midnight/40 to-transparent"
              : "left-0 bg-gradient-to-r from-midnight/85 via-midnight/40 to-transparent"
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Copy */}
      <div
        className={`relative md:absolute md:inset-y-0 md:flex md:items-center px-5 md:px-14 lg:px-20 py-10 md:py-0 md:max-w-2xl ${
          flip ? "md:right-0" : "md:left-0"
        }`}
      >
        <div className="ch-copy max-w-xl">
          <p className="ch-copy-item eyebrow mb-4">
            {String(index + 1).padStart(2, "0")} — Chapter
          </p>
          <h3 className="ch-copy-item font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.015em] text-warm-white leading-[1.05]">
            {feature.title}
          </h3>
          <p className="ch-copy-item mt-3 text-base md:text-lg text-amber-gold/90 font-display italic">
            {feature.supportingLine}
          </p>
          <p className="ch-copy-item mt-5 text-sm md:text-base text-warm-white/65 leading-relaxed">
            {feature.description}
          </p>
          {extra && <div className="ch-copy-item mt-6">{extra}</div>}
          {feature.legalNote && (
            <p className="ch-copy-item mt-5 text-[0.65rem] md:text-xs text-warm-white/35 leading-relaxed max-w-md">
              {feature.legalNote}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/** Positioned HUD chip; chapters animate `.hud-chip-anim` via GSAP. */
export function HudChip({
  label,
  x,
  y,
  className = "",
}: {
  label: string;
  x: number;
  y: number;
  className?: string;
}) {
  return (
    <div
      className={`hud-chip hud-chip-anim absolute -translate-x-1/2 -translate-y-1/2 z-10 ${className}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-gold inline-block" />
      {label}
    </div>
  );
}
