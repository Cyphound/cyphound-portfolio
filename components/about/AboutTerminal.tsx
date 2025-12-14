"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Mode = "profile" | "stack" | "milestones";
type LineNode = string | React.ReactNode;

const scripts: Record<Mode, LineNode[]> = {
  profile: [
    "$ whoami",
    "bayron_gomez (aka cyphound)",
    "$ cat about.txt",
    "Estudiante de Ingeniería Informática (INACAP).",
    "Me gusta construir productos con una UI fuerte y animaciones.",
    "Foco: interfaces limpias, buen performance, y pulido.",
    "$ echo 'access: granted'",
    <span key="granted" className="inline-flex items-center gap-2">
      access: granted <Check className="h-4 w-4 opacity-90" />
    </span>,
  ],
  stack: [
    "$ stack --top",
    "nextjs • react • typescript • tailwind",
    "firebase • vercel • node",
    "flutter • flask • mysql",
    "$ focus",
    "UI, animaciones, e integración de sistemas.",
  ],
  milestones: [
    "$ timeline --quick",
    "2021: Terminé la secundaria",
    "2022: Mantenedor oficial — Bananadroid (Mi 11 Lite 5G)",
    "2023: Ingresé a INACAP",
    "2024: Construí ACG",
    "2025: Construí NuamTax + Lavandería El Cobre intranet",
    "$ status",
    <span key="status" className="inline-flex items-center gap-2">
      construyendo sistemas cada año <Check className="h-4 w-4 opacity-90" />
    </span>,
  ],
};

export default function AboutTerminal() {
  const [mode, setMode] = useState<Mode>("profile");
  const [printed, setPrinted] = useState<LineNode[]>([]);
  const [typing, setTyping] = useState("");

  const lines = useMemo(() => scripts[mode], [mode]);

  useEffect(() => {
    let i = 0;
    let char = 0;

    let interval: any;
    let timeout: any;
    let stopped = false;

    setPrinted([]);
    setTyping("");

    // Función para simular el tipeo de una línea o mostrarla instantáneamente
    const typeLine = () => {
      if (stopped) return;

      const current = lines[i];

      // Si la línea es un elemento JSX, se imprime instantáneamente sin animación de tipeo.
      if (typeof current !== "string") {
        setPrinted((p) => [...p, current]);
        i += 1;
        if (i >= lines.length) return; // Si ya no hay más líneas, se detiene.
        timeout = setTimeout(typeLine, 140); // Espera un poco antes de la siguiente línea.
        return;
      }

      // Si la línea es un string, se simula el tipeo carácter por carácter.
      const full = current;
      char = 0;
      setTyping(""); // Limpia la línea de tipeo actual.

      interval = setInterval(() => {
        const step = Math.random() < 0.28 ? 2 : 1;
        char = Math.min(full.length, char + step);
        setTyping(full.slice(0, char));

        if (char >= full.length) {
          clearInterval(interval);
          setPrinted((p) => [...p, full]);
          setTyping("");

          i += 1;
          if (i >= lines.length) return;

          timeout = setTimeout(typeLine, 120);
        }
      }, 18);
    };

    timeout = setTimeout(typeLine, 160);

    return () => {
      stopped = true;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [lines]);

  return (
    <div className="rounded-3xl border border-white/10 overflow-hidden bg-[#0A0E12]/80">
      {/* header */}
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-2 text-xs text-white/60 font-mono">terminal://about</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={mode === "profile"} onClick={() => setMode("profile")}>
            profile
          </Chip>
          <Chip active={mode === "stack"} onClick={() => setMode("stack")}>
            stack
          </Chip>
          <Chip active={mode === "milestones"} onClick={() => setMode("milestones")}>
            milestones
          </Chip>
        </div>
      </div>

      {/* body */}
      <div className="p-5 font-mono text-[12.5px] leading-relaxed text-white/80">
        {printed.map((l, idx) => (
          <Line key={idx} node={l} />
        ))}

        <div className="flex items-center">
          <span>{typing}</span>
          <span
            className="ml-1 inline-block h-4 w-2 bg-white/70"
            style={{ animation: "blink 1s steps(1) infinite" }}
          />
        </div>
      </div>


    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full px-3 py-1 text-xs font-mono text-white/70 hover:text-white/90 transition"
    >
      {active && (
        <motion.span
          layoutId="chip"
          className="absolute inset-0 rounded-full bg-white/10"
          transition={{ type: "spring", stiffness: 520, damping: 38 }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

function Line({ node }: { node: LineNode }) {
  if (typeof node !== "string") {
    return <div className="text-emerald-200/90">{node}</div>;
  }

  const text = node.trim();
  const isCmd = text.startsWith("$");
  const isWarn = text.toLowerCase().includes("warn");
  const isOk = text.toLowerCase().includes("granted") || text.toLowerCase().includes("validated");

  let cls = "text-white/80";
  if (isCmd) cls = "text-white/90";
  if (isWarn) cls = "text-amber-200/90";
  if (isOk) cls = "text-emerald-200/90";

  return <div className={cls}>{node}</div>;
}
