"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function EurekaOrigin() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ripple1Ref = useRef<HTMLDivElement>(null);
  const ripple2Ref = useRef<HTMLDivElement>(null);
  const ripple3Ref = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const marbleRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: pinRef.current,
          scrub: 1,
        },
      });

      tl.fromTo(ripple1Ref.current, { scale: 0, opacity: 0.8 }, { scale: 4, opacity: 0, duration: 0.3 }, 0)
        .fromTo(ripple2Ref.current, { scale: 0, opacity: 0.6 }, { scale: 8, opacity: 0, duration: 0.4 }, 0.15)
        .fromTo(ripple3Ref.current, { scale: 0, opacity: 0.5 }, { scale: 20, opacity: 0.3, duration: 0.5 }, 0.3)
        .fromTo(sculptureRef.current, { opacity: 0, y: 40 }, { opacity: 0.6, y: 0, duration: 0.3 }, 0.2)
        .fromTo(marbleRef.current, { x: -30 }, { x: 30, duration: 0.6 }, 0)
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.1);
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative bg-stone-warm"
      aria-label="The origin of Eureka"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Greek environment — pure CSS/SVG scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-warm via-stone-light to-navy-deep/30">
          {/* Sun disc */}
          <div
            className="absolute top-[12%] right-[16%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber-gold/30 blur-xl"
            aria-hidden="true"
          />

          {/* Fluted marble columns */}
          <div
            ref={marbleRef}
            className="absolute inset-0 opacity-25"
            aria-hidden="true"
          >
            {[
              { left: "9%", width: "2.2rem", height: "62%" },
              { left: "19%", width: "1.6rem", height: "52%" },
              { right: "14%", width: "2.6rem", height: "67%" },
              { right: "25%", width: "1.8rem", height: "56%" },
            ].map((col, i) => (
              <div
                key={i}
                className="absolute bottom-0 rounded-t-sm bg-gradient-to-t from-stone-light/60 to-transparent"
                style={{
                  left: col.left,
                  right: col.right,
                  width: col.width,
                  height: col.height,
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(23,23,28,0.10) 0 2px, transparent 2px 6px)",
                }}
              />
            ))}
          </div>

          {/* Water basin */}
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] max-w-lg h-32 rounded-[50%] bg-gradient-to-b from-amber-gold/10 to-navy-deep/20 border border-amber-gold/10">
            <div ref={ripple1Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-amber-gold/30" />
            <div ref={ripple2Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-amber-gold/20" />
            <div ref={ripple3Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-amber-gold/15" />
          </div>

          {/* Archimedes — sculptural silhouette seated at the bath's edge */}
          <div
            ref={sculptureRef}
            className="absolute bottom-[18%] right-[16%] w-32 md:w-44 opacity-0"
            aria-hidden="true"
          >
            <svg viewBox="0 0 160 200" className="w-full">
              {/* Seated figure, leaning toward the water in thought */}
              <path
                d="M 96 26 a 15 15 0 1 1 -0.1 0 Z
                   M 84 46 Q 104 52 106 74 L 104 102 Q 118 108 122 126 L 126 154 L 112 158 L 104 132 Q 88 124 76 128 L 52 138 Q 36 142 32 128 Q 30 116 44 110 L 70 102 L 72 76 Q 72 54 84 46 Z"
                fill="rgba(23,23,28,0.42)"
              />
              {/* Marble plinth */}
              <rect x="24" y="158" width="112" height="10" rx="3" fill="rgba(23,23,28,0.28)" />
              <rect x="34" y="168" width="92" height="26" rx="3" fill="rgba(23,23,28,0.18)" />
            </svg>
            {/* Light and mist through which the figure appears */}
            <div className="absolute -inset-6 bg-gradient-to-t from-stone-light/60 via-transparent to-stone-light/30 blur-md" />
          </div>

          {/* Floating fragments drifting at varied parallax */}
          <div className="absolute top-[26%] left-[24%] w-3 h-3 rotate-12 bg-stone-light/70 animate-float" aria-hidden="true" />
          <div className="absolute top-[38%] right-[32%] w-2 h-2 -rotate-6 bg-amber-gold/40 animate-float" style={{ animationDelay: "1.2s" }} aria-hidden="true" />
          <div className="absolute top-[55%] left-[38%] w-2.5 h-2.5 rotate-45 bg-stone-light/50 animate-float" style={{ animationDelay: "2.1s" }} aria-hidden="true" />

          {/* Warm sunlight wash */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-gold/15 to-transparent" />
        </div>

        {/* Copy */}
        <div
          ref={copyRef}
          className={`relative z-10 flex flex-col items-center justify-center h-full px-4 text-center ${reducedMotion ? "" : "opacity-0 translate-y-8"}`}
        >
          {reducedMotion ? (
            <FadeIn>
              <OriginContent locale={locale} />
            </FadeIn>
          ) : (
            <OriginContent locale={locale} />
          )}
        </div>
      </div>

      {!reducedMotion && <div className="h-[150vh]" aria-hidden="true" />}
    </section>
  );
}

function OriginContent({ locale }: { locale: "en" | "zh-Hant" }) {
  const { eurekaOrigin } = campaignData;

  return (
    <>
      <p className="text-[0.68rem] md:text-xs font-medium uppercase tracking-[0.32em] text-charcoal/50 mb-5 md:mb-6">
        The Origin · Ancient Greece
      </p>
      <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-semibold text-charcoal tracking-[-0.02em]">
        {eurekaOrigin.title}
      </h2>
      <p className="mt-6 text-xl md:text-3xl text-charcoal/80 max-w-2xl font-display italic">
        {t(eurekaOrigin.headline, locale)}
      </p>
      <div className="mt-8 space-y-3 max-w-xl">
        {eurekaOrigin.body.map((line, i) => (
          <p key={i} className="text-sm md:text-base text-charcoal/60 leading-relaxed">
            {locale === "zh-Hant" ? line.zh : line.en}
          </p>
        ))}
      </div>
    </>
  );
}
