import { projects } from "@/lib/projects";
import ProjectsGrid from "./ProjectsGrid";

export default function ProjectsSection() {
  return (
    <section id="projects" className="mt-24">
      <div className="mb-6">
        <h2 className="mt-2 text-3xl font-semibold text-white/95">Proyectos que he trabajado</h2>
      </div>

      <ProjectsGrid projects={projects} />
    </section>
  );
}
