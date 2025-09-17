import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import Comment from "@/components/comment/Comment";
import CommentSection from "@/components/comment/CommentSection";
import Post from "@/components/post/Post";
import RecentPosts from "@/components/RecentPosts";
import { getPostBySLug } from "@/lib/actions/post.actions";
import { userSignIn } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { getPostComments } from "@/lib/actions/comment.actions";

const page = async ({ params }: SearchParamProps) => {
  const slug = params.postSlug;
  const post = await getPostBySLug(slug!);
  const session = await auth();
  let currentUser;
  if (session) {
    currentUser = await userSignIn(session?.user, true);
  }
  const mdxSource = await serialize(post.content || "");
  const comments = await getPostComments(post._id);

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <Post post={post} mdxSource={mdxSource} />
      <CommentSection postId={post._id} currentUser={currentUser} />
      {comments?.map((comment: Message) => (
        <Comment
          comment={comment}
          key={comment._id}
          currentUser={currentUser}
        />
      ))}

      <RecentPosts />
    </section>
  );
};

export default page;
