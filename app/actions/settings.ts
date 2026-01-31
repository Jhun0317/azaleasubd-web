"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSystemSettings(formData: FormData) {
  const monthlyDues = parseFloat(formData.get("monthlyDues") as string);
  const dueDay = parseInt(formData.get("dueDay") as string);
  const gcashNumber = formData.get("gcashNumber") as string;
  const bankDetails = formData.get("bankDetails") as string;

  try {
    await prisma.systemSettings.upsert({
      where: { id: 1 },
      update: {
        monthlyDues,
        dueDay,
        gcashNumber,
        bankDetails,
      },
      create: {
        id: 1,
        monthlyDues,
        dueDay,
        gcashNumber,
        bankDetails,
      },
    });

    // This refreshes the data on the Payments page immediately
    revalidatePath("/"); 
    
    // REMOVED the return { success: true } to fix the Type Error
  } catch (error) {
    console.error("Failed to update settings:", error);
    // You can throw an error here if you want the form to handle it
    throw new Error("Failed to save settings");
  }
}
