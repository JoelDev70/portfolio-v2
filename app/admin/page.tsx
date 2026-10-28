"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessagesList } from "@/components/messages-list";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();  
  // État pour basculer entre l'onglet Projet et Article
 const [activeTab, setActiveTab] = useState<"project" | "post" | "messages">("project");


  const ADMIN_PASSWORD = "joel2026"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form onSubmit={handleLogin} className="p-8 bg-muted/20 border border-border rounded-xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Accès Admin</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-background border border-border rounded-md focus:outline-none focus:border-accent"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <button 
          onClick={() => router.push("/")} 
          className="text-sm text-muted-foreground hover:text-accent"
        >
          Retour au site
        </button>
      </div>

      {/* Onglets de navigation */}
      <div className="flex gap-4 mb-8 border-b border-border">
        <button 
          onClick={() => setActiveTab("project")}
          className={`pb-2 px-4 font-medium transition-colors ${activeTab === "project" ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
        >
          Projets
        </button>
        <button 
          onClick={() => setActiveTab("post")}
          className={`pb-2 px-4 font-medium transition-colors ${activeTab === "post" ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
        >
          Articles (DevUp)
        </button>
                <button 
          onClick={() => setActiveTab("messages")}
          className={`pb-2 px-4 font-medium transition-colors ${activeTab === "messages" ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
        >
          Messages
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- ONGLET PROJET --- */}
        {activeTab === "project" && (
          <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Ajouter un projet</h2>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              const projectData = {
                title: formData.get("title"),
                slug: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
                description: formData.get("description"),
                context: formData.get("context"),
                problem: formData.get("problem"),
                solution: formData.get("solution"),
                results: formData.get("results"),
                techStack: formData.get("techStack")?.toString().split(',').map(s => s.trim()),
                liveUrl: formData.get("liveUrl"), 
                repoUrl: formData.get("repoUrl"),
                published: true,
              };

              try {
                const res = await fetch("/api/projects", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(projectData),
                });

                if (res.ok) {
                  alert("Projet ajouté avec succès !");
                  form.reset();
                } else {
                  alert("Erreur lors de l'ajout");
                }
              } catch (err) {
                alert("Erreur réseau");
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Titre du projet</label>
                  <input name="title" required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Stack technique (séparée par des virgules)</label>
                  <input name="techStack" placeholder="Next.js, Django, PostgreSQL" className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Description courte</label>
                <textarea name="description" required className="w-full p-2 bg-background border border-border rounded-md h-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Contexte (Case Study)</label>
                  <textarea name="context" className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Problème (Case Study)</label>
                  <textarea name="problem" className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Solution (Case Study)</label>
                  <textarea name="solution" className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Résultats (Case Study)</label>
                  <textarea name="results" className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Lien du site en ligne</label>
                  <input name="liveUrl" type="url" placeholder="https://mon-projet.com" className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Lien du dépôt GitHub</label>
                  <input name="repoUrl" type="url" placeholder="https://github.com/..." className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
              </div>

              <button type="submit" className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
                Publier le projet
              </button>
            </form>
          </div>
        )}
       
        {/* --- ONGLET ARTICLE (DevUp) --- */}
        {activeTab === "post" && (
          <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Ajouter un article DevUp</h2>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              const postData = {
                title: formData.get("title"),
                slug: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
                excerpt: formData.get("excerpt"),
                content: formData.get("content"),
                tags: formData.get("tags")?.toString().split(',').map(s => s.trim()),
                published: true,
              };

              try {
                const res = await fetch("/api/posts", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(postData),
                });

                if (res.ok) {
                  alert("Article ajouté avec succès !");
                  form.reset();
                } else {
                  alert("Erreur lors de l'ajout");
                }
              } catch (err) {
                alert("Erreur réseau");
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Titre de l&apos;article</label>
                  <input name="title" required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tags (séparés par des virgules)</label>
                  <input name="tags" placeholder="Next.js, Docker, Carrière" className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Extrait (Résumé pour la page d&apos;accueil)</label>
                <textarea name="excerpt" required className="w-full p-2 bg-background border border-border rounded-md h-20" />
              </div>

              <div>
                <label className="block text-sm mb-1">Contenu complet (Markdown supporté plus tard)</label>
                <textarea name="content" required className="w-full p-2 bg-background border border-border rounded-md h-64" />
              </div>

              <button type="submit" className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
                Publier l&apos;article
              </button>
            </form>
          </div>
        )}
        
         {activeTab === "messages" && (
          <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Messages reçus</h2>
            <MessagesList />
          </div>
        )}

        {/* Info (Affiché à côté ou en dessous selon l'écran) */}
        <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Statistiques</h2>
          <p className="text-muted-foreground">Les statistiques de ton site apparaîtront ici.</p>
        </div>
      </div>
    </div>
  );
}