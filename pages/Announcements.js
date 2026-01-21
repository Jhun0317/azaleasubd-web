import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import {
  Bell,
  AlertTriangle,
  Info,
  Pin,
  Search,
  Calendar,
  Paperclip
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const priorityConfig = {
  urgent: { label: 'Urgent', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  important: { label: 'Important', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  normal: { label: 'Normal', icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
};

const categoryLabels = {
  general: 'General',
  maintenance: 'Maintenance',
  security: 'Security',
  event: 'Event',
  payment: 'Payment',
  meeting: 'Meeting',
};

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => base44.entities.Announcement.list('-created_date', 100),
  });

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = !searchQuery || 
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || a.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || a.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.is_pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.is_pinned);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
        <p className="text-slate-500 mt-1">Stay updated with community news and updates</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-slate-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No announcements found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pinnedAnnouncements.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Pin className="w-4 h-4" /> Pinned
              </p>
              {pinnedAnnouncements.map((announcement) => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement}
                  onClick={() => setSelectedAnnouncement(announcement)}
                />
              ))}
            </div>
          )}

          {regularAnnouncements.length > 0 && (
            <div className="space-y-3">
              {pinnedAnnouncements.length > 0 && (
                <p className="text-sm font-medium text-slate-500">Recent</p>
              )}
              {regularAnnouncements.map((announcement) => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement}
                  onClick={() => setSelectedAnnouncement(announcement)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedAnnouncement?.is_pinned && (
                <Pin className="w-4 h-4 text-slate-400" />
              )}
              {selectedAnnouncement?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={cn(
                  priorityConfig[selectedAnnouncement.priority]?.bg,
                  priorityConfig[selectedAnnouncement.priority]?.color,
                  priorityConfig[selectedAnnouncement.priority]?.border,
                  "border"
                )}>
                  {priorityConfig[selectedAnnouncement.priority]?.label}
                </Badge>
                <Badge variant="outline">
                  {categoryLabels[selectedAnnouncement.category] || selectedAnnouncement.category}
                </Badge>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(selectedAnnouncement.created_date), 'MMMM d, yyyy')}
                </span>
              </div>
              
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-wrap">{selectedAnnouncement.content}</p>
              </div>

              {selectedAnnouncement.attachment_url && (
                <a 
                  href={selectedAnnouncement.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  <Paperclip className="w-4 h-4" />
                  View Attachment
                </a>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AnnouncementCard({ announcement, onClick }) {
  const priority = priorityConfig[announcement.priority] || priorityConfig.normal;
  
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl p-5 shadow-sm border cursor-pointer hover:shadow-md transition-all duration-200",
        priority.border
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl", priority.bg)}>
          <priority.icon className={cn("w-5 h-5", priority.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                {announcement.is_pinned && (
                  <Pin className="w-3 h-3 text-slate-400" />
                )}
                <h3 className="font-semibold text-slate-900">{announcement.title}</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {announcement.content}
              </p>
            </div>
            <Badge variant="outline" className="flex-shrink-0">
              {categoryLabels[announcement.category] || announcement.category}
            </Badge>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(announcement.created_date), 'MMM d, yyyy')}
            </span>
            {announcement.attachment_url && (
              <span className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                Attachment
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}	