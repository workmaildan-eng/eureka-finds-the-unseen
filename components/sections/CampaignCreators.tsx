"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { revealMobile } from "@/lib/mobileReveal";

registerGSAP();

export function CampaignCreators() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { giveaway } = campaignData;
  const titles = locale === "zh-Hant" ? giveaway.titleLines.zh : giveaway.titleLines.en;
  const stepIcons = [
    { src: "/images/step-follow.png" },
    { src: "/images/step-comment.png" },
    { src: "/images/step-win.png", className: "is-win" },
  ];

  useGSAP(
    () => {
      if (!pinRef.current || !fanRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        if (reducedMotion) return;
        const cards = gsap.utils.toArray<HTMLElement>(".campaign-card", fanRef.current);
        const fan = fanRef.current!;
        const n = cards.length;

        const stackedX = (i: number) => (i - (n - 1) / 2) * 42;
        const stackedRotate = (i: number) => (i - (n - 1) / 2) * 7;
        const stackedY = (i: number) => Math.abs(i - (n - 1) / 2) * 18;

        const spreadX = (i: number) => {
          const cardW = cards[0]?.offsetWidth ?? 237;
          const preferredGap = 56;
          const sidePad = 12;
          const usable = Math.max(0, fan.clientWidth - sidePad * 2);
          const maxGap = n > 1 ? (usable - n * cardW) / (n - 1) : preferredGap;
          const gap = Math.max(40, Math.min(preferredGap, maxGap));
          const total = n * cardW + (n - 1) * gap;
          const start = (fan.clientWidth - total) / 2;
          const left = start + i * (cardW + gap);
          return left + cardW / 2 - fan.clientWidth / 2;
        };

        cards.forEach((card, i) => {
          gsap.set(card, {
            x: stackedX(i),
            y: stackedY(i),
            rotate: stackedRotate(i),
            zIndex: i + 1,
          });
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: fan,
            start: "top center",
            end: "top 16%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              x: () => spreadX(i),
              y: 0,
              rotate: 0,
              duration: 1,
            },
            0
          );
        });

        // Keep the cards spread for the second half of the fan's scroll range.
        tl.to({}, { duration: 1 }, 1);
      });

      mm.add("(max-width: 767px)", () => {
        if (reducedMotion) return;
        revealMobile(".campaign-copy", { stagger: 0, start: "top 88%" });
        revealMobile(".campaign-product", { delay: 0.1, stagger: 0, start: "top 90%" });
        revealMobile(".campaign-card", { stagger: 0.09, y: 20, start: "top 90%" });
        revealMobile(".campaign-rules-title", { stagger: 0, start: "top 88%" });
        revealMobile(".campaign-rules li", { stagger: 0.1, y: 16, start: "top 90%" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="campaign-section"
      aria-label="Find it Clean it Win it"
    >
      <div ref={pinRef} className={`campaign-pin ${reducedMotion ? "is-static" : ""}`}>
        <div className="campaign-hero">
          <div className="campaign-copy">
            <h2>{titles.join(" ")}</h2>
            <p className="campaign-lead">{t(giveaway.supporting, locale)}</p>
            <Button href="#campaign">{t(giveaway.cta, locale)}</Button>
          </div>

          <div className="campaign-product">
            <img
              src={giveaway.productImage}
              alt={giveaway.productAlt}
              draggable={false}
            />
            <div className="giveaway-tag">
              <div className="giveaway-tag-spin" aria-hidden="true" />
              <p className="giveaway-tag-text">
                {giveaway.tag.split(" ").map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <div ref={fanRef} className="campaign-fan">
          {giveaway.youtubers.map((creator) => (
            <article key={creator.id} className="campaign-card">
              <div className="campaign-card-frame">
                <img src={creator.image} alt={creator.name} draggable={false} />
              </div>
              <div className="campaign-card-meta">
                <img src={creator.image} alt="" className="campaign-avatar" draggable={false} />
                <div>
                  <p className="campaign-name">{creator.name}</p>
                  <p className="campaign-handle">{creator.handle}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="campaign-rules">
          <h3 className="campaign-rules-title">{t(giveaway.rulesTitle, locale)}</h3>
          <ol>
            {giveaway.steps.map((step, i) => (
              <li key={i}>
                <span className="campaign-step-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="campaign-step-visual" aria-hidden="true">
                  <img
                    className={`campaign-step-icon${stepIcons[i].className ? ` ${stepIcons[i].className}` : ""}`}
                    src={stepIcons[i].src}
                    alt=""
                    draggable={false}
                  />
                </div>
                <p>{t(step, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
