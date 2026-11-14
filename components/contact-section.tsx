"use client"; // <-- N'oublie pas cette ligne pour activer les animations

import { ContactForm } from "./contact-form";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "framer-motion"; // <-- Import de motion

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto border-t border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* --- COLONNE GAUCHE : LA CARTE DE VISITE FLOTTANTE --- */}
        <div className="flex flex-col justify-center">
          
          {/* L'animation de flottaison est ici */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 border border-border bg-background"
          >
            
            {/* 1. Image de couverture */}
            <div className="relative h-48 w-full">
              <Image 
                src="/uploads/avatar.JPG"
                alt="Joel Vutsumbwa"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* 2. Bloc d'informations */}
            <div className="p-8 flex">
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl font-bold uppercase tracking-wide leading-tight">
                  Vous avez <br /> un projet <br /> web ?
                </h3>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent shrink-0" />
                    <p>Kinshasa, RDC<br/><span className="text-xs opacity-70">Disponible en remote</span></p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent shrink-0" />
                    <a href="tel:+243000000000" className="hover:text-accent transition-colors">
                      +243 999 599 185
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-accent shrink-0" />
                    <a href="mailto:jmumbere70@gmail.com" className="hover:text-accent transition-colors">
                      jmumbere70@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* 3. Barre latérale des réseaux sociaux */}
              <div className="w-12 ml-4 bg-accent/10 rounded-lg flex flex-col items-center justify-center gap-6 py-4">
                <a href="https://linkedin.com/in/joel-vutsumbwa" target="_blank" rel="noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/JoelDev70" target="_blank" rel="noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                  <FaGithub className="h-5 w-5" />
                </a>
                <div className="w-px h-8 bg-accent/20" />
                <div className="text-[10px] font-bold text-accent uppercase tracking-wider rotate-180" style={{ writingMode: 'vertical-rl' }}>
                  Contact
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- COLONNE DROITE : LE FORMULAIRE --- */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold">Envoyez-moi un message</h3>
            <p className="text-sm text-muted-foreground">Je vous réponds sous 24h.</p>
          </div>
          <ContactForm />
        </div>

      </div>
    </section>
  );
}
