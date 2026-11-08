"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data);
        setLoading(false);
      });
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      author: formData.get("author"),
      email: formData.get("email"),
      content: formData.get("content"),
      postId,
    };

    try {
      const res = await fetch("/api/comments", {
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
    <div className="mt-16 pt-12 border-t border-border">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-accent" /> 
        Commentaires ({comments.length})
      </h3>

      {/* Liste des commentaires */}
      <div className="space-y-6 mb-12">
        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground">Aucun commentaire pour le moment. Soyez le premier !</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-muted/10 border border-border rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold">{comment.author}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <p className="text-muted-foreground text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulaire d'ajout */}
      <div className="p-6 bg-muted/5 border border-border rounded-xl">
        <h4 className="font-bold mb-4">Laisser un commentaire</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="author" required placeholder="Votre nom" className="w-full p-2 bg-background border border-border rounded-md" />
            <input name="email" type="email" required placeholder="Votre email (non publié)" className="w-full p-2 bg-background border border-border rounded-md" />
          </div>
          <textarea name="content" required placeholder="Votre commentaire..." className="w-full p-2 bg-background border border-border rounded-md h-24" />
          
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="px-6 py-2 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 flex items-center gap-2 disabled:opacity-50"
          >
            {status === "loading" ? "Envoi..." : "Publier le commentaire"}
            {status !== "loading" && <Send className="h-4 w-4" />}
          </button>

          {status === "success" && (
            <p className="text-sm text-green-500">Votre commentaire a été envoyé et sera publié après modération.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">Une erreur est survenue.</p>
          )}
        </form>
      </div>
    </div>
  );
}