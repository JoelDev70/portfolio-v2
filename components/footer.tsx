"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowUp, ArrowRight } from "lucide-react";
// On importe la nouvelle icône X (FaXTwitter) à la place de FaTwitter
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6"; 

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-background relative overflow-hidden mt-24 border-t border-border/50">
        
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Colonne 1 : Liens utiles */}
            <div>
              <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Liens utiles</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition-colors">À propos</Link></li>
                <li><Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-accent transition-colors">Blog DevUp</Link></li>
                <li><Link href="/#projects" className="hover:text-accent transition-colors">Projets</Link></li>
              </ul>
            </div>

            {/* Colonne 2 : Ressources (Uniquement Articles et CV) */}
            <div>
              <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Ressources</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/blog" className="hover:text-accent transition-colors">Tous les articles</Link></li>
                <li>
                  <a href="/cv.pdf" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                    Télécharger mon CV
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne 3 : Appel à l'action */}
            <div>
              <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Restons en contact</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Vous avez un projet en tête ou vous souhaitez simplement discuter ? N'hésitez pas à me contacter.
              </p>
              <Link 
                href="/#contact" 
                className="group inline-flex items-center justify-center w-full px-4 py-3 bg-accent text-accent-foreground font-medium text-sm rounded-md hover:bg-accent/90 transition-all shadow-lg shadow-accent/10"
              >
                Discutons de votre projet
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-border/50 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Joel Vutsumbwa</span>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="https://linkedin.com/in/joel-vutsumbwa" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <FaLinkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <FaXTwitter className="h-4 w-4" />
                 
              </a>
              <a href="https://github.com/JoelDev70" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-110 hover:bg-accent/90 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Retour en haut"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </>
  );
}