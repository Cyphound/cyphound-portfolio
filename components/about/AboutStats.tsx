"use client";

import { motion } from "framer-motion";

// Datos de estadísticas o "stats" del perfil
const tiles = [
  { k: "Base", v: "INACAP · Ing. Informática" },
  { k: "Foco", v: "UI + Animaciones + Integraciones" },
  { k: "Stack", v: "Next/React/TS · Firebase" },
  { k: "Extra", v: "Flutter · Flask · MySQL" },
  { k: "Hábito", v: "Iterar hasta que quede perfecto" },
  { k: "Modo", v: "Cyberpunk, limpio, rápido" },
];

export default function AboutStats() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {tiles.map((t) => (
        <motion.div
          key={t.k}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="glass rounded-2xl p-4 border border-white/10"
        >
          <div className="text-xs font-mono text-white/55">{t.k}</div>
          <div className="mt-2 text-sm text-white/80 leading-relaxed">{t.v}</div>
        </motion.div>
      ))}
    </div>
  );
}
