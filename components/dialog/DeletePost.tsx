import React, { useState } from "react";
import { Button } from "../ui/button";
import { deletePost } from "@/lib/actions/post.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleDeletePost = async () => {
    try {
      setIsLoading(true);
      await deletePost(postId);

      toast.success(`Post with title "${post.title}" is deleted`);
      router.refresh();
    } catch (error: any) {
      toast.error("cannot delete the Post");
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      onClick={handleDeletePost}
      disabled={isLoading}
      size={"sm"}
      className={`capitalize`}
    >
      Delete
    </Button>
  );
};

export default DeletePost;
