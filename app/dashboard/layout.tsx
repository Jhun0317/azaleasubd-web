"use client"

import React, { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* Topbar */}
      <header className="h-14 bg-white border-b flex items-center px-4 gap-3">
        
        {/* Hamburger menu (mobile only) */}
        <button
          className="md:hidden text-xl"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <h1 className="text-base font-semibold">Dashboard</h1>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <nav className="p-4 space-y-2">
          <a href="/dashboard" className="block">Dashboard</a>
          <a href="/dashboard/payments" className="block">Payments</a>
          <a href="/dashboard/settings" className="block">Settings</a>
        </nav>
      </aside>

      {/* Page content */}
      <div className="max-w-full p-4 sm:p-6">
        {children}
      </div>

    </div>
  )
}
