import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      where: { 
        parentId: null // On ne récupère que les parents
      },
      include: {
        post: { 
          select: { title: true } 
        },
        replies: { 
          orderBy: { createdAt: "asc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, approved } = await request.json();
    const comment = await prisma.comment.update({
      where: { id },
      data: { approved }
    });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}