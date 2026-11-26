"use client";

import { useState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form action={handleSubmit} className="p-8 bg-muted/20 border border-border rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Accès Admin</h1>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
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