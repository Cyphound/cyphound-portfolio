"use client";

// Lista de habilidades técnicas
const skills = [
  "Next.js", "React", "TypeScript", "Tailwind v4", "Firebase",
  "Node", "MySQL", "Git/GitHub", "Vercel", "UX/UI", "NoSQL", "Flutter", "Dart",
  "Python", "R", "Flask", "Django", "Docker", "AWS", "Java", "Android"
];

function Pill({ text }: { text: string }) {
  return (
    <div className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 border border-white/10">
      {text}
    </div>
  );
}

export default function SkillsMarquee() {
  const row = [...skills, ...skills, ...skills];

  return (
    <div className="relative overflow-hidden rounded-3xl glass">
      {/* fade de bordes (máscara de opacidad para efecto suave) */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="py-6">
        <div className="marquee flex w-max gap-3 px-6">
          {row.map((s, i) => <Pill key={`${s}-${i}`} text={s} />)}
        </div>
      </div>
    </div>
  );
}
