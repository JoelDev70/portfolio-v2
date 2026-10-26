import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Image à venir
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <Link href={link} className="text-muted-foreground hover:text-accent transition-colors">
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 flex-1">
          {description}
        </p>

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
    </div>
  );
}