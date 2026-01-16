"use client"

import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* Topbar */}
      <header className="h-14 bg-white border-b flex items-center px-4">
        <h1 className="text-base font-semibold">Dashboard</h1>
      </header>

      {/* Page content */}
      <div className="max-w-full p-4 sm:p-6">
        {children}
      </div>

    </div>
  )
}
