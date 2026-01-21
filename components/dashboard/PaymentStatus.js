"use client";

import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function PaymentStatus({ payments = [], duesSetting }) {
  const currentMonth = format(new Date(), "yyyy-MM");
  const currentMonthPayment = payments.find(
    (p) => p.period_month === currentMonth
  );

  const monthlyAmount = duesSetting?.monthly_amount || 0;
  const dueDay = duesSetting?.due_day || 15;
  const today = new Date().getDate();

  const isOverdue =
    currentMonthPayment?.status !== "verified" && today > dueDay;

  const getStatus = () => {
    if (currentMonthPayment?.status === "verified") {
      return {
        label: "Paid",
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      };
    }

    if (currentMonthPayment?.status === "pending") {
      return {
        label: "Pending Verification",
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
      };
    }

    if (isOverdue) {
      return {
        label: "Overdue",
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-50",
      };
    }

    return {
      label: "Unpaid",
      icon: CreditCard,
      color: "text-slate-600",
      bg: "bg-slate-50",
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Payment Status
        </h3>

        <Link
          href="/dashboard/payments"
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
        >
          View History <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className={cn("p-4 rounded-xl", status.bg)}>
        <div className="flex items-center gap-3">
          <StatusIcon className={cn("w-8 h-8", status.color)} />
          <div>
            <p className="text-sm text-slate-500">
              {format(new Date(), "MMMM yyyy")} Dues
            </p>
            <p className={cn("text-lg font-semibold", status.color)}>
              {status.label}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Monthly Amount</span>
          <span className="text-lg font-bold text-slate-900">
            ₱{monthlyAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-slate-500">Due Date</span>
          <span className="text-sm font-medium text-slate-700">
            Every {dueDay}th of the month
          </span>
        </div>
      </div>

      {status.label !== "Paid" &&
        status.label !== "Pending Verification" && (
 <Link
  href="/dashboard/payments/pay"
  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
>
  Pay Now
</Link>

        )}
    </div>
  );
}
