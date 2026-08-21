"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { revealMobile } from "@/lib/mobileReveal";

registerGSAP();

export function CareBeginsAtHome() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { careBeginsAtHome } = campaignData;

  useGSAP(
    () => {
      if (!pinRef.current || !filmRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        if (reducedMotion) return;
        const film = filmRef.current!;
        const track = trackRef.current!;
        const html = document.documentElement;

        const getDistance = () => Math.max(0, track.scrollWidth - film.clientWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const st = tween.scrollTrigger;
        if (!st) return;

        const drag = {
          pointerId: -1,
          startX: 0,
          startY: 0,
          startScroll: 0,
          locked: false as false | "x" | "y",
        };

        const scrubTo = (scroll: number) => {
          const next = gsap.utils.clamp(st.start, st.end, scroll);
          html.style.scrollBehavior = "auto";
          st.scroll(next);
          st.getTween()?.progress(1);
        };

        const endDrag = (e: PointerEvent) => {
          if (drag.pointerId !== e.pointerId) return;
          drag.pointerId = -1;
          drag.locked = false;
          film.classList.remove("is-dragging");
          html.style.scrollBehavior = "";
          if (film.hasPointerCapture(e.pointerId)) {
            film.releasePointerCapture(e.pointerId);
          }
        };

        const onPointerDown = (e: PointerEvent) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          if (!st.isActive) return;
          drag.pointerId = e.pointerId;
          drag.startX = e.clientX;
          drag.startY = e.clientY;
          drag.startScroll = st.scroll();
          drag.locked = e.pointerType === "touch" ? false : "x";
          if (drag.locked === "x") {
            film.classList.add("is-dragging");
            film.setPointerCapture(e.pointerId);
          }
        };

        const onPointerMove = (e: PointerEvent) => {
          if (drag.pointerId !== e.pointerId) return;
          const dx = e.clientX - drag.startX;
          const dy = e.clientY - drag.startY;

          if (!drag.locked) {
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
            if (Math.abs(dy) > Math.abs(dx)) {
              drag.pointerId = -1;
              return;
            }
            drag.locked = "x";
            film.classList.add("is-dragging");
            film.setPointerCapture(e.pointerId);
          }

          if (drag.locked !== "x") return;
          e.preventDefault();
          scrubTo(drag.startScroll - dx);
        };

        film.addEventListener("pointerdown", onPointerDown);
        film.addEventListener("pointermove", onPointerMove);
        film.addEventListener("pointerup", endDrag);
        film.addEventListener("pointercancel", endDrag);
        film.addEventListener("lostpointercapture", endDrag);

        return () => {
          film.removeEventListener("pointerdown", onPointerDown);
          film.removeEventListener("pointermove", onPointerMove);
          film.removeEventListener("pointerup", endDrag);
          film.removeEventListener("pointercancel", endDrag);
          film.removeEventListener("lostpointercapture", endDrag);
          film.classList.remove("is-dragging");
          html.style.scrollBehavior = "";
        };
      });

      mm.add("(max-width: 767px)", () => {
        if (reducedMotion) return;
        revealMobile(".care-copy", { stagger: 0, start: "top 88%" });
        revealMobile(".care-slide", { stagger: 0.1, y: 22, start: "top 90%" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const slides = careBeginsAtHome.stories;

  return (
    <section
      id="care"
      ref={sectionRef}
      className="care-section"
      aria-label="Cleaning begins at home"
    >
      <div ref={pinRef} className={`care-pin ${reducedMotion ? "is-static" : ""}`}>
        <div className="care-copy">
          <h2>
            {t(careBeginsAtHome.headline, locale)
              .split("\n")
              .map((line) => (
                <span key={line}>{line}</span>
              ))}
          </h2>
        </div>

        <div ref={filmRef} className="care-film">
          <div ref={trackRef} className="care-track">
            {slides.map((story) => (
              <article key={story.id} className="care-slide">
                <div className="care-slide-frame">
                  <img src={story.image} alt={story.imageAlt} draggable={false} />
                </div>
                <h3>{locale === "zh-Hant" ? story.chineseTitle : story.title}</h3>
                <p>{locale === "zh-Hant" ? story.chineseCopy : story.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
