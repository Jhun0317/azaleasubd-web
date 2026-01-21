import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentAnnouncements from "@/components/dashboard/RecentAnnouncements";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import PaymentStatus from "@/components/dashboard/PaymentStatus";

import { Bell, Calendar, CreditCard } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // ✅ SERVER-SIDE DATA FETCHING
  const announcements = await prisma.announcement.findMany({
    orderBy: [
      { isPinned: "desc" },
      { createdAt: "desc" },
    ],
    take: 4,
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
        <p className="mt-1 text-emerald-100 text-sm">
          Stay updated with your community. Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Unread Messages" value={0} icon={Bell} color="amber" />
        <StatsCard title="Upcoming Events" value={0} icon={Calendar} color="blue" />
        <StatsCard title="Announcements" value={announcements.length} icon={Bell} color="emerald" />
        <StatsCard title="Payments Made" value={0} icon={CreditCard} color="rose" />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <RecentAnnouncements announcements={announcements} />
        </div>

        <div className="space-y-6">
          <PaymentStatus payments={[]} duesSetting={null} />
          <UpcomingEvents events={[]} />
        </div>
      </div>
    </div>
  );
}
