import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.title || !body.content) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const announcement = await prisma.announcement.create({
    data: {
      title: body.title,
      content: body.content,
      priority: body.priority || "normal",
      isPinned: body.isPinned || false,
    },
  });

  return NextResponse.json(announcement);
}
