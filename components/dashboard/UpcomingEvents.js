import Link from "next/link"
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function UpcomingEvents({ events = [] }) {
  const getDateLabel = (dateStr) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Upcoming Events</h3>
        <Link href="/dashboard/events"
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No upcoming events</p>
          </div>
        ) : (
          events.slice(0, 4).map((event) => (
            <div 
              key={event.id}
              className="group flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center border border-slate-200">
                <span className="text-xs font-medium text-slate-500 uppercase">
                  {format(parseISO(event.event_date), 'MMM')}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {format(parseISO(event.event_date), 'd')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-slate-900 truncate">
                    {event.title}
                  </h4>
                  {event.is_mandatory && (
                    <Badge variant="secondary" className="text-xs bg-rose-100 text-rose-700 border-0">
                      Required
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  {event.start_time && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.start_time}
                    </span>
                  )}
                  {event.location && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}