'use client'
import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Code, FolderGit2, Mail } from 'lucide-react'

/**
 * Componente de navegación con menú responsive
 * Se oculta/muestra según el scroll y tiene un menú móvil
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'deleting' | 'writing' | 'complete'>('idle')
  const [displayText, setDisplayText] = useState('<Cyphound />')

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Efecto de escritura/borrado para el logo
  useEffect(() => {
    const originalText = '<Cyphound />'
    const targetText = '<Bayron />'

    if (phase === 'idle') {
      if (displayText !== originalText) {
        setDisplayText(originalText)
      }
      return
    }

    if (phase === 'complete') {
      if (displayText !== targetText) {
        setDisplayText(targetText)
      }
      return
    }

    if (phase === 'deleting') {
      if (!targetText.startsWith(displayText)) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setPhase('writing')
      }
    }

    if (phase === 'writing') {
      if (displayText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        setPhase('complete')
      }
    }
  }, [phase, displayText])

  const navLinks = [
    { name: 'Inicio', href: '#hero', icon: Home, gradient: 'from-cyan-400 to-blue-500' },
    { name: 'Sobre mí', href: '#about', icon: User, gradient: 'from-purple-400 to-pink-500' },
    { name: 'Habilidades', href: '#skills', icon: Code, gradient: 'from-green-400 to-emerald-500' },
    { name: 'Proyectos', href: '#projects', icon: FolderGit2, gradient: 'from-orange-400 to-red-500' },
    { name: 'Contacto', href: '#contact', icon: Mail, gradient: 'from-yellow-400 to-amber-500' },
  ]

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Overlay oscuro cuando el menú está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a 
              href="#hero" 
              className="text-2xl font-bold text-primary hover:text-secondary transition-colors relative"
              onMouseEnter={() => phase === 'idle' && setPhase('deleting')}
              onMouseLeave={() => phase === 'deleting' && setPhase('idle')}
            >
              <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{'<Cyphound />'}</span>
              <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>
                {displayText}
                {(phase === 'deleting' || phase === 'writing') && <span className="animate-pulse">|</span>}
              </span>
            </a>

            {/* Links de navegación - Desktop */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 text-slate-300 hover:text-primary transition-colors relative group"
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                  {/* Línea gradiente inferior */}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r ${link.gradient} group-hover:w-full transition-all duration-300`}></span>
                </a>
              ))}
            </div>

            {/* Botón menú móvil */}
            <button
              className="md:hidden text-slate-300 hover:text-primary z-50 relative"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div 
          className={`md:hidden fixed top-16 right-0 w-64 h-screen bg-dark/98 backdrop-blur-sm shadow-2xl transition-transform duration-300 z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="px-2 pt-4 pb-3 space-y-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-primary hover:bg-darker/50 rounded-md transition-all relative group overflow-hidden"
                onClick={() => setIsOpen(false)}
                style={{
                  animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <link.icon size={20} />
                <span>{link.name}</span>
                {/* Línea gradiente inferior para móvil */}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${link.gradient} group-hover:w-full transition-all duration-300`}></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}