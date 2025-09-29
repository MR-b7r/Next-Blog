import React from "react";
import { deleteComment, likeComment } from "@/lib/actions/comment.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

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
  // async function handleDelete(commentId: string) {
  //   await deleteComment(commentId);
  // }

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm max-w-2xl mx-auto w-full ">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200 object-cover border border-green-500 "
          src={getUser.profilePicture}
          alt={getUser.username}
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
        <div className="flex items-center pt-1 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            // onClick={() => likeComment(comment.id)}
            className={`text-gray-400 hover:text-green-500 ${
              user && comment.likes.includes(user.id) && "!text-green-500"
            }`}
          >
            <HandThumbUpIcon className="w-4 font-bold" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
          {user && (user.id === comment.userId || user.isAdmin) && (
            <>
              <button
                type="button"
                // onClick={handleEdit}
                className="text-gray-400 hover:text-green-500"
              >
                Edit
              </button>
              <button
                type="button"
                // onClick={() => handleDelete(comment.id)}
                className="text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
