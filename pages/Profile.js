import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import {
  User,
  Phone,
  Shield,
  Camera,
  Save,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function Profile() {
  const [profileData, setProfileData] = useState({
    phone: '',
    emergency_contact: '',
    emergency_phone: '',
    unit_number: '',
    block: '',
    resident_type: 'owner',
    profile_photo: '',
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    email_announcements: true,
    email_payments: true,
    email_events: true,
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

  useEffect(() => {
    if (resident) {
      setProfileData({
        phone: resident.phone || '',
        emergency_contact: resident.emergency_contact || '',
        emergency_phone: resident.emergency_phone || '',
        unit_number: resident.unit_number || '',
        block: resident.block || '',
        resident_type: resident.resident_type || 'owner',
        profile_photo: resident.profile_photo || '',
      });
      setNotificationPrefs(resident.notification_preferences || {
        email_announcements: true,
        email_payments: true,
        email_events: true,
      });
    }
  }, [resident]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      if (resident) {
        return base44.entities.Resident.update(resident.id, data);
      } else {
        return base44.entities.Resident.create({
          ...data,
          user_id: user.id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myResident'] });
      toast.success('Profile updated successfully');
    },
  });

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setProfileData(prev => ({ ...prev, profile_photo: file_url }));
    setUploading(false);
  };

  const handleSaveProfile = () => {
    updateProfileMutation.mutate({
      ...profileData,
      notification_preferences: notificationPrefs,
    });
  };

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage src={profileData.profile_photo} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors"
                  >
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4 text-white" />
                    )}
                  </label>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{user?.full_name}</h3>
                  <p className="text-slate-500">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-600 capitalize">{user?.role}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Residence Information</CardTitle>
              <CardDescription>Your unit and residence details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Unit Number</Label>
                  <Input
                    value={profileData.unit_number}
                    onChange={(e) => setProfileData(prev => ({ ...prev, unit_number: e.target.value }))}
                    placeholder="e.g., 101"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Block / Building</Label>
                  <Input
                    value={profileData.block}
                    onChange={(e) => setProfileData(prev => ({ ...prev, block: e.target.value }))}
                    placeholder="e.g., Block A"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Resident Type</Label>
                  <Select 
                    value={profileData.resident_type}
                    onValueChange={(v) => setProfileData(prev => ({ ...prev, resident_type: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How we can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="09XX XXX XXXX"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contact Name</Label>
                    <Input
                      value={profileData.emergency_contact}
                      onChange={(e) => setProfileData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input
                      value={profileData.emergency_phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, emergency_phone: e.target.value }))}
                      placeholder="09XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={handleSaveProfile}
              disabled={updateProfileMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {updateProfileMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Announcements</Label>
                  <p className="text-sm text-slate-500">Receive community announcements</p>
                </div>
                <Switch
                  checked={notificationPrefs.email_announcements}
                  onCheckedChange={(v) => setNotificationPrefs(prev => ({ ...prev, email_announcements: v }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Reminders</Label>
                  <p className="text-sm text-slate-500">Get notified about dues and payments</p>
                </div>
                <Switch
                  checked={notificationPrefs.email_payments}
                  onCheckedChange={(v) => setNotificationPrefs(prev => ({ ...prev, email_payments: v }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Events</Label>
                  <p className="text-sm text-slate-500">Updates about community events</p>
                </div>
                <Switch
                  checked={notificationPrefs.email_events}
                  onCheckedChange={(v) => setNotificationPrefs(prev => ({ ...prev, email_events: v }))}
                />
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {updateProfileMutation.isPending ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}