import React from "react";
import { serialize } from "next-mdx-remote/serialize";
import Comment from "@/components/comment/Comment";
import CommentForm from "@/components/comment/CommentForm";
import Post from "@/components/post/Post";
import RecentPosts from "@/components/RecentPosts";
import { getPostBySLug } from "@/lib/actions/post.actions";
import { getPostComments } from "@/lib/actions/comment.actions";
import { SessionProvider } from "next-auth/react";

const page = async ({ params }: SearchParamProps) => {
  const slug = params.postSlug;
  const post = await getPostBySLug(slug!);
  const mdxSource = await serialize(post.content || "");
  const comments = await getPostComments(post._id);

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <Post post={post} mdxSource={mdxSource} />
      <SessionProvider>
        <CommentForm postId={post._id} />{" "}
      </SessionProvider>
      {comments?.map((comment: Message) => (
        <Comment comment={comment} key={comment._id} />
      ))}

      <RecentPosts />
    </section>
  );
};

export default page;
