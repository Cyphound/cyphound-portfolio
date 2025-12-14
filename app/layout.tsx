import "./globals.css"; // Global styles for the application
import type { Metadata } from "next"; // Type definition for Next.js metadata
import { site } from "@/lib/site"; // Site configuration data

// Core layout components
import Intro from "@/components/Intro"; // Initial intro animation/splash screen
import TopHUD from "@/components/TopHUD"; // Head-Up Display at the top of the page
import Background from "@/components/background/Background"; // Background visual component
import NavBar from "@/components/NavBar"; // Main navigation bar

export const metadata: Metadata = {
  title: `${site.name} · Portfolio`,
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen overflow-x-hidden">
        <Intro />
        <TopHUD />
        <Background />
        <NavBar />

        <main className="relative mx-auto w-full max-w-6xl px-5 pt-40 sm:pt-24 pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
