import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrowserMockup } from "./browser-mockup";
import { SpotlightCard } from "./spotlight-card";


interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  coverImage?: string;
}

export function ProjectCard({ title, description, tags, link, coverImage }: ProjectCardProps) {
  return (
    // <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      <SpotlightCard className="group transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      {/* Image ou Fallback stylé */}
      <div className="relative w-full p-4 pb-0">
        {coverImage ? (
          <BrowserMockup imageUrl={coverImage} alt={title} />
        ) : (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-gradient-to-br from-background to-muted/50 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-2xl font-bold text-foreground/80 mb-2">{title}</span>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-1 text-xs border border-border/50 rounded-md bg-background/50 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenu textuel */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <Link href={link} className="text-muted-foreground hover:text-accent transition-colors">
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      </SpotlightCard>

  );
}