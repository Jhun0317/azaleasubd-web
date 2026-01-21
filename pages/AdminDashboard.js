import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import {
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import StatsCard from '@/components/dashboard/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminDashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: residents = [] } = useQuery({
    queryKey: ['allResidents'],
    queryFn: () => base44.entities.Resident.list('-created_date', 500),
  });

  const { data: payments = [] } = useQuery({
    queryKey: ['allPayments'],
    queryFn: () => base44.entities.Payment.list('-created_date', 500),
  });

  const { data: duesSetting } = useQuery({
    queryKey: ['duesSetting'],
    queryFn: async () => {
      const settings = await base44.entities.DuesSetting.list('-effective_date', 1);
      return settings[0] || null;
    },
  });

  const activeResidents = residents.filter(r => r.status === 'active').length;
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const verifiedPayments = payments.filter(p => p.status === 'verified');
  
  const currentMonth = format(new Date(), 'yyyy-MM');
  const currentMonthPayments = payments.filter(p => p.period_month === currentMonth && p.status === 'verified');
  const totalCollected = currentMonthPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const expectedRevenue = activeResidents * (duesSetting?.monthly_amount || 0);
  const collectionRate = expectedRevenue > 0 ? Math.round((totalCollected / expectedRevenue) * 100) : 0;

  const recentPendingPayments = pendingPayments.slice(0, 5);

  const paidResidentIds = currentMonthPayments.map(p => p.resident_id);
  const delinquentResidents = residents.filter(r => 
    r.status === 'active' && !paidResidentIds.includes(r.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of community management</p>
        </div>
        <div className="flex gap-2">
          <Link to={createPageUrl('ManageResidents')}>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Manage Residents
            </Button>
          </Link>
          <Link to={createPageUrl('AdminSettings')}>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Settings
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Residents"
          value={activeResidents}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Pending Payments"
          value={pendingPayments.length}
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="This Month Collection"
          value={`₱${totalCollected.toLocaleString()}`}
          subtitle={`${collectionRate}% of expected`}
          icon={CreditCard}
          color="emerald"
        />
        <StatsCard
          title="Delinquent Accounts"
          value={delinquentResidents.length}
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Pending Verifications</CardTitle>
            <Badge variant="secondary">{pendingPayments.length}</Badge>
          </CardHeader>
          <CardContent>
            {recentPendingPayments.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-slate-500">All payments verified</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPendingPayments.map(payment => {
                  const resident = residents.find(r => r.id === payment.resident_id);
                  return (
                    <div 
                      key={payment.id}
                      className="flex items-center justify-between p-3 bg-amber-50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          Unit {resident?.unit_number || 'Unknown'}
                        </p>
                        <p className="text-sm text-slate-500">
                          {payment.period_month} • ₱{payment.amount?.toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        {format(new Date(payment.created_date), 'MMM d')}
                      </Badge>
                    </div>
                  );
                })}
                {pendingPayments.length > 5 && (
                  <Link to={createPageUrl('AdminSettings')} className="text-sm text-emerald-600 hover:underline">
                    View all {pendingPayments.length} pending →
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Unpaid This Month</CardTitle>
            <Badge variant="destructive">{delinquentResidents.length}</Badge>
          </CardHeader>
          <CardContent>
            {delinquentResidents.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-slate-500">All residents have paid</p>
              </div>
            ) : (
              <div className="space-y-3">
                {delinquentResidents.slice(0, 5).map(resident => (
                  <div 
                    key={resident.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        Unit {resident.unit_number}
                      </p>
                      <p className="text-sm text-slate-500">
                        {resident.block || 'No block'}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-red-600">
                      ₱{(duesSetting?.monthly_amount || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
                {delinquentResidents.length > 5 && (
                  <p className="text-sm text-slate-500">
                    +{delinquentResidents.length - 5} more
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Collection Summary - {format(new Date(), 'MMMM yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Expected Revenue</span>
                <span className="font-semibold">₱{expectedRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Collected</span>
                <span className="font-semibold text-emerald-600">₱{totalCollected.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Outstanding</span>
                <span className="font-semibold text-red-600">
                  ₱{(expectedRevenue - totalCollected).toLocaleString()}
                </span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Collection Rate</span>
                  <span className="text-sm font-medium">{collectionRate}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${Math.min(collectionRate, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">Verified Payments</p>
                  <p className="font-semibold">{verifiedPayments.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">Pending Verification</p>
                  <p className="font-semibold">{pendingPayments.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">Total All Time</p>
                  <p className="font-semibold">
                    ₱{verifiedPayments.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}