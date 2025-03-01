import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: Post }) => {
  const { userId, content, title, image, category, slug } = post;
  return (
    <div className="group flex flex-col max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <div className="w-full h-full max-h-[188px] group-hover:scale-105 duration-200">
        <img
          className="rounded-t-lg h-full w-full object-cover "
          src={image}
          alt={title}
        />
      </div>

      <div className="w-full p-3 flex flex-col items-start gap-2">
        <Link href={`/search?category=${category}`} className="">
          <button className="border border-gray-300 rounded-full text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium text-[12px] tracking-wider py-1 px-3">
            {post && post.category}
          </button>
        </Link>

        <p className="font-normal text-[12px] text-gray-600 dark:text-gray-100 tracking-wider">
          updated at:
          <span className="font-semibold">
            {" "}
            {(post && new Date(post.updatedAt).toLocaleDateString()) ||
              "not available"}
          </span>
        </p>

        <Link href={`/post/${slug}`}>
          <h5 className=" my-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h5>
        </Link>

        <div className="flex justify-between items-center py-1 w-full group-hover:px-[4px] duration-200">
          <span className="text-[14px] text-grey-600 dark:text-gray-200">
            {(post && post.username) || ""}
          </span>

          <Link
            href={`/post/${slug}`}
            className="flex gap-2 items-center text-primary-500 dark:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-900 duration-150 rounded-lg py-1 px-2 hover:pl-2"
          >
            <p className="text-[14px]">Read more</p>
            <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
