"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function BlogCard({ slug, title, excerpt, date, readTime, tags }: BlogCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-start p-8 bg-muted/10 border border-border/50 rounded-2xl hover:border-accent/50 hover:bg-muted/30 transition-all duration-300"
    >
      {/* Effet de halo au survol */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 z-10">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" /> {date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {readTime}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors z-10">
        <Link href={`/blog/${slug}`} className="focus:outline-none">
          {title}
        </Link>
      </h2>

      <p className="text-muted-foreground mb-6 z-10 line-clamp-3">
        {excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mb-6 z-10">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-background border border-border text-muted-foreground group-hover:border-accent/30 transition-colors">
            {tag}
          </span>
        ))}
      </div>

      <Link href={`/blog/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline z-10 mt-auto">
        Lire larticle 
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.article>
  );
}