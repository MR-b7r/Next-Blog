import Comment from "@/components/Comment";
import CommentSection from "@/components/CommentSection";
import Post from "@/components/Post";
import RecentPosts from "@/components/RecentPosts";
import { getPostBySLug } from "@/lib/actions/post.actions";
import { userSignIn } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import React from "react";

const page = async ({ params, searchParams }: SearchParamProps) => {
  const slug = params.postSlug;
  const post = await getPostBySLug(slug!);
  const session = await auth();
  let currentUser;
  if (session) {
    currentUser = await userSignIn(session?.user, true);
  }

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <Post post={post} />
      <CommentSection postId={post._id} currentUser={currentUser} />
      <Comment postId={post._id} currentUser={currentUser} />

      <RecentPosts />
    </section>
  );
};

export default page;
