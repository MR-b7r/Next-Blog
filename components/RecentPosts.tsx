import { getPosts } from "@/lib/actions/post.actions";
import React from "react";
import PostCard from "./PostCard";

const RecentPosts = async ({ pageNumber }: { pageNumber?: number }) => {
  const { recentPosts } = await getPosts();
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-3xl mt-5 font-semibold tracking-wide">
        Recent Blogs
      </h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {recentPosts &&
          recentPosts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default RecentPosts;
