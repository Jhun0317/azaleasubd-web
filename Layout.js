import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import {
  Settings,
  CreditCard,
  Bell,
  FileText,
  Save,
  Plus,
  Upload,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [duesData, setDuesData] = useState({
    monthly_amount: '',
    due_day: 15,
    late_fee: '',
    grace_period_days: 5,
    gcash_number: '',
    bank_details: '',
  });
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    priority: 'normal',
    category: 'general',
    is_pinned: false,
  });
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    category: 'other',
    file_url: '',
    is_public: true,
  });
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const { data: duesSetting } = useQuery({
    queryKey: ['duesSetting'],
    queryFn: async () => {
      const settings = await base44.entities.DuesSetting.list('-effective_date', 1);
      return settings[0] || null;
    },
  });

  const { data: pendingPayments = [] } = useQuery({
    queryKey: ['pendingPayments'],
    queryFn: () => base44.entities.Payment.filter({ status: 'pending' }, '-created_date', 100),
  });

  const { data: residents = [] } = useQuery({
    queryKey: ['allResidents'],
    queryFn: () => base44.entities.Resident.list('-created_date', 500),
  });

  useEffect(() => {
    if (duesSetting) {
      setDuesData({
        monthly_amount: duesSetting.monthly_amount || '',
        due_day: duesSetting.due_day || 15,
        late_fee: duesSetting.late_fee || '',
        grace_period_days: duesSetting.grace_period_days || 5,
        gcash_number: duesSetting.gcash_number || '',
        bank_details: duesSetting.bank_details || '',
      });
    }
  }, [duesSetting]);

  const saveDuesMutation = useMutation({
    mutationFn: async (data) => {
      if (duesSetting) {
        return base44.entities.DuesSetting.update(duesSetting.id, data);
      } else {
        return base44.entities.DuesSetting.create({
          ...data,
          effective_date: new Date().toISOString().split('T')[0],
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['duesSetting'] });
      toast.success('Settings saved');
    },
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: (data) => base44.entities.Announcement.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      setShowAnnouncementDialog(false);
      setAnnouncementData({ title: '', content: '', priority: 'normal', category: 'general', is_pinned: false });
      toast.success('Announcement posted');
    },
  });

  const createDocumentMutation = useMutation({
    mutationFn: (data) => base44.entities.Document.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setShowDocumentDialog(false);
      setDocumentData({ title: '', description: '', category: 'other', file_url: '', is_public: true });
      toast.success('Document uploaded');
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Payment.update(id, { 
      status,
      verified_date: new Date().toISOString(),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingPayments'] });
      toast.success('Payment updated');
    },
  });

  const handleSaveDues = () => {
    saveDuesMutation.mutate({
      ...duesData,
      monthly_amount: parseFloat(duesData.monthly_amount) || 0,
      late_fee: parseFloat(duesData.late_fee) || 0,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setDocumentData(prev => ({ ...prev, file_url }));
    setUploading(false);
  };

  const getResidentForPayment = (payment) => {
    return residents.find(r => r.id === payment.resident_id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
        <p className="text-slate-500 mt-1">Manage HOA settings, payments, and content</p>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="payments">
            <CreditCard className="w-4 h-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="dues">
            <Settings className="w-4 h-4 mr-2" />
            Dues
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Bell className="w-4 h-4 mr-2" />
            Announce
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pending Payment Verifications
                <Badge variant="secondary">{pendingPayments.length}</Badge>
              </CardTitle>
              <CardDescription>
                Review and verify submitted payment receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingPayments.length === 0 ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-slate-500">All payments have been verified</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingPayments.map(payment => {
                    const resident = getResidentForPayment(payment);
                    return (
                      <div 
                        key={payment.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-medium text-slate-900">
                              Unit {resident?.unit_number || 'Unknown'}
                            </p>
                            <Badge variant="outline">{payment.payment_method}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                            <span>₱{payment.amount?.toLocaleString()}</span>
                            <span>{payment.period_month}</span>
                            <span>Ref: {payment.reference_number || '-'}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Submitted {format(new Date(payment.created_date), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {payment.receipt_url && (
                            <a
                              href={payment.receipt_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4 text-slate-600" />
                            </a>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => verifyPaymentMutation.mutate({ id: payment.id, status: 'rejected' })}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => verifyPaymentMutation.mutate({ id: payment.id, status: 'verified' })}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dues">
          <Card>
            <CardHeader>
              <CardTitle>Dues Configuration</CardTitle>
              <CardDescription>
                Set monthly dues amount and payment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Dues Amount (₱)</Label>
                  <Input
                    type="number"
                    value={duesData.monthly_amount}
                    onChange={(e) => setDuesData(prev => ({ ...prev, monthly_amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Day (Day of Month)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="28"
                    value={duesData.due_day}
                    onChange={(e) => setDuesData(prev => ({ ...prev, due_day: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Late Fee (₱)</Label>
                  <Input
                    type="number"
                    value={duesData.late_fee}
                    onChange={(e) => setDuesData(prev => ({ ...prev, late_fee: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grace Period (Days)</Label>
                  <Input
                    type="number"
                    value={duesData.grace_period_days}
                    onChange={(e) => setDuesData(prev => ({ ...prev, grace_period_days: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <h3 className="font-medium">Payment Methods</h3>
                <div className="space-y-2">
                  <Label>GCash Number</Label>
                  <Input
                    value={duesData.gcash_number}
                    onChange={(e) => setDuesData(prev => ({ ...prev, gcash_number: e.target.value }))}
                    placeholder="09XX XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bank Details</Label>
                  <Textarea
                    value={duesData.bank_details}
                    onChange={(e) => setDuesData(prev => ({ ...prev, bank_details: e.target.value }))}
                    placeholder="Bank name, account number, account name..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveDues}
                  disabled={saveDuesMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveDuesMutation.isPending ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Post Announcement</CardTitle>
                <CardDescription>
                  Create announcements for the community
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowAnnouncementDialog(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>
                  Add documents for residents to access
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowDocumentDialog(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            createAnnouncementMutation.mutate(announcementData);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={announcementData.title}
                onChange={(e) => setAnnouncementData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select 
                  value={announcementData.priority}
                  onValueChange={(v) => setAnnouncementData(prev => ({ ...prev, priority: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={announcementData.category}
                  onValueChange={(v) => setAnnouncementData(prev => ({ ...prev, category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={announcementData.content}
                onChange={(e) => setAnnouncementData(prev => ({ ...prev, content: e.target.value }))}
                rows={5}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={announcementData.is_pinned}
                onCheckedChange={(v) => setAnnouncementData(prev => ({ ...prev, is_pinned: v }))}
              />
              <Label>Pin this announcement</Label>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowAnnouncementDialog(false)}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={createAnnouncementMutation.isPending}
              >
                {createAnnouncementMutation.isPending ? 'Posting...' : 'Post Announcement'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            createDocumentMutation.mutate(documentData);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={documentData.title}
                onChange={(e) => setDocumentData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={documentData.category}
                onValueChange={(v) => setDocumentData(prev => ({ ...prev, category: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rules">Rules & Regulations</SelectItem>
                  <SelectItem value="minutes">Meeting Minutes</SelectItem>
                  <SelectItem value="forms">Forms</SelectItem>
                  <SelectItem value="policies">Policies</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea
                value={documentData.description}
                onChange={(e) => setDocumentData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>File</Label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="doc-upload"
                />
                <label htmlFor="doc-upload" className="cursor-pointer">
                  {uploading ? (
                    <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto" />
                  ) : documentData.file_url ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <p className="text-sm text-emerald-600">File uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-sm text-slate-500">Click to upload</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={createDocumentMutation.isPending || !documentData.file_url}
              >
                {createDocumentMutation.isPending ? 'Uploading...' : 'Upload Document'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}