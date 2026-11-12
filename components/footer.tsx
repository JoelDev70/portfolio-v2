'use client'
import Link from "next/link";
import { Mail, Code, Briefcase, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8 mt-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Colonne 1 : Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              Joel<span className="text-accent">.</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Développeur Fullstack Freelance. Je conçois des applications web modernes, sécurisées et performantes pour donner vie à vos idées.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/JoelDev70" target="_blank" rel="noreferrer" className="p-2 bg-muted rounded-full hover:bg-accent/20 hover:text-accent transition-colors">
                <Code className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/joel-vutsumbwa" target="_blank" rel="noreferrer" className="p-2 bg-muted rounded-full hover:bg-accent/20 hover:text-accent transition-colors">
                <Briefcase className="h-5 w-5" />
              </a>
              <a href="mailto:jmumbere70@gmail.com" className="p-2 bg-muted rounded-full hover:bg-accent/20 hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#projects" className="hover:text-accent transition-colors">Projets</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog DevUp</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">À propos</Link></li>
              <li><Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Joel Vutsumbwa. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">
            Conçu et développé avec <span className="text-accent">Next.js</span> & <span className="text-accent">Tailwind CSS</span>.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 md:mt-0 flex items-center gap-1 hover:text-accent transition-colors"
          >
            Retour en haut <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}