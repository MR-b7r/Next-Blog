"use server";

import Comment from "@/models/comment.model";
import { connectMongo } from "../mongodb";
import { handleError, parseStringify } from "../utils";

export const createComment = async (commentData: createCommentparams) => {
  try {
    await connectMongo();
    const { comment, userId, postId } = commentData;

    const newComment = await Comment.create({
      comment,
      postId,
      userId,
    });

    return parseStringify(newComment);
  } catch (error) {
    handleError(error);
  }
};

export const getPostComments = async (postId: string) => {
  try {
    const comments = await Comment.find({ postId }).sort({
      createdAt: -1,
    });
    return parseStringify(comments);
  } catch (error) {
    handleError(error);
  }
};

export const likeComment = async (commentId: string) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return console.error("Comment not found");
    }
    const userIndex = comment.likes.indexOf(comment.userId);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(comment.userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    console.log(comment);
    return parseStringify(comment);
  } catch (error) {
    handleError(error);
  }
};
export const deleteComment = async (commentId: string) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return console.error("Comment is already deleted!");
    }
    await Comment.findByIdAndDelete(commentId);

    // return parseStringify(comment);
  } catch (error) {
    handleError(error);
  }
};
