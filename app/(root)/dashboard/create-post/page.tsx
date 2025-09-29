import { PostForm } from "@/components/post/PostForm";
import { SessionProvider } from "next-auth/react";
import React from "react";

const page = async () => {
  return (
    <div className="p-3 w-full lg:max-w-3xl mx-auto min-h-screen ">
      <h1 className="dash-header">Create a Blog</h1>
      <SessionProvider>
        <PostForm type="create" />
      </SessionProvider>
    </div>
  );
};

export default page;
