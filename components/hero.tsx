import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Badge de disponibilité */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-muted text-muted-foreground border border-border">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        Disponible pour missions freelance
      </div>

      {/* Titre principal */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        Joel Vutsumbwa
        <span className="block text-accent mt-2">Développeur Fullstack</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
        Je conçois des applications web modernes et sécurisées. 
        Actuellement en dernière année de Génie Informatique, je transforme 
        des idées complexes en solutions concrètes avec Next.js, Django et Docker.
      </p>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="#projects" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-background bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          Voir mes projets
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link 
          href="#contact" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Me contacter
          <Terminal className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}