'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, Send, CheckCircle } from 'lucide-react'
import { RiTelegram2Line } from "react-icons/ri";

/**
 * Sección de Contacto
 * Formulario de contacto y enlaces a redes sociales
 */
export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  // Manejador del formulario (aquí deberías implementar la lógica de envío)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    
    // Simular envío (reemplazar con lógica real)
    setTimeout(() => {
      setFormStatus('sent')
      setTimeout(() => setFormStatus('idle'), 3000)
    }, 2000)
  }

  const socialLinks = [
    { name: 'Email', icon: Mail, href: 'mailto:bayrongomez.cyp@gmail.com', color: 'hover:text-red-400' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/cyphound', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BXtYWsS%2BaSAaxfJGhlIqOKQ%3D%3D', color: 'hover:text-blue-400' },
    { name: 'Telegram', icon: RiTelegram2Line, href: 'https://t.me/cyphound', color: 'hover:text-sky-400' },
  ]

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Contacto <span className="text-primary">&</span> Redes
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos! Siempre estoy abierto a nuevas oportunidades
            y colaboraciones.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-darker border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-darker border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-darker border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-white resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="w-full px-8 py-3 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition-all glow-on-hover flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20 active:translate-y-0 duration-200 relative overflow-visible group"
              >
                <span className="flex items-center space-x-2 relative z-10 button-content">
                  {formStatus === 'idle' && (
                    <>
                      <Send size={22} className="transform group-hover:rotate-12 transition-transform duration-200" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                  {formStatus === 'sending' && <span>Enviando...</span>}
                  {formStatus === 'sent' && (
                    <>
                      <CheckCircle size={20} />
                      <span>Mensaje Enviado</span>
                    </>
                  )}
                </span>
                {/* Línea gradiente animada debajo del contenido */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-2/3 h-[3px] rounded-full bg-gradient-to-l from-primary via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </form>
          </motion.div>

          {/* Información de contacto y redes sociales */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Redes sociales */}
            <div className="bg-darker p-8 rounded-lg border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Conéctate conmigo</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className={`flex items-center space-x-3 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all ${social.color} hover:scale-105`}
                  >
                    <social.icon size={28} className="sm:w-8 sm:h-8" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-darker p-8 rounded-lg border border-slate-700">
              <h3 className="text-2xl font-bold mb-4">Disponibilidad</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Actualmente estoy disponible para proyectos freelance y colaboraciones. 
                Mi tiempo de respuesta habitual es de 24-48 horas.
              </p>
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Disponible para proyectos</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}