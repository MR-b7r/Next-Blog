import React, { useState } from "react";
import { Button } from "../ui/button";
import { deleteComment } from "@/lib/actions/comment.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteComment = ({
  commentId,
  setOpen,
}: {
  commentId: string;
  setOpen?: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDeleteComment = async () => {
    try {
      setIsLoading(true);
      await deleteComment(commentId);

      toast.success(`Comment has been deleted`);
      router.refresh();
    } catch (error: any) {
      toast.error("Cannot delete the Comment");
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="destructive"
      onClick={handleDeleteComment}
      disabled={isLoading}
      size={"sm"}
      className={`capitalize`}
    >
      Delete
    </Button>
  );
};

export default DeleteComment;
