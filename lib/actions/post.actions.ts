"use server";

import Post from "@/models/post.model";
import { connectMongo } from "../mongodb";
import { handleError, parseStringify } from "../utils";
import { postPerPage } from "../constants";

export const createNewPost = async (postData: CreatePost) => {
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

export const getPost = async (postId: string) => {
  try {
    await connectMongo();
    const post = await Post.findById(postId);
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
export const getPosts = async (pageNumber?: number) => {
  try {
    let allPosts = {};

    await connectMongo();

    if (pageNumber) {
      const limit = pageNumber * postPerPage;
      const startIndex = limit - postPerPage;
      // const sortDirection = getPosts.order === "asc" ? 1 : -1;

      const posts = await Post.find({})
        .sort({ updatedAt: -1 })
        .skip(startIndex)
        .limit(limit);
      const totalPosts = await Post.countDocuments();

      allPosts = { ...allPosts, posts, totalPosts };
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
    const { content, title, image, category } = post;
    const newPost: UpdatePost = {
      content,
      title,
      image,
      category,
    };
    if (post && post._id) {
      const checkPost = await Post.findById(post._id!);
      if (!checkPost) return;
    }
    const updatePost = await Post.findByIdAndUpdate(
      post._id,
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
