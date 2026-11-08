import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer les commentaires approuvés d'un article
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "postId manquant" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId, approved: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

// Poster un nouveau commentaire
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const comment = await prisma.comment.create({
      data: {
        author: body.author,
        email: body.email,
        content: body.content,
        postId: body.postId,
        approved: false, // Par défaut, non approuvé (modération)
      }
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}