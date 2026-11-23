import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des projets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        context: body.context,
        problem: body.problem,
        solution: body.solution,
        results: body.results,
        techStack: body.techStack,
        liveUrl: body.liveUrl, 
        repoUrl: body.repoUrl, 
        category: body.category, 
        published: body.published,
        coverImage: body.coverImage, 

      }
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création du projet" }, { status: 500 });
  }
}

// SUPPRIMER un projet
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

// MODIFIER un projet
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        context: body.context,
        problem: body.problem,
        solution: body.solution,
        results: body.results,
        techStack: body.techStack,
        liveUrl: body.liveUrl,
        repoUrl: body.repoUrl,
        coverImage: body.coverImage,
        category: body.category,
      }
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la modification" }, { status: 500 });
  }
}

