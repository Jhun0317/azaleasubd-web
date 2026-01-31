"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // FIX: Define a temporary user object so the build doesn't crash
  const user = { role: "admin" }; 

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* 1. MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR CONTAINER */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0 lg:flex-shrink-0
      `}>
        {/* Pass the close function to the sidebar */}
        <Sidebar onItemClick={() => setIsSidebarOpen(false)} /> 
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b flex items-center px-4 flex-shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-md"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="ml-4 font-semibold text-slate-800">HOA Portal</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {/* If you have a DashboardShell component, you can wrap it here, 
              otherwise just render children */}
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
