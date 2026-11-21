"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* 1. BACKGROUND : Grille subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Lueurs d'ambiance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- COLONNE GAUCHE : TEXTE --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Badge de disponibilité */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Disponible pour missions freelance
          </div>

          {/* Titre */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Salut, je suis <br />
            <span className="text-foreground">Joel Vutsumbwa</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold text-accent mb-6">
            Développeur Fullstack Junior
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Je conçois des applications web modernes et sécurisées. 
            Actuellement, je transforme 
            des idées complexes en solutions concrètes.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="#projects" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-background bg-accent rounded-xl hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20"
            >
              Voir mes projets
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold border border-border bg-background/50 backdrop-blur-sm rounded-xl hover:bg-muted transition-all"
            >
              Me contacter
              <Terminal className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        {/* --- COLONNE DROITE : VISUEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Effet de halo derrière l'image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-blue-500/20 rounded-full blur-[80px] animate-pulse" />
          
          {/* Cadre de l'image avec effet de flottaison */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-80 h-96 rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-accent/10 rotate-3"
          >
            <Image
              src="/uploads/avatar.JPG" 
              alt="Joel Vutsumbwa"
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay subtil */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Badge flottant en bas de l'image */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground"> Junior Fullstack Developer</p>
                <p className="text-[10px] text-muted-foreground">Let's connect</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

