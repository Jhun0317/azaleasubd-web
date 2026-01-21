"use client";

import Link from "next/link";
import {
  Bell,
  AlertTriangle,
  Info,
  ChevronRight,
  Pin,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Announcement } from "@/types/announcement";

type Props = {
  announcements: Announcement[];
  limit?: number;
  showViewAll?: boolean;
};

const priorityConfig: Record<
  Announcement["priority"],
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
  }
> = {
  urgent: {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  important: {
    icon: Bell,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  normal: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
};

export default function RecentAnnouncements({
  announcements,
  limit,
  showViewAll = false,
}: Props) {
  const list = limit ? announcements.slice(0, limit) : announcements;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Announcements
        </h3>

        {showViewAll && (
          <Link
            href="/dashboard/announcements"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-10">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No announcements yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((a) => {
            const cfg = priorityConfig[a.priority];
            const Icon = cfg.icon;

            return (
              <div
                key={a.id}
                className={cn(
                  "p-4 rounded-xl border hover:shadow-sm",
                  cfg.bg,
                  cfg.border
                )}
              >
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg bg-white",
                      cfg.color
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {a.isPinned && (
                        <Pin className="w-3 h-3 text-slate-400" />
                      )}
                      <h4 className="text-sm font-medium truncate">
                        {a.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {a.content}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      {format(
                        new Date(a.createdAt),
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
