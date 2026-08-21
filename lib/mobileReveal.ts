import { gsap } from "@/lib/gsap";

type RevealOpts = {
  delay?: number;
  stagger?: number;
  y?: number;
  start?: string;
  duration?: number;
};

/** Mobile-only entrance: fade + slight rise as each target enters the viewport. */
export function revealMobile(
  targets: gsap.TweenTarget,
  { delay = 0, stagger = 0.08, y = 18, start = "top 88%", duration = 0.62 }: RevealOpts = {}
) {
  const els = gsap.utils.toArray<HTMLElement>(targets).filter(Boolean);
  els.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay: delay + i * stagger,
        ease: "power2.out",
        immediateRender: true,
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      }
    );
  });
}
