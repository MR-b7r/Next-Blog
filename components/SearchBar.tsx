"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getPostBySearch } from "@/lib/actions/post.actions";
import { formatDateTime } from "@/lib/utils";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const [posts, setposts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearchSubmit(e: Event) {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  }
  function handleDeleteSearchTerm() {
    setSearchTerm("");
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostBySearch(searchTerm);
      setposts(posts);
    };
    document.addEventListener("click", (event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setposts([]);
      }
    });
    fetchPosts();
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setposts([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div className="relative hidden md:block" ref={ref}>
      <div className="relative block">
        <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon
            type="button"
            className="w-4 h-4 text-green-500"
          />
        </div>
        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <Input
            type="text"
            className=" text-dark-400  border bg-gray-50 outline-none dark:bg-dark-400 dark:border-gray-600 dark:placeholder-neutral-300 dark:text-white dark:focus:ring-0 dark:focus:border-green-500
                          py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none  dark:focus:ring-neutral-600"
            style={{ boxShadow: "none" }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {posts && searchTerm && (
        <ul className="absolute bg-gray-50 top-[45px] left-0 right-0 dark:bg-dark-400 rounded-lg shadow-md w-full border border-dark-gray-200 md:min-w-[360px] z-50">
          {posts.map((post: Post) => (
            <li
              className=" py-2 px-3 border-b-1 border-b-dark-500 dark:border-b-gray-700 w-full hover:bg-gray-100 dark:hover:bg-dark-200 duration-200"
              key={post.title}
            >
              <Link
                href={`/post/${post.slug}`}
                className="w-full"
                onClick={handleDeleteSearchTerm}
              >
                <div className="text-[12px] text-green-700 dark:text-[#f5f5f5] !italic tracking-wide">
                  @{post.username}
                </div>
                <strong className="text-[14px] tracking-wide text-gray-900 dark:text-gray-100">
                  {post.title}
                </strong>
                <div className="text-[12px] !italic text-green-700 dark:text-[#f5f5f5]">
                  {post.createdAt
                    ? formatDateTime(post.createdAt).dateOnly
                    : "N/A"}
                </div>
              </Link>
            </li>
          ))}
          {searchTerm && (
            <li className="py-2 px-3 border-t border-t-gray-600 dark:border-t-gray-800 w-full hover:bg-gray-100 dark:hover:bg-gray-800 duration-200">
              <Link
                onClick={handleDeleteSearchTerm}
                href={`/search`}
                className="w-full flex justify-between items-center"
              >
                <p className="text-gray-900 dark:text-gray-100 tracking-wide text-[12px]">
                  Click here for advanced search
                </p>
                <ArrowUpRightIcon className="w-4 text-green-600 dark:text-green-400 font-bold" />
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
