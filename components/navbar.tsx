"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Projets", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "À propos", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Détecte le scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu mobile quand on change de page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-background/80 backdrop-blur-md border-border/50 py-2" 
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter z-50">
            Joel<span className="text-accent">.</span>
          </Link>
          
          {/* Liens Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === "/" && link.href === "/");
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? "text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions à droite (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-medium text-sm rounded-full hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20"
            >
              Discutons
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-muted/50 rounded-lg text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Menu Mobile (Plein écran) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold py-3 border-b border-border/50 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-accent-foreground font-bold rounded-xl"
              >
                Discutons de votre projet
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

