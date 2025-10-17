import React from "react";
import DashProfile from "@/components/dashboard/DashProfile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserModal from "@/components/UserModal";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const { user } = session;
  return (
    <div className="max-w-lg mx-auto p-6 w-full mb-5">
      <h1 className="dash-header">{user?.username}</h1>
      <div className="flex items-center justify-center my-4">
        <Image
          alt="My Picture"
          src={user?.profilePicture}
          className=" rounded-full object-cover"
          width={48}
          height={48}
        />
      </div>
      <SessionProvider>
        <DashProfile />
      </SessionProvider>
      <div className="flex items-center justify-between mt-5">
        <Link href={"dashboard/create-post"} className="w-fit">
          <Button className="" variant={"secondary"}>
            Create a Blog
          </Button>
        </Link>
        <UserModal userId={user.id} username={user.username} />
      </div>
    </div>
  );
};

export default page;
