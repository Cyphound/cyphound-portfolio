import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

/**
 * Página principal del portafolio
 * Estructura modular con todos los componentes principales
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-darker text-slate-100">
      {/* Navegación fija */}
      <Navbar />
      
      {/* Secciones del portafolio */}
      <div className="container mx-auto px-12 py-4">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
      
      {/* Footer personalizado */}
      <footer className="bg-gradient-to-b from-dark via-darker to-slate-900 py-14 px-4 text-center border-t border-slate-800 shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-semibold text-slate-200">
            Hecho con <span className="inline-block">❤️</span> y mucho <span className="inline-block">☕</span> <span className="text-xs text-slate-400"></span>
          </p>
          <p className="text-lg text-primary font-bold">Bayron Gómez</p>
          <p className="text-slate-400 text-sm mt-2">
            Proyecto realizado con <span className="font-bold text-sky-400">Next.js</span> y <span className="font-bold text-teal-400">Tailwind CSS</span>
          </p>
          <p className="text-xs text-slate-500 mt-4">&copy; 2025. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}