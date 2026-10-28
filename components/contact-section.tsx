import { ContactForm } from "./contact-form";
import { Mail, Briefcase, Code } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Prêt à travailler <span className="text-accent">ensemble</span> ?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Que vous ayez un projet en tête ou que vous souhaitiez simplement discuter, ma boîte de réception est toujours ouverte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Infos de contact */}
        <div className="md:col-span-1 space-y-6">
                   <a href="https://linkedin.com/in/joel-vutsumbwa" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-muted/10 border border-border rounded-xl hover:border-accent/50 transition-colors">
            <Briefcase className="h-6 w-6 text-accent" />
            <div>
              <p className="font-medium">LinkedIn</p>
              <p className="text-sm text-muted-foreground">Joel Vutsumbwa</p>
            </div>
          </a>

          <a href="https://github.com/JoelDev70" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-muted/10 border border-border rounded-xl hover:border-accent/50 transition-colors">
            <Code className="h-6 w-6 text-accent" />
            <div>
              <p className="font-medium">GitHub</p>
              <p className="text-sm text-muted-foreground">@JoelDev70</p>
            </div>
          </a>
        </div>

        {/* Formulaire */}
        <div className="md:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}