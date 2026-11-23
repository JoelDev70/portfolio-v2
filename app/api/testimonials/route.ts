import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("ERREUR GET TESTIMONIALS:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        role: body.role,
        company: body.company,
        content: body.content,
        avatar: body.avatar,
        rating: parseInt(body.rating) || 5, // <-- On force le nombre
      }
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("ERREUR POST TESTIMONIAL:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id: body.id },
      data: {
        name: body.name,
        role: body.role,
        company: body.company,
        content: body.content,
        avatar: body.avatar,
        rating: parseInt(body.rating) || 5, // <-- On force le nombre
      }
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("ERREUR PUT TESTIMONIAL:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

