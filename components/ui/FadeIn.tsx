"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, direction = "up", duration = 0.8, ...props }, ref) => {
    const reducedMotion = useReducedMotion();

    const offset = reducedMotion
      ? { x: 0, y: 0 }
      : {
          up: { x: 0, y: 40 },
          down: { x: 0, y: -40 },
          left: { x: 40, y: 0 },
          right: { x: -40, y: 0 },
          none: { x: 0, y: 0 },
        }[direction];

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: reducedMotion ? 1 : 0, ...offset }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: reducedMotion ? 0 : duration,
          delay: reducedMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = "FadeIn";
