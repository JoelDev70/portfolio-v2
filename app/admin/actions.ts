"use server";

import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // On vérifie les deux (email + mot de passe)
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Email ou mot de passe incorrect." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}