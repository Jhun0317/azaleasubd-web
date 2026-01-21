"use client";

import Link from "next/link";
import {
  CreditCard,
  FileText,
  MessageSquare,
  Calendar,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    title: "Submit Payment",
    description: "Pay your monthly dues",
    icon: CreditCard,
    href: "/dashboard/payments",
    color: "bg-emerald-500",
  },
  {
    title: "View Documents",
    description: "Access HOA files",
    icon: FileText,
    href: "/documents",
    color: "bg-blue-500",
  },
  {
    title: "Send Message",
    description: "Contact admin",
    icon: MessageSquare,
    href: "/messages",
    color: "bg-purple-500",
  },
  {
    title: "View Events",
    description: "Check calendar",
    icon: Calendar,
    href: "/events",
    color: "bg-amber-500",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200"
          >
            <div
              className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center shadow-sm`}
            >
              <action.icon className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {action.title}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {action.description}
              </p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}
