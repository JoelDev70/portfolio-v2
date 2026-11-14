"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Code2, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  
  // On lie le scroll de cette page spécifiquement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Effet accentué : la photo tourne de 5° à -15° et descend de 150px
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Effet de scale (grossit légèrement au scroll)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main ref={containerRef} className="max-w-5xl mx-auto px-4 py-24">
      
      {/* 1. Introduction avec Photo */}
      <section className="flex flex-col md:flex-row items-center gap-12 mb-24">
        
        {/* La photo animée */}
        <motion.div 
          style={{ rotate, y, scale }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-accent/20 shadow-2xl shadow-accent/20"
        >
          <Image
            src="/uploads/avatar.JPG"
            alt="Joel Vutsumbwa"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Salut, je suis <span className="text-accent">Joel</span>.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Développeur Fullstack passionné, je transforme des idées complexes en applications web modernes, sécurisées et performantes. 
            Mon objectif ? T'aider à concrétiser ton projet avec un code propre et une communication transparente.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
              📍 Kinshasa, RDC
            </span>
            <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium border border-border">
              🎓 Licence en Génie Informatique
            </span>
          </div>
        </motion.div>
      </section>

      {/* 2. Mon Parcours (Timeline avec animations) */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <Zap className="h-8 w-8 text-accent" /> Mon parcours
        </h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          {/* Étape 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-muted/10 border border-border rounded-2xl hover:border-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Développeur Freelance</h3>
                <span className="text-sm text-accent font-medium">2024 - Aujourd'hui</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Conception et développement d'applications web sur mesure pour des clients locaux et internationaux. 
                Spécialisation sur Next.js, Django et la sécurisation des données.
              </p>
            </div>
          </motion.div>

          {/* Étape 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-muted/10 border border-border rounded-2xl hover:border-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Projet AMICONGO Export</h3>
                <span className="text-sm text-accent font-medium">2023 - 2024</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Développement d'une plateforme d'exportation complète. Plus de 10 000 lignes de code, 
                mise en place de 62 tests automatisés, CI/CD et sécurité de niveau bancaire.
              </p>
            </div>
          </motion.div>

          {/* Étape 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Zap className="h-5 w-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-muted/10 border border-border rounded-2xl hover:border-accent/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Licence en Génie Informatique</h3>
                <span className="text-sm text-accent font-medium">En cours</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Formation académique solide qui me permet d'avoir une vision globale de l'architecture logicielle 
                et des bonnes pratiques de l'ingénierie.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Pourquoi me choisir ? */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Pourquoi travailler avec moi ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: CheckCircle2, title: "Code de qualité", desc: "Je ne livre pas juste un site qui marche. Je livre un code testé, documenté et maintenable." },
            { icon: ShieldCheck, title: "Sécurité d'abord", desc: "Protection des données, authentification forte (JWT) et bonnes pratiques de sécurité." },
            { icon: Zap, title: "Communication", desc: "Un suivi régulier, des points clairs et une réactivité totale pour que tu sois toujours informé." }
          ].map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-muted/10 border border-border rounded-2xl text-center hover:border-accent/30 transition-colors"
            >
              <item.icon className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Call to Action */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center p-12 bg-accent/5 border border-accent/20 rounded-3xl"
      >
        <h2 className="text-3xl font-bold mb-4">Prêt à lancer ton projet ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Discutons de tes besoins. Je te réponds sous 24h pour voir comment on peut collaborer.
        </p>
        <Link href="/#contact" className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-colors">
          Discutons de ton projet
        </Link>
      </motion.section>

    </main>
  );
}