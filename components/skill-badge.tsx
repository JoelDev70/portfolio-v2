"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  isLearning?: boolean;
  delay?: number;
}

export function SkillBadge({ name, isLearning = false, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`
        inline-flex items-center px-4 py-2 text-sm font-medium rounded-full
        transition-all duration-300 cursor-default border
        ${isLearning 
          ? "bg-muted/30 border-border/50 text-muted-foreground hover:border-accent/30" 
          : "bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/10"
        }
      `}
    >
      {name}
    </motion.span>
  );
}