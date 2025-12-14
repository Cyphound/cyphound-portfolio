"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { site } from "@/lib/site";

type Stage = "idle" | "handshake" | "encrypt" | "queued" | "sent";

const stageLines: Record<Stage, string[]> = {
  idle: [
    "uplink :: ready",
    "channel :: secure",
    "awaiting transmission…",
  ],
  handshake: [
    "uplink :: handshake",
    "auth :: verifying signature",
    "session :: established",
  ],
  encrypt: [
    "payload :: assembling",
    "crypto :: encrypting message",
    "checksum :: ok",
  ],
  queued: [
    "routing :: selecting node",
    "queue :: message queued",
    "status :: awaiting transmit",
  ],
  sent: [
    "transmit :: complete",
    "receipt :: delivered",
    "status :: done",
  ],
};

export default function ContactUplink() {
  const [stage, setStage] = useState<Stage>("idle");
  const [topic, setTopic] = useState<"Proyecto" | "Trabajo" | "Colaboración" | "Otro">("Proyecto");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  const lines = useMemo(() => stageLines[stage], [stage]);

  const signal = useMemo(() => {
    const score = name.length * 0.6 + from.length * 0.8 + msg.length * 0.12;
    return Math.max(6, Math.min(100, Math.floor(score)));
  }, [name, from, msg]);

  const canSend = msg.trim().length >= 10 && from.trim().length >= 5;

  const transmit = async () => {
    if (!canSend) return;

    // Pasos de simulación visual (handshake, encriptación, cola)
    setStage("handshake");
    await wait(650);

    setStage("encrypt");
    await wait(750);

    setStage("queued");
    await wait(650);

    // Integración con EmailJS para envío real
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    if (!serviceId || !templateId || !publicKey) {
      console.warn("EmailJS not configured. Check .env.local");
      await wait(600);
      setStage("sent");
      setTimeout(() => setStage("idle"), 2000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          title: topic,
          name: name || "Anónimo",
          email: from,
          message: msg,
          time: new Date().toLocaleString(),
          year: new Date().getFullYear(),
        },
        publicKey
      );

      setStage("sent");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Error enviando mensaje. Revisa la consola.");
      setStage("idle");
    }

    // reset suave
    if (stage !== "idle") {
      setTimeout(() => {
        setStage("idle");
        setName("");
        setFrom("");
        setMsg("");
      }, 3000);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: Terminal panel */}
      <div className="glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="text-xs font-mono text-white/60">uplink://channel</div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/55">
            <span className="h-2 w-2 rounded-full bg-emerald-300/70" />
            SIGNAL {signal}%
          </div>
        </div>

        <div className="p-5 font-mono text-[12.5px] leading-relaxed text-white/75">
          {lines.map((l, i) => (
            <div key={i} className={l.includes("error") ? "text-amber-200/90" : ""}>
              {l}
            </div>
          ))}

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white/60 text-xs">preview :: payload</div>
            <div className="mt-2 text-white/80">
              <span className="text-white/55">topic</span> : {topic}
            </div>
            <div className="text-white/80">
              <span className="text-white/55">from</span> : {from || "—"}
            </div>
            <div className="text-white/80">
              <span className="text-white/55">name</span> : {name || "—"}
            </div>
            <div className="mt-2 text-white/80 whitespace-pre-wrap">
              <span className="text-white/55">msg</span> : {msg || "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Right: “Not classic” form */}
      <div className="glass rounded-3xl border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-mono text-white/60">CONTACT</div>
            <div className="mt-2 text-2xl font-semibold text-white/95">Message uplink</div>
            <div className="mt-1 text-white/70">
              Escribe un mensaje y transmítelo a través de un canal seguro.
            </div>
          </div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="hidden sm:block rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="text-xs font-mono text-white/60">signal</div>
            <div className="mt-2 h-2 w-32 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                className="h-full"
                animate={{ width: `${signal}%` }}
                style={{ background: "linear-gradient(90deg, rgba(96,205,255,.9), rgba(255,165,70,.85), rgba(210,120,35,.85))", boxShadow: "0 0 18px rgba(0,255,170,.14)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Topic chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(["Proyecto", "Trabajo", "Colaboración", "Otro"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className="relative rounded-full px-4 py-2 text-sm text-white/75 border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              {topic === t && (
                <motion.span
                  layoutId="topic"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 520, damping: 38 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Field label="Nombre (opcional)">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none text-white/90 placeholder:text-white/35"
              placeholder="Bayron Gómez"
            />
          </Field>

          <Field label="Tu email">
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-transparent outline-none text-white/90 placeholder:text-white/35"
              placeholder="you@email.com"
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Message">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={5}
              className="w-full resize-none bg-transparent outline-none text-white/90 placeholder:text-white/35"
              placeholder="Cuéntame qué quieres construir…"
            />
          </Field>
        </div>

        {/* Transmit */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="text-xs text-white/55 font-mono">
            {canSend ? "ready :: transmit" : "hint :: el mensaje debe tener 10+ caracteres y el email es requerido"}
          </div>

          <button
            onClick={transmit}
            disabled={!canSend}
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold
                       bg-white/10 hover:bg-white/15 text-white/90 border border-white/10
                       disabled:opacity-40 disabled:hover:bg-white/10 transition"
            style={{
              boxShadow: canSend ? "0 0 0 1px rgba(255,255,255,.06), 0 0 26px rgba(0,255,170,.10)" : undefined,
            }}
          >
            <Send className="h-4 w-4" />
            ENVIAR
          </button>
        </div>

        {/* Socials */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Social href={`mailto:${site.links.email}`} label="Email" icon={<Mail className="h-4 w-4" />} />
          <Social href={site.links.github} label="GitHub" icon={<Github className="h-4 w-4" />} />
          <Social href={site.links.linkedin} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
          <Social href={site.links.telegram} label="Telegram" icon={<MessageCircle className="h-4 w-4" />} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs font-mono text-white/55">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="glass rounded-2xl border border-white/10 px-4 py-3 hover:bg-white/10 transition flex items-center gap-3"
    >
      <span className="text-white/75">{icon}</span>
      <span className="text-sm text-white/80">{label}</span>
    </a>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
