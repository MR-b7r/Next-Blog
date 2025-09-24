"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
// import PostModal from "../PostModal";
import { Button } from "../ui/button";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import UserModal from "../UserModal";

export const columns: ColumnDef<User>[] = [
  {
    header: "Date created",
    cell: ({ row }) => (
      <p className="text-14-medium text-dark-500 dark:text-gray-100">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </p>
    ),
  },
  {
    accessorKey: "userImage",
    header: "User image",
    cell: ({ row }) => (
      <img
        src={row.original.profilePicture}
        alt={row.original.username}
        className="w-10 h-10 object-cover rounded-full"
      />
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <p className="font-medium text-dark-500 dark:text-gray-100 min-w-[115px] hover:bg-green-200 dark:hover:bg-green-700 duration-150 py-2 px-3 rounded-sm">
        {row.original.username}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="font-medium text-dark-500 dark:text-gray-100 min-w-[115px] hover:bg-green-200 dark:hover:bg-green-700 duration-150 py-2 px-3 rounded-sm">
        {row.original.email}
      </p>
    ),
  },
  {
    accessorKey: "admin",
    header: "Admin",
    cell: ({ row }) => (
      <>
        {row.original.isAdmin ? (
          <CheckCircleIcon className="text-green-500 w-5 h-5" />
        ) : (
          <XMarkIcon className="text-red-500 w-5 h-5" />
        )}
      </>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Delete</div>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex md:gap-1 items-center ">
          <UserModal userId={user._id} username={user.username} />
        </div>
      );
    },
  },
];
