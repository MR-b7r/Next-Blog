"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import PostModal from "../post/PostModal";
import { Button } from "../ui/button";

export const columns: ColumnDef<Post>[] = [
  {
    header: "Data Updated",
    cell: ({ row }) => (
      <p className="text-14-medium">
        {new Date(row.original.updatedAt).toLocaleDateString()}
      </p>
    ),
  },
  {
    accessorKey: "postImage",
    header: "Post Image",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title}
        className="w-20 h-10 object-cover"
      />
    ),
  },
  {
    accessorKey: "postTitle",
    header: "Post Title",
    cell: ({ row }) => (
      <Link
        className="font-medium text-dark-500 dark:text-gray-100 min-w-[115px] hover:bg-green-200 dark:hover:bg-green-700  duration-150 py-2 px-3 rounded-sm"
        href={`/post/${row.original.slug}`}
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <p className="text-dark-500 dark:text-gray-100 ">
        {row.original.category}
      </p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex md:gap-1 items-center">
          <Button
            variant="ghost"
            className={`capitalize text-green-500 hover:text-green-500 tracking-wide hover:bg-green-200 dark:hover:bg-green-700 `}
          >
            <Link href={`update-post/${post._id}`}>Edit</Link>
          </Button>
          <PostModal
            postId={post._id}
            userId={post.userId}
            post={post}
            type="delete"
          />
        </div>
      );
    },
  },
];
