"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardShell({ children, isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isAdmin={isAdmin}
      />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
