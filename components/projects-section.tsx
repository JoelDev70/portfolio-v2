import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  const projects = [
    {
      title: "AMICONGO Export",
      description: "Plateforme complète de gestion d'exportation avec sécurité de niveau bancaire, tests automatisés et CI/CD.",
      tags: ["Next.js", "Django", "PostgreSQL", "Docker"],
      link: "/projects/amicongo"
    },
    {
      title: "Portfolio v2",
      description: "Mon portfolio personnel avec espace admin, blog intégré et gestion de contenu dynamique.",
      tags: ["Next.js", "Prisma", "Tailwind CSS"],
      link: "/projects/portfolio"
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Projets Sélectionnés</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard 
            key={project.title}
            {...project}
          />
        ))}
      </div>
    </section>
  );
}