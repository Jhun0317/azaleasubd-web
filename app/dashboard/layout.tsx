import { redirect } from "next/navigation";
import DashboardShell from "../../components/ui/DashboardShell";
import { getAuthUser } from "../lib/auth";

export default async function DashboardLayout({ children }) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell isAdmin={user.role === "admin"}>
      {children}
    </DashboardShell>
  );
}
