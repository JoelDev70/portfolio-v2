"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck, Rocket } from "lucide-react";
import { SpotlightCard } from "./spotlight-card";

export function ServicesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      
      {/* BACKGROUND (Plus visible) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ce que je fais</h2>
          <div className="h-px bg-border flex-1"></div>
        </div>

        {/* Layout en 2 colonnes : Services à gauche, Vidéo à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- COLONNE GAUCHE : LES SERVICES (7/12) --- */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 1. Grande carte (Fullstack) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard className="p-8 md:p-10 bg-background/80 backdrop-blur-sm group border-border/60">
                <div className="flex flex-col">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Code2 className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Développement Fullstack</h3>
                  <p className="text-muted-foreground text-base max-w-lg mb-6 leading-relaxed">
                    Je conçois des applications web complètes, de la base de données à l'interface utilisateur. Un seul interlocuteur pour tout votre projet.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Django", "Node.js", "PostgreSQL"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-muted/50 border border-border/50 rounded-lg text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* 2. Deux petites cartes côte à côte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SpotlightCard className="h-full p-6 bg-background/80 backdrop-blur-sm group border-border/60">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Sécurité</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Authentification forte (JWT), tests automatisés et protection des données.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["JWT", "Tests"].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-muted/50 rounded-md text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SpotlightCard className="h-full p-6 bg-background/80 backdrop-blur-sm group border-border/60">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Rocket className="h-5 w-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">DevOps</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Conteneurisation Docker, déploiement continu (CI/CD).
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Docker", "CI/CD"].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-muted/50 rounded-md text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>

          </div>

          {/* --- COLONNE DROITE : LA VIDÉO FLOTTANTE (5/12) --- */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-accent/10 aspect-[4/5]"
            >
              {/* La vidéo (Assure-toi que le fichier existe dans public/uploads/coding.mp4) */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-80"
              >
                <source src="/uploads/coding.mp4" type="video/mp4" />
                {/* Si la vidéo ne charge pas, on affiche une image de fallback */}
                <img src="/uploads/avatar.JPG" alt="Coding" className="w-full h-full object-cover" />
              </video>
              
              {/* Overlay pour intégrer la vidéo à ton thème sombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


