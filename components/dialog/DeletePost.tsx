import React, { useState } from "react";
import { Button } from "../ui/button";
import { deletePost } from "@/lib/actions/post.actions";
import toast from "react-hot-toast";

const DeletePost = ({
  postId,
  post,
  setOpen,
}: {
  postId: string;
  post: Post;
  setOpen?: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeletePost = async () => {
    try {
      setIsLoading(true);
      const deletedPost = await deletePost(postId);

      toast.success(`Post with title "${post.title}" is deleted`);
    } catch (error) {
      toast.error("cannot delete the Post");
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="ghost"
      onClick={handleDeletePost}
      disabled={isLoading}
      className={`capitalize 
        text-red-500 hover:text-red-500
       hover:bg-gray-200 dark:hover:bg-gray-700 `}
    >
      Delete
    </Button>
  );
};

export default DeletePost;
