import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "postId manquant" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { 
        postId: postId,
        parentId: null // Uniquement les parents
      },
      include: {
        replies: true // On inclut toutes les réponses
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("ERREUR PRISMA:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Poster un nouveau commentaire

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 DONNÉES REÇUES PAR L'API :", body);

    const comment = await prisma.comment.create({
      data: {
        author: body.author,
        email: body.email,
        content: body.content,
        postId: body.postId,
        approved: true,
        parentId: body.parentId ? body.parentId : null, 
      }
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("❌ ERREUR POST :", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}






