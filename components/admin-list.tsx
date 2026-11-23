"use client";

import { Edit, Trash2 } from "lucide-react";

interface AdminListProps {
  items: any[];
  type: "project" | "post" | "testimonial";
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export function AdminList({ items, type, onEdit, onDelete }: AdminListProps) {
  if (items.length === 0) {
    return <p className="text-muted-foreground">Aucun élément pour le moment.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
          <div>
            <p className="font-bold">{item.title || item.name}</p>
            <p className="text-sm text-muted-foreground">
              {type === "project" && item.category}
              {type === "post" && item.excerpt?.substring(0, 50) + "..."}
              {type === "testimonial" && item.company}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(item)}
              className="p-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20"
              title="Modifier"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(item.id)}
              className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}