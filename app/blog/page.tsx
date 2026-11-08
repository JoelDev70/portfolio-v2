import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/blog-card";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  if (posts.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Le Blog <span className="text-accent">DevUp</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Apprendre, coder et évoluer. Mes articles sur le développement Fullstack, les bonnes pratiques et mon parcours.
          </p>
        </header>
        <p className="text-muted-foreground">Aucun article publié pour le moment.</p>
      </main>
    );
  }

  // On sépare le premier article (featured) des autres
  const [featuredPost, ...otherPosts] = posts;

  return (
    <main className="min-h-screen">
         {/* Hero du Blog avec IMAGE DE FOND */}
      <div className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center mb-16">
        
        {/* 1. L'image de fond */}
        <Image
          src="/uploads/blog-hero.jpg" // <-- Assure-toi que le nom correspond
          alt="Blog DevUp"
          fill
          className="object-cover"
          priority
        />
        
        {/* 2. L'overlay sombre (pour que le texte soit lisible) */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        
        {/* 3. Le contenu (texte) */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Le Blog <span className="text-accent">DevUp</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Apprendre, coder et évoluer. Mes articles sur le développement Fullstack, les bonnes pratiques et mon parcours.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        
        {/* Article Featured (Le plus récent) */}
        <div className="mb-16">
          <Link 
            href={`/blog/${featuredPost.slug}`} 
            className="group relative flex flex-col md:flex-row gap-8 bg-muted/10 border border-border rounded-3xl overflow-hidden hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[350px] overflow-hidden bg-muted">
              {featuredPost.coverImage ? (
                <Image 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-background to-muted flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground/50">DevUp</span>
                </div>
              )}
            </div>
            
            {/* Contenu */}
            <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-accent/10 text-accent border border-accent/20">
                  À la une
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> 
                  {featuredPost.createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              
              <p className="text-muted-foreground mb-8 line-clamp-3 text-lg">
                {featuredPost.excerpt}
              </p>
              
              <span className="inline-flex items-center gap-2 text-sm font-bold text-accent mt-auto">
                Lire l'article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>

        {/* Grille des autres articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherPosts.map((post) => (
            <BlogCard 
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
              readTime="5 min"
              tags={post.tags || []}
              coverImage={post.coverImage || undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}