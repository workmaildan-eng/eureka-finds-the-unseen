"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { HeroKv } from "@/components/sections/HeroKv";
import { revealMobile } from "@/lib/mobileReveal";

registerGSAP();

export function HeroRobot() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const kvRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);
  const originInnerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (reducedMotion) return;
        const cards = gsap.utils.toArray<HTMLElement>(".unseen-card", rightRef.current);
        const sideWidth = () => window.innerWidth * 0.28;

        gsap.set(originInnerRef.current, { opacity: 0, y: 56, x: 0, xPercent: 0 });
        cards.forEach((card) => {
          gsap.set(card, { opacity: 0, xPercent: 110 });
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=165%",
            pin: pinRef.current,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Narrow the middle column. 75% of this motion finishes before sides start.
        tl.to(copyRef.current, { opacity: 0, duration: 0.3 }, 0).to(
          kvRef.current,
          { width: "44%", height: "70%", duration: 1 },
          0
        );

        // Open side column slots first so the enter motions are visible.
        tl.to(
          [leftRef.current, rightRef.current],
          { width: sideWidth, duration: 0.2 },
          0.75
        );

        // Left: fade up only, after the column slot is fully open.
        tl.to(
          originInnerRef.current,
          { opacity: 1, y: 0, duration: 0.55 },
          0.95
        );

        // Right: stair stack from the right, starting at top 30%.
        cards.forEach((card, i) => {
          tl.to(
            card,
            { opacity: 1, xPercent: 0, duration: 0.45 },
            0.82 + i * 0.12
          );
        });

        return () => {
          gsap.set(
            [kvRef.current, leftRef.current, rightRef.current, originInnerRef.current, stageRef.current],
            { clearProps: "all" }
          );
          gsap.set(cards, { clearProps: "all" });
        };
      });

      mm.add("(max-width: 767px)", () => {
        if (reducedMotion) return;
        revealMobile(kvRef.current, { y: 0, start: "top 99%", duration: 0.8, stagger: 0 });
        revealMobile(copyRef.current, { delay: 0.18, y: 16, start: "top 99%", stagger: 0 });
        revealMobile(originInnerRef.current, { start: "top 86%", stagger: 0 });
        revealMobile(".unseen-card", { stagger: 0.1, y: 22, start: "top 88%" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const openCampaign = () => {
    document.getElementById("campaign")?.scrollIntoView({ behavior: "smooth" });
  };

  const cards = campaignData.unseenHome.cards;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-20 bg-[#f8f6f2]"
      aria-label="Opening scene"
    >
      <div ref={pinRef} className={`hero-story-pin ${reducedMotion ? "is-static" : ""}`}>
        <div ref={stageRef} className="hero-story-stage">
          <div className="hero-story-grid">
            <aside id="origin" ref={leftRef} className="hero-story-side">
              <div ref={originInnerRef} className="hero-story-side-inner origin-col">
                <p className="eyebrow mb-4">The Origin</p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal tracking-[-0.03em]">
                  {campaignData.eurekaOrigin.title}
                </h2>
                <p className="mt-4 font-sans text-base md:text-lg text-charcoal/80 leading-snug">
                  {t(campaignData.eurekaOrigin.headline, locale)}
                </p>
                <div className="mt-5 space-y-3">
                  {campaignData.eurekaOrigin.body.map((line, i) => (
                    <p key={i} className="text-sm text-charcoal/55 leading-relaxed">
                      {locale === "zh-Hant" ? line.zh : line.en}
                    </p>
                  ))}
                </div>
              </div>
            </aside>

            <div ref={kvRef} className="hero-story-kv">
              <HeroKv />

              <div
                ref={copyRef}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-16 md:pb-14 pt-10 text-center"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-midnight/80 via-midnight/35 to-transparent -z-10"
                  aria-hidden="true"
                />
                <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-semibold text-warm-white tracking-[-0.02em] leading-[1.05] display-glow">
                  {t(campaignData.hero.headline, locale)}
                </h1>
                <p className="mt-4 md:mt-5 text-base md:text-lg text-warm-white/75 max-w-xl mx-auto font-light leading-relaxed">
                  {t(campaignData.hero.supporting, locale)}
                </p>
                <div className="mt-7 pointer-events-auto cursor-auto">
                  <Button onClick={openCampaign} variant="primary">
                    {t(campaignData.hero.cta, locale)}
                  </Button>
                </div>
                {!reducedMotion && (
                  <div
                    className="mt-8 flex flex-col items-center gap-3 text-warm-white/40"
                    aria-hidden="true"
                  >
                    <span className="text-[0.6rem] uppercase tracking-[0.3em]">
                      {t(campaignData.hero.scrollCue, locale)}
                    </span>
                    <span className="h-8 w-px bg-gradient-to-b from-warm-white/50 to-transparent" />
                  </div>
                )}
              </div>
            </div>

            <aside id="unseen" ref={rightRef} className="hero-story-side">
              <div className="hero-story-side-inner">
                <div className="unseen-col">
                  {cards.map((card) => (
                    <article key={card.id} className="unseen-card">
                      <img src={card.image} alt={card.imageAlt} draggable={false} />
                      <div className="unseen-card-copy">
                        <p>{locale === "zh-Hant" ? card.title.zh : card.title.en}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      {/* Gap after the pinned 100dvh stage — not inside the pin, so KV stays viewport-bottom. */}
      <div className="hero-story-gap" aria-hidden="true" />
    </section>
  );
}
