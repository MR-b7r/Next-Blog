"use client";
import { commentschema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomForm from "../CustomForm";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FormFieldType } from "../AuthForm";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions/comment.actions";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CommentForm = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formSchema = commentschema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!user || !user.id) return;

      setIsLoading(true);
      if (!data.comment) return;
      const updateData = {
        userId: user.id,
        postId,
        comment: data.comment,
      };
      await createComment(updateData);
      toast.success("Comment added successfully!");
      router.refresh();
      form.reset();
      setIsLoading(false);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full ">
      {user ? (
        <>
          <div className="flex items-center gap-1 my-5 text-dark-300 dark:text-gray-100 text-sm">
            <p>Signed in as:</p>
            <Image
              alt="My Picture"
              src={user?.profilePicture}
              className="rounded-full object-cover"
              width={24}
              height={24}
            />

            <Link
              href={"/dashboard"}
              className="text-xs text-green-500 hover:underline"
            >
              @{user.username}
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
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="text-14 rounded-lg logo-gradient  text-white "
                >
                  {isLoading ? (
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
        <div className="text-sm text-dark-500 dark:text-gray-50 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-green-500 hover:underline" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
