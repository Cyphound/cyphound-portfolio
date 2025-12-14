"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";

type SectionEl = { el: Element; label: string; id?: string };

export default function TopHUD() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40 });

  const glow = useTransform(progress, [0, 1], [0.35, 0.9]);
  const barFilter = useMotionTemplate`drop-shadow(0 0 18px rgba(255,43,214,${glow})) drop-shadow(0 0 24px rgba(34,211,238,${glow}))`;

  const [active, setActive] = useState<string>("");

  const sections = useMemo(() => {
    if (typeof window === "undefined") return [] as SectionEl[];
    const nodes = Array.from(document.querySelectorAll("[data-section]"));
    return nodes.map((el) => ({
      el,
      label: (el as HTMLElement).dataset.label || "Sección",
      id: (el as HTMLElement).id,
    }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nodes = Array.from(document.querySelectorAll("[data-section]")) as HTMLElement[];
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target) {
          const label = (visible.target as HTMLElement).dataset.label || "";
          setActive(label);
        }
      },
      { root: null, threshold: [0.25, 0.4, 0.55, 0.7] }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[60]">
      {/* progress bar */}
      <div className="h-[3px] w-full bg-white/5">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: progress,
            filter: barFilter,
            background:
              "linear-gradient(90deg, rgba(255,43,214,.95), rgba(34,211,238,.95), rgba(140,92,255,.95))",
          }}
        />
      </div>
    </div>
  );
}
