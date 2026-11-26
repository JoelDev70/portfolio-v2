"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Trash2, CornerDownRight, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  email: string; // <-- Ajouté pour l'avatar
  content: string;
  approved: boolean;
  createdAt: string;
  post: { title: string };
  replies?: Comment[];
}

export function AdminCommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour générer l'avatar
  const getAvatarUrl = (email: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${email}&backgroundColor=06b6d4&textColor=ffffff`;
  };

  const fetchComments = () => {
    fetch("/api/admin/comments")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // On filtre pour ne garder que les commentaires parents
          const parents = data.filter((c: any) => !c.parentId);
          setComments(parents);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleToggleVisibility = async (id: string, currentApproved: boolean) => {
    await fetch("/api/admin/comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: !currentApproved }),
    });
    fetchComments();
  };

  const handleDelete = async (id: string, isReply = false) => {
    const msg = isReply 
      ? "Supprimer cette réponse ?" 
      : "Supprimer ce commentaire et toutes ses réponses ?";
    
    if (!confirm(msg)) return;
    
    await fetch("/api/admin/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchComments();
  };

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;
  if (comments.length === 0) return <p className="text-muted-foreground">Aucun commentaire pour le moment.</p>;

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="p-5 border border-border rounded-xl bg-background">
          
          {/* En-tête du commentaire parent avec Avatar */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-start gap-3">
              <img 
                src={getAvatarUrl(comment.email || comment.author)} 
                alt={comment.author} 
                className="w-10 h-10 rounded-full border border-border shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  <p className="font-bold">{comment.author}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sur : <span className="font-medium text-foreground">{comment.post.title}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleToggleVisibility(comment.id, comment.approved)} 
                className={`p-2 rounded-md transition-colors ${
                  comment.approved 
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                    : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                }`}
                title={comment.approved ? "Masquer le commentaire" : "Rendre visible"}
              >
                {comment.approved ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => handleDelete(comment.id)} 
                className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20" 
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Contenu du commentaire parent */}
          <p className="text-sm mt-2 p-3 bg-muted/10 rounded-lg">{comment.content}</p>

          {/* Affichage des réponses avec Avatars */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-6 border-l-2 border-accent/20 space-y-3">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-md">
                  <img 
                    src={getAvatarUrl(reply.email || reply.author)} 
                    alt={reply.author} 
                    className="w-8 h-8 rounded-full border border-border shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <CornerDownRight className="h-3 w-3 text-accent" />
                        <p className="font-bold text-sm">{reply.author}</p>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(reply.createdAt).toLocaleString("fr-FR")}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleToggleVisibility(reply.id, reply.approved)} 
                          className={`p-1 rounded transition-colors ${
                            reply.approved ? "text-green-500 hover:bg-green-500/10" : "text-yellow-500 hover:bg-yellow-500/10"
                          }`}
                          title={reply.approved ? "Masquer" : "Afficher"}
                        >
                          {reply.approved ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(reply.id, true)} 
                          className="p-1 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Supprimer la réponse"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
