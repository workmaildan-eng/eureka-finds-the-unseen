"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

registerGSAP();

/*
 * Shared scroll behaviour for product chapters:
 *  - desktop: pinned, scrubbed timeline (cinematic scroll chapter)
 *  - mobile:  the same tweens play once, time-based, when the chapter enters
 *  - reduced motion: no timeline; JSX should render the finished state
 *
 * The copy stagger is prepended automatically for every chapter.
 */
export function useChapterScroll(
  rootRef: RefObject<HTMLDivElement | null>,
  build: (tl: gsap.core.Timeline) => void,
  pinLength = "+=170%"
) {
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !rootRef.current) return;

      const mm = gsap.matchMedia();

      const withCopy = (tl: gsap.core.Timeline) => {
        tl.fromTo(
          ".ch-copy-item",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.14, stagger: 0.035, ease: "power2.out" },
          0
        );
        build(tl);
      };

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: pinLength,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        withCopy(tl);
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
        // Stretch the unit-length tweens into a comfortable real-time intro
        tl.timeScale(0.3);
        withCopy(tl);
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] }
  );

  return reducedMotion;
}
