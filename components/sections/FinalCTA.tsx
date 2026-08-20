"use client";

import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function FinalCTA() {
  const { locale } = useLocale();
  const { finalCta, campaign } = campaignData;

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col"
      aria-label="Final call to action"
    >
      {/* Warm home scene */}
      <div className="relative flex-1 min-h-[70vh] overflow-hidden">
        <PlaceholderImage
          src={campaignData.assets.heroPoster}
          alt="Warm spotless home at end of day with J15 Max Ultra resting beside base station"
          fill
          className="object-cover"
          label="Final Home Scene"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />

        {/* Amber light atmosphere */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-amber-gold/30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${5 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Product resting */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 opacity-80">
          <PlaceholderImage
            src={campaignData.assets.heroRobot}
            alt="J15 Max Ultra resting beside base station"
            fill
            className="object-contain"
            label="Robot at Rest"
          />
        </div>

        {/* Copy overlay */}
        <div className="absolute inset-x-0 top-24 md:top-32 px-4 text-center z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-warm-white tracking-tight">
              {t(finalCta.headline, locale)}
            </h2>
            <div className="mt-6 space-y-2 max-w-xl mx-auto">
              {finalCta.supporting.map((line, i) => (
                <p key={i} className="text-base md:text-lg text-warm-white/70">
                  {locale === "zh-Hant" ? line.zh : line.en}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={`#${campaignData.sections[7].id}`} variant="primary">
                {t(finalCta.primaryCta, locale)}
              </Button>
              <Button href={campaign.productUrl} variant="secondary">
                {t(finalCta.secondaryCta, locale)}
              </Button>
              <Button href={campaign.shopUrl} variant="outline">
                {t(finalCta.tertiaryCta, locale)}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
