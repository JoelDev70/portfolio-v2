"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string | null;
  rating: number; // <-- Ajouté
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Responsable IT",
    company: "AMICONGO Export",
    role: "IT Manager",
    content: "Joel a su transformer un besoin métier complexe en une application web fluide et sécurisée. Son expertise technique et sa rigueur sur les tests nous ont permis de gagner un temps précieux.",
    avatar: null,
    rating: 5,
  },
  {
    id: 2,
    name: "Client Freelance",
    company: "Projet E-commerce",
    role: "Fondateur",
    content: "Un développeur à l'écoute, qui respecte les délais et livre une solution propre. La mise en place de Docker et du CI/CD a été un vrai plus pour notre équipe.",
    avatar: null,
    rating: 4,
  },
  {
    id: 3,
    name: "Chef de Projet",
    company: "Startup Tech",
    role: "Product Manager",
    content: "Nous avons fait appel à Joel pour une refonte de notre backend Django. Le résultat est au-delà de nos attentes, avec une sécurité renforcée et des performances améliorées.",
    avatar: null,
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false); // État pour la pause

  useEffect(() => {
    fetch("/api/testimonials")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => console.error("Utilisation des données de secours", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-muted-foreground animate-pulse">Chargement des témoignages...</p>
        </div>
      </section>
    );
  }

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const averageRating = testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / testimonials.length;

  return (
    <section className="py-24 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ils m'ont fait confiance</h2>
          
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <span className="text-muted-foreground font-medium">
              {averageRating.toFixed(1)} / 5 basé sur {testimonials.length} avis
            </span>
          </div>
        </div>

        <div 
          className="relative w-full overflow-hidden pb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div 
            className="flex gap-6 px-6 w-max"
            animate={{ x: isPaused ? "current" : ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 40, 
              repeat: isPaused ? 0 : Infinity,
              repeatType: "loop"
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`} 
                className="relative w-[320px] md:w-[400px] flex-shrink-0 p-8 bg-background border border-border/60 rounded-2xl flex flex-col shadow-xl shadow-accent/5 hover:border-accent/30 transition-colors"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-wider rounded-full bg-muted text-muted-foreground w-fit">
                  <CheckCircle2 className="h-3 w-3 text-accent" />
                  {testimonial.company}
                </div>

                {/* Étoiles dynamiques basées sur la note */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3.5 w-3.5 ${i < testimonial.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} 
                    />
                  ))}
                </div>

                <p className="text-base font-medium leading-relaxed mb-8 flex-1">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/40">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-lg overflow-hidden relative">
                    {testimonial.avatar ? (
                      <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                    ) : (
                      testimonial.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}



