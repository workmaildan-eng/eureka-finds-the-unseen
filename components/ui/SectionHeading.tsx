"use client";

import { useLocale } from "@/hooks/useLocale";
import { t } from "@/data/campaign";

interface SectionHeadingProps {
  eyebrow?: string | { en: string; zh: string };
  title: string | { en: string; zh: string };
  subtitle?: string | { en: string; zh: string };
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeadingProps) {
  const { locale } = useLocale();
  const eyebrowText =
    eyebrow && (typeof eyebrow === "string" ? eyebrow : t(eyebrow, locale));
  const titleText = typeof title === "string" ? title : t(title, locale);
  const subtitleText =
    subtitle && (typeof subtitle === "string" ? subtitle : t(subtitle, locale));

  return (
    <div
      className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}
    >
      {eyebrowText && <p className="eyebrow mb-4 md:mb-5">{eyebrowText}</p>}
      <h2
        className={`font-sans text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.015em] text-warm-white leading-[1.08] ${titleClassName}`}
      >
        {titleText}
      </h2>
      {subtitleText && (
        <p className={`mt-4 md:mt-6 text-base md:text-lg text-warm-white/70 leading-relaxed ${subtitleClassName}`}>
          {subtitleText}
        </p>
      )}
    </div>
  );
}
