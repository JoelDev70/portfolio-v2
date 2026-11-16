"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck, Rocket } from "lucide-react";
import { SpotlightCard } from "./spotlight-card";

export function ServicesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      
      {/* --- BACKGROUND SUBTIL --- */}
      {/* Une grille très discrète en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Une lueur douce en haut à droite pour casser la monotonie */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Conteneur principal (pour que le contenu soit au-dessus du fond) */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ce que je fais</h2>
          <div className="h-px bg-border flex-1"></div>
        </div>

        {/* Bento Grid (Grille asymétrique) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Grande carte (Fullstack) - Prend 2 colonnes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <SpotlightCard className="h-full p-8 md:p-10 bg-gradient-to-br from-background to-muted/10 group">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Code2 className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Développement Fullstack</h3>
                  <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
                    Je conçois des applications web complètes, de la base de données à l'interface utilisateur. Un seul interlocuteur pour tout votre projet.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Next.js", "React", "Django", "Node.js", "PostgreSQL"].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-background border border-border/50 rounded-lg text-sm font-medium hover:border-accent/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 2. Petite carte (Sécurité) - Prend 1 colonne */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SpotlightCard className="h-full p-8 group">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sécurité & Architecture</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Authentification forte (JWT), tests automatisés et protection des données de niveau bancaire.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["JWT", "Tests", "CI/CD"].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 3. Petite carte (DevOps) - Prend 1 colonne */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SpotlightCard className="h-full p-8 group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Déploiement & DevOps</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Conteneurisation Docker, déploiement continu (CI/CD) sur Vercel et Railway.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Docker", "Vercel", "Prisma"].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 4. Bandeau informatif (Prend 2 colonnes) - SANS bouton contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <SpotlightCard className="h-full p-8 flex items-center bg-accent/5 border-accent/20">
              <p className="text-muted-foreground text-lg">
                <strong className="text-foreground">Besoin d'un site vitrine ou d'une refonte ?</strong> Je m'occupe de tout : design, développement, mise en ligne et maintenance.
              </p>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



// "use client";

// import { motion } from "framer-motion";
// import { Code2, ShieldCheck, Rocket, ArrowUpRight } from "lucide-react";
// import { SpotlightCard } from "./spotlight-card";

// export function ServicesSection() {
//   return (
//     <section className="py-24 px-4 max-w-6xl mx-auto">
      
//       {/* En-tête */}
//       <div className="flex items-center gap-4 mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ce que je fais</h2>
//         <div className="h-px bg-border flex-1"></div>
//       </div>

//       {/* Bento Grid (Grille asymétrique) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* 1. Grande carte (Fullstack) - Prend 2 colonnes */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="md:col-span-2"
//         >
//           <SpotlightCard className="h-full p-8 md:p-10 bg-gradient-to-br from-background to-muted/10 group">
//             <div className="flex flex-col h-full justify-between">
//               <div>
//                 <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
//                   <Code2 className="h-7 w-7 text-accent" />
//                 </div>
//                 <h3 className="text-3xl font-bold mb-4">Développement Fullstack</h3>
//                 <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
//                   Je conçois des applications web complètes, de la base de données à l'interface utilisateur. Un seul interlocuteur pour tout votre projet.
//                 </p>
//               </div>
              
//               <div className="flex flex-wrap gap-2 mt-auto">
//                 {["Next.js", "React", "Django", "Node.js", "PostgreSQL"].map(tag => (
//                   <span key={tag} className="px-3 py-1.5 bg-background border border-border/50 rounded-lg text-sm font-medium hover:border-accent/30 transition-colors">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </SpotlightCard>
//         </motion.div>

//         {/* 2. Petite carte (Sécurité) - Prend 1 colonne */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <SpotlightCard className="h-full p-8 group">
//             <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//               <ShieldCheck className="h-6 w-6 text-green-400" />
//             </div>
//             <h3 className="text-xl font-bold mb-3">Sécurité & Architecture</h3>
//             <p className="text-muted-foreground text-sm leading-relaxed mb-8">
//               Authentification forte (JWT), tests automatisés et protection des données de niveau bancaire.
//             </p>
//             <div className="flex flex-wrap gap-2 mt-auto">
//               {["JWT", "Tests", "CI/CD"].map(tag => (
//                 <span key={tag} className="px-2.5 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </SpotlightCard>
//         </motion.div>

//         {/* 3. Petite carte (DevOps) - Prend 1 colonne */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <SpotlightCard className="h-full p-8 group">
//             <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//               <Rocket className="h-6 w-6 text-orange-400" />
//             </div>
//             <h3 className="text-xl font-bold mb-3">Déploiement & DevOps</h3>
//             <p className="text-muted-foreground text-sm leading-relaxed mb-8">
//               Conteneurisation Docker, déploiement continu (CI/CD) sur Vercel et Railway.
//             </p>
//             <div className="flex flex-wrap gap-2 mt-auto">
//               {["Docker", "Vercel", "Prisma"].map(tag => (
//                 <span key={tag} className="px-2.5 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </SpotlightCard>
//         </motion.div>

//         {/* 4. Bandeau d'appel à l'action (Prend 2 colonnes) */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="md:col-span-2"
//         >
//           <SpotlightCard className="h-full p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-accent/5 border-accent/20 group">
//             <div>
//               <h3 className="text-2xl font-bold mb-2">Besoin d'un site vitrine ?</h3>
//               <p className="text-muted-foreground">
//                 Design, développement, mise en ligne et maintenance. Discutons de votre projet.
//               </p>
//             </div>
//             <a 
//               href="#contact" 
//               className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shrink-0 group-hover:scale-105"
//             >
//               Me contacter
//               <ArrowUpRight className="h-4 w-4" />
//             </a>
//           </SpotlightCard>
//         </motion.div>

//       </div>
//     </section>
//   );
// }



