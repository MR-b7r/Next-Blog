"use server";

import Comment from "@/models/comment.model";
import { connectMongo } from "../mongodb";
import { handleError, parseStringify } from "../utils";
import { commentPerPage } from "../constants";

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

export const getComments = async ({
  pageNumber,
  isAdmin,
  userId,
}: {
  pageNumber?: number;
  isAdmin?: boolean;
  userId?: string;
}) => {
  try {
    let allComments = {};

    await connectMongo();

    if (pageNumber) {
      const limit = pageNumber * commentPerPage;
      const startIndex = limit - commentPerPage;
      // const sortDirection = getPosts.order === "asc" ? 1 : -1;

      let comments;
      let totalComments = 1;
      if (!isAdmin) {
        comments = await Comment.find({ userId })
          .sort({ updatedAt: -1 })
          .skip(startIndex)
          .limit(limit);
        totalComments = await Comment.countDocuments({ userId });
      } else {
        comments = await Comment.find({})
          .sort({ updatedAt: -1 })
          .skip(startIndex)
          .limit(limit);
        totalComments = await Comment.countDocuments();
      }
      const totalPages = Math.ceil(totalComments / commentPerPage);

      allComments = { ...allComments, comments, totalComments, totalPages };
    }

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    const recentComments = await Comment.find({
      createdAt: { $gte: oneMonthAgo },
    });

    allComments = { ...allComments, lastMonthComments, recentComments };
    return parseStringify(allComments);
  } catch (error) {
    handleError(error);
  }
};

export const getTotalComments = async () => {
  try {
    await connectMongo();
    const totalComments = await Comment.countDocuments();
    return totalComments as number;
  } catch (error) {
    handleError(error);
  }
};
export const likeComment = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return console.error("Comment not found");
    }
    const userIndex = comment.likes.indexOf(userId);
    console.log(userIndex);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(comment.userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    const updatedComment = await comment.save();
    console.log(updatedComment);
    return parseStringify(updatedComment);
  } catch (error) {
    handleError(error);
  }
};
export const updateComment = async ({
  commentId,
  userId,
  comment,
}: {
  commentId: string;
  userId: string;
  comment: string;
}) => {
  try {
    if (!userId) return;
    const getComment = await Comment.findById(commentId);
    if (!getComment) {
      return console.error("Comment not found");
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    if (!updatedComment)
      return console.error("Cannot update your comment, please try again");
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
