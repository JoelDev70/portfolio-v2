import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";
import { CommentsSection } from "@/components/comments-section";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Article introuvable" };
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
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-24">
      
      {/* 1. Hero de l'article (Image + Titre en overlay) */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center overflow-hidden">
        
        {/* Image de fond */}
        {post.coverImage ? (
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted" />
        )}
        
        {/* Dégradé sombre pour lire le titre */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        {/* Titre et meta */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full pb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour au blog
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" /> 
              {post.createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" /> 5 min de lecture
            </span>
          </div>
        </div>
      </div>

      {/* 2. Contenu de l'article */}
      <article className="max-w-3xl mx-auto px-4 py-16">
        
        {/* Rendu Markdown avec une typographie soignée */}
        <div className="prose prose-lg max-w-none dark:prose-invert 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
          prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border prose-pre:rounded-xl
          prose-img:rounded-2xl prose-img:border prose-img:border-border
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-muted/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* 3. Section Auteur */}
        <div className="mt-16 p-6 md:p-8 bg-muted/10 border border-border rounded-3xl flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/20 shrink-0 relative">
            <Image src="/uploads/avatar.JPG" alt="Joel Vutsumbwa" fill className="object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1">Joel Vutsumbwa</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Développeur Fullstack Freelance. Je partage mes apprentissages sur Next.js, Django et l'architecture web.
            </p>
            <Link href="/about" className="text-sm font-bold text-accent hover:underline">
              En savoir plus sur moi →
            </Link>
          </div>
        </div>

        {/* 4. Section Commentaires */}
        <div className="mt-16">
          <CommentsSection postId={post.id} />
        </div>
      </article>
    </main>
  );
}