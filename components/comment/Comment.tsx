import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import moment from "moment";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import CommentHandler from "./CommentHandler";
import Image from "next/image";

const Comment = async ({ comment }: { comment: Message }) => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const { user } = session;
  let getUser = await getUserById(comment.userId);
  if (!getUser) {
    getUser = {
      username: "Deleted User",
      profilePicture: "/default-profile.webp",
    };
  }
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm max-w-2xl mx-auto w-full ">
      <div className="flex-shrink-0 mr-3">
        <Image
          alt={getUser.username}
          src={getUser?.profilePicture}
          className="w-10 h-10 rounded-full bg-gray-200 object-cover border border-green-500"
          width={40}
          height={40}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span
            className={cn(
              `font-bold mr-2 text-xs truncate text-dark-300 dark:text-gray-100`,
              getUser.username === "Deleted User" &&
                "text-red-500 dark:text-red-500"
            )}
          >
            {getUser ? `@${getUser.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 dark:text-gray-300 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-dark-400 dark:text-gray-100 pb-2">
          {comment.comment}
        </p>
        <CommentHandler user={user} comment={comment} />
      </div>
    </div>
  );
};

export default Comment;
