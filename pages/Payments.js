import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import {
  CreditCard,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Plus,
  Receipt,
  Smartphone,
  Building2,
  Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  verified: { label: 'Verified', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
};

const paymentMethods = [
  { value: 'gcash', label: 'GCash', icon: Smartphone },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: Building2 },
  { value: 'cash', label: 'Cash', icon: Banknote },
];

export default function Payments() {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    amount: '',
    payment_type: 'monthly_dues',
    payment_method: 'gcash',
    reference_number: '',
    period_month: format(new Date(), 'yyyy-MM'),
    notes: '',
    receipt_url: '',
  });
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: resident } = useQuery({
    queryKey: ['myResident', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const residents = await base44.entities.Resident.filter({ user_id: user.id });
      return residents[0] || null;
    },
    enabled: !!user?.id,
  });

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['myPayments', resident?.id],
    queryFn: async () => {
      if (!resident?.id) return [];
      return base44.entities.Payment.filter({ resident_id: resident.id }, '-created_date', 50);
    },
    enabled: !!resident?.id,
  });

  const { data: duesSetting } = useQuery({
    queryKey: ['duesSetting'],
    queryFn: async () => {
      const settings = await base44.entities.DuesSetting.list('-effective_date', 1);
      return settings[0] || null;
    },
  });

  const createPaymentMutation = useMutation({
    mutationFn: (data) => base44.entities.Payment.create({
      ...data,
      resident_id: resident.id,
      status: 'pending',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPayments'] });
      setShowPaymentDialog(false);
      resetForm();
    },
  });

  const resetForm = () => {
    setFormData({
      amount: duesSetting?.monthly_amount || '',
      payment_type: 'monthly_dues',
      payment_method: 'gcash',
      reference_number: '',
      period_month: format(new Date(), 'yyyy-MM'),
      notes: '',
      receipt_url: '',
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setFormData(prev => ({ ...prev, receipt_url: file_url }));
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPaymentMutation.mutate({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  const filteredPayments = payments.filter(p => 
    filterStatus === 'all' || p.status === filterStatus
  );

  const totalPaid = payments
    .filter(p => p.status === 'verified')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-500 mt-1">Manage your HOA dues and payments</p>
        </div>
        <Button 
          onClick={() => {
            resetForm();
            setShowPaymentDialog(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Submit Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Monthly Dues</p>
              <p className="text-2xl font-bold text-slate-900">
                ₱{(duesSetting?.monthly_amount || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Paid (This Year)</p>
              <p className="text-2xl font-bold text-slate-900">
                ₱{totalPaid.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Pending Verification</p>
              <p className="text-2xl font-bold text-slate-900">
                {payments.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {duesSetting?.gcash_number && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <Smartphone className="w-10 h-10" />
            <div>
              <p className="text-blue-100 text-sm">Send payments via GCash to:</p>
              <p className="text-2xl font-bold">{duesSetting.gcash_number}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Filter className="w-4 h-4 text-slate-400" />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No payments found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredPayments.map((payment) => {
              const status = statusConfig[payment.status] || statusConfig.pending;
              return (
                <div 
                  key={payment.id}
                  className="p-4 sm:p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPayment(payment)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", status.bg)}>
                        <status.icon className={cn("w-5 h-5", status.color)} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {payment.payment_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-sm text-slate-500">
                          {payment.period_month} • {payment.payment_method?.replace(/_/g, ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">
                        ₱{(payment.amount || 0).toLocaleString()}
                      </p>
                      <Badge className={cn("mt-1", status.bg, status.color, status.border, "border")}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Payment</DialogTitle>
            <DialogDescription>
              Upload your payment receipt for verification
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Amount (₱)</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Period Month</Label>
                <Input
                  type="month"
                  value={formData.period_month}
                  onChange={(e) => setFormData(prev => ({ ...prev, period_month: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select 
                value={formData.payment_type} 
                onValueChange={(v) => setFormData(prev => ({ ...prev, payment_type: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly_dues">Monthly Dues</SelectItem>
                  <SelectItem value="special_assessment">Special Assessment</SelectItem>
                  <SelectItem value="fine">Fine</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, payment_method: method.value }))}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                      formData.payment_method === method.value
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <method.icon className={cn(
                      "w-6 h-6",
                      formData.payment_method === method.value ? "text-emerald-600" : "text-slate-400"
                    )} />
                    <span className="text-xs font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reference Number</Label>
              <Input
                value={formData.reference_number}
                onChange={(e) => setFormData(prev => ({ ...prev, reference_number: e.target.value }))}
                placeholder="Transaction reference"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Receipt</Label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  {uploading ? (
                    <div className="animate-spin w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto" />
                  ) : formData.receipt_url ? (
                    <div className="space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <p className="text-sm text-emerald-600 font-medium">Receipt uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-sm text-slate-500">Click to upload receipt</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes..."
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={createPaymentMutation.isPending}
              >
                {createPaymentMutation.isPending ? 'Submitting...' : 'Submit Payment'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-semibold">₱{(selectedPayment.amount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <Badge className={cn(
                    statusConfig[selectedPayment.status]?.bg,
                    statusConfig[selectedPayment.status]?.color
                  )}>
                    {statusConfig[selectedPayment.status]?.label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Period</p>
                  <p className="font-semibold">{selectedPayment.period_month}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Method</p>
                  <p className="font-semibold capitalize">{selectedPayment.payment_method?.replace(/_/g, ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Reference</p>
                  <p className="font-semibold">{selectedPayment.reference_number || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Submitted</p>
                  <p className="font-semibold">{format(new Date(selectedPayment.created_date), 'MMM d, yyyy')}</p>
                </div>
              </div>
              {selectedPayment.receipt_url && (
                <div>
                  <p className="text-sm text-slate-500 mb-2">Receipt</p>
                  <a 
                    href={selectedPayment.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline text-sm"
                  >
                    View Receipt →
                  </a>
                </div>
              )}
              {selectedPayment.notes && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Notes</p>
                  <p className="text-sm">{selectedPayment.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}