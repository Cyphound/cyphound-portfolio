'use client'

import { useEffect, useState, useRef } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

/**
 * Componente de terminal animada
 * Simula código Flutter escribiéndose automáticamente
 */
export default function Terminal() {
  const [text, setText] = useState('')
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Usaremos refs internos para llevar el índice de línea y carácter
  // y evitar reinicios por dependencias en useEffect
  const lineRef = useRef<number>(0)
  const charRef = useRef<number>(0)

  // Código Kotlin a mostrar línea por línea
  const codeLines = [
    'import kotlinx.coroutines.*',
    'import kotlinx.serialization.*',
    '',
    '@Serializable',
    'data class Developer(',
    '    val name: String,',
    '    val skills: List<String>,',
    ')',
    '',
    'class Portfolio {',
    '    suspend fun presentDeveloper() = coroutineScope {',
    '        val greeting = async { "¡Hola! Soy ${developer.name}" }',
    '        val skills = async { developer.skills.joinToString(", ") }',
    '',
    '        println(greeting.await())',
    '        println("Tecnologías: ${skills.await()}")',
    '    }',
    '}',
    '',
    'suspend fun main() {',
    '    Portfolio().presentDeveloper()',
    '}',
  ]

  // Efecto para escribir el código carácter a carácter (un solo interval)
  useEffect(() => {
    let mounted = true

    const tick = () => {
      if (!mounted) return

      // Si completamos todas las líneas, terminar
      if (lineRef.current >= codeLines.length) return

      const currentLineText = codeLines[lineRef.current]

      // Si aún no hemos tipeado todos los caracteres de la línea actual
      if (charRef.current < currentLineText.length) {
        charRef.current += 1
        // Crear el texto actual combinando las líneas previas + la porción actual de la línea
        const prevLines = codeLines.slice(0, lineRef.current).join('\n')
        const composed = prevLines + (prevLines ? '\n' : '') + currentLineText.slice(0, charRef.current)
        setText(composed)
      } else {
        // Línea completa: pasar a la siguiente línea después de una pequeña pausa
        lineRef.current += 1
        charRef.current = 0
        setCurrentLine(lineRef.current)
        // Añadir la línea completa al texto (asegura el salto de línea)
        const composed = codeLines.slice(0, lineRef.current).join('\n')
        setText(composed)
      }
    }

    const interval = setInterval(() => {
      // Si alcanzamos el final, limpiar interval
      if (lineRef.current >= codeLines.length) {
        clearInterval(interval)
        return
      }
      tick()
    }, 30)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  // Cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Auto-scroll cuando el texto cambia (para móviles/pequeñas áreas)
  useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [text])

  return (
    <div className="w-full h-full bg-darker rounded-lg shadow-2xl overflow-hidden border border-slate-700 flex flex-col">
      {/* Header de la terminal */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <TerminalIcon size={16} className="text-slate-500" />
          <span className="text-sm text-slate-500">Main.kt</span>
        </div>
      </div>

      {/* Contenido de la terminal */}
      <div className="flex-1 bg-[#282c34]">
        <div ref={containerRef} className="p-4 h-full overflow-auto">
          <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap break-words md:whitespace-pre">
            <code>
              {text}
              {showCursor && <span className="terminal-cursor text-primary">|</span>}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}