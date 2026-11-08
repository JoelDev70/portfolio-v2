import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="p-4 bg-muted/20 rounded-full mb-8">
        <Ghost className="h-16 w-16 text-accent animate-bounce" />
      </div>
      
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Cette page n'existe pas</h2>
      
      <p className="text-muted-foreground max-w-md mb-10">
        Il semblerait que vous ayez suivi un lien brisé ou que la page ait été déplacée. 
        Pas de panique, on va vous ramener en lieu sûr.
      </p>

      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'accueil
      </Link>
    </div>
  );
}