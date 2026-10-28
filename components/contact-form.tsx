"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

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
        setTimeout(() => setStatus("idle"), 5000); // Réinitialise après 5s
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-8 bg-muted/10 border border-border rounded-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nom complet</label>
            <input 
              name="name" 
              required 
              placeholder="Votre nom"
              className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="vous@exemple.com"
              className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sujet</label>
          <input 
            name="subject" 
            required 
            placeholder="Proposition de mission, question, etc."
            className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea 
            name="message" 
            required 
            placeholder="Décrivez votre projet ou votre besoin..."
            className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors h-32 resize-none" 
          />
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
          {status !== "loading" && <Send className="h-4 w-4" />}
        </button>

        {/* Messages de statut */}
        {status === "success" && (
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">Message envoyé avec succès ! Je vous répondrai rapidement.</p>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">Une erreur est survenue. Veuillez réessayer.</p>
          </div>
        )}
      </form>
    </motion.div>
  );
}