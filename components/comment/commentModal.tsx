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
import DeleteComment from "../dialog/DeleteComment";
import { cn, commentschema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { Form } from "../ui/form";
import { useRouter } from "next/navigation";
import CustomForm from "../CustomForm";
import { FormFieldType } from "../AuthForm";
import { Loader2 } from "lucide-react";
import { updateComment } from "@/lib/actions/comment.actions";
const CommentModal = ({
  userId,
  comment,
  type,
}: {
  userId: string;
  comment: Message;
  type: "edit" | "delete";
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = commentschema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: comment.comment,
    },
  });

  const handleUpdatecomment = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!userId) return;
      setIsLoading(true);
      if (!data.comment) return;
      const updateData = {
        commentId: comment._id,
        userId,
        comment: data.comment,
      };
      await updateComment(updateData);
      toast.success("Comment updated successfully!");
      router.refresh();
      form.reset();
      setIsLoading(false);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={`text-gray-400  capitalize ${
              type === "edit" ? "hover:text-green-500" : "hover:text-red-500"
            }`}
            type="button"
          >
            {type}
          </button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "shad-dialog sm:max-w-md border-green-600",
            type == "delete" && "!border-red-600"
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdatecomment)}
              className="flex flex-col gap-3 justify-center"
            >
              <DialogHeader className="mb-4 space-y-3">
                <DialogTitle className="capitalize text-dark-300 dark:text-gray-100 flex items-center tracking-wide">
                  {type} Comment
                </DialogTitle>
                <DialogDescription className="text-gray-800 dark:text-gray-200">
                  {type === "delete"
                    ? "Are you sure you want delete this comment?"
                    : "Make changes to your comment here. Click save when you're done."}
                </DialogDescription>
              </DialogHeader>

              {type === "edit" && (
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <CustomForm
                      fieldType={FormFieldType.TEXTAREA}
                      control={form.control}
                      name="comment"
                      placeholder={"Edit your comment"}
                    />
                  </div>
                </div>
              )}
              <DialogFooter className="flex items-center justify-end gap-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    size={"sm"}
                    variant="outline"
                    className="hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                {type === "delete" && (
                  <DeleteComment commentId={comment._id} setOpen={setOpen} />
                )}

                {type === "edit" && (
                  <div className="flex justify-between items-center gap-3">
                    <Button
                      disabled={isLoading}
                      type="submit"
                      variant="default"
                      size={"sm"}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp;
                          Loading...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentModal;
