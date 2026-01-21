"use client";

import { cn } from "@/lib/utils";

const statusStyles = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

export default function PaymentHistory({ payments = [] }) {
  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-slate-500">
        No payment records yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-4 text-left">Period</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Paid Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b last:border-none">
              <td className="p-4">{p.period}</td>
              <td className="p-4">₱{p.amount}</td>
              <td className="p-4">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    statusStyles[p.status]
                  )}
                >
                  {p.status.toUpperCase()}
                </span>
              </td>
              <td className="p-4 text-slate-500">
                {p.paid_at ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
