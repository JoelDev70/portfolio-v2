"use client";

import { useState } from "react";
import { login } from "../actions";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-background/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl shadow-accent/10">
          
          {/* En-tête */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-3xl font-bold tracking-tighter mb-2">
              Joel<span className="text-accent">.</span>
            </Link>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4 mt-4">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Accès sécurisé</h1>
            <p className="text-sm text-muted-foreground">
              Entrez vos identifiants pour accéder au tableau de bord.
            </p>
          </div>

          {/* Formulaire */}
          <form action={handleSubmit} className="space-y-4">
            {/* Champ Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="vous@exemple.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit" 
              className="group w-full py-3.5 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              Se connecter
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              ← Retour au site
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}