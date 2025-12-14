# Portfolio - Bayron Gómez

Este repositorio contiene el código fuente de mi portafolio personal, diseñado para mostrar mis habilidades, proyectos y experiencia en desarrollo web y software.

El proyecto se enfoca en una experiencia de usuario (UX) fluida, animaciones modernas y un diseño visual "cyberpunk/clean".

## 🛠 Tecnologías Principales

Este proyecto está construido con un stack moderno y enfocado en rendimiento:

-   **Next.js 15 (App Router)**: Framework principal para React, usando Server Components y optimización de rutas.
-   **React & TypeScript**: Biblioteca de UI y tipado estático para un código robusto.
-   **Tailwind CSS (v4)**: Framework de estilos "utility-first" para un diseño rápido y responsivo.
-   **Framer Motion**: Biblioteca potente para todas las animaciones (transiciones de página, scroll, hovers).
-   **EmailJS**: Servicio para el envío de formularios de contacto directamente desde el frontend sin backend complejo.
-   **Lucide React**: Iconografía ligera y moderna.

## 📂 Estructura del Proyecto

Los archivos principales están organizados de la siguiente manera:

-   **/app**: Contiene las rutas y el layout principal (`layout.tsx`, `page.tsx`, `globals.css`).
-   **/components**: Componentes reutilizables de la interfaz.
    -   `/about`: Componentes específicos de la sección "Sobre mí" (Terminal, Stats).
    -   `/background`: Efectos de fondo (Puntos interactivos, Grilla).
    -   `NavBar.tsx`: Barra de navegación con indicador activo animado.
    -   `Intro.tsx`: Pantalla de carga inicial estilo terminal.
    -   `ContactUplink.tsx`: Formulario de contacto con lógica de EmailJS.
-   **/lib**: Utilidades y configuraciones.
    -   `site.ts`: Configuración global del sitio (nombre, roles, textos).
    -   `cn.ts`: Utilidad para combinar clases de Tailwind condicionalmente.

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para correr el proyecto localmente:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Cyphound/cyphound-portfolio
    cd cyphound-portfolio
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto y agrega tus credenciales de EmailJS (ver sección abajo).

4.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000` o el que te da la terminal en tu navegador.

## 📧 Configuración

El proyecto utiliza **EmailJS** para el formulario de contacto. Para que funcione localmente, necesitas un archivo `.env.local` con tus claves:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## ☁️ Despliegue

Este proyecto está optimizado para **Vercel**. Al desplegar, recuerda configurar las **Variables de Entorno** en el panel de Vercel con los mismos valores que tu archivo local.

---

Desarrollado con ❤️ por Bayron Gómez.
