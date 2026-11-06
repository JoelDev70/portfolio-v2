"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-muted/5 border-y border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-16">Ils m'ont fait confiance</h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 bg-background border border-border rounded-3xl shadow-xl shadow-accent/5"
        >
          <Quote className="absolute top-6 left-6 h-12 w-12 text-accent/20" />
          
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">
            "Joel a su transformer un besoin métier complexe en une application web fluide et sécurisée. Son expertise technique et sa rigueur sur les tests nous ont permis de gagner un temps précieux et de sécuriser nos données d'exportation."
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-xl">
              A
            </div>
            <div className="text-left">
              <p className="font-bold">Responsable IT</p>
              <p className="text-sm text-muted-foreground">AMICONGO Export</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}