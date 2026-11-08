"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string | null;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Responsable IT",
    company: "AMICONGO Export",
    role: "IT Manager",
    content: "Joel a su transformer un besoin métier complexe en une application web fluide et sécurisée. Son expertise technique et sa rigueur sur les tests nous ont permis de gagner un temps précieux.",
    avatar: null,
  },
  {
    id: 2,
    name: "Client Freelance",
    company: "Projet E-commerce",
    role: "Fondateur",
    content: "Un développeur à l'écoute, qui respecte les délais et livre un code propre. La mise en place de Docker et du CI/CD a été un vrai plus pour notre équipe.",
    avatar: null,
  },
  {
    id: 3,
    name: "Chef de Projet",
    company: "Startup Tech",
    role: "Product Manager",
    content: "Nous avons fait appel à Joel pour une refonte de notre backend Django. Le résultat est au-delà de nos attentes, avec une sécurité renforcée et des performances améliorées.",
    avatar: null,
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 relative">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ils m'ont fait confiance</h2>
          <p className="text-muted-foreground">Découvrez ce que mes clients pensent de notre collaboration.</p>
        </div>

        {/* Le conteneur avec bordure en bas et lueur */}
        <div className="relative w-full overflow-hidden pb-12">
          
          {/* LA LUEUR (Glow) - placée en bas et floutée */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />

          {/* LA BORDURE EN BAS */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          {/* Les fondus sur les côtés (pour le défilement) */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Piste de défilement */}
          <motion.div 
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`} 
                className="relative w-[280px] md:w-[350px] flex-shrink-0 p-6 bg-muted/20 border border-border/50 rounded-2xl flex flex-col"
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-accent/10" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-sm font-medium leading-relaxed mb-6 flex-1 line-clamp-4">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm overflow-hidden relative">
                    {testimonial.avatar ? (
                      <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                    ) : (
                      testimonial.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
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