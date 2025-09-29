import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { AuthorizationEndpointHandler } from "next-auth/providers";
import User from "@/models/user.model";
import { authFormSchema } from "./utils";
import bcryptjs from "bcryptjs";
import { connectMongo } from "./mongodb";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      profilePicture: string;
      isAdmin: boolean;
      createdAt: Date;
      updatedAt: Date;
      address: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "email",
        },
        password: {
          type: "password",
          label: "password",
        },
      },
      async authorize(credentials) {
        try {
          await connectMongo();
          const { email, password } = await authFormSchema(
            "sign-in"
          ).parseAsync(credentials);

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("");
          }

          const isValidPassword = await bcryptjs.compare(
            password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("");
          }
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }: AuthorizationEndpointHandler) {
      return !!auth?.user;
    },
    async signIn({ account, profile }) {
      await connectMongo();
      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: profile?.email });
        if (!existingUser) {
          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword, 8);

          await User.create({
            username:
              profile?.name?.toLowerCase().split(" ").join("") +
              Math.random().toString(9).slice(-4),
            email: profile?.email,
            profilePicture: profile?.picture,
            password: hashedPassword,
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        await connectMongo();
        const dbUser = await User.findOne({ email: user?.email });
        if (dbUser) {
          token.id = dbUser.id.toString();
          token.username = dbUser.username;
          token.email = dbUser.email;
          token.profilePicture = dbUser.profilePicture;
          token.isAdmin = dbUser.isAdmin;
          token.createdAt = dbUser.createdAt;
          token.updatedAt = dbUser.updatedAt;
        }
      }
      if (trigger === "update") {
        const dbUser = await User.findOne({ email: token?.email });
        if (dbUser) {
          token.username = dbUser.username;
          token.email = dbUser.email;
          token.profilePicture = dbUser.profilePicture;
          token.updatedAt = dbUser.updatedAt;
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: token.username,
          email: token.email,
          profilePicture: token.profilePicture,
          isAdmin: token.isAdmin,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
          address: token.address,
        },
      };
      // if (token) {
      //   session.user = {
      //     id: token.id,
      //     username: token.username,
      //     email: token.email,
      //     profilePicture: token.profilePicture,
      //     isAdmin: token.isAdmin,
      //     createdAt: token.createdAt,
      //     updatedAt: token.updatedAt,
      //   };
      // }
      // return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = handler;
