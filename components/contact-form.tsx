"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* Ligne 1 : Nom et Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative group">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Nom</label>
          <input 
            name="name" 
            required 
            placeholder="Votre nom" 
            className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30" 
          />
        </div>
        <div className="relative group">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
          <input 
            name="email" 
            type="email" 
            required 
            placeholder="vous@exemple.com" 
            className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30" 
          />
        </div>
      </div>

      {/* Ligne 2 : Sujet */}
      <div className="relative group">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Sujet</label>
        <input 
          name="subject" 
          required 
          placeholder="Quel est votre projet ?" 
          className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30" 
        />
      </div>

      {/* Ligne 3 : Message */}
      <div className="relative group">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Message</label>
        <textarea 
          name="message" 
          required 
          placeholder="Décrivez votre besoin en quelques mots..." 
          className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30 h-32 resize-none" 
        />
      </div>

      {/* Bouton d'envoi */}
      <button 
        type="submit" 
        disabled={status === "loading"}
        className="group flex items-center gap-4 text-lg font-bold uppercase tracking-wider text-foreground hover:text-accent transition-colors disabled:opacity-50"
      >
        <span className="p-4 bg-accent text-accent-foreground rounded-full group-hover:scale-110 transition-transform">
          <Send className="h-5 w-5" />
        </span>
        {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
      </button>

      {/* Messages de statut */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-sm font-medium">Message envoyé avec succès ! Je vous répondrai rapidement.</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">Une erreur est survenue. Veuillez réessayer.</p>
        </div>
      )}
    </form>
  );
}
