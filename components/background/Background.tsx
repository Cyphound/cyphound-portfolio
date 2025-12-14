"use client";

import InteractiveDotsBackground from "./InteractiveDotsBackground";
import NoiseOverlay from "./NoiseOverlay";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]">
      {/* spotlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full spotlight-a" />
        <div className="absolute -top-28 right-[-140px] h-[560px] w-[560px] rounded-full spotlight-b" />
        <div className="absolute bottom-[-220px] left-[18%] h-[700px] w-[700px] rounded-full spotlight-c" />
      </div>

      {/* dots reales (canvas) */}
      <InteractiveDotsBackground />

      {/* viñeta */}
      <div className="absolute inset-0 pointer-events-none vignette" />

      {/* grano */}
      <NoiseOverlay />
    </div>
  );
}
