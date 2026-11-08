import Image from "next/image";

interface BrowserMockupProps {
  imageUrl: string;
  alt: string;
}

export function BrowserMockup({ imageUrl, alt }: BrowserMockupProps) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border bg-muted/20 shadow-2xl shadow-accent/5 group-hover:shadow-accent/10 transition-shadow duration-500">
      {/* Barre supérieure du navigateur (style macOS) */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        
        {/* Barre d'adresse URL */}
        <div className="ml-4 flex-1 h-6 bg-background/50 rounded-md flex items-center px-3">
          <span className="text-xs text-muted-foreground truncate">https://{alt.toLowerCase().replace(/\s+/g, '-')}.com</span>
        </div>
      </div>

      {/* Image du projet */}
      <div className="relative aspect-video w-full overflow-hidden bg-background">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
}