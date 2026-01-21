import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, parseISO, isToday, isTomorrow, isPast, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const eventTypeConfig = {
  meeting: { label: 'Meeting', color: 'bg-blue-500' },
  social: { label: 'Social', color: 'bg-purple-500' },
  maintenance: { label: 'Maintenance', color: 'bg-amber-500' },
  other: { label: 'Other', color: 'bg-slate-500' },
};

export default function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('event_date', 100),
  });

  const upcomingEvents = events.filter(e => !isPast(parseISO(e.event_date)));
  const pastEvents = events.filter(e => isPast(parseISO(e.event_date)));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = monthStart.getDay();

  const getEventsForDay = (day) => {
    return events.filter(e => isSameDay(parseISO(e.event_date), day));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-500 mt-1">Community events and meetings</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-7">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-slate-500 border-b border-slate-100">
                {day}
              </div>
            ))}
            
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 p-2 bg-slate-50" />
            ))}
            
            {daysInMonth.map(day => {
              const dayEvents = getEventsForDay(day);
              const isCurrentDay = isToday(day);
              
              return (
                <div 
                  key={day.toISOString()}
                  className={cn(
                    "h-24 p-2 border-b border-r border-slate-100 hover:bg-slate-50 transition-colors",
                    !isSameMonth(day, currentMonth) && "bg-slate-50 text-slate-400"
                  )}
                >
                  <span className={cn(
                    "inline-flex items-center justify-center w-7 h-7 text-sm rounded-full",
                    isCurrentDay && "bg-emerald-500 text-white font-semibold"
                  )}>
                    {format(day, 'd')}
                  </span>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded truncate cursor-pointer text-white",
                          eventTypeConfig[event.event_type]?.color || 'bg-slate-500'
                        )}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-slate-400 px-1.5">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-1/3 mb-3" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No upcoming events</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-slate-500">Upcoming Events</h2>
                {upcomingEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>

              {pastEvents.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-medium text-slate-500">Past Events</h2>
                  {pastEvents.slice(0, 5).map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onClick={() => setSelectedEvent(event)}
                      isPast
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={cn(
                  "text-white",
                  eventTypeConfig[selectedEvent.event_type]?.color || 'bg-slate-500'
                )}>
                  {eventTypeConfig[selectedEvent.event_type]?.label || selectedEvent.event_type}
                </Badge>
                {selectedEvent.is_mandatory && (
                  <Badge variant="destructive">Required Attendance</Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{format(parseISO(selectedEvent.event_date), 'MMMM d, yyyy')}</span>
                </div>
                {selectedEvent.start_time && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {selectedEvent.start_time}
                      {selectedEvent.end_time && ` - ${selectedEvent.end_time}`}
                    </span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-slate-600 col-span-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
              </div>

              {selectedEvent.description && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Description</p>
                  <p className="text-slate-700 whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.is_mandatory && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-amber-800">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">This is a mandatory event. All residents are expected to attend.</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EventCard({ event, onClick, isPast = false }) {
  const typeConfig = eventTypeConfig[event.event_type] || eventTypeConfig.other;
  
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl p-5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all duration-200",
        isPast && "opacity-60"
      )}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-slate-500 uppercase">
            {format(parseISO(event.event_date), 'MMM')}
          </span>
          <span className="text-2xl font-bold text-slate-900">
            {format(parseISO(event.event_date), 'd')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-900">{event.title}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                {event.start_time && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.start_time}
                  </span>
                )}
                {event.location && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {event.is_mandatory && (
                <Badge variant="destructive" className="text-xs">Required</Badge>
              )}
              <Badge className={cn("text-white text-xs", typeConfig.color)}>
                {typeConfig.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}