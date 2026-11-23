"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessagesList } from "@/components/messages-list";
import { AdminCommentsList } from "@/components/admin-comments-list";
import { Edit, Trash2, X } from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // États pour les données
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  
  // État pour l'élément en cours d'édition
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<"project" | "post" | "testimonial" | null>(null);

  const [activeTab, setActiveTab] = useState<"project" | "post" | "messages" | "testimonial" | "comments">("project");

  const ADMIN_PASSWORD = "joel2026"; 

  // Charger les données quand on est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);


  const fetchData = async () => {
    try {
      const pRes = await fetch("/api/projects");
      if (pRes.ok) setProjects(await pRes.json());

      const postRes = await fetch("/api/posts");
      if (postRes.ok) setPosts(await postRes.json());

      const tRes = await fetch("/api/testimonials");
      if (tRes.ok) {
        const data = await tRes.json();
        setTestimonials(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Erreur fetchData", error);
    }
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  // Fonction pour supprimer un élément
  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
    
    const endpoint = type === "project" ? "/api/projects" : type === "post" ? "/api/posts" : "/api/testimonials";
    
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        fetchData(); // Recharge les données
        alert("Supprimé avec succès !");
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  };

  // Fonction pour lancer l'édition
  const handleEdit = (item: any, type: "project" | "post" | "testimonial") => {
    setEditingItem(item);
    setEditingType(type);
    // On scroll vers le haut pour voir le formulaire
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fonction pour annuler l'édition
  const cancelEdit = () => {
    setEditingItem(null);
    setEditingType(null);
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
        {["project", "post", "testimonial", "comments", "messages"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab as any);
              cancelEdit(); // Annule l'édition quand on change d'onglet
            }}
            className={`pb-2 px-4 font-medium capitalize transition-colors ${activeTab === tab ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "project" ? "Projets" : tab === "post" ? "Articles (DevUp)" : tab === "testimonial" ? "Témoignages" : tab === "comments" ? "Commentaires" : "Messages"}
          </button>
        ))}
      </div>

      {/* --- ONGLET PROJET --- */}
      {activeTab === "project" && (
        <div className="space-y-8">
          {/* Formulaire */}
          <div className="p-6 border border-border rounded-xl bg-muted/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingType === "project" && editingItem ? "Modifier le projet" : "Ajouter un projet"}
              </h2>
              {editingType === "project" && (
                <button onClick={cancelEdit} className="text-sm text-red-500 flex items-center gap-1">
                  <X className="h-4 w-4" /> Annuler
                </button>
              )}
            </div>
            
            <form className="space-y-4" key={editingItem?.id || "new"} onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              const projectData = {
                id: editingType === "project" ? editingItem?.id : undefined,
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
                category: formData.get("category"),
                published: true,
              };

              try {
                const method = editingType === "project" ? "PUT" : "POST";
                const res = await fetch("/api/projects", {
                  method,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(projectData),
                });

                if (res.ok) {
                  alert(editingType === "project" ? "Projet modifié !" : "Projet ajouté !");
                  form.reset();
                  cancelEdit();
                  fetchData();
                } else {
                  alert("Erreur");
                }
              } catch (err) {
                alert("Erreur réseau");
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Titre du projet</label>
                  <input name="title" defaultValue={editingType === "project" ? editingItem?.title : ""} required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Catégorie (ex: Application Web)</label>
                  <input name="category" defaultValue={editingType === "project" ? editingItem?.category : ""} placeholder="Application Web" className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Description courte</label>
                <textarea name="description" defaultValue={editingType === "project" ? editingItem?.description : ""} required className="w-full p-2 bg-background border border-border rounded-md h-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Contexte</label>
                  <textarea name="context" defaultValue={editingType === "project" ? editingItem?.context : ""} className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Problème</label>
                  <textarea name="problem" defaultValue={editingType === "project" ? editingItem?.problem : ""} className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Solution</label>
                  <textarea name="solution" defaultValue={editingType === "project" ? editingItem?.solution : ""} className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Résultats</label>
                  <textarea name="results" defaultValue={editingType === "project" ? editingItem?.results : ""} className="w-full p-2 bg-background border border-border rounded-md h-24" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Stack technique (séparée par des virgules)</label>
                  <input name="techStack" defaultValue={editingType === "project" ? editingItem?.techStack?.join(", ") : ""} className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Lien du site en ligne</label>
                  <input name="liveUrl" defaultValue={editingType === "project" ? editingItem?.liveUrl : ""} type="url" className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Lien GitHub</label>
                  <input name="repoUrl" defaultValue={editingType === "project" ? editingItem?.repoUrl : ""} type="url" className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Image de couverture</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const res = await fetch("/api/upload", { method: "POST", body: formData });
                        const data = await res.json();
                        if (data.url) {
                          const inputUrl = document.createElement("input");
                          inputUrl.type = "hidden";
                          inputUrl.name = "coverImage";
                          inputUrl.value = data.url;
                          e.target.form?.appendChild(inputUrl);
                          alert("Image uploadée !");
                        }
                      } catch (err) {
                        alert("Erreur upload");
                      }
                    }}
                    className="w-full p-2 bg-background border border-border rounded-md"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
                {editingType === "project" ? "Enregistrer les modifications" : "Publier le projet"}
              </button>
            </form>
          </div>

          {/* Liste des projets existants */}
          <div className="p-6 border border-border rounded-xl bg-muted/10">
            <h2 className="text-xl font-bold mb-4">Projets existants</h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                  <div>
                    <p className="font-bold">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(project, "project")} className="p-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(project.id, "project")} className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- ONGLET ARTICLE --- */}
      {activeTab === "post" && (
        <div className="space-y-8">
          <div className="p-6 border border-border rounded-xl bg-muted/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingType === "post" && editingItem ? "Modifier l'article" : "Ajouter un article"}
              </h2>
              {editingType === "post" && (
                <button onClick={cancelEdit} className="text-sm text-red-500 flex items-center gap-1">
                  <X className="h-4 w-4" /> Annuler
                </button>
              )}
            </div>

            <form className="space-y-4" key={editingItem?.id || "new-post"} onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              
              const postData = {
                id: editingType === "post" ? editingItem?.id : undefined,
                title: formData.get("title"),
                slug: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, '-'),
                excerpt: formData.get("excerpt"),
                content: formData.get("content"),
                tags: formData.get("tags")?.toString().split(',').map(s => s.trim()),
                coverImage: formData.get("coverImage"),
                published: true,
              };

              try {
                const method = editingType === "post" ? "PUT" : "POST";
                const res = await fetch("/api/posts", {
                  method,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(postData),
                });

                if (res.ok) {
                  alert(editingType === "post" ? "Article modifié !" : "Article ajouté !");
                  form.reset();
                  cancelEdit();
                  fetchData();
                } else {
                  alert("Erreur");
                }
              } catch (err) {
                alert("Erreur réseau");
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Titre de l'article</label>
                  <input name="title" defaultValue={editingType === "post" ? editingItem?.title : ""} required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tags (séparés par des virgules)</label>
                  <input name="tags" defaultValue={editingType === "post" ? editingItem?.tags?.join(", ") : ""} className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Extrait</label>
                <textarea name="excerpt" defaultValue={editingType === "post" ? editingItem?.excerpt : ""} required className="w-full p-2 bg-background border border-border rounded-md h-20" />
              </div>

              <div>
                <label className="block text-sm mb-1">Contenu (Markdown)</label>
                <textarea name="content" defaultValue={editingType === "post" ? editingItem?.content : ""} required className="w-full p-2 bg-background border border-border rounded-md h-64" />
              </div>

              <div>
                <label className="block text-sm mb-1">Image de couverture</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("file", file);
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: formData });
                      const data = await res.json();
                      if (data.url) {
                        const inputUrl = document.createElement("input");
                        inputUrl.type = "hidden";
                        inputUrl.name = "coverImage";
                        inputUrl.value = data.url;
                        e.target.form?.appendChild(inputUrl);
                        alert("Image uploadée !");
                      }
                    } catch (err) {
                      alert("Erreur upload");
                    }
                  }}
                  className="w-full p-2 bg-background border border-border rounded-md"
                />
              </div>

              <button type="submit" className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
                {editingType === "post" ? "Enregistrer les modifications" : "Publier l'article"}
              </button>
            </form>
          </div>

          <div className="p-6 border border-border rounded-xl bg-muted/10">
            <h2 className="text-xl font-bold mb-4">Articles existants</h2>
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.excerpt?.substring(0, 50)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(post, "post")} className="p-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(post.id, "post")} className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- ONGLET TÉMOIGNAGE --- */}
      {activeTab === "testimonial" && (
        <div className="space-y-8">
          <div className="p-6 border border-border rounded-xl bg-muted/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingType === "testimonial" && editingItem ? "Modifier le témoignage" : "Ajouter un témoignage"}
              </h2>
              {editingType === "testimonial" && (
                <button onClick={cancelEdit} className="text-sm text-red-500 flex items-center gap-1">
                  <X className="h-4 w-4" /> Annuler
                </button>
              )}
            </div>

            <form className="space-y-4" key={editingItem?.id || "new-testimonial"} 
            onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                
                const data = {
                  id: editingType === "testimonial" ? editingItem?.id : undefined,
                  name: formData.get("name"),
                  role: formData.get("role"),
                  company: formData.get("company"),
                  content: formData.get("content"),
                  avatar: formData.get("avatar") || null,
                  rating: formData.get("rating"), 
                };

                try {
                  const method = editingType === "testimonial" ? "PUT" : "POST";
                  const res = await fetch("/api/testimonials", {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (res.ok) {
                    alert(editingType === "testimonial" ? "Témoignage modifié !" : "Témoignage ajouté !");
                    form.reset();
                    cancelEdit();
                    fetchData(); 
                  } else {
                    const err = await res.json();
                    console.error(err);
                    alert("Erreur lors de l'opération");
                  }
                } catch (err) {
                  alert("Erreur réseau");
                }

            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Nom du client</label>
                  <input name="name" defaultValue={editingType === "testimonial" ? editingItem?.name : ""} required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Entreprise</label>
                  <input name="company" defaultValue={editingType === "testimonial" ? editingItem?.company : ""} required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Poste (ex: CEO)</label>
                  <input name="role" defaultValue={editingType === "testimonial" ? editingItem?.role : ""} required className="w-full p-2 bg-background border border-border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Note (sur 5)</label>
                  <select name="rating" defaultValue={editingType === "testimonial" ? editingItem?.rating : "5"} className="w-full p-2 bg-background border border-border rounded-md">
                    <option value="5">5 étoiles</option>
                    <option value="4">4 étoiles</option>
                    <option value="3">3 étoiles</option>
                    <option value="2">2 étoiles</option>
                    <option value="1">1 étoile</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Témoignage</label>
                <textarea name="content" defaultValue={editingType === "testimonial" ? editingItem?.content : ""} required className="w-full p-2 bg-background border border-border rounded-md h-32" />
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
              <button type="submit" className="w-full py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
                {editingType === "testimonial" ? "Enregistrer les modifications" : "Publier le témoignage"}
              </button>
            </form>
          </div>

          <div className="p-6 border border-border rounded-xl bg-muted/10">
            <h2 className="text-xl font-bold mb-4">Témoignages existants</h2>
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(testimonial, "testimonial")} className="p-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(testimonial.id, "testimonial")} className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- ONGLET COMMENTAIRES --- */}
      {activeTab === "comments" && (
        <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Modération des commentaires</h2>
          <AdminCommentsList />
        </div>
      )}

      {/* --- ONGLET MESSAGES --- */}
      {activeTab === "messages" && (
        <div className="p-6 border border-border rounded-xl bg-muted/10 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Messages reçus</h2>
          <MessagesList />
        </div>
      )}
    </div>
  );
}

