"use client";

import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { DockScene } from "@/components/visuals/DockScene";
import { DustCluster } from "@/components/ui/scenes";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

/* Closing composition: rim-lit product + base station, philosophy copy, CTAs. */
export function ProductClosing() {
  const { locale } = useLocale();
  const { product, campaign } = campaignData;

  const scrollToJoin = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight py-24 px-5">
      {/* Amber rim-light stage */}
      <div
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[130vmin] h-[130vmin] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(216,171,85,0.14) 0%, rgba(216,171,85,0.05) 34%, transparent 62%)",
        }}
        aria-hidden="true"
      />
      <DustCluster seed={23} count={18} glow className="absolute inset-0" />

      <FadeIn className="relative z-10 flex flex-col items-center">
        <div className="relative w-[78vw] max-w-md md:max-w-lg">
          {/* Rim light behind the silhouette */}
          <div className="absolute inset-x-[10%] bottom-[8%] h-[70%] rounded-full bg-amber-gold/10 blur-3xl" aria-hidden="true" />
          <DockScene variant="hero" className="relative w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
        </div>

        <div className="mt-10 md:mt-14 text-center max-w-2xl">
          <p className="font-display text-2xl md:text-4xl text-warm-white font-semibold tracking-[-0.015em]">
            {locale === "zh-Hant" ? product.closingCopy[0].zh : product.closingCopy[0].en}
          </p>
          <p className="mt-3 text-sm tracking-[0.25em] uppercase text-amber-gold/80">
            {campaign.productName}
          </p>
          <p className="mt-4 text-base md:text-lg text-warm-white/60 font-light">
            {locale === "zh-Hant" ? product.closingCopy[1].zh : product.closingCopy[1].en}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={campaign.productUrl} variant="primary">
              {t(campaignData.navigation.discoverLabel, locale)}
            </Button>
            <Button onClick={scrollToJoin} variant="secondary">
              {t(product.findUnseenCta, locale)}
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
