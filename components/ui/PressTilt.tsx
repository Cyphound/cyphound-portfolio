"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function PressTilt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // posición normalizada -0.5..0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rX = useSpring(0, { stiffness: 280, damping: 26 });
  const rY = useSpring(0, { stiffness: 280, damping: 26 });
  const z = useSpring(0, { stiffness: 280, damping: 26 });

  const shineX = useSpring(50, { stiffness: 220, damping: 30 });
  const shineY = useSpring(30, { stiffness: 220, damping: 30 });
  const shine = useMotionTemplate`radial-gradient(260px 200px at ${shineX}% ${shineY}%, rgba(255,255,255,.10), transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    mx.set(px);
    my.set(py);

    // “presión”: el lado del cursor se va hacia adentro → invertimos el tilt
    const max = 6; // grados
    rX.set(-py * max);     // arriba (py negativo) => rX negativo => top “entra”
    rY.set(px * max);    // izquierda (px negativo) => rY positivo => left “entra”

    z.set(-3); // un poquito “hacia dentro” (sensación de presión)

    shineX.set((px + 0.5) * 100);
    shineY.set((py + 0.5) * 100);
  };

  const onLeave = () => {
    rX.set(0);
    rY.set(0);
    z.set(0);
    shineX.set(50);
    shineY.set(30);
  };

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX: rX,
          rotateY: rY,
          translateZ: z,
        }}
        className="relative"
      >
        {/* brillo */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ backgroundImage: shine }}
        />
        {/* sombra dinámica suave */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "0 18px 60px rgba(0,0,0,.35)",
            opacity: 0.9,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}
