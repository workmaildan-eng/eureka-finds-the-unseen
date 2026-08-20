"use client";

import Image from "next/image";
import { useState } from "react";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  label?: string;
}

export function PlaceholderImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority = false,
  label,
}: PlaceholderImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br from-charcoal via-midnight to-navy-deep ${fill ? "absolute inset-0" : ""} ${className}`}
        role="img"
        aria-label={alt}
        style={!fill ? { width, height } : undefined}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-gold/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-warm-white/5 blur-3xl" />
        </div>
        <span className="relative z-10 text-xs uppercase tracking-[0.2em] text-warm-white/40 px-4 text-center">
          {label || alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      sizes={fill ? "100vw" : undefined}
    />
  );
}
