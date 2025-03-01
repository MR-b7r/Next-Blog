import React from "react";
import { deleteComment, getPostComments } from "@/lib/actions/comment.actions";
import CommentCard from "./CommentCard";

const Comment = async ({ postId, currentUser }: { postId: string }) => {
  const comments = await getPostComments(postId);

  // async function handleDelete(commentId: string) {
  //   await deleteComment(commentId);
  // }

  return (
    <>
      {comments?.map((comment: Message) => (
        <CommentCard
          comment={comment}
          key={comment._id}
          currentUser={currentUser}
        />
      ))}
    </>
  );
};
export default Comment;
