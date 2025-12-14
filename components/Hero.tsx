"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <div className="relative">
      <div className="glass ring-glow rounded-3xl p-7 sm:p-10 overflow-hidden">
        {/* Orbes flotantes */}
        <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full opacity-30"
             style={{ background: "radial-gradient(circle, rgba(124,58,237,.9), transparent 65%)", animation: "floaty 6s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -bottom-14 -right-14 h-64 w-64 rounded-full opacity-25"
             style={{ background: "radial-gradient(circle, rgba(34,211,238,.9), transparent 65%)", animation: "floaty 7.5s ease-in-out infinite" }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
            <Sparkles className="h-4 w-4" />
            aka {site.alias}
          </div>

          <div className="mt-6 text-sm font-mono text-white/75">
  Hola, soy
</div>

<h1 className="mt-4 text-balance text-5xl sm:text-7xl font-semibold tracking-tight text-white">
  {site.name}
</h1>

<p className="mt-6 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
  {site.description}
</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white text-black px-5 py-3 font-medium hover:translate-y-[-1px] transition"
            >
              Ver proyectos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 text-white px-5 py-3 font-medium hover:bg-white/15 transition"
            >
              Hablemos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
