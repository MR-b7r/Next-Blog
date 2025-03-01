import { PostForm } from "@/components/PostForm";
import { getPost } from "@/lib/actions/post.actions";
import { userSignIn } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const postId = params.postId;
  const post = await getPost(postId!);

  const session = await auth();
  if (!session) redirect("/");
  const currentUser = await userSignIn(session?.user, true);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Edit a Blug</h1>
      <PostForm
        type="edit"
        postId={postId}
        post={post}
        currentUser={currentUser}
      />
    </div>
  );
};

export default page;
