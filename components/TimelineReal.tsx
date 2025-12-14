"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Item = { year: string; title: string; desc: string };

export default function TimelineReal() {
  // Datos de la línea de tiempo (Hitos)
  const items = useMemo<Item[]>(
    () => [
      { year: "2021", title: "Salí de 4to medio", desc: "Cerré el ciclo escolar y empecé a enfocarme en tech en serio." },
      { year: "2022", title: "Mantenedor oficial de Bananadroid", desc: "Me hice mantenedor del Mi 11 Lite 5G: builds, fixes y comunidad." },
      { year: "2023", title: "Entré a INACAP", desc: "Ingeniería en Informática. Full enfoque en bases sólidas y proyectos." },
      { year: "2024", title: "Proyecto ACG", desc: "App Windows para generar y firmar contratos electrónicos." },
      { year: "2025", title: "NuamTax + Lavandería El Cobre", desc: "Next/Firebase + IA y una intranet React/Firebase integrable por token." },
    ],
    []
  );

  return (
    <div className="relative">
      {/* Línea central */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/10" />

      <div className="grid gap-10">
        {/* Renderizado de items alternando lados (izquierda/derecha) */}
        {items.map((it, idx) => (
          <TimelineRow key={it.year} it={it} side={idx % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ it, side }: { it: Item; side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });

  const isLeft = side === "left";

  return (
    <div ref={ref} className="relative">
      {/* Dot en el centro */}
      <motion.div
        className="absolute left-1/2 top-6 -translate-x-1/2 h-3 w-3 rounded-full"
        initial={{ scale: 0.6, opacity: 0.2 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: "rgba(255,255,255,.9)",
          boxShadow: "0 0 20px rgba(0,255,170,.18), 0 0 30px rgba(0,200,255,.12)",
        }}
      />

      {/* Conector hacia la card */}
      <motion.div
        className="absolute top-[28px] h-px bg-white/20"
        style={{
          left: isLeft ? "auto" : "50%",
          right: isLeft ? "50%" : "auto",
          width: "0px",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: "clamp(24px, 10vw, 120px)", opacity: 1 } : {}}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      />

      {/* Card */}
      <div
        className={[
          "relative",
          "w-full",
          "md:w-[calc(50%-80px)]",
          isLeft ? "md:pr-10 md:mr-auto" : "md:pl-10 md:ml-auto",
        ].join(" ")}
      >
        <motion.div
          className="glass rounded-3xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 18, x: isLeft ? -12 : 12, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex items-center gap-3">
            <div className="text-sm font-mono text-white/70">{it.year}</div>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-3 text-lg font-semibold text-white/95">{it.title}</div>
          <div className="mt-2 text-white/70 leading-relaxed">{it.desc}</div>
        </motion.div>
      </div>
    </div>
  );
}
