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
        published: body.published,
      }
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de la création du projet" }, { status: 500 });
  }
}

