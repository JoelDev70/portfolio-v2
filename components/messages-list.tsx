"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-muted-foreground">Chargement...</p>;
  if (messages.length === 0) return <p className="text-muted-foreground">Aucun message reçu pour le moment.</p>;

  return (
    <div className="space-y-4">
      {messages.map(msg => (
        <div key={msg.id} className="p-4 border border-border rounded-lg bg-background">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold">{msg.subject}</p>
              <p className="text-sm text-muted-foreground">De : {msg.name} ({msg.email})</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <p className="text-sm mt-2">{msg.message}</p>
          <a href={`mailto:${msg.email}`} className="inline-block mt-3 text-sm text-accent hover:underline">
            Répondre par email
          </a>
        </div>
      ))}
    </div>
  );
}