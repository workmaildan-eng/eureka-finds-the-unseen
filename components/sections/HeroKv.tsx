"use client";

import { useEffect, useRef } from "react";
import { campaignData } from "@/data/campaign";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const IMG_W = 1536;
const IMG_H = 1024;
const FINE_HOVER = "(hover: hover) and (pointer: fine)";
const MAX_PARTICLES = 240;

const DUST_ZONES = [
  { cx: 0.78, cy: 0.64, rx: 0.28, ry: 0.16 },
  { cx: 0.84, cy: 0.44, rx: 0.2, ry: 0.16 },
  { cx: 0.68, cy: 0.56, rx: 0.16, ry: 0.1 },
  { cx: 0.22, cy: 0.52, rx: 0.12, ry: 0.14 },
  { cx: 0.08, cy: 0.72, rx: 0.14, ry: 0.16 },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  wob: number;
  shade: number;
  blob: boolean;
};

// Muted dust palette: pale grey, dusty brown, darker grime. No accent colors.
const DUST_SHADES = ["203, 198, 190", "172, 156, 136", "134, 124, 110"];

function coverMapping(boxW: number, boxH: number) {
  const scale = Math.max(boxW / IMG_W, boxH / IMG_H);
  const dw = IMG_W * scale;
  const dh = IMG_H * scale;
  return { dw, dh, ox: (boxW - dw) / 2, oy: (boxH - dh) / 2 };
}

function dustIntensity(sx: number, sy: number, boxW: number, boxH: number) {
  const { dw, dh, ox, oy } = coverMapping(boxW, boxH);
  const nx = (sx - ox) / dw;
  const ny = (sy - oy) / dh;
  let best = 0;
  for (const z of DUST_ZONES) {
    const dx = (nx - z.cx) / z.rx;
    const dy = (ny - z.cy) / z.ry;
    const d = dx * dx + dy * dy;
    if (d <= 1) best = Math.max(best, 1 - Math.sqrt(d));
  }
  return best;
}

function spawnParticle(cx: number, cy: number, radius: number, heavy: boolean): Particle {
  const ang = Math.random() * Math.PI * 2;
  const dist = Math.sqrt(Math.random()) * radius * (heavy ? 0.82 : 0.6);
  // Occasional translucent blobs read as bacteria/germ specks; the rest are dust motes.
  const blob = heavy && Math.random() < 0.1;
  const size = blob
    ? 2.5 + Math.random() * 2
    : Math.random() < 0.82
      ? 0.8 + Math.random() * 1.2
      : 2 + Math.random() * 1.5;
  return {
    x: cx + Math.cos(ang) * dist,
    y: cy + Math.sin(ang) * dist,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.14 - 0.03,
    size,
    alpha: blob
      ? 0.32 + Math.random() * 0.28
      : heavy
        ? 0.4 + Math.random() * 0.3
        : 0.28 + Math.random() * 0.22,
    life: 0,
    maxLife: blob ? 150 + Math.random() * 110 : 90 + Math.random() * 110,
    wob: Math.random() * Math.PI * 2,
    shade: Math.random(),
    blob,
  };
}

function hasFineHover() {
  return window.matchMedia(FINE_HOVER).matches;
}

const ROAM_SPEED = 26;

function roamPad(boxW: number, boxH: number) {
  return Math.min(Math.max(72, Math.min(boxW, boxH) * 0.22), 176);
}

function clampRoam(
  roam: { x: number; y: number; vx: number; vy: number },
  boxW: number,
  boxH: number
) {
  const pad = Math.min(roamPad(boxW, boxH), boxW / 2 - 1, boxH / 2 - 1);
  const minX = Math.max(0, pad);
  const maxX = Math.max(minX, boxW - pad);
  const minY = Math.max(0, pad);
  const maxY = Math.max(minY, boxH - pad);

  if (roam.x < minX) {
    roam.x = minX;
    roam.vx = Math.abs(roam.vx);
  } else if (roam.x > maxX) {
    roam.x = maxX;
    roam.vx = -Math.abs(roam.vx);
  }

  if (roam.y < minY) {
    roam.y = minY;
    roam.vy = Math.abs(roam.vy);
  } else if (roam.y > maxY) {
    roam.y = maxY;
    roam.vy = -Math.abs(roam.vy);
  }
}

export function HeroKv() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: 0, y: 0, reveal: 0, intensity: 0 });
  const reducedMotion = useReducedMotion();

  const setSpotlight = (x: number, y: number, reveal: number, boxW: number, boxH: number) => {
    const dust = dustRef.current;
    const ring = ringRef.current;
    if (!dust) return;

    const intensity = reveal > 0.05 ? dustIntensity(x, y, boxW, boxH) : 0;
    pos.current = { x, y, reveal, intensity };

    const radius = Math.min(Math.max(72, Math.min(boxW, boxH) * 0.22), 176);
    dust.style.setProperty("--mx", `${x}px`);
    dust.style.setProperty("--my", `${y}px`);
    dust.style.setProperty("--reveal", String(reveal));
    dust.style.setProperty("--spot-r", `${radius}px`);

    if (ring) {
      ring.style.width = `${radius * 2}px`;
      ring.style.height = `${radius * 2}px`;
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.opacity = reveal > 0.05 ? "1" : "0";
      ring.classList.toggle("is-hot", intensity > 0.18);
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || reducedMotion || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const particles: Particle[] = [];
    let raf = 0;
    let dpr = 1;
    let lastTs = performance.now();
    const roam = {
      x: 0,
      y: 0,
      vx: ROAM_SPEED,
      vy: ROAM_SPEED * 0.62,
      ready: false,
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      const { width, height } = root.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!roam.ready) {
        roam.x = width * 0.42;
        roam.y = height * 0.58;
        roam.ready = true;
      }
      clampRoam(roam, width, height);
    };

    const localPoint = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        w: rect.width,
        h: rect.height,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!hasFineHover()) return;
      const { x, y, w, h } = localPoint(event.clientX, event.clientY);
      setSpotlight(x, y, 1, w, h);
    };

    const onPointerLeave = () => {
      if (!hasFineHover()) return;
      const { x, y } = pos.current;
      const rect = root.getBoundingClientRect();
      setSpotlight(x, y, 0, rect.width, rect.height);
    };

    const radiusPx = () => {
      const ring = ringRef.current;
      if (ring && ring.offsetWidth) return ring.offsetWidth / 2;
      const w = root.getBoundingClientRect().width;
      return Math.min(Math.max(72, w * 0.22), 176);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      const rect = root.getBoundingClientRect();

      if (!hasFineHover()) {
        roam.x += roam.vx * dt;
        roam.y += roam.vy * dt;
        roam.vx += (Math.random() - 0.5) * 8 * dt;
        roam.vy += (Math.random() - 0.5) * 6 * dt;
        const speed = Math.hypot(roam.vx, roam.vy);
        if (speed > 0.001) {
          const scale = ROAM_SPEED / speed;
          roam.vx *= scale;
          roam.vy *= scale;
        }
        clampRoam(roam, rect.width, rect.height);
        setSpotlight(roam.x, roam.y, 0.92, rect.width, rect.height);
      }

      const { x, y, reveal, intensity } = pos.current;
      const r = radiusPx();
      const heavy = intensity > 0.18;
      const spawnCount =
        reveal < 0.2
          ? 0
          : heavy
            ? 5 + Math.floor(intensity * 8)
            : Math.random() > 0.52
              ? Math.random() > 0.65
                ? 2
                : 1
              : 0;

      for (let i = 0; i < spawnCount && particles.length < MAX_PARTICLES; i++) {
        particles.push(spawnParticle(x, y, r, heavy));
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (reveal > 0.05) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r * 0.92, 0, Math.PI * 2);
        ctx.clip();

        if (heavy) {
          const haze = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
          haze.addColorStop(0, "rgba(210, 205, 198, 0.26)");
          haze.addColorStop(0.55, "rgba(160, 150, 138, 0.12)");
          haze.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = haze;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life += 1;
          p.x += p.vx;
          p.y += p.vy;
          p.vx += (Math.random() - 0.5) * 0.03;
          p.vy += (Math.random() - 0.5) * 0.03;
          p.vx *= 0.985;
          p.vy *= 0.985;

          const fadeIn = Math.min(1, p.life / 14);
          const fadeOut = 1 - p.life / p.maxLife;
          const a = p.alpha * fadeIn * fadeOut * reveal;
          if (p.life >= p.maxLife || a <= 0.012) {
            particles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = a;
          ctx.fillStyle = `rgba(${DUST_SHADES[Math.min(DUST_SHADES.length - 1, (p.shade * DUST_SHADES.length) | 0)]}, 1)`;
          ctx.beginPath();
          if (p.blob) {
            const squish = 1 + Math.sin(p.life * 0.045 + p.wob) * 0.22;
            ctx.ellipse(p.x, p.y, p.size * squish, p.size * 0.75, p.wob + p.life * 0.004, 0, Math.PI * 2);
          } else {
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          }
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        ctx.restore();
      } else if (particles.length) {
        particles.length = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const cleanPhoto = campaignData.assets.heroHomeClean;
  const dirtPhoto = campaignData.assets.heroHomeDust;

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full overflow-hidden bg-midnight ${reducedMotion ? "" : "cursor-none max-md:cursor-auto"}`}
    >
      <img
        src={cleanPhoto}
        alt="A sunlit, seemingly clean contemporary living room"
        className="hero-home-layer"
        draggable={false}
      />
      <div
        ref={dustRef}
        className={`hero-dust-reveal ${reducedMotion ? "hero-dust-static" : ""}`}
        aria-hidden="true"
      >
        <img src={dirtPhoto} alt="" className="hero-home-layer hero-home-bw" draggable={false} />
      </div>
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        />
      )}
      {!reducedMotion && (
        <div
          ref={ringRef}
          className="hero-dust-ring pointer-events-none absolute z-10"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
