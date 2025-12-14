"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import PressTilt from "@/components/ui/PressTilt";

const ACCENT: Record<Project["accent"], { a: string; b: string; edge: string }> = {
  acg: { a: "rgba(96, 205, 255, .55)", b: "rgba(96, 205, 255, .18)", edge: "rgba(96, 205, 255, .22)" },
  nuamtax: { a: "rgba(210, 120, 35, .55)", b: "rgba(210, 120, 35, .18)", edge: "rgba(210, 120, 35, .22)" },
  lavanderia: { a: "rgba(255, 165, 70, .55)", b: "rgba(255, 165, 70, .18)", edge: "rgba(255, 165, 70, .22)" },
};

export default function ProjectCard({ p }: { p: Project }) {
  const c = ACCENT[p.accent];

  return (
    <PressTilt className="rounded-3xl">
      <motion.div
        whileHover={{ y: -8 }} // solo lift (el tilt lo maneja PressTilt)
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="glass rounded-3xl overflow-hidden"
        style={{
          border: `1px solid rgba(255,255,255,.10)`,
          boxShadow: `0 0 0 1px rgba(255,255,255,.06), 0 0 46px ${c.b}`,
        }}
      >
        {p.image && (
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(4,6,10,.92), rgba(4,6,10,.18), transparent)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                boxShadow: `inset 0 0 0 1px ${c.edge}, inset 0 -60px 140px rgba(0,0,0,.55)`,
              }}
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl font-semibold text-white/95">{p.title}</div>
              <div className="mt-1 text-sm text-white/60">{p.short}</div>
              <div className="mt-3 text-white/70 leading-relaxed">{p.desc}</div>
            </div>

            <div className="flex gap-2">
              {p.repo && (
                <a
                  className="rounded-xl bg-white/10 p-2 hover:bg-white/15 transition"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4 text-white/80" />
                </a>
              )}
              {p.href && (
                <a
                  className="rounded-xl bg-white/10 p-2 hover:bg-white/15 transition"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="h-4 w-4 text-white/80" />
                </a>
              )}
            </div>
          </div>

          <div
            className="mt-4 h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${c.a}, transparent)` }}
          />

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-2">
            {p.highlights.map((h) => (
              <div key={h} className="text-sm text-white/70">
                • {h}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,.08), ${c.b})`,
                  border: `1px solid rgba(255,255,255,.10)`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </PressTilt>
  );
}
