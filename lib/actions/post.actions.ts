"use server";

import Post from "@/models/post.model";
import { connectMongo } from "../mongodb";
import { handleError, parseStringify } from "../utils";
import { postPerPage } from "../constants";
import User from "@/models/user.model";

export const createPost = async (postData: CreatePost) => {
  try {
    await connectMongo();
    if (!postData.title || !postData.content) {
      return console.error("Please provide all required fields");
    }
    if (!postData.category) {
      const category = "Uncategorized";
      postData.category = category;
    }
    const slug = postData.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newUser = await Post.create({
      ...postData,
      slug,
    });

    return parseStringify(newUser);
  } catch (error) {
    handleError(error);
  }
};

export const getPost = async ({
  postId,
  isAdmin,
  userId,
}: {
  postId: string;
  isAdmin: boolean;
  userId: string;
}) => {
  try {
    await connectMongo();
    let post;
    if (!isAdmin) {
      post = await Post.findOne({ _id: postId, userId });
      if (!post) return;
    }
    post = await Post.findById(postId);
    return parseStringify(post);
  } catch (error) {
    handleError(error);
  }
};
export const getPostBySLug = async (slug: string) => {
  try {
    await connectMongo();
    const post = await Post.findOne({ slug });
    return parseStringify(post);
  } catch (error) {
    handleError(error);
  }
};
export const getAllPosts = async ({
  pageNumber,
  isAdmin,
  userId,
}: {
  pageNumber?: boolean;
  isAdmin?: boolean;
  userId?: string;
}) => {
  try {
    let allPosts = {};

    await connectMongo();

    if (pageNumber) {
      const limit = pageNumber * postPerPage;
      const startIndex = limit - postPerPage;
      // const sortDirection = getPosts.order === "asc" ? 1 : -1;

      let posts;
      let totalPosts = 1;
      if (!isAdmin) {
        posts = await Post.find({ userId })
          .sort({ updatedAt: -1 })
          .skip(startIndex)
          .limit(limit);
        totalPosts = await Post.countDocuments({ userId });
      } else {
        posts = await Post.find({})
          .sort({ updatedAt: -1 })
          .skip(startIndex)
          .limit(limit);
        totalPosts = await Post.countDocuments();
      }
      const totalPages = Math.ceil(totalPosts / postPerPage);

      allPosts = { ...allPosts, posts, totalPosts, totalPages };
    }

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    const recentPosts = await Post.find({ createdAt: { $gte: oneMonthAgo } });

    allPosts = { ...allPosts, lastMonthPosts, recentPosts };
    return parseStringify(allPosts);
  } catch (error) {
    handleError(error);
  }
};

export const getPostBySearch = async (searchInput: string) => {
  try {
    await connectMongo();
    if (searchInput == undefined || searchInput == null || searchInput == "")
      return;

    const posts = await Post.find({
      title: { $regex: searchInput, $options: "i" },
    })
      .sort({ updatedAt: -1 })
      .limit(5);
    return parseStringify(posts);
  } catch (error) {
    handleError(error);
  }
};

export const getFilteredPosts = async (filter: searchFiterParams) => {
  try {
    await connectMongo();
    const sortDirection = filter.sort === "desc" ? -1 : 1;
    const category = filter.category === "all" ? "" : filter.category;

    const filteredPosts = await Post.find({
      title: { $regex: filter.searchTerm, $options: "i" },
      category: { $regex: category },
    }).sort({ updatedAt: sortDirection });

    return parseStringify(filteredPosts);
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (post: EditPost) => {
  try {
    await connectMongo();
    const { content, title, image, category, userId, id } = post;

    const newPost: UpdatePost = {
      content,
      title,
      image,
      category,
    };
    if (post && id) {
      const checkPost = await Post.findById(id!);
      if (!checkPost) return;
      if (checkPost.userId !== userId) {
        const getUser = await User.findById(userId);
        if (!getUser || !getUser.isAdmin)
          return console.error("You are not authorized to edit this post");
      }
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        $set: newPost,
      },
      { new: true }
    );
    return parseStringify(updatePost);
  } catch (error) {
    handleError(error);
  }
};
export const deletePost = async (postId: string) => {
  try {
    await connectMongo();
    const deletePost = await Post.findByIdAndDelete(postId);
    return parseStringify(deletePost);
  } catch (error) {
    handleError(error);
  }
};
