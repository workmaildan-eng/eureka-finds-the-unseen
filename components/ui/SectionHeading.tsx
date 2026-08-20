"use client";

import { useLocale } from "@/hooks/useLocale";
import { t } from "@/data/campaign";

interface SectionHeadingProps {
  title: string | { en: string; zh: string };
  subtitle?: string | { en: string; zh: string };
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeadingProps) {
  const { locale } = useLocale();
  const titleText = typeof title === "string" ? title : t(title, locale);
  const subtitleText =
    subtitle && (typeof subtitle === "string" ? subtitle : t(subtitle, locale));

  return (
    <div
      className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-3xl ${className}`}
    >
      <h2
        className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-warm-white leading-[1.1] ${titleClassName}`}
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
