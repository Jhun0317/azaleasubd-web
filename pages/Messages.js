import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import {
  MessageSquare,
  Send,
  Inbox,
  SendHorizontal,
  Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const categoryConfig = {
  inquiry: { label: 'Inquiry', color: 'bg-blue-100 text-blue-700' },
  complaint: { label: 'Complaint', color: 'bg-red-100 text-red-700' },
  request: { label: 'Request', color: 'bg-purple-100 text-purple-700' },
  general: { label: 'General', color: 'bg-slate-100 text-slate-700' },
};

export default function Messages() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    category: 'general',
  });

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: inboxMessages = [], isLoading: inboxLoading } = useQuery({
    queryKey: ['inboxMessages', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return base44.entities.Message.filter({ recipient_id: user.id }, '-created_date', 100);
    },
    enabled: !!user?.id,
  });

  const { data: sentMessages = [], isLoading: sentLoading } = useQuery({
    queryKey: ['sentMessages', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return base44.entities.Message.filter({ sender_id: user.id }, '-created_date', 100);
    },
    enabled: !!user?.id,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data) => base44.entities.Message.create({
      ...data,
      sender_id: user.id,
      recipient_id: 'admin',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentMessages'] });
      setShowComposeDialog(false);
      setFormData({ subject: '', content: '', category: 'general' });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => base44.entities.Message.update(id, { is_read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inboxMessages'] });
      queryClient.invalidateQueries({ queryKey: ['unreadMessages'] });
    },
  });

  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
    if (!message.is_read && message.recipient_id === user?.id) {
      markAsReadMutation.mutate(message.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageMutation.mutate(formData);
  };

  const unreadCount = inboxMessages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 mt-1">Communicate with HOA administration</p>
        </div>
        <Button 
          onClick={() => setShowComposeDialog(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Send className="w-4 h-4 mr-2" />
          Compose Message
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            Inbox
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-1.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <SendHorizontal className="w-4 h-4" />
            Sent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-4">
          <MessageList 
            messages={inboxMessages}
            isLoading={inboxLoading}
            onSelect={handleOpenMessage}
            emptyText="No messages in your inbox"
            showUnread
          />
        </TabsContent>

        <TabsContent value="sent" className="mt-4">
          <MessageList 
            messages={sentMessages}
            isLoading={sentLoading}
            onSelect={handleOpenMessage}
            emptyText="No sent messages"
          />
        </TabsContent>
      </Tabs>

      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inquiry">Inquiry</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="request">Request</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Message subject"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Type your message..."
                rows={6}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowComposeDialog(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={sendMessageMutation.isPending}
              >
                {sendMessageMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject || 'Message'}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={categoryConfig[selectedMessage.category]?.color}>
                  {categoryConfig[selectedMessage.category]?.label}
                </Badge>
                <span className="text-sm text-slate-500">
                  {format(new Date(selectedMessage.created_date), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="whitespace-pre-wrap text-slate-700">
                  {selectedMessage.content}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MessageList({ messages, isLoading, onSelect, emptyText, showUnread }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 animate-pulse">
            <div className="h-5 bg-slate-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-slate-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onSelect(message)}
          className={cn(
            "p-4 cursor-pointer hover:bg-slate-50 transition-colors",
            showUnread && !message.is_read && "bg-emerald-50/50"
          )}
        >
          <div className="flex items-start gap-3">
            {showUnread && (
              <div className="pt-1.5">
                <Circle className={cn(
                  "w-2 h-2",
                  message.is_read ? "text-transparent" : "text-emerald-500 fill-emerald-500"
                )} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={cn(
                  "text-sm truncate",
                  showUnread && !message.is_read ? "font-semibold text-slate-900" : "font-medium text-slate-700"
                )}>
                  {message.subject || 'No subject'}
                </h3>
                <Badge variant="outline" className="flex-shrink-0 text-xs">
                  {categoryConfig[message.category]?.label}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 truncate mt-1">
                {message.content}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                {format(new Date(message.created_date), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}