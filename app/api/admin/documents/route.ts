import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;

  if (!file || !title) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/documents"
  );

  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  const fileUrl = `/uploads/documents/${fileName}`;

  await prisma.document.create({
    data: {
      title,
      fileUrl,
      fileType: file.type,
      uploadedBy: "admin", // replace later with real admin user
    },
  });

  return NextResponse.json({ success: true });
}
