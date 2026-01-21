"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export async function createPayment() {
  if (!process.env.PAYMONGO_SECRET_KEY) {
    throw new Error("PAYMONGO_SECRET_KEY is missing");
  }

  const amount = 50000; // ₱500.00 (PayMongo uses cents)

  // 1️⃣ CREATE PAYMENT RECORD IN DATABASE (IMPORTANT)
  const payment = await prisma.payment.create({
    data: {
      amount,
      status: "PENDING",
      description: "HOA Monthly Dues",
      userId: "demo-user-id", // replace with real user later
    },
  });

  // 2️⃣ CREATE PAYMONGO CHECKOUT LINK
  const response = await axios.post(
    "https://api.paymongo.com/v1/links",
    {
      data: {
        attributes: {
          amount,
          description: "HOA Monthly Dues",
          remarks: "Test Payment",
          reference_number: payment.id, // 🔑 THIS IS STEP 2
        },
      },
    },
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
    }
  );

  const checkoutUrl = response.data.data.attributes.checkout_url;

  // 3️⃣ REDIRECT USER TO PAYMONGO
  redirect(checkoutUrl);
}
