import { Code2, GraduationCap, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">À propos de <span className="text-accent">moi</span></h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Je suis Joel Vutsumbwa, un développeur Fullstack passionné par la création d'applications web modernes, sécurisées et centrées sur l'utilisateur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Rocket className="h-6 w-6 text-accent" /> Mon parcours
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Actuellement en dernière année de Licence en Génie Informatique, j'ai toujours été fasciné par la capacité du code à résoudre des problèmes concrets. 
                Ce qui a commencé comme une simple curiosité s'est transformé en une véritable vocation.
              </p>
              <p>
                Au fil de mes études et de mes projets personnels, j'ai développé une expertise solide sur l'ensemble de la stack web, du frontend avec Next.js et React, 
                jusqu'au backend avec Django et Express, sans oublier la gestion de bases de données avec PostgreSQL et la conteneurisation avec Docker.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-accent" /> Ma philosophie de travail
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Pour moi, un bon développeur ne se contente pas d'écrire du code qui fonctionne. Il écrit du code qui est <strong>lisible, testé et sécurisé</strong>.
              </p>
              <p>
                C'est cette rigueur que j'applique dans chaque projet, comme en témoigne mon travail sur AMICONGO Export (plus de 10 000 lignes de code, 62 tests automatisés, et une sécurité de niveau bancaire). 
                Je crois fermement que la qualité et la communication sont les clés d'une collaboration réussie.
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-muted/10 border border-border rounded-2xl">
            <GraduationCap className="h-8 w-8 text-accent mb-4" />
            <h3 className="font-bold mb-2">Formation</h3>
            <p className="text-sm text-muted-foreground">Licence en Génie Informatique (en cours)</p>
          </div>

          <div className="p-6 bg-muted/10 border border-border rounded-2xl">
            <Code2 className="h-8 w-8 text-accent mb-4" />
            <h3 className="font-bold mb-2">Spécialités</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Next.js & React</li>
              <li>• Django & Express.js</li>
              <li>• PostgreSQL & Prisma</li>
              <li>• Docker & CI/CD</li>
            </ul>
          </div>

          <Link href="/#contact" className="block w-full py-3 text-center bg-accent text-accent-foreground font-medium rounded-xl hover:bg-accent/90 transition-colors">
            Travaillons ensemble
          </Link>
        </div>
      </div>
    </main>
  );
}