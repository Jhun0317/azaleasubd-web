import React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: "emerald" | "blue" | "amber" | "rose";
  subtitle?: string;
  trend?: "up" | "down";
  trendValue?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "emerald",
}: StatsCardProps) {
  const colorClasses: Record<NonNullable<StatsCardProps["color"]>, string> = {
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-500/25",
    blue: "from-blue-500 to-indigo-600 shadow-blue-500/25",
    amber: "from-amber-500 to-orange-600 shadow-amber-500/25",
    rose: "from-rose-500 to-pink-600 shadow-rose-500/25",
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>

          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}

          {trend && trendValue && (
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                trend === "up"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              )}
            >
              <span>{trend === "up" ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
            colorClasses[color]
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-slate-50" />
    </div>
  );
}
