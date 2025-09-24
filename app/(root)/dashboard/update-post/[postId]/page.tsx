import { PostForm } from "@/components/post/PostForm";
import { getPost } from "@/lib/actions/post.actions";
import { userSignIn } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const postId = params.postId;
  const post = await getPost(postId!);
  console.log(post);
  const session = await auth();
  if (!session) redirect("/");
  const currentUser = await userSignIn(session?.user, true);
  return (
    <div className="p-3 w-full lg:max-w-3xl mx-auto min-h-screen ">
      <h1 className="dash-header">
        Edit <span className="text-green-500">{post.title}</span>
      </h1>
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
