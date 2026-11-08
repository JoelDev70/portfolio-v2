"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  approved: boolean;
  createdAt: string;
  post: { title: string };
}

export function AdminCommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch("/api/admin/comments")
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (id: string, approved: boolean) => {
    await fetch("/api/admin/comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce commentaire ?")) return;
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
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="p-4 border border-border rounded-lg bg-background">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold">{comment.author}</p>
              <p className="text-sm text-muted-foreground">Sur : {comment.post.title}</p>
              <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString("fr-FR")}</p>
            </div>
            <div className="flex gap-2">
              {!comment.approved ? (
                <button onClick={() => handleApprove(comment.id, true)} className="p-2 bg-green-500/10 text-green-500 rounded-md hover:bg-green-500/20" title="Approuver">
                  <Check className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => handleApprove(comment.id, false)} className="p-2 bg-yellow-500/10 text-yellow-500 rounded-md hover:bg-yellow-500/20" title="Désapprouver">
                  <X className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => handleDelete(comment.id)} className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20" title="Supprimer">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-sm mt-2">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}