import React from "react";
import DashProfile from "@/components/dashboard/DashProfile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserModal from "@/components/UserModal";
import { SessionProvider } from "next-auth/react";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const { user } = session;
  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-5">
      <h1 className="dash-header">{user?.username}</h1>
      <div className="flex items-center justify-center my-4">
        <img
          src={user?.profilePicture}
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
      <SessionProvider>
        <DashProfile />
      </SessionProvider>
      <div className="flex items-center justify-between mt-5">
        <Link href={"dashboard/create-post"} className="w-fit">
          <Button className="text-16 rounded-lg font-semibold text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hover:logo-gradient w-fit">
            Create a Blog
          </Button>
        </Link>
        <UserModal userId={user.id} username={user.username} />
      </div>
    </div>
  );
};

export default page;
