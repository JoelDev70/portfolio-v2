import Link from "next/link";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug: slug }
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      {/* Bouton Retour */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-12 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Retour aux projets
      </Link>

      {/* En-tête du projet */}
      <header className="mb-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">{project.title}</h1>
        <p className="text-xl text-muted-foreground">{project.subtitle || "Détails du projet"}</p>
        
        {/* BOUTONS URLS - On vérifie si les liens existent avant de les afficher */}
        <div className="flex gap-4 mt-8">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Voir le site <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.repoUrl && (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              Code source <Code className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      {/* Image de couverture */}
      {project.coverImage ? (
        <div className="aspect-video w-full rounded-xl mb-16 overflow-hidden border border-border">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-video w-full bg-muted rounded-xl mb-16 flex items-center justify-center border border-border">
          <span className="text-muted-foreground">Image de couverture à venir</span>
        </div>
      )}

      {/* Le Case Study */}
      <div className="space-y-16">
        {project.context && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">01.</span> Le Contexte
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.context}</p>
          </section>
        )}

        {project.problem && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">02.</span> Le Problème
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.problem}</p>
          </section>
        )}

        {project.solution && (
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">03.</span> La Solution
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
          </section>
        )}

        {project.results && (
          <section className="p-8 bg-muted/30 border border-border rounded-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">04.</span> Les Résultats
            </h2>
            <p className="text-lg text-foreground leading-relaxed font-medium">{project.results}</p>
          </section>
        )}
      </div>
    </main>
  );
}