"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getPostBySearch } from "@/lib/actions/post.actions";

const SearchBar = () => {
  const [posts, setposts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleDeleteSearchTerm() {
    setSearchTerm("");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostBySearch(searchTerm);
      setposts(posts);
    };
    fetchPosts();
  }, [searchTerm]);

  return (
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <MagnifyingGlassIcon
          type="button"
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
        />
      </div>
      <input
        type="text"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {posts && (
        <ul className="absolute border border-gray-300 dark:border-gray-700 top-[41px] left-0 right-0 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full md:min-w-[360px] z-50">
          {posts.map((post: Post) => (
            <li
              className="p-2 border-b-gray-300 dark:border-b-gray-700 w-full hover:bg-gray-200 dark:hover:bg-gray-700 duration-200"
              key={post.title}
            >
              <Link
                href={`/post/${post.slug}`}
                className="w-full"
                onClick={handleDeleteSearchTerm}
              >
                <div className="text-[12px] text-gray-900 dark:text-gray-300">
                  @{post.username}
                </div>
                <strong className="text-gray-950 dark:text-gray-100">
                  {post.title}
                </strong>
                <div className="text-[12px] text-gray-900 dark:text-gray-300">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))}
          <li className="px-2 py-1 border-t-gray-400 dark:border-t-gray-800 w-full hover:bg-gray-200 dark:hover:bg-gray-700 duration-200">
            <Link
              onClick={handleDeleteSearchTerm}
              href={`/search`}
              className=" w-full flex justify-between items-center"
            >
              <p className="text-gray-950 dark:text-gray-100 tracking-wide text-[14px]">
                Open search page
              </p>
              <ArrowUpRightIcon className="w-4 font-bold" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
