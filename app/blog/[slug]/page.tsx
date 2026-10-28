import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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
            <Clock className="h-4 w-4" /> 5 min de lecture
          </span>
        </div>
      </header>

      {/* Contenu de l'article */}
      <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
        {/* On affiche le texte brut pour l'instant. On ajoutera le Markdown plus tard. */}
        <p className="whitespace-pre-wrap">{post.content}</p>
      </div>
    </main>
  );
}