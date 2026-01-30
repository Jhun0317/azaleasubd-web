// app/(dashboard)/page.tsx
import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Fallback redirect for local development/safety
  redirect("/client/payments");

  // We return a fragment to give the compiler a "node" to attach to
  return <></>;
}