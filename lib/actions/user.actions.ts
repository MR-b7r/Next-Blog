"use server";
import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user.model";
import { handleError, parseStringify } from "../utils";
import { auth, signIn, signOut } from "../auth";
import { userPerPage } from "../constants";
import { Session } from "next-auth";
import Post from "@/models/post.model";

export const userSignUp = async (user: SignUpParams) => {
  try {
    await connectMongo();
    const { username, email, password } = user;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw new Error("account with this email exists");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("account with this username exists");

    const hashedPassword = bcryptjs.hashSync(password, 8);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return parseStringify(newUser);
  } catch (error) {
    throw error;
  }
};

export const userSignIn = async (user: SignInParams, auth = false) => {
  try {
    await connectMongo();
    const { email, password } = user;
    const getUser = await User.findOne({ email });
    if (!getUser)
      return console.error(
        "cannot get the user. Email or Password is incorrect"
      );

    if (!auth) {
      const validPassword = bcryptjs.compareSync(password, getUser.password);
      if (!validPassword)
        return console.error(
          "cannot get the user. Email or Password is incorrect"
        );
    }

    // const token = jwt.sign({ id: getUser.id }, process.env.JWT_SECTRET, {
    //   expiresIn: "7d",
    // });
    // localStorage.setItem("token", token);

    return parseStringify(getUser);
  } catch (error) {
    throw error;
  }
};
export const userSignOut = async () => {
  try {
    await connectMongo();
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    await connectMongo();
    const { username, email, password, profilePicture } = user;
    const newUser: UpdateUser = {
      username,
      email,
      profilePicture,
    };
    if (!user || !user.id) throw new Error("User ID not found");

    const checkUser = await User.findById(user.id!);
    if (!checkUser)
      throw new Error("User not found in our database, user might be deleted");

    const existingUsername = await User.findOne({ username });
    if (existingUsername && existingUsername.id !== user.id)
      throw new Error("Username already taken, please choose another one");

    if (password && password.trim() !== "") {
      const hashedPassword = bcryptjs.hashSync(password, 8);
      newUser.password = hashedPassword;
    }
    const updateUser = await User.findByIdAndUpdate(
      user.id,
      {
        $set: newUser,
      },
      { new: true }
    );

    return parseStringify(updateUser);
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (userId: string) => {
  try {
    await connectMongo();

    const user = await User.findById(userId);
    const session = await auth();
    if (!user || !session) return console.error("cannot delete the user");

    await User.findByIdAndDelete(userId);
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectMongo();
    const getUser = await User.findById(userId);
    if (!getUser)
      return console.error("there an error getting the user. Please try again");

    return parseStringify(getUser);
  } catch (error) {
    handleError(error);
  }
};
export const getUsers = async (pageNumber: number) => {
  try {
    await connectMongo();

    const limit = pageNumber * userPerPage;
    const startIndex = limit - userPerPage;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    return parseStringify(users);
  } catch (error) {
    handleError(error);
  }
};

export const getTotalUsers = async () => {
  try {
    await connectMongo();
    const totalUsers = await User.countDocuments();
    return totalUsers as number;
  } catch (error) {
    handleError(error);
  }
};
export const getUserAndPostsByMonth = async () => {
  await connectMongo();

  // List of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get today's date and calculate last 6 months
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-based
    months.push({ year, month, users: 0, posts: 0 });
  }

  // Date for earliest month
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // Aggregate users created in the last 6 months
  const usersByMonth = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        users: { $sum: 1 }, // use "users" directly
      },
    },
  ]);

  // Merge counts into months array
  usersByMonth.forEach((item) => {
    const target = months.find(
      (m) => m.year === item._id.year && m.month === item._id.month - 1
    );
    if (target) target.users = item.users;
  });

  // Aggregate POSTS created in the last 6 months
  const postsByMonth = await Post.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        posts: { $sum: 1 },
      },
    },
  ]);

  postsByMonth.forEach((item) => {
    const target = months.find(
      (m) => m.year === item._id.year && m.month === item._id.month - 1
    );
    if (target) target.posts = item.posts;
  });

  // Final format: { month: "Jan", users: 186, posts: 50 }
  return months.map((m) => ({
    month: monthNames[m.month],
    users: m.users,
    posts: m.posts,
  }));
};
