"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CreditCard,
  Settings,
  Bell,
  FileText,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">
          Manage HOA settings, payments, and content
        </p>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
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

        {/* PAYMENTS */}
        <TabsContent value="payments">
          <div id="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
              </CardHeader>
              <CardContent>
                Payments content placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DUES */}
        <TabsContent value="dues">
          <div id="dues">
            <Card>
              <CardHeader>
                <CardTitle>Dues</CardTitle>
              </CardHeader>
              <CardContent>
                Dues content placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ANNOUNCEMENTS */}
        <TabsContent value="announcements">
          <div id="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                Announcements placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DOCUMENTS */}
        <TabsContent value="documents">
          <div id="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                Documents placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
