import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CreditCard, Bell, Calendar, Users } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentAnnouncements from '@/components/dashboard/RecentAnnouncements';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import PaymentStatus from '@/components/dashboard/PaymentStatus';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: announcements = [], isLoading: announcementsLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => base44.entities.Announcement.list('-created_date', 10),
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const allEvents = await base44.entities.Event.list('event_date', 100);
      return allEvents.filter(e => e.event_date >= today);
    },
  });

  const { data: myPayments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ['myPayments', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const residents = await base44.entities.Resident.filter({ user_id: user.id });
      if (residents.length === 0) return [];
      return base44.entities.Payment.filter({ resident_id: residents[0].id }, '-created_date', 12);
    },
    enabled: !!user?.email,
  });

  const { data: duesSetting } = useQuery({
    queryKey: ['duesSetting'],
    queryFn: async () => {
      const settings = await base44.entities.DuesSetting.list('-effective_date', 1);
      return settings[0] || null;
    },
  });

  const { data: unreadMessages = [] } = useQuery({
    queryKey: ['unreadMessagesCount', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return base44.entities.Message.filter({ recipient_id: user.id, is_read: false });
    },
    enabled: !!user?.id,
  });

  const pinnedAnnouncements = announcements.filter(a => a.is_pinned);
  const recentAnnouncements = announcements.filter(a => !a.is_pinned).slice(0, 4);
  const displayAnnouncements = [...pinnedAnnouncements, ...recentAnnouncements].slice(0, 4);

  const isLoading = announcementsLoading || eventsLoading || paymentsLoading;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg shadow-emerald-500/20">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Welcome back, {user?.full_name?.split(' ')[0] || 'Resident'}! 👋
        </h1>
        <p className="mt-2 text-emerald-100 text-sm lg:text-base">
          Stay updated with your community. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Unread Messages"
          value={unreadMessages.length}
          icon={Bell}
          color="amber"
        />
        <StatsCard
          title="Upcoming Events"
          value={events.length}
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Announcements"
          value={announcements.length}
          icon={Bell}
          color="emerald"
        />
        <StatsCard
          title="Payments Made"
          value={myPayments.filter(p => p.status === 'verified').length}
          icon={CreditCard}
          color="rose"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          
          {isLoading ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <RecentAnnouncements announcements={displayAnnouncements} />
          )}
        </div>

        <div className="space-y-6">
          <PaymentStatus payments={myPayments} duesSetting={duesSetting} />
          
          {isLoading ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <UpcomingEvents events={events} />
          )}
        </div>
      </div>
    </div>
  );
}