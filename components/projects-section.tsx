"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";

interface Project {
  id: string;
  title: string;
  description: string | null;
  techStack: string[] | null;
  slug: string;
  coverImage: string | null;
  category: string | null;
  results: string | null;
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Projets Sélectionnés</h2>
        <p className="text-muted-foreground">Aucun projet publié pour le moment.</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Projets Sélectionnés</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      {/* LA GRILLE (On garde 2 colonnes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            // L'animation d'apparition (slide up + fade)
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            // L'animation de survol (la carte se soulève)
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <ProjectCard 
              title={project.title}
              description={project.description || ""}
              tags={project.techStack || []}
              link={`/projects/${project.slug}`}
              coverImage={project.coverImage || undefined}
              category={project.category || undefined}
              result={project.results || undefined}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

