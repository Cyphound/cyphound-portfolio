"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 pt-3 sm:pt-4">
          <div className="glass ring-glow rounded-2xl px-3 sm:px-4 py-3 relative z-50 bg-black/40 backdrop-blur-md border border-white/10">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              {/* Brand */}
              <Link href="/" className="min-w-0 flex flex-col">
                <div className="font-semibold tracking-tight text-white/90 truncate">
                  {site.name}
                </div>
                <div className="text-sm text-white/60 truncate">
                  {site.role}
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden sm:flex items-center gap-1">
                {items.map((it) => {
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
                          <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
                          <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)]" />
                        </motion.div>
                      )}

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

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden relative z-50 p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 sm:hidden bg-black/60 backdrop-blur-xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6 p-4 w-full max-w-xs">
              {items.map((it, idx) => {
                 const isActive = pathname === it.href;
                 return (
                  <motion.div
                    key={it.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.3 }}
                    className="w-full"
                  >
                    <Link
                      href={it.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block w-full text-center py-4 text-2xl font-medium transition-all duration-300 rounded-2xl",
                        isActive 
                          ? "text-white bg-white/10 ring-1 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {it.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

