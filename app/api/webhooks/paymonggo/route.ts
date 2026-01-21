import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const eventType = body?.data?.attributes?.type;

  // We only care about successful payments
  if (eventType !== "payment.paid") {
    return NextResponse.json({ received: true });
  }

  const paymentId =
    body.data.attributes.data.attributes.reference_number;

  if (!paymentId) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  // Update payment record
  await prisma.payment.updateMany({
    where: {
      id: paymentId,
    },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}
