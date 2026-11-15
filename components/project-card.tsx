import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BrowserMockup } from "./browser-mockup";
import { SpotlightCard } from "./spotlight-card";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  coverImage?: string;
  category?: string;
  result?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  link, 
  coverImage,
  category,
  result
}: ProjectCardProps) {
  return (
    <SpotlightCard className="group flex flex-col h-full transition-all duration-300 hover:border-accent/40">
      
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

        {category && (
          <div className="absolute top-6 left-6 z-20">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-background/90 backdrop-blur-sm border border-border text-foreground shadow-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 pt-5">
        
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-2xl font-bold leading-tight group-hover:text-accent transition-colors">
            {title}
          </h3>
          <Link href={link} className="p-2 bg-muted/50 rounded-full group-hover:bg-accent/20 group-hover:text-accent transition-colors shrink-0 mt-1">
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {result && (
          <div className="flex items-center gap-2 mb-6 p-3 bg-accent/5 border border-accent/10 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
            <span className="text-sm font-medium text-foreground line-clamp-1">{result}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-muted/50 text-muted-foreground border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}



