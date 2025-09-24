import { PostForm } from "@/components/post/PostForm";
import { userSignIn } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  const currentUser = await userSignIn(session?.user, true);
  return (
    <div className="p-3 w-full lg:max-w-3xl mx-auto min-h-screen ">
      <h1 className="dash-header">Create a Blog</h1>
      <PostForm type="create" currentUser={currentUser} />
    </div>
  );
};

export default page;
