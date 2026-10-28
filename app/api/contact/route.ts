import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation basique
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject || "Nouveau message",
        message: body.message,
      }
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}