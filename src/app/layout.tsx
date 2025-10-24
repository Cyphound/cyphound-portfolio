import type { Metadata } from 'next'
import './globals.css'
import '@/components/BackgroundAnimation'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export const metadata: Metadata = {
  title: 'Cyphound - Bayron Gómez | Portafolio',
  description: 'Portafolio profesional de Bayron Gómez (Cyphound), estudiante de Ingeniería Informática especializado en desarrollo web y móvil.',
  keywords: 'desarrollo web, react, nextjs, flutter, desarrollador, portafolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body><BackgroundAnimation />{children}</body>
    </html>
  )
}