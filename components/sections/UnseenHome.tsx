"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function UnseenHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: pinRef.current,
          scrub: 1,
        },
      });

      tl.to(scanRef.current, { left: "100%", duration: 0.4 }, 0.1)
        .to(overlayRef.current, { opacity: 1, duration: 0.5 }, 0.2)
        .to(headlineRef.current, { opacity: 0.3, duration: 0.3 }, 0.5);
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const hotspots = campaignData.unseenHome.hotspots;

  return (
    <section
      id="unseen"
      ref={sectionRef}
      className="relative bg-midnight"
      aria-label="Can you see the unseen?"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Normal home view */}
        <div className="absolute inset-0">
          <PlaceholderImage
            src={campaignData.assets.homeLiving}
            alt="Premium modern living room"
            fill
            className="object-cover"
            label="Modern Living Room"
          />
        </div>

        {/* Detection overlay */}
        <div
          ref={overlayRef}
          className={`absolute inset-0 bg-navy-deep/70 mix-blend-multiply ${reducedMotion ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        />

        {/* Scanning beam */}
        {!reducedMotion && (
          <div
            ref={scanRef}
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-gold/60 to-transparent left-0 z-10"
            aria-hidden="true"
          />
        )}

        {/* Hotspots */}
        {hotspots.map((spot, index) => {
          const isActive = activeHotspot === spot.id || reducedMotion;
          const revealProgress = reducedMotion ? true : index < 3;

          return (
            <button
              key={spot.id}
              className={`absolute z-20 transition-all duration-500 group ${
                isActive || revealProgress ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
              onFocus={() => setActiveHotspot(spot.id)}
              onBlur={() => setActiveHotspot(null)}
              aria-label={locale === "zh-Hant" ? spot.chineseLabel : spot.label}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-amber-gold animate-pulse-slow" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-amber-gold/30 animate-ping" />
                {(isActive || revealProgress) && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-midnight/90 backdrop-blur-sm border border-amber-gold/20 rounded-lg px-3 py-1.5 text-xs text-amber-gold">
                    {locale === "zh-Hant" ? spot.chineseLabel : spot.label}
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {/* Headline */}
        <div
          ref={headlineRef}
          className="absolute inset-x-0 top-24 md:top-32 z-30 px-4 text-center"
        >
          {reducedMotion ? (
            <FadeIn>
              <UnseenHeadline locale={locale} />
            </FadeIn>
          ) : (
            <UnseenHeadline locale={locale} />
          )}
        </div>
      </div>

      {!reducedMotion && <div className="h-[180vh]" aria-hidden="true" />}

      {/* Static fallback content for accessibility */}
      {reducedMotion && (
        <div className="px-4 py-16 max-w-3xl mx-auto">
          <ul className="space-y-3 text-warm-white/70 text-sm">
            {hotspots.map((spot) => (
              <li key={spot.id} className="flex items-start gap-2">
                <span className="text-amber-gold mt-1">●</span>
                {locale === "zh-Hant" ? spot.chineseLabel : spot.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function UnseenHeadline({ locale }: { locale: "en" | "zh-Hant" }) {
  const { unseenHome } = campaignData;
  return (
    <>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-warm-white tracking-tight">
        {t(unseenHome.headline, locale)}
      </h2>
      <div className="mt-4 space-y-1">
        {unseenHome.supporting.map((line, i) => (
          <p key={i} className="text-sm md:text-base text-warm-white/60">
            {locale === "zh-Hant" ? line.zh : line.en}
          </p>
        ))}
      </div>
    </>
  );
}
