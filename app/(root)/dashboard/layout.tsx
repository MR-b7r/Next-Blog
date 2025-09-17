import DashSidebar from "@/components/dashboard/DashSidebar";
import { userSignIn } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/");
  const currentUser = await userSignIn(session?.user, true);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary-50 dark:bg-dark-300 ">
      <div className="md:w-56">
        <DashSidebar currentUser={currentUser} />
      </div>
      {children}
    </div>
  );
}
