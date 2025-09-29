import { PostForm } from "@/components/post/PostForm";
import { getPost } from "@/lib/actions/post.actions";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const session = await auth();
  if (!session?.user) return;
  const isAdmin = session?.user?.isAdmin;
  const userId = session?.user?.id;
  const postId = params.postId;
  const post = await getPost({ postId, isAdmin, userId });
  if (!post) redirect("/dashboard/posts");
  return (
    <div className="p-3 w-full lg:max-w-3xl mx-auto min-h-screen">
      <h1 className="dash-header">
        Edit <span className="text-green-500">{post.title}</span>
      </h1>
      <SessionProvider>
        <PostForm type="edit" postId={postId} post={post} />
      </SessionProvider>
    </div>
  );
};

export default page;
