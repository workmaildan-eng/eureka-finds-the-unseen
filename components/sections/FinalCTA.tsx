"use client";

import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { RoomScene } from "@/components/visuals/RoomScene";
import { DockScene } from "@/components/visuals/DockScene";
import { DustCluster } from "@/components/ui/scenes";
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
      {/* Warm dusk home, robot resting at its dock */}
      <div className="relative flex-1 min-h-[100svh] overflow-hidden">
        <RoomScene mood="dusk" detectionOpacity={0} />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-midnight/30" />

        {/* Dust transformed into ambient amber light */}
        <DustCluster seed={31} count={20} glow className="absolute inset-0 opacity-70" />

        {/* Product at rest beside its base station */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-64 md:w-80 opacity-95">
          <div className="absolute inset-x-[16%] bottom-[10%] h-[55%] rounded-full bg-amber-gold/10 blur-2xl" aria-hidden="true" />
          <DockScene variant="hero" className="relative w-full drop-shadow-[0_30px_44px_rgba(0,0,0,0.55)]" />
        </div>

        {/* Copy overlay */}
        <div className="absolute inset-x-0 top-24 md:top-32 px-4 text-center z-10">
          <FadeIn>
            <p className="eyebrow mb-5">{campaign.hashtag}</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-warm-white tracking-[-0.02em] display-glow">
              {t(finalCta.headline, locale)}
            </h2>
            <div className="mt-6 space-y-2 max-w-xl mx-auto">
              {finalCta.supporting.map((line, i) => (
                <p key={i} className="text-base md:text-lg text-warm-white/70 font-light">
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
