"use client";

/*
 * Layered modern interior with a perspective floor, used by the product
 * entry scene and final CTA. Two stacked worlds:
 *
 *   base            — warm sunlit daylight room
 *   .room-detection — deep-navy sensing overlay (crossfade with GSAP)
 *
 * The floor vanishing point sits at ~(50%, 42%) so a robot travelling
 * from there toward the bottom edge reads as approaching the camera.
 */
export function RoomScene({
  className = "",
  detectionOpacity = 1,
  mood = "day",
}: {
  className?: string;
  /** Initial opacity of the detection overlay (GSAP animates `.room-detection`). */
  detectionOpacity?: number;
  mood?: "day" | "dusk";
}) {
  const dusk = mood === "dusk";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* ---------- Daylight world ---------- */}
      {/* Back wall */}
      <div
        className={`absolute inset-x-0 top-0 h-[46%] ${
          dusk
            ? "bg-gradient-to-b from-[#2a2336] to-[#382e45]"
            : "bg-gradient-to-b from-[#f3e9d7] to-[#e9dcc2]"
        }`}
      />
      {/* Window + light shaft */}
      <div
        className={`absolute top-[6%] left-[10%] w-[17%] h-[30%] rounded-sm border-4 ${
          dusk ? "border-[#1d1729] bg-[#493c5c]/60" : "border-[#d8c9a8] bg-[#fdf6e4]"
        }`}
      >
        <div className={`absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 ${dusk ? "bg-[#1d1729]" : "bg-[#d8c9a8]"}`} />
      </div>
      <div
        className={`absolute top-[8%] left-[12%] w-[38%] h-[80%] origin-top-left rotate-[24deg] blur-md ${
          dusk
            ? "bg-gradient-to-b from-amber-gold/[0.14] to-transparent"
            : "bg-gradient-to-b from-[#fff6dd]/70 to-transparent"
        }`}
      />

      {/* Perspective floor */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[54%] ${
          dusk
            ? "bg-gradient-to-b from-[#1e1830] to-[#120e1c]"
            : "bg-gradient-to-b from-[#e0cba6] to-[#c0a075]"
        }`}
      />
      {/* Converging plank lines */}
      <svg className="absolute inset-x-0 bottom-0 h-[54%] w-full opacity-40" viewBox="0 0 100 54" preserveAspectRatio="none">
        {[8, 22, 36, 50, 64, 78, 92].map((x) => (
          <line key={x} x1="50" y1="0" x2={x} y2="54" stroke={dusk ? "rgba(9,13,24,0.55)" : "rgba(120,90,55,0.35)"} strokeWidth="0.22" />
        ))}
        {[10, 22, 37].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={dusk ? "rgba(9,13,24,0.4)" : "rgba(120,90,55,0.22)"} strokeWidth="0.18" />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-[46%] h-px bg-black/20" />

      {/* Sofa (right side) */}
      <div className={`absolute bottom-[38%] right-[6%] w-[26%] h-[16%] rounded-t-2xl ${dusk ? "bg-[#191323]" : "bg-[#cbb28d]"}`} />
      <div className={`absolute bottom-[34%] right-[4%] w-[5%] h-[6%] rounded-t-lg ${dusk ? "bg-[#191323]" : "bg-[#cbb28d]"}`} />
      <div className={`absolute bottom-[34%] right-[29%] w-[5%] h-[6%] rounded-t-lg ${dusk ? "bg-[#191323]" : "bg-[#cbb28d]"}`} />
      {/* Shadow beneath the sofa — where the unseen hides */}
      <div className="absolute bottom-[33%] right-[5%] w-[28%] h-[3%] bg-black/30 blur-sm rounded-full" />

      {/* Side table (left) with legs */}
      <div className={`absolute bottom-[40%] left-[13%] w-[14%] h-[2.5%] rounded ${dusk ? "bg-[#1c1628]" : "bg-[#b59a72]"}`} />
      <div className={`absolute bottom-[33%] left-[14%] w-[1.2%] h-[7.5%] ${dusk ? "bg-[#1c1628]" : "bg-[#a98e67]"}`} />
      <div className={`absolute bottom-[33%] left-[25%] w-[1.2%] h-[7.5%] ${dusk ? "bg-[#1c1628]" : "bg-[#a98e67]"}`} />

      {/* Rug */}
      <div className={`absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[54%] h-[16%] rounded-[50%] ${dusk ? "bg-[#241c38]/80" : "bg-[#dcc7a4]/90"}`} />

      {/* ---------- Detection world (crossfaded) ---------- */}
      <div className="room-detection absolute inset-0" style={{ opacity: detectionOpacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1526]/[0.97] via-[#0a101f]/[0.95] to-[#0d1526]/[0.98]" />
        {/* Faint sensing grid on the floor */}
        <svg className="absolute inset-x-0 bottom-0 h-[54%] w-full opacity-50" viewBox="0 0 100 54" preserveAspectRatio="none">
          {[8, 22, 36, 50, 64, 78, 92].map((x) => (
            <line key={x} x1="50" y1="0" x2={x} y2="54" stroke="rgba(216,171,85,0.16)" strokeWidth="0.2" />
          ))}
          {[8, 18, 30, 44].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(216,171,85,0.10)" strokeWidth="0.16" />
          ))}
        </svg>
        {/* Amber glows in the overlooked places */}
        <div className="absolute bottom-[33%] right-[8%] w-[22%] h-[4%] rounded-full bg-amber-gold/25 blur-md" />
        <div className="absolute bottom-[32%] left-[15%] w-[10%] h-[3%] rounded-full bg-amber-gold/20 blur-md" />
      </div>
    </div>
  );
}
