"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

/*
 * Lightweight canvas particle field.
 *
 * mode="float":  slow ambient dust motes drifting upward.
 * mode="stream": particles rise from the bottom band toward a target point
 *                (normalised coords) — used for the suction chapter.
 *
 * Pauses off-screen via IntersectionObserver. Under reduced motion it paints
 * a single static frame of scattered motes.
 */
export function ParticleCanvas({
  className = "",
  mode = "float",
  count = 40,
  color = "216,171,85",
  targetX = 0.5,
  targetY = 0.25,
}: {
  className?: string;
  mode?: "float" | "stream";
  count?: number;
  /** RGB triplet string. */
  color?: string;
  targetX?: number;
  targetY?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const spawn = (initial = false): Particle => {
      if (mode === "stream") {
        return {
          x: width * (0.25 + Math.random() * 0.5),
          y: height * (0.8 + Math.random() * 0.2),
          vx: 0,
          vy: 0,
          size: 0.8 + Math.random() * 1.8,
          life: initial ? Math.random() * 100 : 0,
          maxLife: 90 + Math.random() * 80,
        };
      }
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.08 + Math.random() * 0.22),
        size: 0.8 + Math.random() * 2,
        life: 0,
        maxLife: 400 + Math.random() * 400,
      };
    };

    const particles: Particle[] = Array.from({ length: count }, () => spawn(true));

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, Math.random() * height, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.35)`;
        ctx.fill();
      }
    };

    if (reducedMotion) {
      drawStatic();
      return;
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const tx = width * targetX;
      const ty = height * targetY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        if (mode === "stream") {
          // Accelerate toward the intake point with slight lateral wobble
          const dx = tx - p.x;
          const dy = ty - p.y;
          const dist = Math.max(Math.hypot(dx, dy), 1);
          p.vx += (dx / dist) * 0.05 + Math.sin(p.life * 0.15) * 0.01;
          p.vy += (dy / dist) * 0.07;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          if (dist < 14 || p.life > p.maxLife) particles[i] = spawn();
        } else {
          p.x += p.vx + Math.sin((p.life + i * 30) * 0.01) * 0.08;
          p.y += p.vy;
          if (p.y < -6 || p.life > p.maxLife) particles[i] = spawn();
        }

        const fade =
          Math.min(p.life / 30, 1) *
          Math.min((p.maxLife - p.life) / 40, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${(0.5 * Math.max(fade, 0)).toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "80px" }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [mode, count, color, targetX, targetY, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
