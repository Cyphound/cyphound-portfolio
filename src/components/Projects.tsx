'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { div } from 'motion/react-client'

/**
 * Sección de Proyectos
 * Muestra los proyectos destacados del portafolio
 */
export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: 'NuamTax',
      description:
        'Sistema de gestión tributaria para Nuam. Permite generar reportes y una carga masiva de calificaciones tributarias.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      image: '/img/NuamTaxProject.png',
      github: 'https://github.com/CobreTech/nuam-prototype',
      demo: 'https://nuamtax--nuamtax.us-central1.hosted.app/',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Intranet Lavandería el Cobre',
      description:
        'Sistema de gestión de lavandería para El Cobre. Permite la gestión de pedidos, clientes y stock.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
      image: '/img/ElCobreProject.png',
      github: 'https://github.com/benjamon19/lavanderia.del.cobre-landingpage',
      demo: 'https://lavanderia-del-cobre-landingpage.vercel.app/',
      gradient: 'from-green-500 to-cyan-500',
    },
  ]

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-dark/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Mis <span className="text-primary">Proyectos</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-darker rounded-lg overflow-hidden border border-slate-700 hover:border-primary transition-all glow-on-hover"
            >
              <div className="grid md:grid-cols-2">
                {/* Imagen del proyecto */}
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover md:object-contain rounded-lg transition-all duration-300"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </div>

                {/* Información del proyecto */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-slate-300 mb-6">{project.description}</p>
                    
                    {/* Tecnologías */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (<span
                          key={tech}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enlaces */}
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                      <Github size={20} />
                      <span>Código</span>
                    </a>
                    
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}