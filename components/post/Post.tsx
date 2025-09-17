"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Border from "../Border";
const Post = ({
  post,
  mdxSource,
}: {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}) => {
  return (
    <>
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-gray-900 dark:text-gray-200">
        {post && post.title}
      </h1>
      <Link
        href={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button
          variant="default"
          size={"sm"}
          className="border border-gray-300 rounded-full text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium text-[12px] tracking-wider"
        >
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span className="italic font-semibold text-gray-600 dark:text-gray-100 tracking-wider">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="italic font-semibold text-gray-600 dark:text-gray-100 tracking-wider">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content">
        <MDXRemote {...mdxSource} />
      </div>

      <Border text="Comments" />
    </>
  );
};

export default Post;
