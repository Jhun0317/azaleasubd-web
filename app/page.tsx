import { redirect } from "next/navigation";

export default function Home() {
  // This automatically sends users to your HOA UI
  redirect("/client/payments");
}