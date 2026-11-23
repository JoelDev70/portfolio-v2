"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Reply } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const getAvatarUrl = (email: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${email}&backgroundColor=06b6d4&textColor=ffffff`;
  };

  useEffect(() => {
    const saved = localStorage.getItem("commentUserInfo");
    if (saved) setUserInfo(JSON.parse(saved));
  }, []);

  const fetchComments = () => {
    fetch(`/api/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, parentId: string | null = null) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const content = formData.get("content") as string;
    if (!content || content.trim() === "") {
      setStatus("idle");
      return;
    }

    const name = (formData.get("author") as string) || userInfo.name;
    const email = (formData.get("email") as string) || userInfo.email;

    if (formData.get("author") && formData.get("email")) {
      const newInfo = { name: formData.get("author") as string, email: formData.get("email") as string };
      setUserInfo(newInfo);
      localStorage.setItem("commentUserInfo", JSON.stringify(newInfo));
    }

    const data = { author: name, email, content, postId, parentId };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setReplyingTo(null);
        fetchComments();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const clearUserInfo = () => {
    localStorage.removeItem("commentUserInfo");
    setUserInfo({ name: "", email: "" });
  };

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-accent" /> 
        Commentaires ({comments.length})
      </h3>

      <div className="space-y-6 mb-12">
        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground">Aucun commentaire pour le moment.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-5 bg-muted/10 border border-border rounded-xl">
              
              {/* En-tête du commentaire avec Avatar */}
              <div className="flex items-start gap-4 mb-2">
                <img 
                  src={getAvatarUrl(comment.email || comment.author)} 
                  alt={comment.author} 
                  className="w-10 h-10 rounded-full border border-border shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{comment.content}</p>
                  
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                  >
                    <Reply className="h-3 w-3" /> Répondre
                  </button>
                </div>
              </div>

              {/* Formulaire de réponse */}
              {replyingTo === comment.id && (
                <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4 p-4 bg-background border border-border rounded-lg space-y-3">
                  {(!userInfo.name || !userInfo.email) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input name="author" required placeholder="Votre nom" className="w-full p-2 bg-muted/30 border border-border rounded-md text-sm" />
                      <input name="email" type="email" required placeholder="Votre email" className="w-full p-2 bg-muted/30 border border-border rounded-md text-sm" />
                    </div>
                  )}
                  
                  <textarea name="content" required placeholder="Votre réponse..." className="w-full p-2 bg-muted/30 border border-border rounded-md h-20 text-sm" />
                  
                  <div className="flex gap-2">
                    <button type="submit" disabled={status === "loading"} className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-md hover:bg-accent/90">
                      {status === "loading" ? "Envoi..." : "Publier la réponse"}
                    </button>
                    {userInfo.name && (
                      <button type="button" onClick={clearUserInfo} className="text-xs text-muted-foreground hover:text-red-500">
                        Changer d'identité
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Affichage des réponses avec Avatar */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-6 border-l-2 border-accent/20 space-y-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
                      <img 
                        src={getAvatarUrl(reply.email || reply.author)} 
                        alt={reply.author} 
                        className="w-8 h-8 rounded-full border border-border shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-bold text-sm">{reply.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(reply.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <p className="text-muted-foreground text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Formulaire principal */}
      <div className="p-6 bg-muted/5 border border-border rounded-xl">
        <h4 className="font-bold mb-4">Laisser un commentaire</h4>
        <form onSubmit={(e) => handleSubmit(e, null)} className="space-y-4">
          {(!userInfo.name || !userInfo.email) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="author" required placeholder="Votre nom" className="w-full p-2 bg-background border border-border rounded-md" />
              <input name="email" type="email" required placeholder="Votre email (non publié)" className="w-full p-2 bg-background border border-border rounded-md" />
            </div>
          )}
          
          <textarea name="content" required placeholder="Votre commentaire..." className="w-full p-2 bg-background border border-border rounded-md h-24" />
          
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="px-6 py-2 bg-accent text-accent-foreground font-medium rounded-md hover:bg-accent/90 flex items-center gap-2 disabled:opacity-50"
          >
            {status === "loading" ? "Envoi..." : "Publier le commentaire"}
            {status !== "loading" && <Send className="h-4 w-4" />}
          </button>

          {status === "success" && <p className="text-sm text-green-500">Commentaire publié avec succès !</p>}
          {status === "error" && <p className="text-sm text-red-500">Une erreur est survenue.</p>}
        </form>
      </div>
    </div>
  );
}