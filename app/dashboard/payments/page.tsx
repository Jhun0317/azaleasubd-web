import PaymentHistory from "@/components/payments/PaymentHistory";
import Link from "next/link";

/* ===== MOCK DATA (replace with DB later) ===== */
async function getPayments() {
  return [
    {
      id: 1,
      period: "January 2026",
      amount: 500,
      status: "paid", // change to test UI
      paid_at: "2026-01-15",
    },
  ];
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>

        <Link
          href="/dashboard/payments/pay"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Pay Now
        </Link>
      </div>

      {/* History */}
      <PaymentHistory payments={payments} />
    </div>
  );
}
