"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6" >
      {projects.map((p) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <ProjectCard p={p} />
        </motion.div>
      ))}
    </div>
  );
}
