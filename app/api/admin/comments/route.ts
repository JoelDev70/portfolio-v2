import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const comments = await prisma.comment.findMany({
    include: { post: { select: { title: true } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(comments);
}

export async function PATCH(request: Request) {
  const { id, approved } = await request.json();
  const comment = await prisma.comment.update({
    where: { id },
    data: { approved }
  });
  return NextResponse.json(comment);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.comment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}