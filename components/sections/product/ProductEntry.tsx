"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RobotTopView } from "@/components/visuals/RobotTopView";
import { RoomScene } from "@/components/visuals/RoomScene";
import { ScanSweep } from "@/components/visuals/ScanSweep";

registerGSAP();

/*
 * Section 5 opening: the detection world continues from Section 4.
 * A dust trail glows on the floor; the J15 enters small at the vanishing
 * point and approaches the camera along the floor. As it passes the trail,
 * the dots extinguish and the room crossfades from detection to daylight.
 * The headline reveals with masked lines once the room is clean.
 */

// Trail dot positions follow the floor perspective (percent coords, size grows nearer).
const TRAIL = [
  { x: 50, y: 50, s: 5 },
  { x: 46, y: 56, s: 7 },
  { x: 54, y: 63, s: 9 },
  { x: 45, y: 71, s: 12 },
  { x: 55, y: 79, s: 15 },
  { x: 48, y: 87, s: 18 },
];

export function ProductEntry() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { product, campaign } = campaignData;

  useGSAP(
    () => {
      if (reducedMotion || !rootRef.current) return;

      const mm = gsap.matchMedia();

      const buildTweens = (tl: gsap.core.Timeline) => {
        // Robot travels from the vanishing point toward the camera
        tl.fromTo(
          ".pe-robot",
          { scale: 0.24, yPercent: -50, xPercent: -50 },
          {
            scale: 1.05,
            yPercent: -50,
            xPercent: -50,
            y: () => (rootRef.current?.clientHeight ?? 800) * 0.30,
            duration: 0.62,
            ease: "power1.in",
          },
          0
        )
          // HUD chips ping in early, fade as the robot reaches them
          .fromTo(
            ".pe-chip",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.08, stagger: 0.04 },
            0.05
          )
          .to(".pe-chip", { opacity: 0, duration: 0.1, stagger: 0.04 }, 0.42)
          // Trail dots extinguish as the robot passes over them (far to near)
          .to(
            ".pe-trail-dot",
            { opacity: 0, scale: 0.3, duration: 0.07, stagger: 0.055 },
            0.18
          )
          // Detection world dissolves into daylight
          .to(".room-detection", { opacity: 0, duration: 0.28 }, 0.42)
          .to(".pe-vignette", { opacity: 0.45, duration: 0.25 }, 0.48)
          // Headline reveals line by line
          .fromTo(
            ".pe-reveal .reveal-line",
            { yPercent: 115 },
            { yPercent: 0, duration: 0.16, stagger: 0.05, ease: "power3.out" },
            0.66
          );
      };

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=230%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        buildTweens(tl);
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 55%",
            toggleActions: "play none none none",
          },
        });
        tl.timeScale(0.32);
        buildTweens(tl);
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  // Reduced motion: render the finished state (daylight, robot near, headline shown)
  const rm = reducedMotion;

  return (
    <div
      ref={rootRef}
      className="relative h-[100svh] md:h-screen overflow-hidden bg-midnight"
    >
      <RoomScene detectionOpacity={rm ? 0 : 1} />

      {/* Bottom vignette for headline legibility */}
      <div
        className="pe-vignette absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-midnight/40 pointer-events-none"
        style={{ opacity: rm ? 0.45 : 0.7 }}
        aria-hidden="true"
      />

      {/* Dust / pet-hair trail */}
      {!rm && (
        <div aria-hidden="true">
          {TRAIL.map((d, i) => (
            <span
              key={i}
              className="pe-trail-dot absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-gold/80 shadow-[0_0_14px_rgba(216,171,85,0.9)]"
              style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }}
            />
          ))}
        </div>
      )}

      {/* Detection HUD chips */}
      {!rm &&
        product.entry.detectionLabels.map((label, i) => (
          <div
            key={label}
            className="pe-chip hud-chip absolute -translate-x-1/2 z-10 opacity-0"
            style={{
              left: `${TRAIL[i * 2]?.x ?? 50}%`,
              top: `${(TRAIL[i * 2]?.y ?? 50) - 6}%`,
            }}
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-gold inline-block" />
            {label}
          </div>
        ))}

      {/* The robot enters */}
      <div
        className="pe-robot absolute left-1/2 top-[44%] z-10 will-change-transform"
        style={
          rm
            ? { transform: "translate(-50%, calc(-50% + 30vh)) scale(1.05)" }
            : undefined
        }
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56">
          <ScanSweep className="opacity-70" />
          <RobotTopView spinning className="relative w-full h-full drop-shadow-[0_36px_44px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* Headline */}
      <div className="pe-reveal absolute inset-x-0 bottom-[10%] md:bottom-[12%] z-20 px-5 text-center">
        <p className="reveal-mask block">
          <span className="reveal-line eyebrow">
            {t(product.entry.eyebrow, locale)} · {campaign.productName}
          </span>
        </p>
        <h2 className="reveal-mask mt-4 block font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-warm-white display-glow">
          <span className="reveal-line">{t(product.headline, locale)}</span>
        </h2>
        <p className="reveal-mask mt-5 block">
          <span className="reveal-line text-sm md:text-lg text-warm-white/65 font-light">
            {t(product.supporting, locale)}
          </span>
        </p>
      </div>
    </div>
  );
}
