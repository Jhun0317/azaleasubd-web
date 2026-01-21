"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

type Payment = {
  id: number;
  period: string;
  amount: number;
  status: "pending" | "verified" | "rejected";
  paid_at: string;
};

type Props = {
  payments: Payment[];
};

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
} as const;

export default function PaymentHistory({ payments }: Props) {
  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center">
        <p className="text-slate-500">No payment history yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 divide-y">
      {payments.map((p) => {
        const status = statusConfig[p.status];
        const Icon = status.icon;

        return (
          <div key={p.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">
                ₱{p.amount.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">
                {p.period} • {format(new Date(p.paid_at), "MMM d, yyyy")}
              </p>
            </div>

            <Badge
              className={cn(
                status.bg,
                status.color,
                status.border,
                "border flex items-center gap-1"
              )}
            >
              <Icon className="w-3 h-3" />
              {status.label}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}
