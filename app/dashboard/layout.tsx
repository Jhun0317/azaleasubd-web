"use client"

import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("payments")

  // 🔁 Sync sidebar highlight with URL hash
  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActive(hash)
      }
    }

    updateFromHash()
    window.addEventListener("hashchange", updateFromHash)

    return () => {
      window.removeEventListener("hashchange", updateFromHash)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">

      {/* Topbar */}
      <header className="h-14 bg-white border-b flex items-center px-4 gap-3">
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

        <nav className="p-4 space-y-1">
          {[
            { id: "payments", label: "Payments" },
            { id: "dues", label: "Dues" },
            { id: "announcements", label: "Announcements" },
            { id: "documents", label: "Documents" },
          ].map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setActive(item.id)
                setOpen(false)
              }}
              className={`
                block rounded px-3 py-2 text-sm
                ${active === item.id
                  ? "bg-slate-200 font-medium"
                  : "hover:bg-slate-100"}
              `}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <div className="max-w-full p-4 sm:p-6">
        {children}
      </div>

    </div>
  )
}
