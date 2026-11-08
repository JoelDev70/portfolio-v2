"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessagesList } from "@/components/messages-list";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"project" | "post" | "messages" | "testimonial" | "comments">("project");

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
        <button onClick={() => router.push("/")} className="text-sm text-muted-foreground hover:text-accent">
          Retour au site
        </button>
      </div>

      {/* Onglets */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-border">
        {["project", "post", "testimonial", "messages"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 px-4 font-medium capitalize transition-colors ${activeTab === tab ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "project" ? "Projets" : tab === "post" ? "Articles (DevUp)" : tab === "testimonial" ? "Témoignages" : "Messages"}
          </button>
        ))}
      </div>

      {/* ... (Les formulaires Projets et Articles existants restent inchangés) ... */}
      
      {/* NOUVEAU : Formulaire Témoignage */}
      {activeTab === "testimonial" && (
        <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Ajouter un témoignage</h2>
          <form className="space-y-4" onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            
            const data = {
              name: formData.get("name"),
              role: formData.get("role"),
              company: formData.get("company"),
              content: formData.get("content"),
              avatar: formData.get("avatar"),
            };

            try {
              const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              if (res.ok) {
                alert("Témoignage ajouté !");
                form.reset();
              } else {
                alert("Erreur");
              }
            } catch (err) {
              alert("Erreur réseau");
            }
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Nom du client</label>
                <input name="name" required className="w-full p-2 bg-background border border-border rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1">Entreprise</label>
                <input name="company" required className="w-full p-2 bg-background border border-border rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1">Poste (ex: CEO)</label>
                <input name="role" required className="w-full p-2 bg-background border border-border rounded-md" />
              </div>
              <div>
                <label className="block text-sm mb-1">Photo de profil</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const fData = new FormData();
                    fData.append("file", file);
                    const res = await fetch("/api/upload", { method: "POST", body: fData });
                    const d = await res.json();
                    if (d.url) {
                      const inputUrl = document.createElement("input");
                      inputUrl.type = "hidden";
                      inputUrl.name = "avatar";
                      inputUrl.value = d.url;
                      e.target.form?.appendChild(inputUrl);
                      alert("Image uploadée !");
                    }
                  }}
                  className="w-full p-2 bg-background border border-border rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Témoignage</label>
              <textarea name="content" required className="w-full p-2 bg-background border border-border rounded-md h-32" />
            </div>
            <button type="submit" className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
              Publier le témoignage
            </button>
          </form>
        </div>
      )}

      {/* ... (Le reste du code pour Messages) ... */}
    </div>
  );
}