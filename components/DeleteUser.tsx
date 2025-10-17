"use client";
import React, { useState } from "react";

import { deleteUser, userSignOut } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const DeleteUser = ({
  userId,
  setOpen,
}: {
  userId: string;
  setOpen?: (open: boolean) => void;
}) => {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);

      await deleteUser(userId);
      if (sessionId === userId) userSignOut();
      router.refresh();
      toast.success("Account has been deleted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Button
          variant="destructive"
          size={"sm"}
          onClick={handleDeleteUser}
          disabled={isLoading}
          className={`capitalize`}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteUser;
