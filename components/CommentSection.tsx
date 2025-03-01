"use client";
import { commentschema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import CustomForm from "./CustomForm";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { FormFieldType } from "./AuthForm";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions/comment.actions";

const CommentSection = ({ postId, currentUser }: { postId: string }) => {
  const router = useRouter();
  const formSchema = commentschema();
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!data.comment) return;
      const updateData = {
        userId: currentUser?._id!,
        postId,
        comment: data.comment,
      };
      const createdComment = await createComment(updateData);
      console.log(createdComment);
      toast.success("Thanks, you have shared your thoughts about this blog!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <>
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img
              className="h-5 w-5 object-cover rounded-full"
              src={currentUser.profilePicture}
              alt="profile Photo"
            />
            <Link
              href={"/dashboard?tab=profile"}
              className="text-xs text-cyan-600 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 justify-center"
            >
              <CustomForm
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="comment"
                placeholder="Add a comment..."
              />

              <div className="flex justify-between items-center gap-3">
                <p className="text-gray-500 text-xs">
                  200 characters remaining
                </p>
                <Button
                  // disabled={loading}
                  type="submit"
                  className="text-14 rounded-lg logo-gradient  text-white "
                >
                  {false ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
