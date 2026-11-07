
import { prisma } from "@/lib/prisma";
import { ProjectCard } from "./project-card";

export async function ProjectsSection() {
  // On va chercher les projets publiés directement dans la base de données
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // Si la base est vide, on affiche un message
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Projets Sélectionnés</h2>
        <p className="text-muted-foreground">Aucun projet publié pour le moment.</p>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Projets Sélectionnés</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id}
            title={project.title}
            description={project.description || ""}
            tags={project.techStack || []}
            link={`/projects/${project.slug}`}
             coverImage={project.coverImage || undefined} 
          />
        ))}
      </div>
    </section>
  );
}