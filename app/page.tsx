import { redirect } from "next/navigation";

export default function Home() {
  // This is the "Base44" trick to skip the welcome screen
  redirect("/client/payments");
}