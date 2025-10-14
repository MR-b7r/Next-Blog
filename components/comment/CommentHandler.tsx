"use client";
import React from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import CommentModal from "./commentModal";
import { likeComment } from "@/lib/actions/comment.actions";
import { useRouter } from "next/navigation";

const CommentHandler = ({
  comment,
  user,
}: {
  comment: Message;
  user: User;
}) => {
  const router = useRouter();

  const handleLikeComment = async (commentId: string) => {
    if (!commentId && !user.id) return;
    const comment = await likeComment({ commentId, userId: user.id });
    router.refresh();
    console.log(comment);
  };
  return (
    <div className="flex items-center pt-1 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
      <button
        type="button"
        onClick={() => handleLikeComment(comment._id)}
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
          <CommentModal userId={comment.userId} comment={comment} type="edit" />

          <CommentModal
            userId={comment.userId}
            comment={comment}
            type="delete"
          />
        </>
      )}
    </div>
  );
};

export default CommentHandler;
