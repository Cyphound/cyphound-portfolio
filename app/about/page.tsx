import Section from "@/components/Section";
import AboutTerminal from "@/components/about/AboutTerminal";
import AboutStats from "@/components/about/AboutStats";

export default function AboutPage() {
  return (
    <Section title="Sobre mí">
      <div className="grid gap-4">
        <AboutTerminal />
        <AboutStats />
      </div>
    </Section>
  );
}
