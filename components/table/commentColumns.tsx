"use client";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";
import CommentModal from "../comment/commentModal";

export const columns: ColumnDef<Message>[] = [
  {
    header: "Date created",
    cell: ({ row }) => (
      <p className="text-14-medium text-dark-500 dark:text-gray-100">
        {row.original.createdAt
          ? formatDateTime(row.original.createdAt).dateOnly
          : "N/A"}{" "}
      </p>
    ),
  },
  {
    header: "Date updated",
    cell: ({ row }) => (
      <p className="text-14-medium text-dark-500 dark:text-gray-100">
        {row.original.updatedAt
          ? formatDateTime(row.original.updatedAt).dateOnly
          : "N/A"}{" "}
      </p>
    ),
  },
  {
    accessorKey: "comment",
    header: "comment",
    cell: ({ row }) => (
      <p className="font-medium text-dark-500 dark:text-gray-100 min-w-[115px] text-sm py-2 px-3 rounded-sm">
        {row.original.comment}
      </p>
    ),
  },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => (
      <span className="text-14-medium text-dark-500 dark:text-gray-100">
        {row.original.numberOfLikes}
      </span>
    ),
  },
  {
    accessorKey: "postid",
    header: "PostId",
    cell: ({ row }) => (
      <p className="font-medium text-dark-500 dark:text-gray-100">
        {row.original.postId}
      </p>
    ),
  },
  {
    accessorKey: "userId",
    header: "UserId",
    cell: ({ row }) => (
      <p className="font-medium text-dark-500 dark:text-gray-100">
        {row.original.userId}
      </p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const comment = row.original;
      return (
        <div className="flex md:gap-3 items-center">
          <CommentModal userId={comment.userId} comment={comment} type="edit" />
          <CommentModal
            userId={comment.userId}
            comment={comment}
            type="delete"
          />
        </div>
      );
    },
  },
];
