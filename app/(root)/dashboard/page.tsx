import React from "react";
import DashProfile from "@/components/dashboard/DashProfile";
import { auth } from "@/lib/auth";
import { userSignIn } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserModal from "@/components/UserModal";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  const currentUser = await userSignIn(session?.user, true);
  return (
    <div className="max-w-lg mx-auto p-3 w-full mb-5">
      <h1 className="my-7 text-center font-semibold text-3xl text-dark-500 dark:text-gray-100">
        {currentUser?.username}&apos;s profile
      </h1>
      <div className="flex items-center justify-center my-4">
        <img
          src={currentUser?.profilePicture}
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
      <DashProfile currentUser={currentUser} />
      <div className="flex items-center justify-between mt-5">
        {currentUser?.isAdmin && (
          <Link href={"dashboard/create-post"} className="w-fit">
            <Button className="text-16 rounded-lg font-semibold text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hover:logo-gradient w-fit">
              Create a Blug
            </Button>
          </Link>
        )}
        <UserModal userId={currentUser._id} username={currentUser.username} />
      </div>
    </div>
  );
};

export default page;
