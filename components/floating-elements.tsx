"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FloatingElements() {
  const ref = useRef(null);
  
  // On lie le scroll de la page à l'animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Les éléments se déplacent à des vitesses différentes (effet parallaxe)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Sphère 1 (Cyan) */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-accent/10 rounded-full blur-[80px]"
        animate={{
          x: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sphère 2 (Violet/Lavande) */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-[15%] w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
        animate={{
          x: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sphère 3 (Cyan plus petite) */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-20 left-[30%] w-48 h-48 bg-accent/5 rounded-full blur-[60px]"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}