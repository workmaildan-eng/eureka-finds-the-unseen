"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

registerGSAP();

export function CampaignTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { timeline } = campaignData;

  useGSAP(
    () => {
      if (reducedMotion || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      if (trackRef.current) {
        gsap.to(trackRef.current, {
          x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 64),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "bottom 10%",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative bg-warm-white text-charcoal py-24 md:py-32 overflow-hidden"
      aria-label="Campaign timeline"
    >
      <div className="px-4 md:px-8 mb-12 md:mb-16">
        <FadeIn>
          <SectionHeading
            title={timeline.title}
            titleClassName="!text-charcoal"
            subtitleClassName="!text-charcoal/60"
          />
        </FadeIn>
      </div>

      {reducedMotion ? (
        <div className="px-4 md:px-8 space-y-8 max-w-2xl mx-auto">
          {timeline.items.map((item) => (
            <TimelineCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      ) : (
        <>
          {/* Illuminated progress line */}
          <div className="relative mx-4 md:mx-8 mb-8 h-px bg-charcoal/10">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-r from-amber-gold/30 via-amber-gold to-amber-gold origin-left"
              aria-hidden="true"
            />
          </div>

          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-8 px-4 md:px-8 will-change-transform pb-8">
              {timeline.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 ${item.isHighlight ? "w-[400px] md:w-[480px]" : "w-[320px] md:w-[360px]"}`}
                >
                  <TimelineCard item={item} locale={locale} highlight={item.isHighlight} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function TimelineCard({
  item,
  locale,
  highlight = false,
}: {
  item: (typeof campaignData.timeline.items)[number];
  locale: "en" | "zh-Hant";
  highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl overflow-hidden border ${
        highlight
          ? "border-amber-gold/40 bg-amber-gold/5 shadow-lg shadow-amber-gold/10"
          : "border-charcoal/10 bg-charcoal/5"
      }`}
    >
      <div className={`relative ${highlight ? "h-48" : "h-36"} overflow-hidden`}>
        <PlaceholderImage
          src={item.thumbnail}
          alt={`Timeline milestone ${item.date}`}
          fill
          className="object-cover"
          label={`Timeline ${item.date}`}
        />
        {highlight && (
          <div className="absolute top-3 right-3 bg-amber-gold text-midnight text-xs font-bold px-2 py-1 rounded-full">
            World Cleanup Day
          </div>
        )}
      </div>

      <div className="p-5">
        <time
          className={`text-sm font-bold ${highlight ? "text-amber-gold" : "text-charcoal/60"}`}
          dateTime={`2026-${item.date.replace("/", "-").split("–")[0]}`}
        >
          {item.date}
        </time>
        <h3 className={`mt-1 font-bold ${highlight ? "text-xl" : "text-lg"}`}>
          {item.title}
        </h3>
        <ul className="mt-3 space-y-1.5">
          {(locale === "zh-Hant" ? item.chineseContent : item.content).map(
            (line, i) => (
              <li key={i} className="text-sm text-charcoal/60 leading-relaxed flex items-start gap-2">
                <span className="text-amber-gold mt-1.5 flex-shrink-0">●</span>
                {line}
              </li>
            )
          )}
        </ul>
      </div>
    </article>
  );
}
