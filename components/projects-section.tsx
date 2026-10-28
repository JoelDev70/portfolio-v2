
//   {
//     title: "Portfolio v2",
//     description: "Mon portfolio personnel avec espace admin, blog intégré et gestion de contenu dynamique.",
//     tags: ["Next.js", "Prisma", "Tailwind CSS"],
//     link: "/projects/portfolio"
//   }
// ];

// export function ProjectsSection() {
//   return (
//     <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5 }}
//         className="flex items-center gap-4 mb-12"
//       >
//         <h2 className="text-3xl font-bold tracking-tight">Projets Sélectionnés</h2>
//         <div className="h-px bg-border flex-1"></div>
//       </motion.div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//           <motion.div
//             key={project.title}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }} // <-- On utilise 'animate' au lieu de 'whileInView' pour être sûr que ça s'affiche
//             transition={{ duration: 0.5, delay: index * 0.2 }}
//           >
//             <ProjectCard {...project} />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }




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
          />
        ))}
      </div>
    </section>
  );
}