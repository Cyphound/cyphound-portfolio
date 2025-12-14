"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/cn";

export default function Section({
  title,
  kicker,
  children,
  className,
  id,
  disableBlur = false,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  disableBlur?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we are on client
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Hooks de Framer Motion para detectar el scroll progress (0 a 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  // Transformaciones basadas en scroll (y-axis y opacidad)
  // parallax suave
  const y = useTransform(scrollYProgress, [0, 1], [24, -16]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0]);



  return (
    <section
      ref={ref as any}
      id={id}
      data-section
      data-label={title}
      className={cn("relative pt-24 pb-16 md:py-16", className)}
    >
      <motion.div
        style={{ y, opacity }}
      >
        {kicker && (
          <div className="mb-3 text-sm uppercase tracking-[0.2em] text-white/55">
            {kicker}
          </div>
        )}

        <h2
          className="text-3xl sm:text-4xl font-semibold text-white/95"
          style={{
            textShadow:
              "0 0 26px rgba(255,43,214,.10), 0 0 30px rgba(34,211,238,.08)",
          }}
        >
          {title}
        </h2>

        <div className="mt-6">{children}</div>
      </motion.div>
    </section>
  );
}
