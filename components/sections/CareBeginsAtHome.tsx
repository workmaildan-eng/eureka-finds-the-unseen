"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function CareBeginsAtHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { careBeginsAtHome } = campaignData;

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !trackRef.current) return;

      const panels = trackRef.current.querySelectorAll(".story-panel");
      if (panels.length === 0) return;

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="care"
      ref={sectionRef}
      className="relative bg-warm-white text-charcoal overflow-hidden"
      aria-label="Cleaning begins at home"
    >
      {/* Header */}
      <div className="px-4 md:px-8 pt-24 md:pt-32 pb-12 max-w-4xl">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {t(careBeginsAtHome.headline, locale)}
          </h2>
          <div className="mt-6 space-y-2">
            {careBeginsAtHome.supporting.map((line, i) => (
              <p key={i} className="text-base md:text-lg text-charcoal/70">
                {locale === "zh-Hant" ? line.zh : line.en}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Story panels */}
      {reducedMotion ? (
        <div className="px-4 md:px-8 pb-24 space-y-8">
          {careBeginsAtHome.stories.map((story) => (
            <StoryCard key={story.id} story={story} locale={locale} />
          ))}
        </div>
      ) : (
        <>
          <div ref={trackRef} className="flex h-[70vh] md:h-[80vh] will-change-transform">
            {careBeginsAtHome.stories.map((story) => (
              <div
                key={story.id}
                className="story-panel flex-shrink-0 w-screen h-full relative"
              >
                <StoryCard story={story} locale={locale} fullScreen />
              </div>
            ))}
          </div>
          <div className="h-[50vh]" aria-hidden="true" />
        </>
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
      <div className={`relative ${fullScreen ? "h-[60%]" : "h-48 md:h-64"}`}>
        <PlaceholderImage
          src={story.image}
          alt={story.imageAlt}
          fill
          className="object-cover"
          label={story.title}
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
