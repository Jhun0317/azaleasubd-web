"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateGcashSettings(newNumber: string) {
  try {
    // @ts-ignore
    await prisma.globalSettings.upsert({
      where: { id: "system" },
      update: { adminGcashNumber: newNumber },
      create: { id: "system", adminGcashNumber: newNumber },
    });

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Settings Error:", error);
    return { success: false };
  }
}
