"use client";
import React, { useState } from "react";

import { deleteUser } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

const DeleteUser = ({
  userId,
  setOpen,
}: {
  userId: string;
  setOpen?: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);

      router.refresh();
      toast.success("Account has been deleted");
    } catch (error) {
      toast.error("Cannot delete the account");
    } finally {
      setOpen && setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    // <div className="text-red-500 flex justify-between mt-5">
    //   <AlertDialog open={open} onOpenChange={setOpen}>
    //     <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
    //     <AlertDialogContent className="bg-gray-100 dark:bg-gray-800 border-gray-900 space-y-5 outline-none ">
    //       <AlertDialogHeader>
    //         <AlertDialogTitle className="flex items-center justify-between text-base mb-5 text-gray-700 dark:text-gray-200">
    //           Are you sure you want to delete your account?
    //           <Image
    //             src={closeButton}
    //             alt="close"
    //             width={20}
    //             height={20}
    //             onClick={() => closeModal()}
    //             className="cursor-pointer bg-gray-800 rounded-full"
    //           />
    //         </AlertDialogTitle>
    //       </AlertDialogHeader>
    //       <AlertDialogFooter className="flex justify-center gap-4">
    //         <AlertDialogCancel>No, Cancel</AlertDialogCancel>
    //         <AlertDialogAction
    //           onClick={handleDeleteUser}
    //           className="bg-red-600 hover:bg-red-700 duration-200 dark:text-white"
    //           // disabled={loading}
    //         >
    //           {false ? (
    //             <>
    //               <Loader2 size={20} className="animate-spin" /> &nbsp;
    //               Deleting...
    //             </>
    //           ) : (
    //             "Delete"
    //           )}
    //         </AlertDialogAction>
    //       </AlertDialogFooter>
    //     </AlertDialogContent>
    //   </AlertDialog>

    //   <SignoutUser />
    // </div>
    <>
      {isLoading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Button
          variant="ghost"
          onClick={handleDeleteUser}
          disabled={isLoading}
          className={`capitalize 
      text-red-500 hover:text-red-500
     hover:bg-gray-200 dark:hover:bg-gray-700 `}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteUser;
