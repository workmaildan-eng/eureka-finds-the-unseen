"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { StoryArt } from "@/components/ui/scenes";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function CareBeginsAtHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { careBeginsAtHome } = campaignData;

  useGSAP(
    () => {
      if (reducedMotion || !pinRef.current || !trackRef.current) return;

      // Horizontal story scroll on desktop only; mobile stacks vertically.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () =>
          trackRef.current!.scrollWidth - window.innerWidth;

        gsap.to(trackRef.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const stacked = reducedMotion;

  return (
    <section
      id="care"
      ref={sectionRef}
      className="relative bg-warm-white text-charcoal overflow-hidden"
      aria-label="Cleaning begins at home"
    >
      {stacked ? (
        <>
          <CareHeader locale={locale} />
          <div className="px-4 md:px-8 pb-24 space-y-8">
            {careBeginsAtHome.stories.map((story) => (
              <StoryCard key={story.id} story={story} locale={locale} />
            ))}
          </div>
        </>
      ) : (
        /* Header + track live inside one viewport-height pinned block so the
           panels are always visible while the horizontal scroll plays. */
        <div ref={pinRef} className="md:h-screen md:flex md:flex-col">
          <CareHeader locale={locale} compact />
          <div
            ref={trackRef}
            className="flex flex-col gap-8 px-4 pb-10 md:flex-row md:gap-0 md:px-0 md:pb-0 md:flex-1 md:min-h-0 will-change-transform"
          >
            {careBeginsAtHome.stories.map((story) => (
              <div
                key={story.id}
                className="story-panel flex-shrink-0 w-full h-[58vh] md:w-screen md:h-full relative"
              >
                <StoryCard story={story} locale={locale} fullScreen />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transition: dust trail hint */}
      <div className="px-4 md:px-8 pb-16 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-3 text-sm text-charcoal/50">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-gold/40 to-transparent" />
            <span className="tracking-widest uppercase text-xs">
              {locale === "zh-Hant" ? "發現的時刻" : "The moment of discovery"}
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-gold/40 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CareHeader({
  locale,
  compact = false,
}: {
  locale: "en" | "zh-Hant";
  compact?: boolean;
}) {
  const { careBeginsAtHome } = campaignData;
  return (
    <div
      className={`px-4 md:px-8 max-w-4xl ${
        compact ? "pt-24 md:pt-24 pb-8 md:pb-6" : "pt-24 md:pt-32 pb-12"
      }`}
    >
      <FadeIn>
        <p className="eyebrow !text-amber-gold mb-4">The Heart of the Campaign</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.015em] leading-tight">
          {t(careBeginsAtHome.headline, locale)}
        </h2>
        <div className="mt-4 space-y-1.5">
          {careBeginsAtHome.supporting.map((line, i) => (
            <p key={i} className="text-sm md:text-base text-charcoal/70">
              {locale === "zh-Hant" ? line.zh : line.en}
            </p>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

function StoryCard({
  story,
  locale,
  fullScreen = false,
}: {
  story: (typeof campaignData.careBeginsAtHome.stories)[number];
  locale: "en" | "zh-Hant";
  fullScreen?: boolean;
}) {
  return (
    <div
      className={`relative ${fullScreen ? "h-full" : "rounded-2xl overflow-hidden"} bg-charcoal/5`}
    >
      <div
        className={`relative ${fullScreen ? "h-[60%]" : "h-48 md:h-64"}`}
        role="img"
        aria-label={story.imageAlt}
      >
        <StoryArt
          variant={story.id === "story-01" ? "home" : story.id === "story-02" ? "hand" : "share"}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>
      <div className={`${fullScreen ? "absolute bottom-0 inset-x-0 p-8 md:p-12" : "p-6"}`}>
        <p className="text-xs uppercase tracking-[0.2em] text-amber-gold mb-2">
          {locale === "zh-Hant" ? story.chineseTitle : story.title}
        </p>
        <p className={`font-medium leading-relaxed ${fullScreen ? "text-xl md:text-2xl text-warm-white" : "text-base text-charcoal"}`}>
          {locale === "zh-Hant" ? story.chineseCopy : story.copy}
        </p>
      </div>
    </div>
  );
}
