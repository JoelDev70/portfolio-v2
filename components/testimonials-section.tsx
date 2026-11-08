"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string | null;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/api/testimonials")
  //     .then(res => res.json())
  //     .then(data => {
  //       setTestimonials(data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);
    useEffect(() => {
    fetch("/api/testimonials")
      .then(res => res.json())
      .then(data => {
        // On vérifie si data est bien un tableau
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          console.error("L'API n'a pas renvoyé un tableau :", data);
          setTestimonials([]); // On met un tableau vide en cas d'erreur
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de fetch :", err);
        setTestimonials([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-muted/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground animate-pulse">Chargement des témoignages...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  // On duplique le tableau pour l'effet de défilement infini
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-muted/5 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ils m'ont fait confiance</h2>
        <p className="text-muted-foreground">Découvrez ce que mes clients pensent de notre collaboration.</p>
      </div>

      {/* Conteneur du carrousel */}
      <div className="relative w-full overflow-hidden">
        {/* Dégradés sur les côtés pour un effet de fondu */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Piste de défilement animée */}
        <motion.div 
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 40, // Vitesse de défilement
            repeat: Infinity 
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`} 
              // Responsive : w-[300px] sur mobile, w-[450px] sur desktop
              className="relative w-[300px] md:w-[450px] flex-shrink-0 p-6 md:p-8 bg-background border border-border rounded-2xl shadow-lg shadow-accent/5 flex flex-col"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/20" />
              
              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg font-medium leading-relaxed mb-8 flex-1">
                "{testimonial.content}"
              </p>
              
              {/* Profil du client avec photo */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-xl overflow-hidden relative">
                  {testimonial.avatar ? (
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    testimonial.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}