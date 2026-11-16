"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function AIPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // On ouvre automatiquement le popup après 3 secondes sur la page (optionnel)
  // ou on le laisse fermé et on l'ouvre via un bouton. Ici, on va le laisser fermé au départ.
  useEffect(() => {
    const timer = setTimeout(() => {
      // setIsOpen(true); // Décommente pour l'ouvrir automatiquement
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Le bouton flottant pour ouvrir le popup */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-40 p-4 bg-purple-600 text-white rounded-full shadow-lg shadow-purple-500/30 hover:bg-purple-500 transition-all group"
        aria-label="Découvrir l'IA"
      >
        <Brain className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </motion.button>

      {/* La modale (Popup) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            {/* Le contenu du popup (avec effet tunnel) */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic interne
              className="relative w-full max-w-3xl bg-background border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20"
            >
              
              {/* --- EFFET TUNNEL LUMINEUX --- */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-purple-500/20 rounded-full"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{ 
                      width: ["0%", "100%"], 
                      height: ["0%", "100%"], 
                      opacity: [0, 0.5, 0] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 0.8,
                      ease: "easeOut"
                    }}
                    style={{ 
                      aspectRatio: "1/1", 
                      maxWidth: "800px", 
                      maxHeight: "800px" 
                    }}
                  />
                ))}
                {/* Lueur centrale */}
                <div className="absolute w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
              </div>

              {/* Bouton fermer */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-background/50 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Contenu */}
              <div className="relative z-10 p-8 md:p-12">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Sparkles className="h-3 w-3" />
                  Innovation
                </div>

                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  L'<span className="text-purple-400">Intelligence Artificielle</span> au service de vos projets.
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  Je ne me contente pas de coder des sites. J'intègre des modèles d'IA pour automatiser vos processus, analyser vos données et créer des expériences uniques.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="p-4 bg-muted/20 border border-border/50 rounded-xl">
                    <Brain className="h-6 w-6 text-purple-400 mb-3" />
                    <h3 className="font-bold mb-1">Intégration d'API</h3>
                    <p className="text-sm text-muted-foreground">OpenAI, Gemini, Claude...</p>
                  </div>
                  <div className="p-4 bg-muted/20 border border-border/50 rounded-xl">
                    <Sparkles className="h-6 w-6 text-purple-400 mb-3" />
                    <h3 className="font-bold mb-1">Prompt Engineering</h3>
                    <p className="text-sm text-muted-foreground">Conception de prompts avancés.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/#contact" 
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-colors"
                  >
                    Discuter de mon projet IA
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}