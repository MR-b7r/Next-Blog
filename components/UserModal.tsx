"use client";
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
import { Button } from "./ui/button";
import DeleteUser from "./DeleteUser";

const UserModal = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className={`capitalize 
              "text-red-500 hover:text-red-600
             tracking-wide hover:bg-gray-200 dark:hover:bg-gray-800 `}
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog sm:max-w-md">
          <DialogHeader className="mb-4 space-y-3">
            <DialogTitle className="capitalize text-gray-900 dark:text-gray-100 flex items-center tracking-wide">
              Delete {username}
            </DialogTitle>
            <DialogDescription className="text-gray-800 dark:text-gray-200">
              Are you sure you want to delete{" "}
              <span className="text-red-500 font-bold">{username}</span> ?
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
            <DeleteUser userId={userId} setOpen={setOpen} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserModal;
