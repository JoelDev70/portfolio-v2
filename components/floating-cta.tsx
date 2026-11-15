"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FloatingCTAProps {
  isVisible: boolean;
}

export function FloatingCTA({ isVisible }: FloatingCTAProps) {
  const { scrollY } = useScroll();
  
  // Le CTA disparaît quand on continue de scroller au-delà d'un certain point
  // (ajusté pour être cohérent avec la section Skills)
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={
        isVisible 
          ? { y: 0, opacity: 1 } 
          : { y: -100, opacity: 0 }
      }
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ opacity: isVisible ? undefined : 0 }} // Pour forcer la disparition
      className="fixed top-100 left-3/4 -translate-x-1/2 z-40 hidden md:block"
    >
      <Link 
        href="/#contact"
        className="animate-pulse group flex items-center gap-3 px-6 py-3 bg-background border border-accent/30 rounded-full shadow-2xl shadow-accent/20 hover:border-accent transition-all"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <span className="text-sm font-medium">Prêt à collaborer ? <span className="text-accent">Discutons.</span></span>
        <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

