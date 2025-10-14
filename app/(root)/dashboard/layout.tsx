import DashSidebar from "@/components/dashboard/DashSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background dark:bg-dark-300 ">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {children}
    </div>
  );
}
