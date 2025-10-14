"use client";

import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { postForm } from "@/lib/utils";
import { createPost, updatePost } from "@/lib/actions/post.actions";
import { FileUploader } from "../FileUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { categoriesNames } from "@/lib/constants";

export function PostForm({
  type,
  postId,
  post,
}: {
  type: "edit" | "create";
  postId?: string;
  post?: Post;
}) {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = postForm();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: type === "edit" ? post?.title : "",
      category: type === "edit" ? post?.category : "",
      content: type === "edit" ? post?.content : "Type about something new!",
      image:
        type === "create"
          ? "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
          : post?.image,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!user || !user.id)
        return toast.error("You must be logged in to perform this action");

      if (type === "create") {
        setIsLoading(true);
        const newPostData = {
          ...data,
          userId: user.id,
          username: user?.username,
        };
        await createPost(newPostData);
        toast.success(`Blog is created succesfully`);
        router.push("/dashboard/posts");
      }
      if (type === "edit") {
        setIsLoading(true);

        const updateData = {
          id: postId!,
          userId: user.id,
          category: data.category!,
          title: data.title!,
          content: data.content!,
          image: data.image,
        };
        await updatePost(updateData);
        toast.success(`Blog is Edited succesfully`);
        router.push("/dashboard/posts");
      }
    } catch (error: any) {
      toast.error(`Something went wrong, make sure all fields are valid`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormControl>
                <Input
                  className="flex-1 shad-input"
                  type="text"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px] shad-select-trigger">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="shad-select-content">
                    {categoriesNames.map((category) => (
                      <SelectItem
                        value={category}
                        key={category}
                        className="shad-select-item"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormControl>
                <FileUploader onFieldChange={field.onChange} />
              </FormControl>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormControl>
              <div className="min-h-[300px]">
                <MDEditor
                  // value={field.value}
                  // onChange={field.onChange}
                  height={300}
                  {...field}
                />
              </div>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="text-16 rounded-lg logo-gradient font-semibold text-white"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              &nbsp; Loading...
            </>
          ) : type === "edit" ? (
            "Edit Blog"
          ) : (
            "Create Blog"
          )}
        </Button>
      </form>
    </Form>
  );
}
