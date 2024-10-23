import { SeasonalsProvider } from "@/contexts/SeasonalsContext";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeasonalsProvider>{children}</SeasonalsProvider>;
}
