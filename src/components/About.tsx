'use client'

import { motion } from 'motion/react'
import { GraduationCap, Code2, Smartphone } from 'lucide-react'

/**
 * Sección Sobre mí
 * Presenta información personal y académica
 */
export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Estudiante',
      description: 'Ingeniería Informática en progreso, aprendiendo constantemente nuevas tecnologías.',
    },
    {
      icon: Code2,
      title: 'Desarrollador Full Stack',
      description: 'Especializado en React, Next.js, y desarrollo backend con Python y C#.',
    },
    {
      icon: Smartphone,
      title: 'Dev Móvil & ROMs',
      description: 'Desarrollo de aplicaciones móviles con Flutter y Java, además de mantener Custom ROMs.',
    },
  ]

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-dark/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Sobre <span className="text-primary">Mí</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="bg-darker p-6 rounded-lg border border-slate-700 hover:border-primary glow-on-hover"
            >
              <item.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-lg text-slate-300 leading-relaxed">
            Soy un estudiante apasionado por la tecnología con experiencia en desarrollo web y móvil.
            Me encanta explorar nuevas tecnologías y crear soluciones innovadoras. Actualmente,
            además de mis estudios, trabajo en proyectos personales y contribuyo a la comunidad de
            Custom ROMs, ayudando a otros usuarios a personalizar sus dispositivos.
          </p>
        </motion.div>
      </div>
    </section>
  )
}