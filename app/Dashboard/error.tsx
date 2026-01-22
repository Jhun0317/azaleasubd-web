"use client";

export default function DashboardError({ error }) {
  return (
    <div className="p-6 text-red-600">
      Something went wrong.
      <pre className="mt-2 text-xs">{error.message}</pre>
    </div>
  );
}
