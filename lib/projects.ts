export type Project = {
  title: string;
  short: string;
  desc: string;
  image?: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  accent: "acg" | "nuamtax" | "lavanderia";
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "NuamTax · Gestión masiva tributaria + IA",
    short: "CSV → validación → reportes + asistente IA",
    desc:
      "Web app para cargar calificaciones tributarias masivas mediante CSV, generar reportes estilo DJ, gestionar usuarios/admin y añadir un asistente IA contextual para el corredor.",
    image: "/img/nuamtax.png",
    tags: ["SaaS", "CSV", "IA", "Dashboard"],
    stack: ["Next.js", "Firebase", "Gemini (chat)", "Vercel"],
    highlights: [
      "Validación + parsing de CSV a escala",
      "Reportes y administración con roles",
      "Chat contextual para soporte operativo",
    ],
    accent: "nuamtax",
    href: "https://nuamtax.vercel.app/",
    repo: "https://github.com/CobreTech/NuamTax/",
  },
  {
    title: "Intranet · Lavandería El Cobre",
    short: "Intranet segura + integración por token",
    desc:
      "Intranet en React + Firebase capaz de integrarse con módulos externos mediante token, manteniendo roles claros, navegación limpia y una superficie de ataque controlada.",
    image: "/img/elcobre.png",
    tags: ["Intranet", "Seguridad", "Integraciones"],
    stack: ["React", "Firebase Auth", "Firestore"],
    highlights: [
      "Integración con módulos vía token",
      "Roles y experiencia consistente",
      "Estructura preparada para crecer",
    ],
    accent: "lavanderia",
    href: "https://lavanderia-el-cobre.vercel.app/",
    repo: "https://github.com/benjamon19/lavanderia.el.cobre-landingpage",
  },
  {
    title: "ACG · Contratos electrónicos (Windows)",
    short: "Genera + firma contratos laborales",
    desc:
      "Aplicación para Windows que permite crear, generar y firmar contratos de trabajo electrónicos. Flujo guiado, validaciones, plantillas y trazabilidad.",
    image: "/img/acg.png",
    tags: ["Desktop", "Firma", "Automatización"],
    stack: ["Flutter", "Flask", "MySQL"],
    highlights: [
      "Generación de documentos con plantillas",
      "Flujo de firma y control de versiones",
      "Persistencia y auditoría básica",
    ],
    accent: "acg",
    href: "https://github.com/AppaTec-cl/Appatec-Web/blob/main/descargas/ACG-Setup.exe",
    repo: "https://github.com/AppaTec-cl/Appa-Front",
  },
];
