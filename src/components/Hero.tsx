'use client'

import { motion } from 'motion/react'
import { ChevronDown, ArrowRight, Mail } from 'lucide-react'
import Terminal from './Terminal'

/**
 * Sección Hero - Pantalla de entrada del portafolio
 * Presenta el nombre y título con una terminal animada
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 pb-12 lg:pt-20 lg:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Fondo con efecto de gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent gradient-animate"></div>
      
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Columna izquierda - Presentación */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary text-xl font-mono"
          >
            Hola, soy
          </motion.h2>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
          >
            Bayron Gómez
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-400"
          >
            aka <span className="text-secondary">Cyphound</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl text-slate-300 max-w-xl"
          >
            Estudiante de Ingeniería Informática apasionado por el desarrollo web y móvil.
            Creando experiencias digitales innovadoras y personalizando ROMs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
          >
            {/* Botón 1: Ver Proyectos - fondo con shimmer y elevación al hover */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-3 rounded-lg font-semibold overflow-hidden text-white"
              aria-label="Ver Proyectos"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-80 btn-shimmer pointer-events-none" />
              <span className="relative z-10 flex items-center space-x-2">
                <ArrowRight size={16} className="text-white transform transition-transform duration-300 group-hover:translate-x-2 mr-4" />
                <span>Ver Proyectos</span>
              </span>
            </motion.a>

            {/* Botón 2: Contactar - borde animado y giro sutil al hover */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-3 border border-primary text-primary rounded-lg font-semibold overflow-hidden btn-border-anim"
              aria-label="Contactar"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Mail size={16} className="text-primary transform transition-transform duration-300 group-hover:-translate-y-1" />
                <span>Contactar</span>
              </span>
              <span className="absolute inset-0 pointer-events-none" />
            </motion.a>
          </motion.div>

          <style jsx>{`
            .btn-shimmer{
              background-size: 200% 100%;
              animation: shimmer 2.5s linear infinite;
              mix-blend-mode: screen;
            }

            @keyframes shimmer{
              0%{ background-position: -200% 0 }
              100%{ background-position: 200% 0 }
            }

            .btn-border-anim{
              transition: transform 200ms ease, color 200ms ease, background-color 200ms ease;
            }

            .btn-border-anim:hover{
              background: rgba(99,102,241,0.06); /* subtle fill on hover */
            }

            .btn-border-anim:hover::after{
              content: '';
              position: absolute;
              inset: -6px;
              border-radius: 8px;
              box-shadow: 0 8px 30px rgba(59,130,246,0.08);
              animation: border-pulse 1.6s ease-in-out infinite;
            }

            @keyframes border-pulse{
              0%{ box-shadow: 0 0 0 0 rgba(59,130,246,0.00) }
              50%{ box-shadow: 0 8px 30px 6px rgba(59,130,246,0.08) }
              100%{ box-shadow: 0 0 0 0 rgba(59,130,246,0.00) }
            }
          `}</style>
        </motion.div>

        {/* Columna derecha - Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[350px] md:h-[450px] lg:h-[500px]"
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block"
        style={{ left: '46%' }}
      >
        <ChevronDown size={32} className="text-primary" />
      </motion.a>
    </section>
  )
}