"use server";
import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

import { connectMongo } from "@/lib/mongodb";
import User from "@/models/user.model";
import { handleError, parseStringify } from "../utils";
import { auth, signIn, signOut } from "../auth";
import { redirect } from "next/navigation";
import { userPerPage } from "../constants";
import { Session } from "next-auth";

export const getLoggedIn = async (user: SignUpParams) => {
  try {
    await connectMongo();
    const session = await auth();

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return parseStringify(newUser);
  } catch (error) {
    handleError(error);
  }
};

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

    // const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECTRET, {
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
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
};

export const google = async () => {
  try {
    await signIn("google", { redirect: true });
    const session = (await auth()) as Session;
    const email = session?.user?.email;
    if (!email) throw new Error("No email found in session");
    const getUser = await User.findOne({ email });
    if (!getUser) return console.error("Error with your Google account");
    return parseStringify(getUser);
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
    if (user && user._id) {
      const checkUser = await User.findById(user._id!);
      if (!checkUser) return;
      if (password !== undefined || password) {
        const hashedPassword = bcryptjs.hashSync(password, 8);
        newUser.password = hashedPassword;
      }
    }
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: newUser,
      },
      { new: true }
    );
    return parseStringify(updateUser);
  } catch (error) {
    handleError(error);
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
export const getUsers = async (pageNumber?: number) => {
  try {
    let allUsers = {};

    await connectMongo();

    if (pageNumber) {
      const limit = pageNumber * userPerPage;
      const startIndex = limit - userPerPage;
      // const sortDirection = getPosts.order === "asc" ? 1 : -1;

      const users = await User.find({})
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
      const totalUsers = await User.countDocuments();

      allUsers = { ...allUsers, users, totalUsers };
    }

    return parseStringify(allUsers);
  } catch (error) {
    handleError(error);
  }
};
