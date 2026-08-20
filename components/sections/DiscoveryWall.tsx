"use client";

import { useRef } from "react";
import { ExternalLink, Play } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function DiscoveryWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { discoveryWall } = campaignData;

  useGSAP(
    () => {
      if (reducedMotion || !trackRef.current) return;

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 64),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="creators"
      ref={sectionRef}
      className="relative bg-midnight py-24 md:py-32 overflow-hidden"
      aria-label="Creator discovery wall"
    >
      <div className="px-4 md:px-8 mb-12 md:mb-16">
        <FadeIn>
          <SectionHeading
            title={discoveryWall.title}
            subtitle={discoveryWall.supporting}
          />
        </FadeIn>
      </div>

      {reducedMotion ? (
        <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoveryWall.creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-6 px-4 md:px-8 will-change-transform">
            {discoveryWall.creators.map((creator) => (
              <div key={creator.id} className="flex-shrink-0 w-[320px] md:w-[380px]">
                <CreatorCard creator={creator} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function CreatorCard({
  creator,
  locale,
}: {
  creator: (typeof campaignData.discoveryWall.creators)[number];
  locale: "en" | "zh-Hant";
}) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-charcoal/40 border border-warm-white/5 hover:border-amber-gold/20 transition-colors duration-500">
      <div className="relative h-48 overflow-hidden">
        <PlaceholderImage
          src={creator.thumbnail}
          alt={`${creator.name} video thumbnail`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          label="Creator Video"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-amber-gold/90 flex items-center justify-center">
            <Play size={20} className="text-midnight ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-charcoal flex-shrink-0">
            <PlaceholderImage
              src={creator.avatar}
              alt={`${creator.name} avatar`}
              fill
              className="object-cover"
              label="Avatar"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-warm-white">{creator.name}</p>
            <p className="text-xs text-warm-white/50">
              {creator.role} · {creator.platform}
            </p>
          </div>
        </div>

        <blockquote className="text-sm text-warm-white/70 leading-relaxed italic">
          &ldquo;{locale === "zh-Hant" ? creator.chineseQuote : creator.quote}&rdquo;
        </blockquote>

        <a
          href={creator.url}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-gold hover:text-amber-gold/80 transition-colors"
          aria-label={`View ${creator.name}'s discovery on ${creator.platform}`}
        >
          View discovery
          <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}
