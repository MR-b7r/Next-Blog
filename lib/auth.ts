import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AuthorizationEndpointHandler } from "next-auth/providers";
import { userSignIn, userSignUp } from "./actions/user.actions";
import User from "@/models/user.model";
import { parseStringify } from "./utils";
import bcryptjs from "bcryptjs";
import { connectMongo } from "./mongodb";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: AuthorizationEndpointHandler) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        // if the user's Email already exists on MongoDB
        const userDB = await User.findOne({ email: user.email });
        if (userDB) return true;
        else {
          // create new Account on MongoDB for the user

          // generate a random password
          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 8);
          const newUser = await User.create({
            username:
              user.name.toLowerCase().split(" ").join("") +
              Math.random().toString(9).slice(-4),
            email: user.email,
            password: hashedPassword,
            profilePicture: user.image,
          });
          console.log(`newUser signIn: ${newUser}`);

          if (newUser) return true;
        }
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
