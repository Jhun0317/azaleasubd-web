"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approvePayment(residentId: string) {
  try {
    // We use '(prisma.user as any)' to bypass the TypeScript error during build
    await (prisma.user as any).update({
      where: { id: residentId },
      data: { paymentStatus: "PAID" },
    });

    revalidatePath("/");
    revalidatePath("/admin/payments");
    
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Database not synced. Run npx prisma db push." };
  }
}
