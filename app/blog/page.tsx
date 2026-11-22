import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/blog-card";

const POSTS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>; // <-- On déclare une Promise
}) {
  // On attend la résolution de la Promise
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams.q || "";
  const currentPage = Number(resolvedParams.page) || 1;
  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const where = {
    published: true,
    ...(searchQuery ? { title: { contains: searchQuery, mode: "insensitive" as const } } : {}),
  };

  const totalPosts = await prisma.post.count({ where });
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: skip,
    take: POSTS_PER_PAGE,
  });

  const isSearching = searchQuery.length > 0;
  const hasPosts = posts.length > 0;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (page > 1) params.set("page", page.toString());
    return `/blog?${params.toString()}`;
  };

  return (
    <main className="min-h-screen">
      {/* Hero 3D */}
      <div className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0 perspective-1000">
          <Image
            src="/uploads/blog-hero.jpg"
            alt="Blog DevUp"
            fill
            className="object-cover transform rotate-x-12 scale-110 opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto transform translate-z-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-2xl">
            Le Blog <span className="text-accent">DevUp</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Apprendre, coder et évoluer. Mes articles sur le développement Fullstack, les bonnes pratiques et mon parcours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24">
        {/* Recherche */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <form action="/blog" method="GET">
            <input 
              type="text" 
              name="q" 
              placeholder="Rechercher un article par titre..." 
              defaultValue={searchQuery}
              className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-border rounded-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-lg shadow-accent/5"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </form>
        </div>

        {!hasPosts ? (
          <p className="text-center text-muted-foreground">Aucun article trouvé pour "{searchQuery}".</p>
        ) : (
          <>
            {currentPage === 1 && !isSearching && (
              <div className="mb-16">
                <Link 
                  href={`/blog/${posts[0].slug}`} 
                  className="group relative flex flex-col md:flex-row gap-8 bg-muted/10 border border-border rounded-3xl overflow-hidden hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="relative w-full md:w-1/2 h-64 md:h-auto md:min-h-[300px] overflow-hidden bg-muted">
                    {posts[0].coverImage ? (
                      <Image 
                        src={posts[0].coverImage} 
                        alt={posts[0].title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-background to-muted flex items-center justify-center">
                        <span className="text-2xl font-bold text-muted-foreground/50">DevUp</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-accent/10 text-accent border border-accent/20">
                        À la une
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" /> 
                        {posts[0].createdAt.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors leading-tight">
                      {posts[0].title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-8 line-clamp-3 text-lg">
                      {posts[0].excerpt}
                    </p>
                    
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-accent mt-auto">
                      Lire l'article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* TA GRILLE À 2 COLONNES (inchangée) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(currentPage === 1 && !isSearching ? posts.slice(1) : posts).map((post) => (
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                {currentPage > 1 ? (
                  <Link href={getPageUrl(currentPage - 1)} className="p-2 rounded-lg bg-muted hover:bg-accent/20 hover:text-accent transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                ) : (
                  <div className="p-2 rounded-lg bg-muted/30 text-muted-foreground/30 cursor-not-allowed">
                    <ChevronLeft className="h-5 w-5" />
                  </div>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                      currentPage === page
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted hover:bg-accent/20 hover:text-accent"
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                {currentPage < totalPages ? (
                  <Link href={getPageUrl(currentPage + 1)} className="p-2 rounded-lg bg-muted hover:bg-accent/20 hover:text-accent transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <div className="p-2 rounded-lg bg-muted/30 text-muted-foreground/30 cursor-not-allowed">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
