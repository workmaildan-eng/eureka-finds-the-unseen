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
import { revealMobile } from "@/lib/mobileReveal";

registerGSAP();

const MARQUEE_PX_PER_SEC = 28;
const RESUME_DELAY_MS = 700;

export function DiscoveryWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const reducedMotion = useReducedMotion();
  const { discoveryWall } = campaignData;

  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const set = setRef.current;
      if (!viewport || !track || !set) return;

      const state = {
        x: 0,
        loopWidth: 0,
        dragPaused: false,
        hoverPaused: false,
        resumeTimer: 0,
      };

      const isAutoPaused = () =>
        reducedMotion || state.dragPaused || state.hoverPaused;

      const measure = () => {
        const styles = getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap) || 0;
        state.loopWidth = set.offsetWidth + gap;
      };

      const wrapX = () => {
        if (state.loopWidth <= 0) return;
        state.x = ((state.x % state.loopWidth) + state.loopWidth) % state.loopWidth;
        if (state.x > 0) state.x -= state.loopWidth;
      };

      const render = () => {
        wrapX();
        gsap.set(track, { x: state.x });
      };

      measure();
      render();

      let last = performance.now();
      const tick = () => {
        const now = performance.now();
        const dt = Math.min(now - last, 48);
        last = now;
        if (isAutoPaused() || state.loopWidth <= 0) return;
        state.x -= (MARQUEE_PX_PER_SEC * dt) / 1000;
        render();
      };

      gsap.ticker.add(tick);

      const resizeObserver = new ResizeObserver(() => {
        measure();
        render();
      });
      resizeObserver.observe(set);
      resizeObserver.observe(viewport);

      const drag = {
        pointerId: -1,
        startX: 0,
        startY: 0,
        originX: 0,
        moved: false,
        locked: false as false | "x" | "y",
      };

      const pauseForDrag = () => {
        window.clearTimeout(state.resumeTimer);
        state.dragPaused = true;
      };

      const resumeAfterDrag = () => {
        window.clearTimeout(state.resumeTimer);
        state.resumeTimer = window.setTimeout(() => {
          state.dragPaused = false;
          last = performance.now();
        }, RESUME_DELAY_MS);
      };

      const endDrag = (e: PointerEvent) => {
        if (drag.pointerId !== e.pointerId) return;
        drag.pointerId = -1;
        drag.locked = false;
        viewport.classList.remove("is-dragging");
        if (viewport.hasPointerCapture(e.pointerId)) {
          viewport.releasePointerCapture(e.pointerId);
        }
        resumeAfterDrag();
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        drag.pointerId = e.pointerId;
        drag.startX = e.clientX;
        drag.startY = e.clientY;
        drag.originX = state.x;
        drag.moved = false;
        drag.locked = e.pointerType === "touch" ? false : "x";
        pauseForDrag();
        if (drag.locked === "x") {
          viewport.classList.add("is-dragging");
          viewport.setPointerCapture(e.pointerId);
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
            state.dragPaused = false;
            return;
          }
          drag.locked = "x";
          viewport.classList.add("is-dragging");
          viewport.setPointerCapture(e.pointerId);
        }

        if (drag.locked !== "x") return;
        if (Math.abs(dx) > 4) drag.moved = true;
        e.preventDefault();
        state.x = drag.originX + dx;
        render();
      };

      const onClickCapture = (e: MouseEvent) => {
        if (!drag.moved) return;
        e.preventDefault();
        e.stopPropagation();
        drag.moved = false;
      };

      viewport.addEventListener("pointerdown", onPointerDown);
      viewport.addEventListener("pointermove", onPointerMove);
      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);
      viewport.addEventListener("lostpointercapture", endDrag);
      viewport.addEventListener("click", onClickCapture, true);

      const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
      const onPointerEnter = () => {
        if (!hoverMq.matches) return;
        state.hoverPaused = true;
      };
      const onPointerLeave = () => {
        state.hoverPaused = false;
        last = performance.now();
      };

      if (!reducedMotion) {
        viewport.addEventListener("pointerenter", onPointerEnter);
        viewport.addEventListener("pointerleave", onPointerLeave);
      }

      return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        window.clearTimeout(state.resumeTimer);
        viewport.removeEventListener("pointerdown", onPointerDown);
        viewport.removeEventListener("pointermove", onPointerMove);
        viewport.removeEventListener("pointerup", endDrag);
        viewport.removeEventListener("pointercancel", endDrag);
        viewport.removeEventListener("lostpointercapture", endDrag);
        viewport.removeEventListener("click", onClickCapture, true);
        viewport.removeEventListener("pointerenter", onPointerEnter);
        viewport.removeEventListener("pointerleave", onPointerLeave);
        viewport.classList.remove("is-dragging");
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        revealMobile(viewportRef.current, { y: 16, stagger: 0, start: "top 92%" });
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const cards = discoveryWall.creators;

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

      <div
        ref={viewportRef}
        className="discovery-marquee"
        aria-label="Creator videos. Drag to browse."
      >
        <div ref={trackRef} className="discovery-track">
          <div ref={setRef} className="discovery-set">
            {cards.map((creator) => (
              <div key={creator.id} className="discovery-card">
                <CreatorCard creator={creator} locale={locale} />
              </div>
            ))}
          </div>
          <div className="discovery-set" aria-hidden="true" inert>
            {cards.map((creator) => (
              <div key={`${creator.id}-loop`} className="discovery-card">
                <CreatorCard creator={creator} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </div>
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
    <article className="group rounded-2xl overflow-hidden bg-charcoal/40 border border-warm-white/5 hover:border-eureka-purple/20 transition-colors duration-500">
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
          <div className="w-12 h-12 rounded-full bg-eureka-purple/90 flex items-center justify-center">
            <Play size={20} className="text-warm-white ml-0.5" fill="currentColor" />
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
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-eureka-purple hover:text-eureka-purple/80 transition-colors"
          aria-label={`View ${creator.name}'s discovery on ${creator.platform}`}
        >
          View discovery
          <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}
