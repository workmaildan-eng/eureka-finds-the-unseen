"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function ProductReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { product, campaign } = campaignData;

  useGSAP(
    () => {
      if (reducedMotion || !featuresRef.current) return;

      const features = featuresRef.current.querySelectorAll(".feature-chapter");
      features.forEach((feature) => {
        gsap.from(feature, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative bg-charcoal text-warm-white"
      aria-label="The answer to the unseen"
    >
      {/* Opening: robot cleaning */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <PlaceholderImage
          src={campaignData.assets.productHero}
          alt="Eureka J15 Max Ultra cleaning a dust trail"
          fill
          className="object-cover"
          label="Product Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-12 max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t(product.headline, locale)}
            </h2>
            <p className="mt-2 text-sm text-eureka-purple tracking-wider">
              {campaign.productName}
            </p>
            <p className="mt-4 text-base md:text-lg text-warm-white/70 max-w-2xl">
              {t(product.supporting, locale)}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Feature chapters */}
      <div ref={featuresRef} className="px-4 md:px-8 py-16 md:py-24 space-y-24 md:space-y-32 max-w-6xl mx-auto">
        {product.features.map((feature, index) => (
          <article
            key={feature.id}
            className={`feature-chapter grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
              index % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "md:[direction:ltr]" : ""}>
              <p className="text-xs uppercase tracking-[0.25em] text-eureka-purple mb-3">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-warm-white/60">
                {locale === "zh-Hant"
                  ? feature.chineseSupportingLine
                  : feature.supportingLine}
              </p>
              <p className="mt-4 text-sm md:text-base text-warm-white/70 leading-relaxed">
                {locale === "zh-Hant"
                  ? feature.chineseDescription
                  : feature.description}
              </p>

              {/* Suction power callout for feature 2 */}
              {feature.id === "feature-suction" && (
                <div className="mt-4 inline-block rounded-lg border border-eureka-purple/20 bg-eureka-purple/5 px-4 py-2">
                  <span className="text-2xl font-bold text-eureka-purple">
                    {product.suctionPower}
                  </span>
                  <p className="text-xs text-warm-white/40 mt-1">
                    {product.suctionLegalNote}
                  </p>
                </div>
              )}

              {feature.legalNote && feature.id !== "feature-suction" && (
                <p className="mt-3 text-xs text-warm-white/30 italic">
                  {feature.legalNote}
                </p>
              )}
            </div>

            <div
              className={`relative h-64 md:h-80 rounded-2xl overflow-hidden bg-midnight ${
                index % 2 === 1 ? "md:[direction:ltr]" : ""
              }`}
            >
              <FeatureVisual featureId={feature.id} alt={feature.visualAlt} />
            </div>
          </article>
        ))}
      </div>

      {/* Closing composition */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <PlaceholderImage
          src={campaignData.assets.productHero}
          alt="J15 Max Ultra with base station full product shot"
          fill
          className="object-contain bg-midnight"
          label="Full Product Shot"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      <div className="px-4 md:px-8 pb-24 text-center max-w-3xl mx-auto">
        <FadeIn>
          {product.closingCopy.map((line, i) => (
            <p
              key={i}
              className={`${i === 0 ? "text-xl md:text-2xl font-medium" : "text-base text-warm-white/60 mt-2"}`}
            >
              {locale === "zh-Hant" ? line.zh : line.en}
            </p>
          ))}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={campaign.productUrl} variant="primary">
              {t(campaignData.navigation.discoverLabel, locale)}
            </Button>
            <Button href={campaign.shopUrl} variant="secondary">
              {t(campaignData.navigation.shopLabel, locale)}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FeatureVisual({ featureId, alt }: { featureId: string; alt: string }) {
  const visuals: Record<string, ReactNode> = {
    "feature-reach": (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32 rounded-full border-2 border-charcoal bg-charcoal/80">
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-1 bg-eureka-purple/60 rounded animate-extend-brush" />
          <div className="absolute inset-4 rounded-full border border-eureka-purple/30 animate-pulse-slow" />
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border border-eureka-purple/20 rounded-lg" />
      </div>
    ),
    "feature-suction": (
      <div className="absolute inset-0 flex items-end justify-center pb-8">
        <div className="flex gap-1 items-end h-32">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-eureka-purple/20 to-warm-white/10 rounded-t"
              style={{ height: `${30 + Math.random() * 70}%` }}
            />
          ))}
        </div>
      </div>
    ),
    "feature-vision": (
      <div className="absolute inset-0 bg-navy-deep">
        <div className="absolute inset-8 border border-eureka-purple/20 rounded-lg">
          <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full border border-eureka-purple/40 animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/3 w-12 h-6 rounded border border-eureka-purple/30" />
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <path
              d="M 20% 50% Q 50% 30% 80% 50%"
              fill="none"
              stroke="rgba(212,168,83,0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>
    ),
    "feature-real-life": (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-8 rounded-full bg-stone-warm/30 animate-float" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 border-charcoal bg-charcoal/80">
          <div className="absolute inset-0 rounded-full bg-eureka-purple/5 animate-pulse-slow" />
        </div>
      </div>
    ),
    "feature-self-clean": (
      <div className="absolute inset-0 flex items-end justify-center pb-4">
        <div className="relative w-20 h-28 bg-charcoal/60 rounded-t-lg border border-warm-white/10">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-charcoal bg-charcoal/80 animate-slide-to-dock" />
          <div className="absolute bottom-4 inset-x-2 h-1 bg-eureka-purple/30 rounded animate-pulse-slow" />
        </div>
      </div>
    ),
  };

  return (
    <div role="img" aria-label={alt}>
      {visuals[featureId] || (
        <PlaceholderImage
          src="/images/feature-placeholder.jpg"
          alt={alt}
          fill
          className="object-cover"
          label={alt}
        />
      )}
    </div>
  );
}
