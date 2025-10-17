"use client";
import Link from "next/link";
import React from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Image from "next/image";
const Post = ({
  post,
  mdxSource,
  user,
}: {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  user: User;
}) => {
  return (
    <>
      <div className="max-w-2xl px-4 pt-6 pb-10 sm:px-6 mx-auto w-full">
        <h1 className="text-3xl p-3 mb-4 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-foreground">
          {post && post.title}
        </h1>
        <div className="max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div className="shrink-0">
                <Image
                  alt={user?.username}
                  src={user?.profilePicture}
                  className="rounded-full object-cover"
                  width={48}
                  height={48}
                />
              </div>

              <div className="grow">
                <div className="flex justify-between items-center gap-x-2">
                  <div>
                    <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                      <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                        <span className="font-semibold text-gray-800 dark:text-neutral-200">
                          {user?.username}
                        </span>
                      </div>
                    </div>

                    <ul className="text-xs text-gray-500 dark:text-neutral-500">
                      <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">
                        {post.createdAt
                          ? formatDateTime(post.createdAt).dateOnly
                          : "N/A"}
                      </li>
                      <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-neutral-400 dark:before:bg-neutral-600">
                        {post && (post.content.length / 1000).toFixed(0)} mins
                        read
                      </li>
                    </ul>
                  </div>

                  <Link href={`/search?category=${post?.category}`}>
                    <Badge variant="secondary">{post?.category}</Badge>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 max-w-2xl mx-auto w-full post-content">
            <MDXRemote {...mdxSource} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
