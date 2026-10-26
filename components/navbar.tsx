import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          Joel<span className="text-accent">.</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="#projects" className="text-sm font-medium hover:text-accent transition-colors">
            Projets
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-accent transition-colors">
            Blog DevUp
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}