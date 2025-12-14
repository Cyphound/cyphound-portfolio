import Hero from "@/components/Hero";
import Section from "@/components/Section";
import TimelineReal from "@/components/TimelineReal";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-32 space-y-32">
      {/* Sección Hero: Bienvenida e Introducción */}
      <div className="pt-10">
        <Hero />
      </div>

      <Section title="Skills que domino" kicker="Stack">
        <SkillsMarquee />
      </Section>

      <Section title="Timeline" kicker="Historia">
        <TimelineReal />
      </Section>
    </main>
  );
}
