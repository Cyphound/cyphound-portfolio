"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const items = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Sobre mí" },
  { href: "/projects", label: "Proyectos" },
  { href: "/contact", label: "Contacto" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [activeSection, setActive] = useState("");

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 pt-3 sm:pt-4">
        <div className="glass ring-glow rounded-2xl px-3 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Brand */}
            <Link href="/" className="min-w-0">
              <div className="font-semibold tracking-tight text-white/90 truncate">
                {site.name}
              </div>
              <div className="text-sm text-white/60 truncate">
                {site.role}
              </div>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-1 overflow-x-auto sm:overflow-visible">
              {items.map((it) => {
                // Determine if the current navigation item is active
                // It's active if its href matches the current pathname OR the scroll-detected active section ID
                const isActive = pathname === it.href || (it.href === `/${activeSection}` && activeSection !== "");
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                      isActive ? "text-white" : "text-white/60 hover:text-white/90"
                    )}
                  >
                    {/* Active Background Pill */}
                    {/* Indicador de pestaña activa (Píldora deslizante) */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 z-0 rounded-full bg-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        {/* Optional: Add a subtle glow/border to the active pill */}
                        <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
                        <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)]" />
                      </motion.div>
                    )}

                    {/* Hover Effect (only when not active) */}
                    {!isActive && (
                      <div className="absolute inset-0 -z-10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      </div>
                    )}

                    <span className="relative z-10">{it.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
