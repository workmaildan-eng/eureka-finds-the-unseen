"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { RobotSVG, SunlitRoom, DustCluster } from "@/components/ui/scenes";

registerGSAP();

export function HeroRobot() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const sensorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(headlineRef.current, { opacity: 0, y: -30, duration: 0.3 }, 0)
        .to(envRef.current, { opacity: 0.15, duration: 0.5 }, 0.1)
        .to(sensorRef.current, { opacity: 1, scale: 1, duration: 0.2 }, 0.15)
        .to(
          robotRef.current,
          { scale: 3.5, y: "-15%", duration: 0.6, ease: "power2.in" },
          0.2
        )
        .to(particlesRef.current, { opacity: 0.9, duration: 0.3 }, 0.3)
        .to(rippleRef.current, { scale: 30, opacity: 1, duration: 0.4 }, 0.65)
        .to(sensorRef.current, { opacity: 0, duration: 0.2 }, 0.7);
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const scrollToOrigin = () => {
    document.getElementById("origin")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-midnight"
      aria-label="Opening scene"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Home environment — pure CSS scene */}
        <div ref={envRef} className="absolute inset-0">
          <SunlitRoom mood="day" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/25 via-transparent to-midnight/50" />
        </div>

        {/* Floating dust in the sunlight */}
        <div
          ref={particlesRef}
          className="absolute inset-0 opacity-40 pointer-events-none"
          aria-hidden="true"
        >
          <DustCluster seed={7} count={22} className="absolute inset-x-[35%] top-[8%] h-[45%]" />
        </div>

        {/* Robot — pure SVG */}
        <div
          ref={robotRef}
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-10 will-change-transform"
        >
          <div className="relative w-44 h-44 md:w-60 md:h-60">
            <RobotSVG className="w-full h-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]" />
            {/* Sensor light ring */}
            <div
              ref={sensorRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-amber-gold/60 opacity-0 scale-50"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-full bg-amber-gold/10 animate-pulse-slow" />
              <div className="absolute inset-2 rounded-full border border-amber-gold/30" />
            </div>
          </div>
        </div>

        {/* Water ripple transition */}
        <div
          ref={rippleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-amber-gold/40 opacity-0 scale-0 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-amber-gold/5" />
        </div>

        {/* Headline */}
        <div
          ref={headlineRef}
          className="absolute inset-x-0 top-24 md:top-28 z-20 px-4 text-center"
        >
          <p className="eyebrow mb-5 md:mb-6">
            A Discovery Journey · World Cleanup Day 09.20
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-warm-white tracking-[-0.02em] leading-[1.02] display-glow">
            {t(campaignData.hero.headline, locale)}
          </h1>
          <p className="mt-5 md:mt-7 text-base md:text-xl text-warm-white/70 max-w-xl mx-auto font-light leading-relaxed">
            {t(campaignData.hero.supporting, locale)}
          </p>
          <div className="mt-8 md:mt-10">
            <Button onClick={scrollToOrigin} variant="outline">
              {t(campaignData.hero.cta, locale)}
            </Button>
          </div>
        </div>

        {/* Scroll cue */}
        {!reducedMotion && (
          <div
            className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-3 text-warm-white/40"
            aria-hidden="true"
          >
            <span className="text-[0.6rem] uppercase tracking-[0.3em]">
              Scroll to discover
            </span>
            <span className="h-8 w-px bg-gradient-to-b from-warm-white/50 to-transparent" />
          </div>
        )}

        {/* Reduced motion fallback */}
        {reducedMotion && (
          <div className="absolute bottom-8 inset-x-0 text-center z-20">
            <Button onClick={scrollToOrigin} variant="outline">
              {t(campaignData.hero.cta, locale)}
            </Button>
          </div>
        )}
      </div>

      {/* Scroll spacer for pinned animation */}
      {!reducedMotion && <div className="h-[200vh]" aria-hidden="true" />}
    </section>
  );
}
