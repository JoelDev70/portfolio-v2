import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Récupérer tous les articles
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des articles" }, { status: 500 });
  }
}

// Ajouter un article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        tags: body.tags,
        coverImage: body.coverImage,
        published: body.published,
      }
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création de l'article" }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const post = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        tags: body.tags,
        coverImage: body.coverImage,
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}