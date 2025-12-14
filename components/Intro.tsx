"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

type LogLine = { kind: "info" | "warn" | "ok"; text: string };

function ClientTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const Timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(Timer);
  }, []);
  return <span>{time}</span>;
}

export default function Intro() {
  // Estados de control de la animación y carga
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"cargando" | "concedido">("cargando");

  // Estado del motor de tipeo (efecto terminal)
  const [typed, setTyped] = useState("");
  const [printed, setPrinted] = useState<LogLine[]>([]);
  const [ending, setEnding] = useState(false);

  // Ajustes de tiempos (más corto para UX rápida)
  const TOTAL_MS = 4300;      // Duración total de la carga
  const EXIT_DELAY_MS = 420;  // Delay antes de desmontar el componente
  const GRANT_AT = 92;        // Porcentaje donde se "concede" el acceso

  const rafRef = useRef<number | null>(null);
  const typingRef = useRef<number | null>(null);
  const stepRef = useRef<number | null>(null);

  const script = useMemo<LogLine[]>(
    () => [
      { kind: "info", text: "init :: handshake" },
      { kind: "info", text: "auth :: verifying keys" },
      { kind: "info", text: "ui :: preparing modules" },
      { kind: "warn", text: "warn :: anomaly detected in packet stream" },
      { kind: "warn", text: "warn :: retrying secure negotiation (1/2)" },
      { kind: "ok", text: "net :: secure channel ok" },
      { kind: "ok", text: "perm :: access tokens validated" },
    ],
    []
  );

  const clearAll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    if (typingRef.current) window.clearInterval(typingRef.current);
    typingRef.current = null;

    if (stepRef.current) window.clearTimeout(stepRef.current);
    stepRef.current = null;
  };

  useEffect(() => {
    clearAll();

    const startAt = performance.now();

    // typing engine
    let lineIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
      const line = script[lineIndex];
      if (!line) return;

      typingRef.current = window.setInterval(() => {
        const full = line.text;
        const step = Math.random() < 0.28 ? 2 : 1;
        charIndex = Math.min(full.length, charIndex + step);
        setTyped(full.slice(0, charIndex));

        if (charIndex >= full.length) {
          if (typingRef.current) window.clearInterval(typingRef.current);
          typingRef.current = null;

          setPrinted((prev) => [...prev, line]);
          setTyped("");

          lineIndex += 1;
          charIndex = 0;

          stepRef.current = window.setTimeout(typeNext, 120 + Math.random() * 150);
        }
      }, 20);
    };

    stepRef.current = window.setTimeout(typeNext, 160);

    // progress engine
    const finish = () => {
      setProgress(100);
      setStatus("concedido");

      // agrega cierre cinematográfico corto
      setEnding(true);

      stepRef.current = window.setTimeout(() => {
        setShow(false);
      }, EXIT_DELAY_MS);
    };

    const tick = () => {
      const now = performance.now();
      const t = clamp((now - startAt) / TOTAL_MS, 0, 1);

      const eased = 1 - Math.pow(1 - t, 1.35);
      const pct = Math.floor(eased * 100);

      setProgress(pct);

      if (pct >= GRANT_AT) setStatus("concedido");

      if (t >= 1) {
        finish();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearAll();
    };
  }, [script]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Fondo hacker */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 20% 30%, rgba(0,255,140,.16), transparent 60%), radial-gradient(50% 40% at 80% 35%, rgba(0,255,200,.10), transparent 62%), linear-gradient(180deg, #020508 0%, #010306 100%)",
            }}
          />
          <div className="absolute inset-0 scanlines" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,255,140,.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,140,.12) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage: "radial-gradient(60% 55% at 50% 40%, black 45%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(60% 55% at 50% 40%, black 45%, transparent 80%)",
            }}
          />

          {/* Flash final verde (corto) */}
          {ending && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.18, 0] }}
              transition={{ duration: 0.32 }}
              style={{
                background:
                  "radial-gradient(45% 35% at 50% 45%, rgba(0,255,160,.22), transparent 70%)",
              }}
            />
          )}

          {/* Ventana */}
          <motion.div
            className="relative w-[92vw] max-w-xl rounded-2xl overflow-hidden"
            initial={{ y: 16, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: -6,
              filter: "blur(10px)",
              // glitchy exit rápido
              x: ending ? [0, -6, 6, -2, 0] : 0,
            }}
            transition={{
              duration: 0.48,
              ease: [0.2, 0.8, 0.2, 1],
              x: { duration: 0.22 },
            }}
            style={{
              background: "rgba(6, 18, 12, .58)",
              border: "1px solid rgba(0,255,140,.24)",
              boxShadow:
                "0 0 0 1px rgba(0,255,140,.10), 0 0 35px rgba(0,255,140,.14), 0 0 70px rgba(0,255,200,.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 text-xs"
              style={{
                borderBottom: "1px solid rgba(0,255,140,.18)",
                color: "rgba(170,255,220,.85)",
              }}
            >
              <span>TERMINAL://ACCESS</span>
              <ClientTime />
            </div>

            <div className="px-5 py-6">
              <div
                className="text-[11px] uppercase tracking-[0.35em]"
                style={{ color: "rgba(150,255,210,.72)" }}
              >
                {status === "cargando" ? "CARGANDO…" : "ACCESO CONCEDIDO"}
              </div>

              <div className="mt-3 text-xl sm:text-2xl font-semibold text-white/90">
                {site.name}
              </div>
              <div className="mt-1 text-sm text-white/65">{site.role}</div>

              {/* Logs */}
              <div
                className="mt-5 rounded-xl p-4 font-mono text-[12px] leading-relaxed"
                style={{
                  background: "rgba(0,0,0,.25)",
                  border: "1px solid rgba(0,255,140,.14)",
                  color: "rgba(190,255,225,.82)",
                }}
              >
                {printed.map((l, i) => (
                  <div
                    key={i}
                    style={{
                      color:
                        l.kind === "warn"
                          ? "rgba(255, 230, 120, .90)"
                          : l.kind === "ok"
                            ? "rgba(160, 255, 210, .92)"
                            : "rgba(190, 255, 225, .82)",
                    }}
                  >
                    {l.text}
                  </div>
                ))}

                {/* typing line + cursor */}
                <div>
                  <span>{typed}</span>
                  <span
                    className="inline-block align-middle ml-1"
                    style={{
                      width: "8px",
                      height: "14px",
                      background: "rgba(0,255,140,.9)",
                      boxShadow: "0 0 14px rgba(0,255,140,.35)",
                      animation: "blink 1s steps(1) infinite",
                    }}
                  />
                </div>

                {/* Final: unlocking UI */}
                {ending && (
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ color: "rgba(0,255,180,.88)" }}
                  >
                    ui :: UNLOCKING UI…
                  </motion.div>
                )}
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-white/65">
                  <span>{status === "cargando" ? "procesando..." : "listo"}</span>
                  <span>{progress}%</span>
                </div>

                <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,255,140,.95), rgba(0,255,200,.92))",
                      boxShadow:
                        "0 0 18px rgba(0,255,140,.35), 0 0 26px rgba(0,255,200,.18)",
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 text-xs text-white/50">
                {status === "cargando"
                  ? "sincronizando módulos…"
                  : "transferencia completada…"}
              </div>
            </div>
          </motion.div>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
