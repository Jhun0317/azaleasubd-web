import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-user-id";

export async function GET() {
  const profile = await prisma.profile.findUnique({
    where: { userId: DEMO_USER_ID },
  });

  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const profile = await prisma.profile.upsert({
    where: { userId: DEMO_USER_ID },
    update: {
      fullName: body.fullName,
      lotNumber: body.lotNumber,
      phone: body.phone,
    },
    create: {
      userId: DEMO_USER_ID,
      fullName: body.fullName,
      lotNumber: body.lotNumber,
      phone: body.phone,
    },
  });

  return NextResponse.json(profile);
}
