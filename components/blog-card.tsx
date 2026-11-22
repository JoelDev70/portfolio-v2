"use client";

import Image from "next/image";
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
  coverImage?: string;
}

export function BlogCard({ slug, title, excerpt, date, readTime, tags, coverImage }: BlogCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-start bg-muted/10 border border-border/50 rounded-2xl hover:border-accent/50 hover:bg-muted/30 transition-all duration-300 overflow-hidden"
    >
      {/* Image (Hauteur encore plus réduite : h-36) */}
      {coverImage && (
        <div className="relative w-full h-36 overflow-hidden">
          <Image 
            src={coverImage} 
            alt={title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </div>
      )}

      {/* Contenu (Padding réduit p-4) */}
      <div className="p-4 w-full flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readTime}
          </span>
        </div>

        <h2 className="text-base font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-tight">
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h2>

        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
          {excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-background border border-border text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline mt-auto">
          Lire l'article 
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

