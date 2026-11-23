"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Trash2, CornerDownRight, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  approved: boolean;
  createdAt: string;
  post: { title: string };
  replies?: Comment[];
}

export function AdminCommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = () => {
    fetch("/api/admin/comments")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // On filtre pour ne garder que les commentaires parents (ceux qui n'ont pas de parentId)
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
          
          {/* En-tête du commentaire parent */}
          <div className="flex justify-between items-start mb-3">
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

          {/* Affichage des réponses (si présentes) */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-6 border-l-2 border-accent/20 space-y-3">
              {comment.replies.map(reply => (
                <div key={reply.id} className="p-3 bg-muted/20 rounded-md relative group">
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
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}






// "use client";

// import { useEffect, useState } from "react";
// import { Eye, EyeOff, Trash2, CornerDownRight } from "lucide-react";

// interface Comment {
//   id: string;
//   author: string;
//   content: string;
//   approved: boolean;
//   createdAt: string;
//   post: { title: string };
//   replies?: Comment[];
// }

// export function AdminCommentsList() {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchComments = () => {
//     fetch("/api/admin/comments")
//       .then(res => res.json())
//       .then(data => {
//         // On filtre pour ne garder que les parents (ceux qui n'ont pas de parentId)
//         const parents = data.filter((c: any) => !c.parentId);
//         setComments(parents);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const handleToggleVisibility = async (id: string, currentApproved: boolean) => {
//     await fetch("/api/admin/comments", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, approved: !currentApproved }),
//     });
//     fetchComments();
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Supprimer ce commentaire et ses réponses ?")) return;
//     await fetch("/api/admin/comments", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     fetchComments();
//   };

//   if (loading) return <p className="text-muted-foreground">Chargement...</p>;
//   if (comments.length === 0) return <p className="text-muted-foreground">Aucun commentaire.</p>;

//   return (
//     <div className="space-y-4">
//       {comments.map(comment => (
//         <div key={comment.id} className="p-4 border border-border rounded-lg bg-background">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <p className="font-bold">{comment.author}</p>
//               <p className="text-sm text-muted-foreground">Sur : {comment.post.title}</p>
//               <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString("fr-FR")}</p>
//             </div>
//             <div className="flex gap-2">
//               <button 
//                 onClick={() => handleToggleVisibility(comment.id, comment.approved)} 
//                 className={`p-2 rounded-md transition-colors ${
//                   comment.approved 
//                     ? "bg-green-500/10 text-green-500" 
//                     : "bg-yellow-500/10 text-yellow-500"
//                 }`}
//                 title={comment.approved ? "Masquer" : "Afficher"}
//               >
//                 {comment.approved ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
//               </button>
//               <button 
//                 onClick={() => handleDelete(comment.id)} 
//                 className="p-2 bg-red-500/10 text-red-500 rounded-md"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//           <p className="text-sm mt-2">{comment.content}</p>

//           {/* Affichage des réponses dans l'admin */}
//           {comment.replies && comment.replies.length > 0 && (
//             <div className="mt-4 pl-6 border-l-2 border-border space-y-3">
//               {comment.replies.map(reply => (
//                 <div key={reply.id} className="p-3 bg-muted/20 rounded-md">
//                   <div className="flex justify-between items-center mb-1">
//                     <div className="flex items-center gap-2">
//                       <CornerDownRight className="h-3 w-3 text-muted-foreground" />
//                       <p className="font-bold text-sm">{reply.author}</p>
//                     </div>
//                     <button 
//                       onClick={() => handleDelete(reply.id)} 
//                       className="p-1 text-red-500/70 hover:text-red-500"
//                     >
//                       <Trash2 className="h-3 w-3" />
//                     </button>
//                   </div>
//                   <p className="text-sm text-muted-foreground">{reply.content}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }