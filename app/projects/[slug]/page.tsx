"use client"; // Nécessaire pour Framer Motion

import Link from "next/link";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { motion } from "framer-motion";

const projectData = {
  title: "AMICONGO Export",
  subtitle: "Plateforme complète de gestion d'exportation",
  context: "Le client avait besoin de centraliser ses opérations d'exportation qui étaient gérées sur des fichiers Excel dispersés, créant des risques d'erreurs et de pertes de données.",
  problem: "Comment garantir l'intégrité des données, automatiser les calculs de taxes et sécuriser les accès tout en gardant une interface simple pour les opérateurs ?",
  solution: "J'ai développé une architecture Fullstack avec Next.js pour le frontend et Django pour le backend. La base de données PostgreSQL est gérée via Docker. J'ai mis en place une authentification forte (JWT), des tests unitaires (62 tests) et un pipeline CI/CD.",
  results: "Temps de traitement des dossiers réduit de 40%. Zéro perte de données depuis la mise en production. Le client a pu passer de 10 à 50 utilisateurs simultanés sans ralentissement.",
  tags: ["Next.js", "Django", "PostgreSQL", "Docker", "CI/CD"],
  liveUrl: "https://amicongo.com",
  repoUrl: "https://github.com/JoelDev70/amicongo",
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      {/* Bouton Retour */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Retour aux projets
        </Link>
      </motion.div>

      {/* En-tête du projet */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16"
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {projectData.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">{projectData.title}</h1>
        <p className="text-xl text-muted-foreground">{projectData.subtitle}</p>
        
        <div className="flex gap-4 mt-8">
          <a href={projectData.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Voir le site <ExternalLink className="h-4 w-4" />
          </a>
          <a href={projectData.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors">
            Code source <Code className="h-4 w-4" />
          </a>
        </div>
      </motion.header>

      {/* Image de couverture */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className="aspect-video w-full bg-muted rounded-xl mb-16 flex items-center justify-center border border-border"
      >
        <span className="text-muted-foreground">Image de couverture à venir</span>
      </motion.div>

      {/* Le Case Study */}
      <div className="space-y-16">
        {[
          { title: "Le Contexte", content: projectData.context },
          { title: "Le Problème", content: projectData.problem },
          { title: "La Solution", content: projectData.solution },
        ].map((section, index) => (
          <motion.section 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">0{index + 1}.</span> {section.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{section.content}</p>
          </motion.section>
        ))}

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-muted/30 border border-border rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-accent">04.</span> Les Résultats
          </h2>
          <p className="text-lg text-foreground leading-relaxed font-medium">{projectData.results}</p>
        </motion.section>
      </div>
    </main>
  );
}