import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";
import { CommentsSection } from "@/components/comments-section";


// 1. On génère les métadonnées dynamiques
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug: slug }
  });

  if (!post) {
    return { title: "Article introuvable" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      {/* Bouton Retour */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-12 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Retour au blog
      </Link>

      {/* En-tête de l'article */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> 
            {post.createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> 
          </span>
        </div>
      </header>
           {/* Image de couverture */}
      {post.coverImage && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-border shadow-lg">
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            fill 
            className="object-cover" 
          />
        </div>
      )}

      {/* Contenu de l'article avec rendu Markdown */}
     

<div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 prose-code:text-accent prose-pre:bg-muted/50 prose-p:text-muted-foreground">        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Ajout de la section commentaires */}
      <CommentsSection postId={post.id} />

    </main>
  );
}