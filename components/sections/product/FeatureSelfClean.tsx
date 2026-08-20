"use client";

import { useRef } from "react";
import { campaignData, type ProductFeature } from "@/data/campaign";
import { DockScene } from "@/components/visuals/DockScene";
import { ChapterLayout } from "./ChapterLayout";
import { useChapterScroll } from "./useChapterScroll";

/*
 * Chapter 5 — the dual self-cleaning system.
 * The robot docks, then eight maintenance steps light up in sequence,
 * each synced to a micro-animation inside the dock cutaway.
 * FlexiRazor gets a closing secondary beat.
 */
export function FeatureSelfClean({
  feature,
  index,
}: {
  feature: ProductFeature;
  index: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { selfClean } = campaignData.product;
  const steps = selfClean.steps;

  const rm = useChapterScroll(rootRef, (tl) => {
    // Robot slides into the dock
    tl.fromTo(".dk-robot", { x: -170 }, { x: 0, duration: 0.18, ease: "power2.out" }, 0.05);

    // Prepare micro-animation states
    tl.set(".dk-wash", { opacity: 0 }, 0)
      .set(".dk-dry path", { opacity: 0 }, 0)
      .set(".dk-air", { opacity: 0 }, 0)
      .set(".dk-charge", { opacity: 0.25 }, 0)
      .set(".dk-tray", { opacity: 0.15 }, 0)
      .set(".dk-dirty-level", { scaleY: 0.15 }, 0);

    const stepStart = 0.26;
    const per = 0.075;

    steps.forEach((step, i) => {
      const at = stepStart + i * per;
      // Step row lights up
      tl.fromTo(
        `.sc-step-${i}`,
        { opacity: 0.3, x: -8 },
        { opacity: 1, x: 0, duration: 0.05 },
        at
      );
      tl.fromTo(
        `.sc-dot-${i}`,
        { scale: 0.5, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.05, ease: "back.out(3)" },
        at
      );

      // Matching micro-animation inside the dock
      switch (step.id) {
        case "wash":
          tl.to(".dk-wash", { opacity: 1, scale: 1.12, duration: 0.06 }, at);
          break;
        case "dry":
          tl.to(".dk-dry path", { opacity: 1, duration: 0.05, stagger: 0.015 }, at);
          break;
        case "refill":
          tl.to(".dk-clean-level", { scaleY: 0.55, duration: 0.07, ease: "sine.inOut" }, at);
          break;
        case "drain":
          tl.to(".dk-dirty-level", { scaleY: 0.7, duration: 0.07, ease: "sine.inOut" }, at);
          break;
        case "empty":
          tl.fromTo(".dk-air", { opacity: 0, strokeDashoffset: 120 }, { opacity: 1, strokeDashoffset: 0, duration: 0.07 }, at);
          tl.to(".dk-bag", { scale: 1.12, transformOrigin: "center", duration: 0.05 }, at + 0.02);
          break;
        case "charge":
          tl.to(".dk-charge", { opacity: 1, scale: 1.5, duration: 0.05, ease: "back.out(2)" }, at);
          break;
        case "tray":
          tl.to(".dk-tray", { opacity: 0.7, duration: 0.05 }, at);
          break;
        case "debris":
          tl.to(".dk-debris circle", { opacity: 0, duration: 0.05, stagger: 0.008 }, at);
          break;
      }
    });

    // FlexiRazor closing beat
    const razorAt = stepStart + steps.length * per + 0.04;
    tl.fromTo(
      ".sc-razor",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.07 },
      razorAt
    ).fromTo(
      ".dk-razor path",
      { scaleY: 0.4, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.05, stagger: 0.01, ease: "back.out(3)" },
      razorAt
    );
  }, "+=200%");

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-charcoal md:h-screen">
      <ChapterLayout
        index={index}
        feature={feature}
        scene={
          <div className="absolute inset-0" aria-label={feature.visualAlt} role="img">
            <div className="absolute inset-0 bg-gradient-to-b from-[#14161e] via-[#101219] to-[#0b0d13]" />
            {/* Soft stage glow behind the dock */}
            <div className="absolute right-[6%] md:right-[12%] bottom-[16%] w-[46%] h-[52%] rounded-full bg-amber-gold/[0.06] blur-3xl" />

            {/* Dock cutaway */}
            <div className="absolute right-[2%] md:right-[8%] bottom-[8%] w-[88%] md:w-[46%] max-w-xl">
              <DockScene variant="cutaway" className="w-full" />
            </div>

            {/* Step sequence list */}
            <ol
              className="absolute left-[4%] md:left-auto md:right-[54%] bottom-[10%] md:bottom-[16%] space-y-1.5 md:space-y-2.5"
              aria-label="Self-cleaning sequence"
            >
              {steps.map((step, i) => (
                <li
                  key={step.id}
                  className={`sc-step-${i} flex items-center gap-2.5 text-[0.68rem] md:text-sm text-warm-white/85`}
                  style={{ opacity: rm ? 1 : 0.3 }}
                >
                  <span
                    className={`sc-dot-${i} w-2 h-2 rounded-full bg-amber-gold shadow-[0_0_8px_rgba(216,171,85,0.8)]`}
                    style={{ opacity: rm ? 1 : 0.3 }}
                  />
                  {step.label}
                </li>
              ))}
            </ol>

            {/* FlexiRazor note */}
            <div
              className={`sc-razor hud-chip absolute right-[8%] md:right-[16%] bottom-[3%] ${rm ? "" : "opacity-0"}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-gold inline-block" />
              {selfClean.flexiRazor.name} — anti-tangle
            </div>
          </div>
        }
        extra={
          <p className="text-xs md:text-sm text-warm-white/45 leading-relaxed max-w-md">
            {selfClean.flexiRazor.name}: {selfClean.flexiRazor.note}
          </p>
        }
      />
    </div>
  );
}
