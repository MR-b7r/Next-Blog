import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import DeletePost from "../dialog/DeletePost";

const PostModal = ({
  postId,
  userId,
  post,
  type,
}: {
  postId: string;
  userId: string;
  post: Post;
  type: "edit" | "delete";
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className={`capitalize ${
              type === "edit"
                ? "text-green-500 hover:text-green-500"
                : "text-red-500 hover:text-gray-100 dark:hover:text-gray-100"
            } tracking-wide hover:bg-red-400 dark:hover:bg-red-800 `}
          >
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize text-gray-900 dark:text-gray-100 flex items-center tracking-wide">
              {type} Blog
            </DialogTitle>
            <DialogDescription className="text-gray-800 dark:text-gray-200">
              Please fill in the following details to {type} Blog
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
            </DialogClose>
            {type === "delete" && (
              <DeletePost postId={postId} post={post} setOpen={setOpen} />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostModal;
