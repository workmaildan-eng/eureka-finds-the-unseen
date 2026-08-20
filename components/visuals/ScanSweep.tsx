"use client";

/*
 * Rotating conic sensing beam with trailing wake, centred on its parent.
 * Rotation uses the `scan-rotate` CSS keyframe (killed by reduced motion).
 */
export function ScanSweep({
  className = "",
  size = "140%",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-scan-rotate ${className}`}
      style={{
        width: size,
        aspectRatio: "1",
        background:
          "conic-gradient(from 0deg, rgba(216,171,85,0.22) 0deg, rgba(216,171,85,0.05) 40deg, transparent 70deg, transparent 360deg)",
        maskImage:
          "radial-gradient(circle, transparent 18%, black 30%, black 62%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(circle, transparent 18%, black 30%, black 62%, transparent 72%)",
      }}
      aria-hidden="true"
    />
  );
}
